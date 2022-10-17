import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const lessonPublications = {
  lessons: 'lessons',
};

const lessonTextType = new SimpleSchema(
  {
    header: String,
    body: Array,
    'body.$': String,
  },
);

const quizType = new SimpleSchema(
  {
    question: String,
    options: Array,
    'options.$': String,
    correct: Number,
    feedback: String,
  },
);

class LessonCollection extends BaseCollection {
  constructor() {
    super('Lessons', new SimpleSchema({
      sessionID: String,
      title: String,
      summary: String,
      videoLink: { type: String, optional: true },
      lessonText: { type: Array, optional: true },
      'lessonText.$': lessonTextType,
      quiz: { type: Array, optional: true },
      'quiz.$': quizType,
      owner: String,
    }));
  }

  /**
   * Defines a new Lesson item.
   */
  define({ sessionID, title, summary, videoLink, lessonText, quiz, owner }) {
    const docID = this._collection.insert({
      sessionID,
      title,
      summary,
      videoLink,
      lessonText,
      quiz,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   */
  update(docID, { sessionID, title, summary, videoLink, lessonText, quiz, owner }) {
    const updateData = {};
    if (sessionID) {
      updateData.sessionID = sessionID;
    }
    if (title) {
      updateData.title = title;
    }
    if (summary) {
      updateData.summary = summary;
    }
    if (videoLink) {
      updateData.videoLink = videoLink;
    }
    if (lessonText.length > 0) {
      updateData.lessonText = lessonText;
    }
    if (quiz.length > 0) {
      updateData.quiz = quiz;
    }
    if (owner) {
      updateData.owner = owner;
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
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes for all */
      Meteor.publish(lessonPublications.lessons, function publish() {
        return instance._collection.find({});
      });
    }
  }

  /**
   * Subscription method for all.
   * It subscribes to the entire collection.
   */
  subscribeLesson() {
    if (Meteor.isClient) {
      return Meteor.subscribe(lessonPublications.lessons);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const sessionID = doc.sessionID;
    const title = doc.title;
    const summary = doc.summary;
    const videoLink = doc.videoLink;
    const lessonText = doc.lessonText;
    const quiz = doc.quiz;
    const owner = doc.owner;
    return { sessionID, title, summary, videoLink, lessonText, quiz, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Lessons = new LessonCollection();
