import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import { CaretDown } from 'react-bootstrap-icons';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const LessonView = ({ eventKey, lessonText }) => {
  const decoratedOnClick = useAccordionButton(`lessonText-${eventKey}`);

  return (
    <Card style={{ border: 'none', borderRadius: 0 }}>
      <Card.Header style={eventKey % 2 === 0 ? { backgroundColor: 'whitesmoke', border: 'none' } : { backgroundColor: '#fbfbfb', border: 'none' }}>
        <Row>
          <Col>
            <h3>{lessonText.header}</h3>
          </Col>
          <Col sm={5} md={3} className="text-end">
            <Button variant="outline-secondary" type="button" onClick={decoratedOnClick} size="sm" style={{ padding: '0 0.2em 0 0.2em' }}><CaretDown /></Button>
          </Col>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={`lessonText-${eventKey}`}>
        <Card.Body style={{ border: '1px solid lightgray' }}>
          <Row><p>{lessonText.body}</p></Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

LessonView.propTypes = {
  eventKey: PropTypes.number.isRequired,
  lessonText: PropTypes.shape.isRequired,
};

export default LessonView;
