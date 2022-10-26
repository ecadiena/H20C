import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { CaretDown } from 'react-bootstrap-icons';

const AccountListItem = ({ eventKey, account }) => {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <Card style={{ border: 'none', borderRadius: 0 }}>
      <Card.Header style={eventKey % 2 === 0 ? { backgroundColor: 'whitesmoke', border: 'none' } : { backgroundColor: '#fbfbfb', border: 'none' }}>
        <Row>
          <Col>{`${account.firstName} ${account.lastName}`}</Col>
          <Col>{account.email}</Col>
          <Col xs={2}>{account.role}</Col>
          <Col xs={1} className="text-end">
            <Button variant="outline-secondary" type="button" onClick={decoratedOnClick} size="sm" alt="Open Account Info"><CaretDown /></Button>
          </Col>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body style={{ border: '1px solid lightgray' }}>
          <Row>
            <h5>User Demographics</h5>
          </Row>
          <Row className="row-cols-2 row-cols-md-4">
            <Col md={2}><b>Age:</b><br />{account.age}</Col>
            <Col><b>Zipcode:</b><br />{account.zipcode}</Col>
            <Col><b>Education:</b><br />{account.education}</Col>
            <Col><b>Ethnicity:</b><br />{account.ethnicity.toString()}</Col>
          </Row>
          <Row className="mt-4">
            <h5>Application Statistics</h5>
          </Row>
          <Row className="row-cols-2 row-cols-md-4">
            <Col md={2}><b>Total Points:</b><br />{account.totalPoints}</Col>
            <Col><b>Completed Classes:</b><br />20</Col>
            <Col><b>Completed Curriculums:</b><br />5</Col>
            <Col><b>Average Quiz Percentage:</b><br />98%</Col>
          </Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

AccountListItem.propTypes = {
  eventKey: PropTypes.string.isRequired,
  account: PropTypes.shape.isRequired,
};

export default AccountListItem;
