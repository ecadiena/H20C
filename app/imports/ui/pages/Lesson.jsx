import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Accordion, Button, Card, Container, Ratio } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Lessons } from '../../api/lesson/LessonCollection';

import LessonView from '../components/classes/LessonView';

// Lesson page
const Lesson = () => {
  const { _id } = useParams();

  const { ready, lesson, registered } = useTracker(() => {
    const subscription1 = Lessons.subscribeLesson();
    const rdy = subscription1.ready();
    const lssn = Lessons.findOne({ _id: _id }, {});

    return {
      lesson: lssn,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container id={PAGE_IDS.LESSON_PAGE}>
      <h1>{lesson?.title}</h1>
      <p>{lesson?.summary}</p>
      <hr />
      {lesson.videoLink ? (
        <Container>
          <Ratio aspectRatio="16x9" className="embed-responsive embed-responsive-16by9">
            <iframe
              src={`${lesson.videoLink}`}
              title={`${lesson.title} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Ratio>
        </Container>
      )
        : ''}
      <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Accordion.Collapse>
          <Card.Body>
            <Accordion>
              {lesson.lessonText.map((lessonText, index) => (<LessonView lessonText={lessonText} eventKey={index} />))}
            </Accordion>
          </Card.Body>
        </Accordion.Collapse>
        {/*{ registered && lesson.quiz ? <Button variant="outline-danger" type="button" size="sm" href={`/quiz/${lesson._id}`}>Take Quiz</Button> : '' }*/}
      </Container>

    </Container>
  ) : '';
};

export default Lesson;
