import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const About = () => {
  const headingStyle = { fontSize: '56px', fontWeight: 700 };
  const subHeadingStyle = { fontSize: '25px', fontWeight: 400 };
  // const subheadingStyle = { fontSize: '28px', fontWeight: 400 };
  const smallTextStyle = { fontSize: '18px' };
  return (
    <div id={PAGE_IDS.ABOUT}>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0">
          <h2 className="text-center pb-2 mx-0" style={headingStyle}>Who is H2OC?</h2>
          <h4 className="text-center pb-2 mx-0" style={subHeadingStyle}><i>Helping to protect Oahu Condominiums</i></h4>
          <p style={smallTextStyle}>
            H2OC is a consulting firm that educates resident managers, association board members, and
            condo owners about water damage. Our team of experts offers educational seminars, training programs,
            and consulting services to help you prevent and manage water damage. We take a personalized approach to
            meet your unique needs and provide ongoing support and guidance. Our commitment to high-quality education
            and services is evident in everything we do. Let us help you protect your property from water damage.
          </p>
        </Col>
      </Row>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0 mx-0">
          <h2 className="text-center pb-2 mx-0" style={headingStyle}>What does H2OC do?</h2>
          <p style={smallTextStyle}>
            H2OC researched the most common issue that persists among condominiums built before the 1970s in Hawai`i.
            What we found is that there is a cycle of deferred maintenance that plaques a majoring of these condo associations.
            To help mediate this compounding issue, we gathered information from a wide array of professionals involved in condo
            insurance, property management, the board of condo owners, and many more. This program aims to educate those involved
            in condo associations to make condos more sustainable and affordable.
            <br /><br />
            At H2OC we believe that education is the key to preventing water damage and protecting your property.
            By understanding the risks of water damage and the preventive measures that can be taken, owners can significantly
            reduce the likelihood of damages, save more money and experience a potential reduction in insurance premiums.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default About;
