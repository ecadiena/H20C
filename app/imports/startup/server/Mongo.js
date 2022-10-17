import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Sessions } from '../../api/session/SessionCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { UserLessons } from '../../api/user/UserLessonCollection';
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

function addLesson(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Lessons.define(data);
}

function addUserLesson(data) {
  console.log(`  Adding: ${data.userID} with SessionID of (${data.sessionID})`);
  UserLessons.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the SessionsCollection if empty.
if (Sessions.count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default Session.');
    Meteor.settings.defaultSession.map(data => addSession(data));
  }
}

// Initialize the LessonsCollection if empty.
if (Lessons.count() === 0) {
  if (Meteor.settings.defaultLesson) {
    console.log('Creating default Lesson.');
    Meteor.settings.defaultLesson.map(data => addLesson(data));
  }
}

// Initialize the UserLessonsCollection if empty.
if (UserLessons.count() === 0) {
  if (Meteor.settings.defaultUserLesson) {
    console.log('Creating default User Lesson.');
    Meteor.settings.defaultUserLesson.map(data => addUserLesson(data));
  }
}
