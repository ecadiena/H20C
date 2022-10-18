import React from 'react';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => (
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
);

export default SignIn;
