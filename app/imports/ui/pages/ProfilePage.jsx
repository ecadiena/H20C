import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import Account from '../components/2FA';

/* A simple static component to render some text for the landing page. */
const ProfilePage = () => (
  <Container id={PAGE_IDS.PROFILE_PAGE} style={{ position: 'relative', height: '60vh' }}>
    <Row style={{ margin: 'auto' }} className="center">
      <Col style={{ maxWidth: '60wh' }}>
        <Card style={{ height: '60vh' }}>
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <Row style={{ textAlign: 'center', marginBottom: 20 }}>
              <h2>John Foo</h2>
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
              <Row>
                <h7>john@foo.com</h7>
              </Row>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <Row style={{ marginBottom: 10, marginTop: 20 }}>
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
                    <Col>
                      <h6>Ethnicity</h6>
                      <h7>Asian, Pacific Islander</h7>
                    </Col>
                    <Col>
                      <h6>Education Level</h6>
                      <h7>College</h7>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </div>
        </Card>
      </Col>
      <Col style={{ maxWidth: '30wh', display: 'flex' }}>
        <Card style={{ height: '60vh' }}>
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <Row style={{ textAlign: 'center', marginBottom: 20 }}>
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
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <Row style={{ marginBottom: 10, marginTop: 20 }}>
                    <Col>
                      <h6>Total Points</h6>
                      <h7>1500</h7>
                    </Col>
                    <Col>
                      <h6>Average Quiz Percentage</h6>
                      <h7>89%</h7>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col>
                      <h6>Completed Classes</h6>
                      <h7>34</h7>
                    </Col>
                    <Col>
                      <h6>Completed Curriculums</h6>
                      <h7>2</h7>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </div>
        </Card>
      </Col>
      <Col xs={2}>
        <Account />
      </Col>
    </Row>
  </Container>
);

export default ProfilePage;
