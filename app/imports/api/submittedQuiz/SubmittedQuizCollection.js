import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const submittedQuizPublications = {
  submittedQuiz: 'SubmittedQuiz',
  submittedQuizAdmin: 'SubmittedQuizAdmin',
};

const answersSchema = new SimpleSchema({
  question: String,
  correct: Boolean,
});

class SubmittedQuizCollection extends BaseCollection {
  constructor() {
    super('SubmittedQuizzes', new SimpleSchema({
      owner: String,
      lessonID: String,
      numCorrect: Number,
      answers: Array,
      'answers.$': answersSchema,
    }));
  }

  /**
   * Defines a new Submitted Quiz item.
   * @param owner The user who submitted quiz
   * @param lessonID The lesson the quiz is attached to
   * @param numCorrect The number of correctly answered questions
   * @param answers An array of the user's questions and responses
   */
  define({ owner, lessonID, numCorrect, answers }) {
    return this._collection.insert({
      owner,
      lessonID,
      numCorrect,
      answers,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param numCorrect The number of correctly answered questions
   * @param answers An array of user's questions and responses
   */
  update(docID, { numCorrect, answers }) {
    const updateData = {};
    if (numCorrect && _.isNumber(numCorrect)) {
      updateData.numCorrect = numCorrect;
    }
    if (answers && answers.length > 0) {
      updateData.answers = answers;
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
      Meteor.publish(submittedQuizPublications.submittedQuiz, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(submittedQuizPublications.submittedQuizAdmin.stuffAdmin, function publish() {
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
  subscribeSubmittedQuiz() {
    if (Meteor.isClient) {
      return Meteor.subscribe(submittedQuizPublications.submittedQuiz);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeSubmittedQuizAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(submittedQuizPublications.submittedQuizAdmin);
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
    const owner = doc.owner;
    const lessonID = doc.lessonID;
    const numCorrect = doc.numCorrect;
    const answers = doc.answers;
    return { owner, lessonID, numCorrect, answers };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const SubmittedQuizzes = new SubmittedQuizCollection();
