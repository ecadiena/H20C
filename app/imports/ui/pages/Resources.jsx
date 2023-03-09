import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import Plumbing from '../components/resourcesLinks/Plumbing';

const headingStyle = { fontSize: '48px', fontWeight: 600 };
const subheadingStyle = { fontSize: '20px', fontWeight: 400, textAlign: 'center' };

/* A simple static component to render some text for the landing page. */
const Resources = () => (
  <Container id={PAGE_IDS.ABOUT}>
    <h1 className="text-center pb-2 mx-0" style={headingStyle}>Resources</h1>
    <p style={subheadingStyle}>
      Below is a list of websites and programs that can help you learn more about condo maintenance and its benefits.
    </p>
    <Tabs
      defaultActiveKey="plumbing"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="plumbing" title="Plumbing">
        <Plumbing />
      </Tab>
      <Tab eventKey="hvac" title="HVAC">
        <Plumbing />
      </Tab>
      <Tab eventKey="fire-prevention" title="Fire Prevention">
        <Plumbing />
      </Tab>
      <Tab eventKey="state-mandates" title="State Mandates">
        <Plumbing />
      </Tab>
      <Tab eventKey="safety-regulations" title="Safety Regulations">
        <Plumbing />
      </Tab>
      <Tab eventKey="insurance" title="Insurance">
        <Plumbing />
      </Tab>
    </Tabs>
  </Container>
);

export default Resources;
