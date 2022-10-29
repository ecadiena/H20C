import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const keyPublications = {
  keys: 'keys',
};

class KeyCollection extends BaseCollection {
  constructor() {
    super('Key', new SimpleSchema({
      title: String,
      key: String,
    }));
  }

  /**
   * Defines a new Session item.
   */
  define({ _id, title, key }) {
    const docID = this._collection.insert({
      _id,
      title,
      key,
    });
    return docID;
  }

  /**
   * Updates the given document.
   */
  update(docID, { title, key }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (key) {
      updateData.key = key;
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
      Meteor.publish(keyPublications.keys, function publish() {
        return instance._collection.find({});
      });
    }
  }

  /**
   * Subscription method for all.
   * It subscribes to the entire collection.
   */
  subscribeKey() {
    if (Meteor.isClient) {
      return Meteor.subscribe(keyPublications.keys);
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
    const key = doc.key;
    return { title, key };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Keys = new KeyCollection();
