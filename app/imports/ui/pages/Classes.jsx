import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import CreateSessionModal from '../components/session/CreateSessionModal';
import CreateLessonModal from '../components/lesson/CreateLessonModal';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const Classes = () => {
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);

  return (
    <Container id={PAGE_IDS.CLASSES_PAGE} className="py-3">
      <Button variant="outline-primary" type="button" onClick={() => setShowCreateSession(true)}>Create Course / Event</Button>
      <Button variant="outline-primary" type="button" onClick={() => setShowCreateLesson(true)}>Create Lesson</Button>

      <CreateSessionModal modal={{ show: showCreateSession, setShow: setShowCreateSession }} />
      <CreateLessonModal lessonModal={{ show: showCreateLesson, setShow: setShowCreateLesson }} sessionModal={{ show: showCreateSession, setShow: setShowCreateSession }} />
    </Container>
  );
};

export default Classes;
