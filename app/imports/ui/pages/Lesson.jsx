import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Accordion, Button, Card, Container, Ratio } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Lessons } from '../../api/lesson/LessonCollection';
import LessonView from '../components/classes/LessonView';
import { ROLE } from '../../api/role/Role';

// Lesson page
const Lesson = () => {
  const { _id } = useParams();

  const { ready, lesson } = useTracker(() => {
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
        <Container style={{ paddingRight: 150, paddingLeft: 150 }}>
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
      </Container>
      <Container style={{ paddingBottom: '20px' }} className="text-end">
        { Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? <Button variant="outline-danger" type="button" size="LG" href={`/quiz/${lesson._id}`}>Take Quiz</Button> : '' }
      </Container>
    </Container>
  ) : '';
};

export default Lesson;
