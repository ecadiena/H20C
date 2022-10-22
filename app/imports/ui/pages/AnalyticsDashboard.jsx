import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { PieChartSetup, staticGenerator } from '../utilities/Charts';

const AnalyticsDashBoard = () => {
  const { ready, genderSetup, zipcodeSetup, educationSetup } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const rdy = userSubscription.ready();

    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const usersGender = staticGenerator(users, 'gender', '# of users by gender');
    const usersZipcode = staticGenerator(users, 'zipcode', '# of users by zipcode');
    const usersEducation = staticGenerator(users, 'education', '# of users by education');
    return {
      ready: rdy,
      genderSetup: usersGender,
      zipcodeSetup: usersZipcode,
      educationSetup: usersEducation,
    };
  }, []);

  const genderPieChart = PieChartSetup(genderSetup[0], genderSetup[1], genderSetup[2]);
  const zipcodePieChart = PieChartSetup(zipcodeSetup[0], zipcodeSetup[1], zipcodeSetup[2]);
  const educationPieChart = PieChartSetup(educationSetup[0], educationSetup[1], educationSetup[2]);

  return (ready ? (
    <Container className="py-3">
      <Row>
        <Col sm={4}>
          <h3>Gender of Users</h3>
          <Pie data={genderPieChart} />
        </Col>
        <Col sm={4}>
          <h3>ZipCode of Users</h3>
          <Pie data={zipcodePieChart} />
        </Col>
        <Col sm={4}>
          <h3>Education of Users</h3>
          <Pie data={educationPieChart} />
        </Col>
      </Row>
    </Container>
  ) : (
    <>
    </>
  )
  );
};

export default AnalyticsDashBoard;
