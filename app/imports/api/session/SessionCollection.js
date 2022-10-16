import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const sessionType = ['event', 'course'];
export const difficultyType = ['basic', 'intermediate', 'advanced'];
export const sessionPublications = {
  sessions: 'sessions',
};

class SessionCollection extends BaseCollection {
  constructor() {
    super('Sessions', new SimpleSchema({
      title: String,
      summary: String,
      type: {
        type: String,
        allowedValues: sessionType,
        defaultValue: 'event',
      },
      difficulty: {
        type: String,
        allowedValues: difficultyType,
        defaultValue: 'basic',
      },
      tags: Array,
      'tags.$': String,
      dateStart: { type: Date, optional: true },
      dateEnd: { type: Date, optional: true },
      location: { type: String, optional: true },
      createdBy: String,
    }));
  }

  /**
   * Defines a new Session item.
   */
  define({ title, summary, type, difficulty, tags, dateStart, dateEnd, location, createdBy }) {
    const docID = this._collection.insert({
      title,
      summary,
      type,
      difficulty,
      tags,
      dateStart,
      dateEnd,
      location,
      createdBy,
    });
    return docID;
  }

  /**
   * Updates the given document.
   */
  update(docID, { title, summary, type, difficulty, tags, dateStart, dateEnd, location, createdBy }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (summary) {
      updateData.summary = summary;
    }
    if (type) {
      updateData.type = type;
    }
    if (difficulty) {
      updateData.difficulty = difficulty;
    }
    if (tags.length > 0) {
      updateData.tags = tags;
    }
    if (dateStart) {
      updateData.dateStart = dateStart;
    }
    if (dateEnd) {
      updateData.dateEnd = dateEnd;
    }
    if (location) {
      updateData.location = location;
    }
    if (createdBy) {
      updateData.createdBy = createdBy;
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
      Meteor.publish(sessionPublications.sessions, function publish() {
        return instance._collection.find({});
      });
    }
  }

  /**
   * Subscription method for all.
   * It subscribes to the entire collection.
   */
  subscribeSession() {
    if (Meteor.isClient) {
      return Meteor.subscribe(sessionPublications.sessions);
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
    const title = doc.title;
    const summary = doc.summary;
    const type = doc.type;
    const tags = doc.tags;
    const difficulty = doc.difficulty;
    const dateStart = doc.dateStart;
    const dateEnd = doc.dateEnd;
    const location = doc.location;
    const createdBy = doc.createdBy;
    return { title, summary, type, tags, difficulty, dateStart, dateEnd, location, createdBy };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Sessions = new SessionCollection();
