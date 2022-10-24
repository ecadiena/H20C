import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/SessionCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import LessonItem from '../components/LessonItem';

/* Renders the FindClasses page for adding a testimony. */
const FindSession = () => {

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

  // state to populate the session data
  const [lessonsShown, setLessonsShown] = useState([]);

  useEffect(() => {
    console.log('Lessons Shown: ', lessonsShown);
  }, [lessonsShown]);

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
    <Container id={PAGE_IDS.FIND_LESSONS}>
      <Table borderless striped hover>
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
  ) : <LoadingSpinner message="Loading Sessions" />);
};

export default FindSession;
