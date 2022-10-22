import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Accordion from 'react-bootstrap/Accordion';
import { Lessons } from '../../api/lesson/LessonCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the FindClasses page for adding a testimony. */
const FindSession = () => {

  const { ready, lessons } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Lessons.subscribeLesson();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const lessonItems = Lessons.find({}, { sort: { name: 1 } }).fetch();
    return {
      lessons: lessonItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id={PAGE_IDS.FIND_LESSONS}>
      <Table>
        <thead style={{ marginLeft: 20 }}>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Tags</th>
            <th>Difficulty</th>
          </tr>
        </thead>
      </Table>
      <Table>
        <tbody>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Table>
                  <tr>
                    <th>Session Option #1</th>
                    <th>Summary Option #1</th>
                    <th>Tags Option #1</th>
                    <th>Difficulty Option #1</th>
                  </tr>
                </Table>
              </Accordion.Header>
              <Accordion.Body>
                <Table>
                  <tr>
                    <th scope="row">Session Option #1</th>
                    <td>Summary Option #1</td>
                    <td>Tags Option #1</td>
                    <td>Difficulty Option #1</td>
                  </tr>
                  <tr>
                    <td>Session Option #1</td>
                    <td>Summary Option #1</td>
                    <td>Tags Option #1</td>
                    <td>Difficulty Option #1</td>
                  </tr>
                  <tr>
                    <td>Session Option #1</td>
                    <td>Summary Option #1</td>
                    <td>Tags Option #1</td>
                    <td>Difficulty Option #1</td>
                  </tr>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Sessions" />);
};

export default FindSession;
