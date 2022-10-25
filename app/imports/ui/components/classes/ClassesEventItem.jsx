import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Accordion, Button, Card, Col, Row, Badge } from 'react-bootstrap';
import SummaryText from './SummaryText';
import { UserLessons } from '../../../api/user/UserLessonCollection';
import RegisterSession from './RegisterSession';

const ClassesEventItem = ({ eventKey, session }) => {
  const [registerModal, setRegisterModal] = useState(false);

  const { ready, registered } = useTracker(() => {
    const subscription1 = UserLessons.subscribeUserLesson();
    const rdy = subscription1.ready();
    const registeredEvent = UserLessons.findOne({ sessionID: session._id }, {});

    return {
      registered: registeredEvent !== undefined,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Card className="my-4">
      <Card.Body style={{ backgroundColor: '#f0f8ff' }}>
        <Row>
          <Col xs={6}>
            <h3 style={{ display: 'inline', marginRight: '0.5em' }}>
              {session.title}
            </h3>
          </Col>
          <Col className="text-end" xs={6}>
            <h5 style={{ display: 'inline-block' }}>
              {session.difficulty === 'Basic' ? <Badge bg="success">{session.difficulty}</Badge> : ''}
              {session.difficulty === 'Intermediate' ? <Badge bg="warning">{session.difficulty}</Badge> : ''}
              {session.difficulty === 'Advanced' ? <Badge bg="danger">{session.difficulty}</Badge> : ''}
            </h5>
            <span className="px-4">{session.date ? session.date.toLocaleDateString() : ''}</span>
            <span>{session.date ? `${session.startTime} - ${session.endTime}` : ''}</span>
            <p><b>Location: </b>{session.location}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <SummaryText summary={session.summary} eventKey={eventKey} textLen={300} />
          </Col>
        </Row>
        <Row>
          <Col>
            {session.tags.map((tag, index) => (
              <span key={index}>
                <Badge pill bg="primary">
                  {tag}
                </Badge>{' '}
              </span>
            ))}
          </Col>
          <Col className="text-end">
            { !registered ? (
              <Button variant="outline-success" type="button" onClick={() => setRegisterModal(true)}>Register for Event</Button>
            ) : <Button disabled variant="outline-success" type="button">Registered!</Button> }
          </Col>
        </Row>
      </Card.Body>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body style={{ border: '1px solid lightgray' }}>
          test
        </Card.Body>
      </Accordion.Collapse>

      <RegisterSession sessionID={session._id} type="Event" modal={{ show: registerModal, setShow: setRegisterModal }} />
    </Card>
  ) : '';
};

ClassesEventItem.propTypes = {
  eventKey: PropTypes.number.isRequired,
  session: PropTypes.shape.isRequired,
};

export default ClassesEventItem;
