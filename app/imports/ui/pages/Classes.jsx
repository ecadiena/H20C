import React, { useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Sessions } from '../../api/session/SessionCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { ROLE } from '../../api/role/Role';
import CreateSessionModal from '../components/session/CreateSessionModal';
import CreateLessonModal from '../components/lesson/CreateLessonModal';
import LoadingSpinner from '../components/LoadingSpinner';
import LessonItem from '../components/LessonItem';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const Classes = () => {
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [lessonsShown, setLessonsShown] = useState([]);

  const { ready, sessions, lessons } = useTracker(() => {
    const subscription1 = Sessions.subscribeSession();
    const subscription2 = Lessons.subscribeLesson();

    const rdy = subscription1.ready() && subscription2.ready();

    const sessionItems = Sessions.find({}, {}).fetch();
    const lessonItems = Lessons.find({}, {}).fetch();
    return {
      sessions: sessionItems,
      lessons: lessonItems,
      ready: rdy,
    };
  }, []);

  const toggleShown = (sessionOwner) => {
    const shownState = lessonsShown.slice();
    const index = shownState.indexOf(sessionOwner);
    if (index >= 0) {
      shownState.splice(index, 1);
      setLessonsShown(shownState);
    } else {
      shownState.push(sessionOwner);
      setLessonsShown(shownState);
    }
  };

  return (ready ? (
    <Container id={PAGE_IDS.CLASSES_PAGE} className="py-3">
      { Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
        <div>
          <Button variant="outline-primary" type="button" onClick={() => setShowCreateSession(true)}>Create Course / Event</Button>
          <Button variant="outline-primary" type="button" onClick={() => setShowCreateLesson(true)}>Create Lesson</Button>

          <CreateSessionModal modal={{ show: showCreateSession, setShow: setShowCreateSession }} />
          <CreateLessonModal lessonModal={{ show: showCreateLesson, setShow: setShowCreateLesson }} sessionModal={{ show: showCreateSession, setShow: setShowCreateSession }} />
        </div>
      ) : ''}
      <Table striped hover style={{ marginTop: '25px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Type</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {
            sessions.map((session) => ([
              <tr onClick={() => toggleShown(session.owner)} key={session._id}>
                <td>{session.title}</td>
                <td>{session.summary}</td>
                <td>{session.type}</td>
                <td>{session.difficulty}</td>
              </tr>,
              <tr>
                {lessonsShown.includes(session.owner) && (
                  lessons.map((lesson) => <td colSpan="4"><LessonItem lesson={lesson} /></td>)
                )}
              </tr>,
            ]))
          }
        </tbody>
      </Table>

    </Container>
  ) : <LoadingSpinner message="Loading Classes" />);
};

export default Classes;
