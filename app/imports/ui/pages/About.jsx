import React from 'react';
import { Col, Image, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const About = () => {
  const buttonStyle = { background: '#1762A7', borderColor: '#1762A7', fontSize: '20px', fontWeight: 600 };
  const headingStyle = { fontSize: '56px', fontWeight: 700 };
  const subheadingStyle = { fontSize: '28px', fontWeight: 400 };
  const largeTextStyle = { fontSize: '30px', fontWeight: 500, lineHeight: 1.2 };
  const smallTextStyle = { fontSize: '20px' };
  return (
    <div id={PAGE_IDS.ABOUT}>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0">
          <h1 className="text-center pb-2 mx-0" style={headingStyle}>What is broadband?</h1>
          <p style={subheadingStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Col>
        <Col md={9} fluid className="justify-content-center">
          <Image className="p-5" fluid src="images/broadband-101.png" />
        </Col>
      </Row>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0 mx-0">
          <h1 className="text-center pb-2 mx-0" style={headingStyle}>Hawaii's broadband goals</h1>
          <p style={subheadingStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Col>
        <Col md={9} fluid className="justify-content-center">
          <Image className="p-5" fluid src="images/hawaii-internet.png" />
        </Col>
      </Row>
    </div>
  );
};

export default About;
