import React from 'react';
import { Col, Image, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const buttonStyle = { background: '#1762A7', borderColor: '#1762A7', fontSize: '14px', fontWeight: 600 };
  const headingStyle = { fontSize: '72px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  const headingStyle2 = { fontSize: '64px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  const subheadingStyle = { fontSize: '32px', fontFamily: 'Georgia, serif', fontWeight: 400 };
  const largeTextStyle = { fontSize: '24px', fontWeight: 500, lineHeight: 1.2 };
  const smallTextStyle = { fontSize: '18px' };
  return (
    <div id={PAGE_IDS.LANDING}>
      <Row fluid className="justify-content-center mx-0 p-5">
        <Col md={3}>
          <Image roundedCircle fluid src="/images/hawaii-seal.png" />
        </Col>
        <Col md={6} className="align-self-center">
          <h1 style={headingStyle}>Broadband for Hawaiʻi</h1>
          <h2 className="pb-3" style={subheadingStyle}>Connecting everyone, everywhere, <text style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '5px' }}>all the time</text>.</h2>
          <Button className="px-5 py-3" style={buttonStyle}>Get started</Button>
        </Col>
      </Row>
      <Row fluid className="align-middle text-center bg-light px-5 pb-5 mx-0">
        <Row><h1 className="justify-content-center pt-5 pb-3" style={headingStyle2}>Our purpose</h1></Row>
        <Row className="justify-content-center">
          <Col md={{ span: 3 }}>
            <Image src="images/collaboration.png" />
            <h2 style={subheadingStyle} className="py-2">Engage</h2>
            <p style={smallTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
          <Col md={{ span: 3 }}>
            <Image src="images/study.png" />
            <h2 style={subheadingStyle} className="py-2">Educate</h2>
            <p style={smallTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
          <Col md={{ span: 3 }}>
            <Image src="images/account.png" />
            <h2 style={subheadingStyle} className="py-2">Empower</h2>
            <p style={smallTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
        </Row>
      </Row>
      <Row fluid className="justify-content-center px-5 mx-0">
        <Col md={5} className="p-5 align-self-center">
          <Row><h1 style={headingStyle2}>What is broadband?</h1></Row>
          <Row>
            <p style={largeTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Row>
          <Button className="px-5 py-3" style={buttonStyle} as={NavLink} to="/about">Learn more</Button>
        </Col>
        <Col md={5} className="align-self-center p-5"><Image fluid src="images/broadband-icon.png" /></Col>
      </Row>
      <Row fluid className="justify-content-center bg-light mx-0 px-5">
        <Col md={5} className="p-5 align-self-center">
          <Image fluid src="/images/resource-icon.png" />
        </Col>
        <Col md={5} className="p-5 align-self-center">
          <Row><h1 style={headingStyle2}>Resources available</h1></Row>
          <Row><p style={largeTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p></Row>
          <Button className="px-5 py-3" style={buttonStyle}>Learn more</Button>
        </Col>
      </Row>
      <Row fluid className="justify-content-center align-middle text-center py-5 mx-0">
        <Row><h1 className="justify-content-center py-3" style={headingStyle2}>Explore classes</h1></Row>
        <Col md={4} className="px-5 align-self-center">
          <Row><p style={largeTextStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p></Row>
          <Button className="px-5 py-3" style={buttonStyle}>View classes</Button>
        </Col>
        <Col md={4} className="align-self-center px-5"><Image fluid src="images/class-icon.png" /></Col>
      </Row>
    </div>
  );
};

export default Landing;
