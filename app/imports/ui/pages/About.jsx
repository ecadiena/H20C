import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const About = () => {
  const headingStyle = { fontSize: '56px', fontWeight: 700 };
  // const subheadingStyle = { fontSize: '28px', fontWeight: 400 };
  const smallTextStyle = { fontSize: '18px' };
  return (
    <div id={PAGE_IDS.ABOUT}>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0">
          <h1 className="text-center pb-2 mx-0" style={headingStyle}>What is broadband?</h1>
          <p style={smallTextStyle}>
            “Broadband” is short-hand for an “always-on,” high-speed internet connection provided by a company or other entity known as an “internet service provider” (ISP)
            A high-speed home internet connection is no longer a luxury; it is a necessity.
            This is particularly the case as more and more services — from government forms and documents, to homework, and commerce — gravitate to online only.
            Work, education, economy, healthcare, and government all benefit from access to broadband, which has been a key player in transforming these sectors into their most modern form.
            Remote work and education, telehealth, national security, and globalization among many others, are all able to excel today because of the advancements that have stemmed from broadband adoption to date.
            For Hawaiʻi citizens living in rural communities and who might be separated from major cities broadband can mean leveling the economic and academic playing fields.
            It allows people to telecommute/telework, allows for telemedicine, and for all students to have reliable access to the internet in their schools and at home.
          </p>
        </Col>
        <Col md={9} fluid className="justify-content-center">
          <Image className="p-5" fluid src="images/broadband-101.png" alt="What is Broadband?" />
        </Col>
      </Row>
      <Row fluid className="justify-content-center mx-0">
        <Col fluid md={7} className="p-3 pb-0 mx-0">
          <h1 className="text-center pb-2 mx-0" style={headingStyle}>Hawaii&apos;s broadband goals</h1>
          <p style={smallTextStyle}>
            Hawai‘i faces a set of unique connectivity challenges unlike any other state in the US because of its unique geographical location as a state over 2000 miles away from any other major land mass.
            Within the continental US other states have access to miles of interconnected terrestrial fiber paths, Hawaiʻi relies on the use of submarine fiber to provide connectivity from the rest of the world to the Islands,
            with terrestrial and interisland submarine fiber reinforcing the local delivery of broadband.
            Broadband connectivity is provisioned as a set of interconnected segments – First Mile, Middle Mile and Last Mile.
            The First mile segment connects Hawaiʻi to the global internet via submarine optical fiber cables that terminate in cable landing stations at various points throughout the islands.
            The Middle Mile segment provides connectivity between islands with both submarine and terrestrial optical fiber and connects these networks to major internet exchanges and service providers on all islands.
            It includes all broadband infrastructure (e.g. backhaul, cable landing stations, undersea cables, etc.) that do not connect directly to an end user.
            The Last Mile segment provides connectivity to homes, libraries, schools and businesses and is the final stretch for broadband from an Internet Service Provider (ISP) to an end user.
            <br /><br />
            For Hawaiʻi, this first mile and middle mile segment does not resemble any other model in the continental United States.
            Connectivity deficiencies are not unique to any one of the major islands, and are at an increased risk with the existing, aged interisland fiber systems nearing the end of their service life (around 25 years) within the next decade.
            As a result, Hawaiʻi’s strategy largely focuses on the importance of developing the state’s existing middle mile infrastructure and future middle mile infrastructure with today’s available funding in order to create a robust,
            future-proof broadband landscape that can support ongoing and future last-mile buildouts.
            This includes the addition of new carrier-neutral cable landing stations–the first in Hawaiʻi–to enhance the competitive landscape and attract new transpacific submarine fiber build outs to the State,
            along with a new interisland fiber ring sufficient enough to support Hawaiʻi through 2050.
          </p>
        </Col>
        <Col md={9} fluid className="justify-content-center">
          <Image className="p-5" fluid src="images/hawaii-internet.png" alt="How the Internet Reaches Hawaii" />
        </Col>
      </Row>
      <p style={smallTextStyle} className="text-center pb-2 mx-0"><i>*information gathered from <a href="https://www.hawaii.edu/broadband/">Broadband</a>*</i></p>
    </div>
  );
};

export default About;
