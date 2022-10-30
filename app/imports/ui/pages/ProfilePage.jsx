import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link, NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import Account from '../components/2FA';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserLessons } from '../../api/user/UserLessonCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { Sessions } from '../../api/session/SessionCollection';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';

/* A simple static component to render some text for the landing page. */
const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const { ready, user, data, lessons, sessions, submittedQuizzes } = useTracker(() => {
    const userProfileSubscription = UserProfiles.subscribe();
    const adminProfileSubscription = AdminProfiles.subscribe();
    const userLessonSubscription = UserLessons.subscribeUserLesson();
    const lessonSubscription = Lessons.subscribeLesson();
    const sessionsSubscription = Sessions.subscribeSession();
    const submittedQuizSubscription = SubmittedQuizzes.subscribeSubmittedQuiz();
    const rdy = userProfileSubscription.ready() && userLessonSubscription.ready() && adminProfileSubscription.ready() && lessonSubscription.ready() && sessionsSubscription.ready() && submittedQuizSubscription.ready();

    const currentUser = Meteor.user() ? Meteor.user().username : '';
    let usr = UserProfiles.findOne({ email: currentUser }, {});
    if (usr === undefined) {
      usr = AdminProfiles.findOne();
    }

    const usrLessons = UserLessons.find({ registeredUser: currentUser }, {}).fetch();
    const sessionss = Sessions.find({ type: 'Course' }, {}).fetch();
    const submittedQuiz = SubmittedQuizzes.find({}, {}).fetch();
    const lessonData = Lessons.find({ }, {}).fetch();

    return {
      user: usr,
      ready: rdy,
      data: usrLessons,
      lessons: lessonData,
      sessions: sessionss,
      submittedQuizzes: submittedQuiz,
    };
  }, []);

  const cardStyle = { height: '55vh', marginBottom: 10 };
  const divStyle = { marginTop: 40, marginBottom: 40 };
  const lessonStyle = { padding: 0, margin: 10 };
  const headerStyle = { fontWeight: 'bold' };

  const genderList = ['Male', 'Female', 'Other'];
  const eduList = ['Grade K - 6', 'Grade 7 - 8', 'High School', 'Some College', 'College'];
  const ethList = ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'White', 'Other'];

  const findLesson = (lessonID) => lessons.find((lesson) => lesson._id === lessonID);
  const maxChars = 300;

  const completed = { courses: 0, lessons: 0, quizPercentage: 0 };
  const userFirstSubmittedQuizzes = _.where(submittedQuizzes, { firstAttempt: true });
  const groupSubmittedQuizzes = _.groupBy(submittedQuizzes, quiz => quiz.lessonID);
  const bestSubmittedQuizzes = [];
  _.each(groupSubmittedQuizzes, lessonGroup => {
    const bestQuiz = _.max(lessonGroup, quiz => quiz.numCorrect);
    bestSubmittedQuizzes.push(bestQuiz);
  });
  sessions.forEach(session => {
    const thisLessons = _.where(lessons, { sessionID: session._id });
    let thisLessonsCompleted = 0;
    thisLessons.forEach(lesson => {
      const completedLesson = _.where(userFirstSubmittedQuizzes, { lessonID: lesson._id });
      if (completedLesson.length > 0) {
        thisLessonsCompleted++;
      }
    });
    if (thisLessons.length === thisLessonsCompleted) {
      completed.courses++;
    }
    completed.lessons += thisLessonsCompleted;
  });
  bestSubmittedQuizzes.forEach(quiz => {
    completed.quizPercentage += (quiz.numCorrect / quiz.answers.length) * 100;
  });
  completed.quizPercentage /= bestSubmittedQuizzes.length;

  const userLessons = data.map((d) => (
    <Card style={lessonStyle}>
      <Card.Body style={{ marginBottom: 10 }}>
        <Card.Title>
          {findLesson(d.lessonID).title?.length > 65 ?
            `${findLesson(d.lessonID).title?.substring(0, 65)} ... ` :
            findLesson(d.lessonID).title?.substring(0, 65)}
        </Card.Title>
        <Card.Text>
          {findLesson(d.lessonID).summary?.length > maxChars ?
            `${findLesson(d.lessonID).summary?.substring(0, maxChars)} .... ` :
            findLesson(d.lessonID).summary?.substring(0, maxChars)}
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

  const submit = () => {
    const newFirstName = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_FIRST_NAME).value;
    const newLastName = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_LAST_NAME).value;
    const newAge = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_AGE).value;
    const newZipcode = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_ZIPCODE).value;
    const newEthnicity = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_ETHNICITY).value;
    const newEducation = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_EDUCATION).value;
    const newGender = document.getElementById(COMPONENT_IDS.EDIT_PROFILE_GENDER).value;

    const updateData = { id: user._id, email: user.email, firstName: newFirstName, lastName: newLastName,
      age: newAge, zipcode: newZipcode, ethnicity: newEthnicity, education: newEducation,
      gender: newGender, totalPoints: user.totalPoints };
    let collectionName;

    if (Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) {
      collectionName = UserProfiles.getCollectionName();
    } else {
      collectionName = AdminProfiles.getCollectionName();
    }

    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Profile updated successfully', 'success'));
  };

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
                          <h7>{completed.lessons > 0 ? `${completed.quizPercentage}%` : ''}</h7>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CLASS}>
                          <h6 style={headerStyle}>Completed Courses</h6>
                          <h7>{completed.courses}</h7>
                        </Col>
                        <Col id={COMPONENT_IDS.PROFILE_DASH_COMP_CURR}>
                          <h6 style={headerStyle}>Completed Lessons</h6>
                          <h7>{completed.lessons}</h7>
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
            <h4 style={{ textAlign: 'center' }}>Edit Profile Settings</h4>
            <Form>
              <Row style={{ paddingBottom: 20 }}>
                <Col>
                  <Row style={{ marginBottom: 5 }}>
                    <Col style={{ marginLeft: 10 }}>
                      <Form.Group>
                        First Name *
                        <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_FIRST_NAME} placeholder="Enter your new first name" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        Last Name *
                        <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_LAST_NAME} placeholder="Enter your new last name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div style={{ marginLeft: 10 }}>
                    <Form.Group>
                      Age *
                      <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_AGE} type="number" min="0" placeholder="Enter your new age" style={{ marginBottom: 5 }} />
                    </Form.Group>
                    <Form.Group>
                      Zipcode *
                      <Form.Control id={COMPONENT_IDS.EDIT_PROFILE_ZIPCODE} type="number" min="0" placeholder="Enter your new zipcode" style={{ marginBottom: 5 }} />
                    </Form.Group>
                  </div>
                </Col>
                <Col style={{ marginRight: 10 }}>
                  <Form.Group>
                    Gender *
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_GENDER} placeholder="Enter your gender" options={genderList} style={{ marginBottom: 5 }}>
                      <option disabled>Select</option>
                      {genderList.map((name) => (
                        <option value={name}>{name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    Ethnicity *
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_ETHNICITY} options={ethList}>
                      <option disabled>Select</option>
                      {ethList.map((eth) => (
                        <option value={eth}>{eth}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{ marginTop: 5, marginBottom: 30 }}>
                    Education Level *
                    <Form.Select id={COMPONENT_IDS.EDIT_PROFILE_EDUCATION} options={eduList}>
                      <option disabled>Select</option>
                      {eduList.map((edu) => (
                        <option value={edu}>{edu}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" style={{ position: 'absolute', marginTop: 20, bottom: 10, marginLeft: 10 }} alt="Submit Changes" onClick={submit}>
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
