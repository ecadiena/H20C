import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignInUp = () => (
  <Container id={PAGE_IDS.SIGN_IN_UP} style={{ position: 'relative', height: '70vh' }}>
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
                <Form>
                  <Row style={{ marginLeft: 10 }}>
                    <Form.Group>
                      Email Address
                      <Form.Control type="email" placeholder="Enter your email" style={{ marginBottom: 5 }} />
                    </Form.Group>
                  </Row>
                  <Row style={{ marginLeft: 10 }}>
                    <Form.Group>
                      Password
                      <Form.Control type="password" placeholder="Enter your password" />
                    </Form.Group>
                  </Row>
                  <Button variant="primary" type="submit" style={{ position: 'absolute', bottom: 20, marginLeft: 20 }}>
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
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <h6>Don't have an account? Sign up here.</h6>
                </Col>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group style={{ marginLeft: 10 }}>
                        Email address
                        <Form.Control type="email" placeholder="Enter your email" style={{ marginBottom: 5 }} />
                        Password
                        <Form.Control type="password" placeholder="Create a password" style={{ marginBottom: 5 }} />
                      </Form.Group>
                      <Row>
                        <Col style={{ marginLeft: 10 }}>
                          <Form.Group>
                            First Name
                            <Form.Control type="first-name" placeholder="Enter your first name" />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            Last Name
                            <Form.Control type="first-name" placeholder="Enter your last name" />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col style={{ marginRight: 10 }}>
                      <Form.Group>
                        Age
                        <Form.Control type="age" placeholder="Enter your age" style={{ marginBottom: 5 }} />
                      </Form.Group>
                      <Form.Group>
                        Zipcode
                        <Form.Control type="zipcode" placeholder="Enter your zipcode" style={{ marginBottom: 5 }} />
                      </Form.Group>
                      <Form.Group>
                        Ethnicity
                        <Form.Select>
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
                        Education Level
                        <Form.Select>
                          <option>Grade K - 6</option>
                          <option>Grade 7 - 8</option>
                          <option>High School</option>
                          <option>Some College</option>
                          <option>College</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" style={{ position: 'absolute', bottom: 20, marginLeft: 10 }}>
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Card>
  </Container>
);

export default SignInUp;
