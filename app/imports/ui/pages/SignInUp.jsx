import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import SignIn from './SignIn';
import SignUp from './SignUp';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignInUp = () => (
  <Container id={PAGE_IDS.SIGN_IN_UP} style={{ position: 'relative', height: '70vh' }}>
    <Card className="center">
      <Row>
        <Col xs={4}>
          <SignIn />
        </Col>
        <Col xs={8}>
          <SignUp />
        </Col>
      </Row>
    </Card>
  </Container>
);

export default SignInUp;
