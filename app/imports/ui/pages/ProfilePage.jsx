import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link, NavLink } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { PAGE_IDS } from '../utilities/PageIDs';
import Account from '../components/2FA';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserLessons } from '../../api/user/UserLessonCollection';
import { Lessons } from '../../api/lesson/LessonCollection';

/* A simple static component to render some text for the landing page. */
const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const { ready, user, data, lessons } = useTracker(() => {
    const userProfileSubscription = UserProfiles.subscribe();
    const userLessonSubscription = UserLessons.subscribeUserLesson();
    const lessonSubscription = Lessons.subscribeLesson();
    const rdy = userProfileSubscription.ready() && userLessonSubscription.ready() && lessonSubscription.ready();

    const currentUser = Meteor.user() ? Meteor.user().username : '';
    const usr = UserProfiles.findOne({ email: currentUser }, {});
    const usrLessons = UserLessons.find({ registeredUser: currentUser }, {}).fetch();
    const lessonData = Lessons.find({ }, {}).fetch();
    return {
      user: usr,
      ready: rdy,
      data: usrLessons,
      lessons: lessonData,
    };
  }, []);

  const cardStyle = { height: '55vh', marginBottom: 10 };
  const divStyle = { marginTop: 40, marginBottom: 40 };
  const lessonStyle = { padding: 0, margin: 10 };
  const headerStyle = { fontWeight: 'bold' };

  const findLesson = (lessonID) => lessons.find((lesson) => lesson._id === lessonID);
  const maxChars = 300;

  const userLessons = data.map((d) => (
    <Card style={lessonStyle}>
      <Card.Body style={{ marginBottom: 10 }}>
        <Card.Title>
          {findLesson(d.lessonID).title.length > 65 ?
            `${findLesson(d.lessonID).title.substring(0, 65)} ... ` :
            findLesson(d.lessonID).title.substring(0, 65)}
        </Card.Title>
        <Card.Text>
          {findLesson(d.lessonID).summary.length > maxChars ?
            `${findLesson(d.lessonID).summary.substring(0, maxChars)} .... ` :
            findLesson(d.lessonID).summary.substring(0, maxChars)}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ paddingRight: 0, paddingLeft: 0 }}>
        <Button variant="primary">
          <Link as={NavLink} to={`/lesson/${d.lessonID}`} style={{ textDecoration: 'none', color: 'white' }}>
            Go to Lesson
          </Link>
        </Button>
      </Card.Footer>
    </Card>
  ));

  return ready ? (
    <Container id={PAGE_IDS.PROFILE_PAGE}>
      <Row style={{ margin: 'auto', textAlign: 'center' }}>
        <Row>
          <Col>
            <Card style={cardStyle}>
              <div style={divStyle}>
                <Row style={{ marginBottom: 20 }}>
                  <h2 id={COMPONENT_IDS.PROFILE_NAME}>{user.firstName} {user.lastName}</h2>
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
                      <h6 style={headerStyle}>Email Address</h6>
                      <h7>{user.email}</h7>
                    </Col>
                    <Col id={COMPONENT_IDS.PROFILE_ZIPCODE}>
                      <h6 style={headerStyle}>Zipcode</h6>
                      <h7>{user.zipcode}</h7>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ textAlign: 'center' }}>
                      <Row style={{ marginBottom: 10, marginTop: 20 }}>
                        <Col id={COMPONENT_IDS.PROFILE_GENDER}>
                          <h6 style={headerStyle}>Gender</h6>
                          <h7>{user.gender}</h7>
                        </Col>
                        <Col id={COMPONENT_IDS.PROFILE_AGE}>
                          <h6 style={headerStyle}>Age</h6>
                          <h7>{user.age}</h7>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col id={COMPONENT_IDS.PROFILE_ETHNICITY}>
                          <h6 style={headerStyle}>Ethnicity</h6>
                          <h7>{user.ethnicity}</h7>
                        </Col>
                        <Col id={COMPONENT_IDS.PROFILE_EDUCATION}>
                          <h6 style={headerStyle}>Education Level</h6>
                          <h7>{user.education}</h7>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
                <Row style={{ width: '80%', margin: 'auto' }}>
                  <Col>
                    <Account />
                  </Col>
                  <Col>
                    <Button variant="outline-primary" onClick={() => setShow(true)} style={{ display: 'block', width: '100%' }} alt="Edit Profile">
                      Edit Profile
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col>
            <Card style={cardStyle}>
              <div style={divStyle}>
                <Row style={{ marginBottom: 20 }}>
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
                  <Row style={{ marginTop: 10 }}>
                    <Col style={{ textAlign: 'center' }}>
                      <Row style={{ marginBottom: 10, marginTop: 10 }}>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_POINTS}>
                          <h6 style={headerStyle}>Total Points</h6>
                          <h7>{user.totalPoints}</h7>
                        </Col>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_AVG_PERCENT}>
                          <h6 style={headerStyle}>Average Quiz Percentage</h6>
                          <h7>89%</h7>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CLASS}>
                          <h6 style={headerStyle}>Completed Classes</h6>
                          <h7>34</h7>
                        </Col>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CURR}>
                          <h6 style={headerStyle}>Completed Sessions</h6>
                          <h7>2</h7>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          {userLessons.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No Registered Lessons</Alert.Heading>
              <p>
                {'Looks like you haven\'t registered for any of our classes. If you\'d like to register for a class, you can find a list of all the classes we offer '}
                <Alert.Link href="/classes/">here</Alert.Link>.
                {' Once you register for a class, it will show up here so you can refer back to it.'}
              </p>
            </Alert>
          ) : (
            <Container>
              <Card style={{ marginBottom: 10, overflowY: 'scroll', justifyContent: 'center' }}>
                <Card.Body>
                  {userLessons}
                </Card.Body>
              </Card>
            </Container>
          )}
        </Row>
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
              <Button variant="primary" type="submit" style={{ position: 'absolute', marginTop: 20, bottom: 10, marginLeft: 10 }} alt="Submit Changes">
                Submit Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : ''}
    </Container>
  ) : <LoadingSpinner message="Loading Profile Page" />;
};

export default ProfilePage;
