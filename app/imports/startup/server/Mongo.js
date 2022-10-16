import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Sessions } from '../../api/session/SessionCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addSession(data) {
  console.log(`  Adding: ${data.title} (${data.type})`);
  Sessions.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the StuffsCollection if empty.
if (Sessions.count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default Session.');
    Meteor.settings.defaultSession.map(data => addSession(data));
  }
}
