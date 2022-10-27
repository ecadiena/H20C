import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const surveyPublications = {
  surveys: 'surveys',
  surveysAdmin: 'surveysAdmin',
};

class SurveyCollection extends BaseCollection {
  constructor() {
    super('Surveys', new SimpleSchema({
      user: String,
      familiar: String,
      introduced: String,
      safe: Number,
      reliable: Number,
      difficulty: Array,
      'difficulty.$': String,
      devices: Array,
      'devices.$': String,
      comments: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Submitted Survey item.
   */
  define({ user, familiar, introduced, safe, reliable, difficulty, devices, comments }) {
    return this._collection.insert({
      user,
      familiar,
      introduced,
      safe,
      reliable,
      difficulty,
      devices,
      comments,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param user
   */
  update(docID, { user }) {
    const updateData = {};
    if (user) {
      updateData.user = user;
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
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(surveyPublications.surveys, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ user: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(surveyPublications.surveysAdmin.stuffAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeSurvey() {
    if (Meteor.isClient) {
      return Meteor.subscribe(surveyPublications.surveys);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeSurveyAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(surveyPublications.surveysAdmin);
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
   * @return {{ user, familiar, introduced, safe, reliable, difficulty, devices, comments }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const user = doc.user;
    const familiar = doc.familiar;
    const introduced = doc.introduced;
    const safe = doc.safe;
    const reliable = doc.reliable;
    const difficulty = doc.difficulty;
    const devices = doc.devices;
    const comments = doc.comments;
    return { user, familiar, introduced, safe, reliable, difficulty, devices, comments };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Surveys = new SurveyCollection();
