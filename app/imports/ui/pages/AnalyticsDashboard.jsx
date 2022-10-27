import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { ChartSetup, staticGenerator, userAccGenerator, genderLineGraphSetup, genderLineGenerator, educationLineGenerator, educationLineGraphSetup, ageGroupGenerator, BarOptions } from '../utilities/Charts';
import { GoogleMaps } from '../components/maps/GoogleMaps';

const AnalyticsDashBoard = () => {
  const { ready, genderSetup, zipcodeSetup, educationSetup, totalUsers, genderLineSetup, educationLineSetup, ethnicitySetup, ageSetup } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const rdy = userSubscription.ready();

    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const usersGender = staticGenerator(users, 'gender', '# of users by gender');
    const usersZipcode = staticGenerator(users, 'zipcode', '# of users by zipcode');
    const usersEducation = staticGenerator(users, 'education', '# of users by education');
    const usersEthnicity = staticGenerator(users, 'ethnicity', '# of users by ethnicity');
    const a = ageGroupGenerator(users, '# of users by age');
    const totalNumUsers = userAccGenerator(users);

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
    };
  }, []);
  const genderPieChart = ChartSetup(genderSetup);
  const zipcodeBarGraph = ChartSetup(zipcodeSetup);
  const educationPieChart = ChartSetup(educationSetup);
  const ethnicityPieChart = ChartSetup(ethnicitySetup);
  const ageBarGraph = ChartSetup(ageSetup);
  const genderLineGraph = genderLineGraphSetup(genderLineSetup);
  const educationLineGraph = educationLineGraphSetup(educationLineSetup);

  return (ready ? (
    <Container className="py-3">
      <GoogleMaps />
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
    </Container>
  ) : (
    <>
    </>
  )
  );
};

export default AnalyticsDashBoard;
