import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
};

const addSubmittedQuizzes = (quiz) => {
  console.log(`  Adding Quiz for lesson: ${quiz.lessonID} (${quiz.owner})`);
  SubmittedQuizzes.define(quiz);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (SubmittedQuizzes.count() === 0) {
  if (Meteor.settings.defaultSubmittedQuizzes) {
    console.log('Creating default submitted quizzes.');
    Meteor.settings.defaultSubmittedQuizzes.map(quiz => addSubmittedQuizzes(quiz));
  }
}
