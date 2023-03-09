import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/session/SessionCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { UserLessons } from '../../api/user/UserLessonCollection';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';
import { Surveys } from '../../api/survey/SurveyCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.

const addSubmittedQuizzes = (data) => {
  console.log(`  Adding Quiz for lesson: ${data.lessonID} (${data.owner})`);
  SubmittedQuizzes.define(data);
};

const addSession = (data) => {
  console.log(`  Adding: ${data.title} (${data.type})`);
  Sessions.define(data);
};

const addLesson = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Lessons.define(data);
};

const addSurveys = (data) => {
  console.log(`  Adding Survey: ${data.user}`);
  Surveys.define(data);
};

const addUserLesson = (data) => {
  console.log(`  Adding: ${data.userID} with SessionID of (${data.sessionID})`);
  UserLessons.define(data);
};

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

if (SubmittedQuizzes.count() === 0) {
  if (Meteor.settings.defaultSubmittedQuizzes) {
    console.log('Creating default Submitted Quizzes.');
    Meteor.settings.defaultSubmittedQuizzes.map(data => addSubmittedQuizzes(data));
  }
}

if (Surveys.count() === 0) {
  if (Meteor.settings.defaultSurveys) {
    console.log('Creating default Surveys.');
    Meteor.settings.defaultSurveys.map(data => addSurveys(data));
  }
}
