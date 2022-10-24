import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import { Lessons } from '../../api/lesson/LessonCollection';
import { Sessions } from '../../api/session/SessionCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the FindClasses page for adding a testimony. */
const FindSession = () => {

  const { ready, lessons, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Lessons.subscribeLesson();
    const subscription2 = Sessions.subscribeSession();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the Stuff documents
    const lessonItems = Lessons.find({}, {}).fetch();
    const sessionItems = Sessions.find({}, {}).fetch();
    return {
      lessons: lessonItems,
      sessions: sessionItems,
      ready: rdy,
    };
  }, []);

  // state to populate the session data
  const [lessonsShown, setLessonsShown] = useState([]);

  useEffect(() => {
    console.log('Lessons Shown: ', lessonsShown);
  }, [lessonsShown]);

  const toggleShown = (sessionOwner) => {
    const filteredLessons = _.where(lessons, { owner: sessionOwner });
    setLessonsShown(filteredLessons);
    console.log(filteredLessons);
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
            sessions.map(function (session) {
              return ([
                <tr onClick={() => toggleShown(session.owner)} key={session._id}>
                  <td>{session.title}</td>
                  <td>{session.summary}</td>
                  <td>{session.type}</td>
                  <td>{session.difficulty}</td>
                </tr>,
                <tr>
                  {lessonsShown.includes(session.owner) && (
                    <td colSpan="4">{lessons.title}</td>
                  )}
                </tr>,
              ]);
            })
          }
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Sessions" />);
};

export default FindSession;
