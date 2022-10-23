import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie, Line } from 'react-chartjs-2';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { PieChartSetup, staticGenerator, userAccGenerator, genderLineGraphSetup, lineGenerator } from '../utilities/Charts';

const AnalyticsDashBoard = () => {
  const { ready, genderSetup, zipcodeSetup, educationSetup, totalUsers, genderLineSetup } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const rdy = userSubscription.ready();

    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const usersGender = staticGenerator(users, 'gender', '# of users by gender');
    const usersZipcode = staticGenerator(users, 'zipcode', '# of users by zipcode');
    const usersEducation = staticGenerator(users, 'education', '# of users by education');
    const totalNumUsers = userAccGenerator(users);

    const genderLine = lineGenerator(users);
    return {
      ready: rdy,
      genderSetup: usersGender,
      zipcodeSetup: usersZipcode,
      educationSetup: usersEducation,
      totalUsers: totalNumUsers,
      genderLineSetup: genderLine,
    };
  }, []);

  const genderPieChart = PieChartSetup(genderSetup);
  const zipcodePieChart = PieChartSetup(zipcodeSetup);
  const educationPieChart = PieChartSetup(educationSetup);
  const genderLineGraph = genderLineGraphSetup(genderLineSetup);
  console.log(genderLineGraph);
  // const genderLineGraph = genderLineSetup()

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
          <Card className="text-center">
            <h3>Gender of Users</h3>
            <Pie data={genderPieChart} />
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="text-center">
            <h3>Education of Users</h3>
            <Pie data={educationPieChart} />
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="text-center">
            <h3>ZipCode of Users</h3>
            <Pie data={zipcodePieChart} />
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
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
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
                    <Line data={genderLineGraph} />
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
