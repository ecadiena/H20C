import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import { CaretDown } from 'react-bootstrap-icons';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import SummaryText from './SummaryText';
import RegisterSession from './RegisterSession';
import { UserLessons } from '../../../api/user/UserLessonCollection';

const LessonItem = ({ eventKey, lesson }) => {
  const [registerModal, setRegisterModal] = useState(false);
  const decoratedOnClick = useAccordionButton(`lesson-${eventKey}`);

  const { ready, registered } = useTracker(() => {
    const subscription1 = UserLessons.subscribeUserLesson();
    const rdy = subscription1.ready();
    const registeredEvent = UserLessons.findOne({ lessonID: lesson._id }, {});

    return {
      registered: registeredEvent !== undefined,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Card style={{ border: 'none', borderRadius: 0 }}>
      <Card.Header style={eventKey % 2 === 0 ? { backgroundColor: 'whitesmoke', border: 'none' } : { backgroundColor: '#fbfbfb', border: 'none' }}>
        <Row>
          <Col sm={3} md={3} lg={1}>
            <b>{`Lesson ${eventKey + 1}:`}</b>
          </Col>
          <Col>
            <b>{lesson.title}</b>
          </Col>
          <Col sm={5} md={3} className="text-end">
            { registered ? <span style={{ marginRight: '1em', color: 'green' }}><b>Registered!</b></span> : '' }
            <Button variant="outline-secondary" type="button" onClick={decoratedOnClick} size="sm" style={{ padding: '0 0.2em 0 0.2em' }}><CaretDown /></Button>
          </Col>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={`lesson-${eventKey}`}>
        <Card.Body style={{ border: '1px solid lightgray' }}>
          <Row>
            <Col><SummaryText summary={lesson.summary} eventKey={eventKey} textLen={100} /></Col>
          </Row>
          <Row>
            <Col className="text-end">
              <Button variant="outline-primary" type="button" size="sm">Begin Lesson</Button>{' '}
              { registered && lesson.quiz.length > 0 ? <Button variant="outline-danger" type="button" size="sm">Take Quiz</Button> : '' }{' '}
              { !registered ? <Button variant="outline-success" type="button" size="sm" onClick={() => setRegisterModal(true)}>Register for Lesson</Button> : '' }
            </Col>
          </Row>
        </Card.Body>
      </Accordion.Collapse>

      <RegisterSession sessionID={lesson._id} type="Lesson" modal={{ show: registerModal, setShow: setRegisterModal }} />
    </Card>
  ) : '';

};

LessonItem.propTypes = {
  eventKey: PropTypes.number.isRequired,
  lesson: PropTypes.shape.isRequired,
};

export default LessonItem;
