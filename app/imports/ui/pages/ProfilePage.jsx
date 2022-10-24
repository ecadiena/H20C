import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import Account from '../components/2FA';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/* A simple static component to render some text for the landing page. */
const ProfilePage = () => {
  const [show, setShow] = useState(false);

  return (
    <Container id={PAGE_IDS.PROFILE_PAGE} style={{ position: 'relative', height: '60vh' }}>
      <Row style={{ margin: 'auto' }} className="center">
        <Col style={{ maxWidth: '60wh' }}>
          <Card style={{ height: '60vh' }}>
            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <Row style={{ textAlign: 'center', marginBottom: 20 }}>
                <h2 id={COMPONENT_IDS.PROFILE_NAME}>John Foo</h2>
                <hr
                  style={{
                    margin: 'auto',
                    width: '85%',
                    background: 'black',
                    color: 'black',
                    borderColor: 'black',
                    height: '1px',
                  }}
                />
                <Row style={{ marginTop: 20 }}>
                  <Col id={COMPONENT_IDS.PROFILE_EMAIL}>
                    <h6 style={{ fontWeight: 'bold' }}>Email Address</h6>
                    <h7>john@foo.com</h7>
                  </Col>
                  <Col id={COMPONENT_IDS.PROFILE_ZIPCODE}>
                    <h6 style={{ fontWeight: 'bold' }}>Zipcode</h6>
                    <h7>96717</h7>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    <Row style={{ marginBottom: 10, marginTop: 20 }}>
                      <Col id={COMPONENT_IDS.PROFILE_GENDER}>
                        <h6 style={{ fontWeight: 'bold' }}>Gender</h6>
                        <h7>Male</h7>
                      </Col>
                      <Col id={COMPONENT_IDS.PROFILE_AGE}>
                        <h6 style={{ fontWeight: 'bold' }}>Age</h6>
                        <h7>20</h7>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                      <Col id={COMPONENT_IDS.PROFILE_ETHNICITY}>
                        <h6 style={{ fontWeight: 'bold' }}>Ethnicity</h6>
                        <h7>Asian, Pacific Islander</h7>
                      </Col>
                      <Col id={COMPONENT_IDS.PROFILE_EDUCATION}>
                        <h6 style={{ fontWeight: 'bold' }}>Education Level</h6>
                        <h7>College</h7>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </div>
          </Card>
        </Col>
        <Col style={{ maxWidth: '30wh', display: 'flex' }}>
          <Card style={{ height: '60vh' }}>
            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <Row style={{ textAlign: 'center', marginBottom: 20 }}>
                <h2>Your Dashboard</h2>
                <hr
                  style={{
                    margin: 'auto',
                    width: '85%',
                    background: 'black',
                    color: 'black',
                    borderColor: 'black',
                    height: '1px',
                  }}
                />
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    <Row style={{ marginBottom: 10, marginTop: 20 }}>
                      <Col id={COMPONENT_IDS.PROFILE_DASH_POINTS}>
                        <h6 style={{ fontWeight: 'bold' }}>Total Points</h6>
                        <h7>1500</h7>
                      </Col>
                      <Col id={COMPONENT_IDS.PROFILE_DASH_AVG_PERCENT}>
                        <h6 style={{ fontWeight: 'bold' }}>Average Quiz Percentage</h6>
                        <h7>89%</h7>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                      <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CLASS}>
                        <h6 style={{ fontWeight: 'bold' }}>Completed Classes</h6>
                        <h7>34</h7>
                      </Col>
                      <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CURR}>
                        <h6 style={{ fontWeight: 'bold' }}>Completed Curriculums</h6>
                        <h7>2</h7>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={2}>
          <Account />
          <Button variant="outline-primary" onClick={() => setShow(true)} style={{ display: 'block', width: '100%', marginTop: 10 }}>
            Edit Profile
          </Button>
        </Col>
      </Row>
      { show ? (
        <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="modal-90w">
          <Modal.Header closeButton />
          <Modal.Body>
            <h4>Edit Profile Settings</h4>
            <Form>
              <Row style={{ paddingBottom: 20 }}>
                <Col>
                  <Form.Group style={{ marginLeft: 10 }}>
                    Email Address *
                    <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_EMAIL} placeholder="Enter your email" style={{ marginBottom: 5 }} />
                    Password *
                    <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_PASSWORD} type="password" placeholder="Create a password" style={{ marginBottom: 5 }} />
                  </Form.Group>
                  <Row style={{ marginBottom: 5 }}>
                    <Col style={{ marginLeft: 10 }}>
                      <Form.Group>
                        First Name *
                        <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_FIRST_NAME} placeholder="Enter your first name" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        Last Name *
                        <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_LAST_NAME} placeholder="Enter your last name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group style={{ marginLeft: 10 }}>
                    Zipcode *
                    <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_ZIPCODE} type="number" min="0" placeholder="Enter your zipcode" style={{ marginBottom: 5 }} />
                  </Form.Group>
                </Col>
                <Col style={{ marginRight: 10 }}>
                  <Form.Group>
                    Age *
                    <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_AGE} type="number" min="0" placeholder="Enter your age" style={{ marginBottom: 5 }} />
                  </Form.Group>
                  <Form.Group>
                    Gender *
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_GENDER} placeholder="Enter your gender" style={{ marginBottom: 5 }}>
                      <option disabled>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Transgender</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    Ethnicity *
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_ETHNICITY}>
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
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_EDUCATION}>
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
              <Button variant="primary" type="submit" style={{ position: 'absolute', marginTop: 20, bottom: 10, marginLeft: 10 }}>
                Submit Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : ''}
    </Container>
  );
};

export default ProfilePage;
