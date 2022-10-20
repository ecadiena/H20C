import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const ProfilePage = () => (
  <Container id={PAGE_IDS.PROFILE_PAGE} style={{ position: 'relative', height: '70vh', width: '50wh' }}>
    <Card className="center">
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        <Row style={{ textAlign: 'center', marginBottom: 20 }}>
          <h2>John Foo</h2>
          <h5>john@foo.com</h5>
        </Row>
        <Row className="column-vertical-center">
          <Col style={{ textAlign: 'center' }}>
            <h4>Completed Classes</h4>
            <h5>25</h5>
          </Col>
          <Col>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <h6>Age</h6>
                <h7>20</h7>
              </Col>
              <Col>
                <h6>Zipcode</h6>
                <h7>96717</h7>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <h6>Ethnicity</h6>
              <h7>Asian, Pacific Islander</h7>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <h6>Education Level</h6>
              <h7>College</h7>
            </Row>
          </Col>
        </Row>
      </div>
    </Card>
  </Container>
);

export default ProfilePage;
