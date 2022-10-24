import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userLessonPublications = {
  userLesson: 'userLesson',
  userLessonAdmin: 'userLessonAdmin',
};

class UserLessonCollection extends BaseCollection {
  constructor() {
    super('UserLessons', new SimpleSchema({
      registeredUser: String,
      sessionID: { type: String, optional: true },
      lessonID: { type: String, optional: true },
      joined: Date,
    }));
  }

  define({ registeredUser, sessionID, lessonID, joined }) {
    const docID = this._collection.insert({
      registeredUser,
      sessionID,
      lessonID,
      joined,
    });
    return docID;
  }

  /**
   * Updates the given document.
   */
  update(docID, { registeredUser, sessionID, lessonID, joined }) {
    const updateData = {};
    if (registeredUser) {
      updateData.registeredUser = registeredUser;
    }
    if (sessionID) {
      updateData.sessionID = sessionID;
    }
    if (lessonID) {
      updateData.lessonID = lessonID;
    }
    if (joined) {
      updateData.joined = joined;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the user lesson associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the UserLessonCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userLessonPublications.userLesson, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ registeredUser: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userLessonPublications.userLessonAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for user lesson owned by the current user.
   */
  subscribeUserLesson() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userLessonPublications.userLesson);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserLessonAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userLessonPublications.userLessonAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const registeredUser = doc.registeredUser;
    const sessionID = doc.sessionID;
    const lessonID = doc.lessonID;
    const joined = doc.joined;
    return { registeredUser, sessionID, lessonID, joined };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserLessons = new UserLessonCollection();
