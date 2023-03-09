import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const footerStyle = { background: '#1962c6', color: '#FFFFFF', listStyle: 'none' };
  const linkStyle = { color: 'white' };
  return (
    <footer className="mt-auto" style={footerStyle}>
      <Container className="pt-4 pb-2">
        <Row>
          <Col>
            <Row><h1>H2OC</h1></Row>
            <Row><h5>Helping to protect Oahu Condominiums</h5></Row>
            <Row><p>Collaboration with <a href="https://www.ficoh.com/" style={linkStyle}>First Insurance Company of Hawai`i</a></p></Row>
          </Col>
          <Col>
            <ul style={{ listStyle: 'none', lineHeight: '30px' }}>
              <li><a href="/" style={linkStyle}>Home</a></li>
              <li><a href="/classes" style={linkStyle}>Classes</a></li>
              <li><a href="/about" style={linkStyle}>About</a></li>
              <li><a href="/resources" style={linkStyle}>Resources</a></li>
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyle: 'none', lineHeight: '30px' }}>
              <li><b>Contact Us</b></li>
              <li>Questions or want to get involved? Email us at <a style={linkStyle} href="/">sample@email.com</a></li>
              <li>
                <p>
                  © 2022 Copyright: <a href="https://github.com/HACC2022/Chipmunks" style={linkStyle}>Broadband for Hawaiʻi</a>
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
