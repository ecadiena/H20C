import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Container, Row, Col, Card, Nav, Tab, Table } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Surveys } from '../../api/survey/SurveyCollection';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { Sessions } from '../../api/session/SessionCollection';
import {
  ChartSetup,
  staticGenerator,
  userAccGenerator,
  genderLineGraphSetup,
  genderLineGenerator,
  educationLineGenerator,
  educationLineGraphSetup,
  ageGroupGenerator,
  BarOptions,
  surveyMultiSelectGroupGenerator,
  formatQuizzes,
} from '../utilities/Charts';

const AnalyticsDashBoard = () => {
  const { ready, genderSetup, zipcodeSetup, educationSetup, totalUsers, genderLineSetup, educationLineSetup, ethnicitySetup, ageSetup,
    familiarSetup, introducedSetup, safeSetup, reliableSetup, internetAdoptionSetup, devicesSetup, quizzesSetup } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const surveySubscription = Surveys.subscribeSurveyAdmin();
    const quizzesSubscription = SubmittedQuizzes.subscribeSubmittedQuizAdmin();
    const lessonSubscription = Lessons.subscribeLesson();
    const sessionSubscription = Sessions.subscribeSession();
    const rdy = userSubscription.ready() && surveySubscription.ready() && quizzesSubscription.ready() && lessonSubscription.ready() && sessionSubscription.ready();

    const quizzes = SubmittedQuizzes.find({}, {}).fetch();
    const lessons = Lessons.find({}, {}).fetch();
    const sessions = Sessions.find({}, {}).fetch();
    const groupQuizzes = formatQuizzes(quizzes, lessons, sessions);
    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const surveys = Surveys.find({}, {}).fetch();
    const usersGender = staticGenerator(users, 'gender', '# of users by gender');
    const usersZipcode = staticGenerator(users, 'zipcode', '# of users by zipcode');
    const usersEducation = staticGenerator(users, 'education', '# of users by education');
    const usersEthnicity = staticGenerator(users, 'ethnicity', '# of users by ethnicity');
    const a = ageGroupGenerator(users, '# of users by age');
    const totalNumUsers = userAccGenerator(users);

    const surveyFamiliar = staticGenerator(surveys, 'familiar', 'Familiar with using the internet');
    const surveyIntroduced = staticGenerator(surveys, 'introduced', 'How introduced to the internet');
    const surveySafe = staticGenerator(surveys, 'safe', 'Safety of using the internet');
    const surveyReliable = staticGenerator(surveys, 'reliable', 'Reliable access to the internet');
    const surveyInternetAdoption = surveyMultiSelectGroupGenerator(surveys, 'difficulty', 'Difficulty adopting internet usage');
    const surveyDevices = surveyMultiSelectGroupGenerator(surveys, 'devices', 'Device use to access the internet');

    const genderLine = genderLineGenerator(users);
    const educationLine = educationLineGenerator(users);
    return {
      ready: rdy,
      genderSetup: usersGender,
      zipcodeSetup: usersZipcode,
      educationSetup: usersEducation,
      ethnicitySetup: usersEthnicity,
      ageSetup: a,
      totalUsers: totalNumUsers,
      genderLineSetup: genderLine,
      educationLineSetup: educationLine,
      familiarSetup: surveyFamiliar,
      introducedSetup: surveyIntroduced,
      safeSetup: surveySafe,
      reliableSetup: surveyReliable,
      internetAdoptionSetup: surveyInternetAdoption,
      devicesSetup: surveyDevices,
      quizzesSetup: groupQuizzes,
    };
  }, []);
  const genderPieChart = ChartSetup(genderSetup);
  const zipcodeBarGraph = ChartSetup(zipcodeSetup);
  const educationPieChart = ChartSetup(educationSetup);
  const ethnicityPieChart = ChartSetup(ethnicitySetup);
  const ageBarGraph = ChartSetup(ageSetup);
  const genderLineGraph = genderLineGraphSetup(genderLineSetup);
  const educationLineGraph = educationLineGraphSetup(educationLineSetup);

  const familiarPieChart = ChartSetup(familiarSetup);
  const introducedPieChart = ChartSetup(introducedSetup);
  const safeBarGraph = ChartSetup(safeSetup);
  const reliableBarGraph = ChartSetup(reliableSetup);
  const internetAdoptionBarGraph = ChartSetup(internetAdoptionSetup);
  const devicesBarGraph = ChartSetup(devicesSetup);

  return (ready ? (
    <Container className="py-3">
      <h2>Data Report of 2022</h2>
      <Row>
        <Col sm={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>Total Number of Users</h3>
              <h2>{totalUsers[0]}</h2>
              <br />
              <h3>New Visitors</h3>
              <h4>(1 Month)</h4>
              <h2>{totalUsers[1]}</h2>
              {totalUsers[2] ? <h3 style={{ color: 'green' }}>{totalUsers[3]}%</h3> : <h3 style={{ color: 'red' }}>{totalUsers[3]}%</h3> }
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="text-center" style={{ padding: '10px' }}>
            <h3>Gender of Users</h3>
            <Pie data={genderPieChart} />
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="text-center" style={{ padding: '10px' }}>
            <h3>Education of Users</h3>
            <Pie data={educationPieChart} />
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="text-center" style={{ padding: '10px' }}>
            <h3>Ethnicity of Users</h3>
            <Pie data={ethnicityPieChart} />
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={6}>
          <Card style={{ padding: '10px' }}>
            <h3>Zipcode of Users</h3>
            <Bar data={zipcodeBarGraph} options={BarOptions} />
          </Card>
        </Col>
        <Col sm={6}>
          <Card style={{ padding: '10px' }}>
            <h3>Age of Users</h3>
            <Bar data={ageBarGraph} options={BarOptions} />
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Card style={{ padding: '30px' }}>
          <h3>Analytics By Month (2022)</h3>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2}>
                <Nav className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Gender</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Education</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h4>New Users OverTime by Gender</h4>
                    <Line data={genderLineGraph} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <h4>New Users OverTime by Education</h4>
                    <Line data={educationLineGraph} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card>
      </Row>
      <br />
      <Row>
        <Col sm={12}>
          <Card style={{ padding: '10px' }}>
            <h3>All Users&apos; Quiz Results (First Attempt)</h3>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Session Name</th>
                  <th>Lesson Name</th>
                  <th># of Quiz Attempts</th>
                  <th>Average Score (%)</th>
                </tr>
              </thead>
              <tbody>
                {quizzesSetup.map((quiz) => (
                  <tr id={quiz[1]}>
                    <td>{quiz[0]}</td>
                    <td>{quiz[1]}</td>
                    <td>{quiz[2]}</td>
                    <td>{quiz[3]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Card style={{ padding: '30px' }} className="text-center">
          <h2>User Surveys</h2>
          <Row className="row-cols-md-4 row-cols-sm-2 mt-5">
            <Col>
              <h5>How long have you been familiar with using the Internet?</h5>
              <Pie data={familiarPieChart} />
            </Col>
            <Col>
              <h5>How did you get introduced to the Internet?</h5>
              <Pie data={introducedPieChart} />
            </Col>
            <Col>
              <h5>How well do you feel safe using the Internet?</h5>
              <Bar data={safeBarGraph} options={BarOptions} />
            </Col>
            <Col>
              <h5>How reliable is your access to the Internet?</h5>
              <Bar data={reliableBarGraph} options={BarOptions} />
            </Col>
          </Row>
          <Row className="row-cols-2 mt-5">
            <Col>
              <h5>Difficulty to adopt Internet usage</h5>
              <Bar data={internetAdoptionBarGraph} options={BarOptions} />
            </Col>
            <Col>
              <h5>Devices normally used to access the Internet</h5>
              <Bar data={devicesBarGraph} options={BarOptions} />
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  ) : (
    <>
    </>
  )
  );
};

export default AnalyticsDashBoard;
