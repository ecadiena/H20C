import React from 'react';
import CreateSession from '../components/session/CreateSession';
import CreateLesson from '../components/lesson/CreateLesson';

/* A simple static component to render some text for the landing page. */
const AddStuff = () => (
  <>
    <CreateSession />
    <CreateLesson />
  </>
);

export default AddStuff;
