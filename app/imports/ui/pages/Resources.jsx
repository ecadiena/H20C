import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Resources = () => {
  const headingStyle = { fontSize: '48px', fontWeight: 600 };
  const subheadingStyle = { fontSize: '20px', fontWeight: 400 };
  return (
    <div id={PAGE_IDS.ABOUT}>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0">
          <h1 className="text-center pb-2 mx-0" style={headingStyle}>Resources</h1>
          <p style={subheadingStyle}>There are many more resources available for you to continue your exploration of broadband. Below are a list of websites and programs that can help you learn more about broadband and its benefits.
          </p>
          <h2>Federal Communications Commission (FCC) Affordable Connectivity Program</h2>
          <p><a href="https://www.fcc.gov/acp">https://www.fcc.gov/acp</a></p>
          <p>FCC&apos;s Affordable Connectivity Program allows households to get a discount of up to $30 per month toward internet service, and up to $100 to purchase a laptop, desktop computer, or tablet from participating providers.</p>
          <h2>State of Hawaii DBEDT – Hawaii Broadband & Digital Equity Office</h2>
          <p><a href="https://broadband.hawaii.gov/">https://broadband.hawaii.gov/</a></p>
          <p>Taking a statewide, holistic approach to the Hawaii Broadband Initiative (HBI), DBEDT recognizes that broadband touches the entire community to provide the foundation for innovation,
            economic development, healthcare, education, public safety, entertainment, etc. through the entire continuum of broadband connectivity.
          </p>
          <h2>National Broadband Resource Hub</h2>
          <p><a href="https://www.broadbandhub.org/">https://www.broadbandhub.org/</a></p>
          <p>The National Broadband Resource Hub (NBRH) is a free online community for government leaders and nonprofits working to expand broadband access and affordability to build a strong digital future. </p>
          <h2>BroadbandUSA National Telecommunications and Information Administration</h2>
          <p><a href="https://broadbandusa.ntia.doc.gov/">https://broadbandusa.ntia.doc.gov/</a></p>
          <p>The National Telecommunications and Information Administration (NTIA), located within the Department of Commerce,
            is the Executive Branch agency principally responsible by law for advising the President on telecommunications and information policy issues.
            NTIA’s programs and policymaking focus largely on expanding broadband Internet access and adoption in America,
            expanding the use of spectrum by all users, and ensuring that the Internet remains an engine for continued innovation and economic growth
          </p>
          <h2>Cable Television (CATV) Division of the Department of Commerce and Consumer Affairs (DCCA) Broadband Webpage</h2>
          <p><a href="https://cca.hawaii.gov/broadband/">https://cca.hawaii.gov/broadband/</a></p>
          <p>The Cable Television Division works to promote and facilitate access to affordable, broadband-level telecommunications service across the State so that all residents
            may benefit from the many online applications, programs, and resources available, including telework, e-learning programs, and online job, health, and government services.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Resources;
