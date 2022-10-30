import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import { ClipboardData } from 'react-bootstrap-icons';
import { Surveys } from '../../api/survey/SurveyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const Survey = () => {
  const [show, setShow] = useState(false);

  const survey = {
    user: Meteor.user().username,
    familiar: '',
    introduced: '',
    safe: undefined,
    reliable: undefined,
    difficulty: [],
    devices: [],
    comments: '',
  };

  const updateSurveyProperty = (property, content) => {
    if (property === 'difficulty') {
      if (_.contains(survey.difficulty, content)) {
        const index = survey.difficulty.indexOf(content);
        survey.difficulty.splice(index, 1);
      } else {
        survey.difficulty.push(content);
      }
    } else if (property === 'devices') {
      if (_.contains(survey.devices, content)) {
        const index = survey.devices.indexOf(content);
        survey.devices.splice(index, 1);
      } else {
        survey.devices.push(content);
      }
    } else if (property === 'safe' || property === 'reliable') {
      survey[property] = parseInt(content, 10);
    } else {
      survey[property] = content;
    }
  };

  const submit = () => {
    if (survey.familiar === '' || survey.introduced === '' || survey.safe === undefined || survey.reliable === undefined || survey.difficulty.length === 0 || survey.devices.length === 0) {
      swal('Survey Incomplete', 'Please fill out all fields in the survey', 'error');
      return;
    }
    const collectionName = Surveys.getCollectionName();
    const definitionData = survey;
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(err => {
        swal('Error', err.message, 'error');
        throw err;
      })
      .then(() => {
        swal('Thank you!', 'Your survey has been submitted.', 'success');
      });
  };

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
              <h6>Approximately how long have you been familiar with using the Internet?</h6>
              <Form.Select style={{ marginBottom: 5, width: '40%', textAlign: 'center', margin: 'auto' }} onChange={(e) => updateSurveyProperty('familiar', e.target.value)}>
                <option selected disabled>Select</option>
                <option>Less than 5 years</option>
                <option>5 - 10 years</option>
                <option>10 - 20 years</option>
                <option>More than 20 years</option>
                <option>Unsure</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ marginTop: 0, marginBottom: 30 }}>
              <h6>How did you get introduced to the Internet?</h6>
              <Form.Select style={{ marginBottom: 5, width: '40%', textAlign: 'center', margin: 'auto' }} onChange={(e) => updateSurveyProperty('introduced', e.target.value)}>
                <option selected disabled>Select</option>
                <option>I found out on my own</option>
                <option>Family/Friend</option>
                <option>Educational Institution</option>
                <option>Flyer/Infographic</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ marginTop: 30, marginBottom: 30 }} onChange={(e) => updateSurveyProperty('safe', e.target.value)}>
              <h6>{'\nOn a scale of 1 to 5, how well do you feel safe using the Internet?\n'}</h6>
              <h7 style={{ paddingRight: 15 }}>Not at all</h7>
              <Form.Check
                inline
                label="1"
                name="group-3"
                type="radio"
                id="3"
                value="1"
              />
              <Form.Check
                inline
                label="2"
                name="group-3"
                type="radio"
                id="3"
                value="2"
              />
              <Form.Check
                inline
                label="3"
                name="group-3"
                type="radio"
                id="3"
                value="3"
              />
              <Form.Check
                inline
                label="4"
                name="group-3"
                type="radio"
                id="3"
                value="4"
              />
              <Form.Check
                inline
                label="5"
                name="group-3"
                type="radio"
                id="3"
                value="5"
              />
              <h7> Very Safe</h7>

            </Form.Group>
            <Form.Group style={{ marginTop: 20, marginBottom: 20 }} onChange={(e) => updateSurveyProperty('reliable', e.target.value)}>
              <h6>On a scale of 1 to 5, how reliable is your access to the Internet?</h6>
              <h7 style={{ paddingRight: 15 }}>Not at all</h7>
              <Form.Check
                inline
                label="1"
                name="group-5"
                type="radio"
                id="5"
                value="1"
              />
              <Form.Check
                inline
                label="2"
                name="group-5"
                type="radio"
                id="5"
                value="2"
              />
              <Form.Check
                inline
                label="3"
                name="group-5"
                type="radio"
                id="5"
                value="3"
              />
              <Form.Check
                inline
                label="4"
                name="group-5"
                type="radio"
                id="5"
                value="4"
              />
              <Form.Check
                inline
                label="5"
                name="group-5"
                type="radio"
                id="5"
                value="5"
              />
              <h7>Very Reliable</h7>
            </Form.Group>
            <Form.Group style={{ marginTop: 30, marginBottom: 20 }} onChange={(e) => updateSurveyProperty('difficulty', e.target.value)}>
              <h6>Check some things that you feel make it difficult to adopt Internet usage.</h6>
              <Row>
                <Col>
                  <Form.Check
                    inline
                    label="Safety & Security"
                    name="group-4"
                    type="checkbox"
                    id="4"
                    value="Safety & Security"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Uncertainty / Ambiguity"
                    name="group-4"
                    type="checkbox"
                    id="4"
                    value="Uncertainty / Ambiguity"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Data Protection"
                    name="group-4"
                    type="checkbox"
                    id="4"
                    value="Data Protection"
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
                    value="Reliable Connectivity"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Check
                    inline
                    label="Difficulty Accessing/Inaccessible Resources"
                    name="group-4"
                    type="checkbox"
                    id="4"
                    value="Difficulty Accessing/Inaccessible Resources"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Cost"
                    name="group-4"
                    type="checkbox"
                    id="4"
                    value="Cost"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group style={{ marginTop: 20, marginBottom: 30 }} onChange={(e) => updateSurveyProperty('devices', e.target.value)}>
              <h6 style={{ marginTop: 20 }}>Which devices do you (normally) use to access the Internet?</h6>
              <Row style={{ margin: 'auto', width: '90%', marginBottom: 20 }}>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Smartphone(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                    value="Personal Smartphone(s)"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Tablet(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                    value="Personal Tablet(s)"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Personal Laptop(s)"
                    name="group-5"
                    type="checkbox"
                    id="5"
                    value="Personal Laptop(s)"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Public/Work Devices"
                    name="group-5"
                    type="checkbox"
                    id="5"
                    value="Public/Work Devices"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    label="Other"
                    name="group-5"
                    type="checkbox"
                    id="5"
                    value="Other"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group style={{ width: '90%', margin: 'auto' }}>
              <h6>Anything else you&apos;d like to add?</h6>
              <Form.Control as="textarea" rows={3} placeholder="Type any additional comments or concerns here." onChange={(e) => updateSurveyProperty('comments', e.target.value)} />
            </Form.Group>
            <p className="text-center pb-2 mx-0"><i>*You may only submit this survey once, please ensure all of your answers are correct*</i></p>
            <Button variant="primary" type="button" onClick={submit}>
              Submit Survey
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Survey;
