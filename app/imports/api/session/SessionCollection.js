import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const sessionType = ['Event', 'Course'];
export const difficultyType = ['Basic', 'Intermediate', 'Advanced'];
export const tagType = ['Technology', 'Security', 'Internet'];
export const selectFormSetup = (arr, type) => {
  type.forEach(item => {
    arr.push({ value: item, label: item });
  });
};
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
        defaultValue: 'Event',
      },
      difficulty: {
        type: String,
        allowedValues: difficultyType,
        defaultValue: 'Basic',
      },
      tags: Array,
      'tags.$': String,
      date: { type: Date, optional: true },
      startTime: { type: String, optional: true },
      endTime: { type: String, optional: true },
      location: { type: String, optional: true },
      lat: { type: Number, optional: true },
      lng: { type: Number, optional: true },
      owner: String,
    }));
  }

  /**
   * Defines a new Session item.
   */
  define({ _id, title, summary, type, difficulty, tags, date, startTime, endTime, location, owner, lat, lng }) {
    const docID = this._collection.insert({
      _id,
      title,
      summary,
      type,
      difficulty,
      tags,
      date,
      startTime,
      endTime,
      location,
      owner,
      lat,
      lng,
    });
    return docID;
  }

  /**
   * Updates the given document.
   */
  update(docID, { title, summary, type, difficulty, tags, date, startTime, endTime, location, owner, lat, lng }) {
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
    if (date) {
      updateData.date = date;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    if (location) {
      updateData.location = location;
    }
    if (owner) {
      updateData.owner = owner;
    }
    if (lat) {
      updateData.lat = lat;
    }
    if (lng) {
      updateData.lng = lng;
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
    const date = doc.date;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const location = doc.location;
    const owner = doc.owner;
    const lat = doc.lat;
    const lng = doc.lng;
    return { title, summary, type, tags, difficulty, date, startTime, endTime, location, owner, lat, lng };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Sessions = new SessionCollection();
