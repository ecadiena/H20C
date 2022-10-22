import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { Lessons } from '../../api/lesson/LessonCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
// import LoadingSpinner from '../components/LoadingSpinner';
// import LessonItem from '../components/LessonItem';

/* Renders the FindClasses page for adding a testimony. */
const FindSession = () => {

  // const { ready, lessons } = useTracker(() => {
  //   // Note that this subscription will get cleaned up
  //   // when your component is unmounted or deps change.
  //   // Get access to Stuff documents.
  //   const subscription = Lessons.subscribeLesson();
  //   // Determine if the subscription is ready
  //   const rdy = subscription.ready();
  //   // Get the Stuff documents
  //   const lessonItems = Lessons.find({}, { sort: { name: 1 } }).fetch();
  //   return {
  //     lessons: lessonItems,
  //     ready: rdy,
  //   };
  // }, []);

  const [data, setData] = useState([]);
  const [detailsShown, setDetailsShown] = useState([]);

  async function getData() {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    const getResults = await result.json();
    setData(getResults);
    console.log(getResults);
  }

  useEffect(() => {
    getData();
  }, []);

  const toggleShown = (username) => {
    // slice method to return selected elements as new array
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(username);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(username);
      setDetailsShown(shownState);
    }
  };

  return (
    <Container id={PAGE_IDS.FIND_LESSONS}>
      <Table borderless striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Tags</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(function (user) {
              return ([
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><button type="button" onClick={() => toggleShown(user.name)}>Show Lessons</button></td>
                  {detailsShown.includes(user.name) && (
                    <tr>
                      <td colSpan="4">{user.website}</td>
                    </tr>
                  )}
                </tr>,
              ]);
            })
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default FindSession;
