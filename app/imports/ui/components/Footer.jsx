import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Twitter, Facebook, Instagram, Youtube } from 'react-bootstrap-icons';

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
              <li><a href="/classes" style={linkStyle}>Classes</a></li>
              <li><a href="/about" style={linkStyle}>About</a></li>
              <li><a href="/resources" style={linkStyle}>Resources</a></li>
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyle: 'none', lineHeight: '30px' }}>
              <li>
                <a href="https://twitter.com/UHawaiiNews" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Twitter />
                  <span className="screen-reader-text">Twitter</span>
                </a>
                <a href="https://www.facebook.com/universityofhawaii" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Facebook />
                  <span className="screen-reader-text">Facebook</span>
                </a>
                <a href="https://www.instagram.com/uhawaiinews/" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Instagram />
                  <span className="screen-reader-text">Instagram</span>
                </a>
                <a href="https://www.flickr.com/photos/uhawaii">
                  <img src="https://www.hawaii.edu/broadband/wp-content/themes/system2021/images/icon-flickr.png" alt="flickr-icon" style={{ height: '18px', marginRight: 10 }} />
                  <span className="screen-reader-text">Flickr</span>
                </a>
                <a href="https://www.youtube.com/user/uhmagazine" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Youtube />
                  <span className="screen-reader-text">Youtube</span>
                </a>
              </li>
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
