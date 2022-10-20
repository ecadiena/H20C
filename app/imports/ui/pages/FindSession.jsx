import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Lessons } from '../../api/lesson/LessonCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import SessionItem from '../components/SessionItem';

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
      <Table
        striped
        borderless
        hover
        id="table"
        data-toggle="table"
        data-show-toggle="true"
        data-detail-view="true"
        data-detail-view-icon="false"
        data-detail-view-by-click="true"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Tags</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <tr data-toggle="collapse" data-target="#accordion" data-has-detail-view="true">
            <td>Session Option #1</td>
            <td>Summary Option #1</td>
            <td>Tags Option #1</td>
            <td>Difficulty Option #1</td>
          </tr>
          <tr className="detail-view">
            <td id="accordion" colSpan="4">Hidden Row for Option #1</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Sessions" />);
};

export default FindSession;
