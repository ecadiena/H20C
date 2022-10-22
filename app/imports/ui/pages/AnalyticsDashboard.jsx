import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie } from 'react-chartjs-2';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { PieChartSetup, staticGenerator, userAccGenerator } from '../utilities/Charts';

const AnalyticsDashBoard = () => {
  const { ready, genderSetup, zipcodeSetup, educationSetup, totalUsers } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const rdy = userSubscription.ready();

    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const usersGender = staticGenerator(users, 'gender', '# of users by gender');
    const usersZipcode = staticGenerator(users, 'zipcode', '# of users by zipcode');
    const usersEducation = staticGenerator(users, 'education', '# of users by education');
    const totalNumUsers = userAccGenerator(users);
    return {
      ready: rdy,
      genderSetup: usersGender,
      zipcodeSetup: usersZipcode,
      educationSetup: usersEducation,
      totalUsers: totalNumUsers,
    };
  }, []);

  const genderPieChart = PieChartSetup(genderSetup[0], genderSetup[1], genderSetup[2]);
  const zipcodePieChart = PieChartSetup(zipcodeSetup[0], zipcodeSetup[1], zipcodeSetup[2]);
  const educationPieChart = PieChartSetup(educationSetup[0], educationSetup[1], educationSetup[2]);

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
        <Card className="text-center">
          <Col sm={4}>
            <h3>ZipCode of Users</h3>
            <Pie data={zipcodePieChart} />
          </Col>
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
