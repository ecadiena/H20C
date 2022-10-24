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
<<<<<<< HEAD
            <h1>Broadband for Hawai'i</h1>
=======
            <h1>Broadband for Hawaiʻi</h1>
>>>>>>> main
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
                </a>
                <a href="https://www.facebook.com/universityofhawaii" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Facebook />
                </a>
                <a href="https://www.instagram.com/uhawaiinews/" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Instagram />
                </a>
                <a href="https://www.flickr.com/photos/uhawaii">
                  <img src="https://www.hawaii.edu/broadband/wp-content/themes/system2021/images/icon-flickr.png" alt="flickr-icon" style={{ height: '18px', marginRight: 10 }} />
                </a>
                <a href="https://www.youtube.com/user/uhmagazine" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
                  <Youtube />
                </a>
              </li>
              <li><b>Contact Us</b></li>
              <li>Questions or want to get involved? Email us at <a style={linkStyle} href="/">sample@email.com</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center">
<<<<<<< HEAD
          © 2022 Copyright: Broadband for Hawai'i
=======
          © 2022 Copyright: Broadband for Hawaiʻi
>>>>>>> main
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
