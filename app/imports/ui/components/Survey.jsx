import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import { ClipboardData } from 'react-bootstrap-icons';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const Account = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setShow(true)} className="survey-button">
        <ClipboardData size={25} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="modal-survey">
        <Modal.Header closeButton />
        <Modal.Body style={{ textAlign: 'center', overflowY: 'scroll', height: '80vh' }}>
          <Form>
            <Alert variant="warning">
              <h3>Complete this short survey to earn some points</h3>
              <h6>
                In this survey we will be asking about your personal experience with the Internet to try and identify some hurdles the community might be facing when it comes to adopting modern day Internet usage.
                By completing this <strong>optional</strong> survey, you consent to having your answers collected for our team to analyze.
              </h6>
            </Alert>
            <Form.Group style={{ marginTop: 30, marginBottom: 20 }}>
              <h6>Approximately how long have you been familiar with using the Internet</h6>
              <Form.Select id={COMPONENT_IDS.SURVEY_FORM_Q1} style={{ marginBottom: 5, width: '40%', textAlign: 'center', margin: 'auto' }}>
                <option disabled>Select</option>
                <option>Less than 5 years</option>
                <option>5 - 10 years</option>
                <option>10 - 20 years</option>
                <option>More than 20 years</option>
                <option>Unsure</option>
              </Form.Select>
            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q2} style={{ marginTop: 0, marginBottom: 30 }}>
              <h6>How did you get introduced to the Internet?</h6>
              <Form.Select style={{ marginBottom: 5, width: '40%', textAlign: 'center', margin: 'auto' }}>
                <option disabled>Select</option>
                <option>I found out on my own</option>
                <option>Family/Friend</option>
                <option>Educational Institution</option>
                <option>Flyer/Infographic</option>
              </Form.Select>
            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q3} style={{ marginTop: 30, marginBottom: 30 }}>
              <h6>{'\nOn a scale of 1 to 5, do you feel safe using the Internet?\n'}</h6>
              <h7 style={{ paddingRight: 15 }}>Disagree</h7>
              <Form.Check
                inline
                label="1"
                name="group-3"
                type="radio"
                id="3"
              />
              <Form.Check
                inline
                label="2"
                name="group-3"
                type="radio"
                id="3"
              />
              <Form.Check
                inline
                label="3"
                name="group-3"
                type="radio"
                id="3"
              />
              <Form.Check
                inline
                label="4"
                name="group-3"
                type="radio"
                id="3"
              />
              <Form.Check
                inline
                label="5"
                name="group-3"
                type="radio"
                id="3"
              />
              <h7> Agree</h7>

            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q4} style={{ marginTop: 20, marginBottom: 20 }}>
              <h6>On a scale of 1 to 5, how reliable is your access to the Internet?</h6>
              <h7 style={{ paddingRight: 15 }}>Not at all</h7>
              <Form.Check
                inline
                label="1"
                name="group-5"
                type="radio"
                id="5"
              />
              <Form.Check
                inline
                label="2"
                name="group-5"
                type="radio"
                id="5"
              />
              <Form.Check
                inline
                label="3"
                name="group-5"
                type="radio"
                id="5"
              />
              <Form.Check
                inline
                label="4"
                name="group-5"
                type="radio"
                id="5"
              />
              <Form.Check
                inline
                label="5"
                name="group-5"
                type="radio"
                id="5"
              />
              <h7>Very Reliable</h7>
            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q5} style={{ marginTop: 30, marginBottom: 20 }}>
              <h6>Check some things that you feel make it difficult to adopt Internet usage.</h6>
              <Row>
                <Col>
                  <Form.Check
                    inline
                    label="Safety & Security"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Uncertainty / Ambiguity"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Data Protection"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check
                    inline
                    label="Reliable Connectivity"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Check
                    inline
                    label="Difficulty Accessing/Inaccessible Resources"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Cost"
                    name="group-4"
                    type="checkbox"
                    id="4"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q6} style={{ marginTop: 20, marginBottom: 30 }}>
              <h6 style={{ marginTop: 20 }}>Which devices do you (normally) use to access the Internet?</h6>
              <Row style={{ margin: 'auto', width: '90%', marginBottom: 20 }}>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Smartphone(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Tablet(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Laptop(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Public/Work Devices"
                    name="group-5"
                    type="checkbox"
                    id="5"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Other"
                    name="group-5"
                    type="checkbox"
                    id="5"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group id={COMPONENT_IDS.SURVEY_FORM_Q7} style={{ width: '90%', margin: 'auto' }}>
              <h6>Anything else you&apos;d like to add?</h6>
              <Form.Control as="textarea" rows={3} placeholder="Type any additional comments or concerns here." />
            </Form.Group>
            <p className="text-center pb-2 mx-0"><i>*You may only submit this survey once, please ensure all of your answers are correct*</i></p>
            <Button variant="primary" type="submit">
              Submit Survey
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Account;
