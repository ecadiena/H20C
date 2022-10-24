import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const footerStyle = { background: '#1762A7', color: '#FFFFFF', listStyle: 'none' };
  const linkStyle = { color: 'white' };
  return (
    <footer className="mt-auto" style={footerStyle}>
      <Container className="pt-4 pb-2">
        <Row>
          <Col>
            <h1>Broadband for Hawaiʻi</h1>
          </Col>
          <Col>
            <ul style={{ listStyle: 'none', lineHeight: '30px' }}>
              <li><a href="/" style={linkStyle}>Home</a></li>
              <li><a href="/" style={linkStyle}>Classes</a></li>
              <li><a href="/about" style={linkStyle}>About</a></li>
              <li><a href="/" style={linkStyle}>Resources</a></li>
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyle: 'none' }}>
              <li><b>Contact Us</b></li>
              <li>Questions or want to get involved? Email us at <a style={linkStyle} href="/">sample@email.com</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center">
          © 2022 Copyright: Broadband for Hawaiʻi
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
