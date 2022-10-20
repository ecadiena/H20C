import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignInUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [input2FA, setInput2FA] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    const email = document.getElementById(COMPONENT_IDS.SIGN_IN_FORM_EMAIL).value;
    const password = document.getElementById(COMPONENT_IDS.SIGN_IN_FORM_PASSWORD).value;

    let missingFields = '';
    if (email === '') {
      missingFields = missingFields.concat('email, ');
    }
    if (password === '') {
      missingFields = missingFields.concat('password, ');
    }

    if (email === '' || password === '') {
      swal('Sign in unsuccessful', `Missing Fields: ${missingFields.substring(0, missingFields.length - 2)}`, 'error');
      return;
    }
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        if (err.error === 'no-2fa-code') {
          setInput2FA(true);
        } else {
          swal('Login Unsuccessful', err.reason, 'error');
        }
      } else {
        setRedirect(true);
      }
    });
  };

  const signInWith2FA = (e) => {
    e.preventDefault();
    const email = document.getElementById(COMPONENT_IDS.SIGN_IN_FORM_EMAIL).value;
    const password = document.getElementById(COMPONENT_IDS.SIGN_IN_FORM_PASSWORD).value;
    const code = document.getElementById(COMPONENT_IDS.SIGN_IN_FORM_2FA).value;

    Meteor.loginWithPasswordAnd2faCode(email, password, code, (err) => {
      if (err) {
        swal('Login Unsuccessful', '2FA Code Mismatch', 'error');
      } else {
        setRedirect(true);
      }
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    const email = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_EMAIL).value;
    const password = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_PASSWORD).value;
    const firstName = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME).value;
    const lastName = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME).value;
    const age = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_AGE).value;
    const zipcode = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_ZIPCODE).value;
    const ethnicity = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_ETHNICITY).value;
    const education = document.getElementById(COMPONENT_IDS.SIGN_UP_FORM_EDUCATION).value;

    let missingFields = '';
    if (email === '') {
      missingFields = missingFields.concat('email, ');
    }
    if (password === '') {
      missingFields = missingFields.concat('password, ');
    }
    if (firstName === '' || lastName === '') {
      missingFields = missingFields.concat('full name, ');
    }
    if (age === '') {
      missingFields = missingFields.concat('age, ');
    }
    if (zipcode === '') {
      missingFields = missingFields.concat('zipcode, ');
    }
    if (ethnicity === 'Select') {
      missingFields = missingFields.concat('ethnicity, ');
    }
    if (education === 'Select') {
      missingFields = missingFields.concat('education, ');
    }
    if (missingFields.length > 0) {
      swal('Sign up unsuccessful', `Missing Fields: ${missingFields.substring(0, missingFields.length - 2)}`, 'error');
      return;
    }

    const collectionName = UserProfiles.getCollectionName();
    const definitionData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      age: age,
      zipcode: zipcode,
      ethnicity: ethnicity,
      education: education,
    };
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            swal('Signup Unsuccessful', err.reason, 'error');
          } else {
            setRedirect(true);
          }
        });
      })
      .catch((err) => swal('Signup Unsuccessful', err.reason, 'error'));
  };

  if (redirect) {
    return (<Navigate to="/" />);
  }

  return (
    <Container style={{ position: 'relative', height: '70vh' }}>
      <Card className="center">
        <Row>
          <Col xs={4}>
            <Container id={PAGE_IDS.SIGN_IN}>
              <Row>
                <Col style={{ marginTop: 20 }}>
                  <Col className="text-center">
                    <h2>Sign In</h2>
                    <h6>Already have an account? Sign in here.</h6>
                  </Col>
                  <Form onSubmit={(event) => signIn(event)}>
                    <Row style={{ marginLeft: 10 }}>
                      <Form.Group>
                        Email Address
                        <Form.Control id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} type="email" placeholder="Enter your email" style={{ marginBottom: 5 }} />
                      </Form.Group>
                    </Row>
                    <Row style={{ marginLeft: 10 }}>
                      <Form.Group>
                        Password
                        <Form.Control id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} type="password" placeholder="Enter your password" />
                      </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" style={{ position: 'absolute', bottom: 20, marginLeft: 20 }} onClick={(event) => signIn(event)}>
                      Sign In
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={8}>
            <Container id={PAGE_IDS.SIGN_UP}>
              <Row className="justify-content-center">
                <Col className="divider" style={{ marginTop: 20, marginBottom: 20 }}>
                  <Col className="text-center">
                    <h2>Sign Up</h2>
                    <h6>Don&apos;t have an account? Sign up here.</h6>
                  </Col>
                  <Form onSubmit={(event) => signUp(event)}>
                    <Row>
                      <Col>
                        <Form.Group style={{ marginLeft: 10 }}>
                          Email Address *
                          <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} placeholder="Enter your email" style={{ marginBottom: 5 }} />
                          Password *
                          <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} type="password" placeholder="Create a password" style={{ marginBottom: 5 }} />
                        </Form.Group>
                        <Row>
                          <Col style={{ marginLeft: 10 }}>
                            <Form.Group>
                              First Name *
                              <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} placeholder="Enter your first name" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              Last Name *
                              <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} placeholder="Enter your last name" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{ marginRight: 10 }}>
                        <Form.Group>
                          Age *
                          <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_AGE} type="number" min="0" placeholder="Enter your age" style={{ marginBottom: 5 }} />
                        </Form.Group>
                        <Form.Group>
                          Zipcode *
                          <Form.Control id={COMPONENT_IDS.SIGN_UP_FORM_ZIPCODE} type="number" min="0" placeholder="Enter your zipcode" style={{ marginBottom: 5 }} />
                        </Form.Group>
                        <Form.Group>
                          Ethnicity *
                          <Form.Select id={COMPONENT_IDS.SIGN_UP_FORM_ETHNICITY}>
                            <option disabled>Select</option>
                            <option>American Indian or Alaska Native</option>
                            <option>Asian</option>
                            <option>Black or African American</option>
                            <option>Hispanic or Latino</option>
                            <option>Native Hawaiian or Other Pacific Islander</option>
                            <option>White</option>
                            <option>Other</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group style={{ marginTop: 5, marginBottom: 30 }}>
                          Education Level *
                          <Form.Select id={COMPONENT_IDS.SIGN_UP_FORM_EDUCATION}>
                            <option disabled>Select</option>
                            <option>Grade K - 6</option>
                            <option>Grade 7 - 8</option>
                            <option>High School</option>
                            <option>Some College</option>
                            <option>College</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit" style={{ position: 'absolute', bottom: 20, marginLeft: 10 }} onClick={(event) => signUp(event)}>
                      Sign Up
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Card>

      <Modal show={input2FA} onHide={() => setInput2FA(false)} centered>
        <Modal.Body>
          Input 2FA Code
          <Form>
            <Form.Control id={COMPONENT_IDS.SIGN_IN_FORM_2FA} placeholder="2FA Code" />
            <Button variant="primary" type="submit" onClick={(event) => signInWith2FA(event)}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SignInUp;
