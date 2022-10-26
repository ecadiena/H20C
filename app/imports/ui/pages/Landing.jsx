import React, { useState } from 'react';
import { Col, Image, Row, Button } from 'react-bootstrap';
import Joyride, { STATUS } from 'react-joyride';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const buttonStyle = { background: '#1762A7', borderColor: '#1762A7', fontSize: '14px', fontWeight: 600 };
  const headingStyle = { fontSize: '72px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  const headingStyle2 = { fontSize: '64px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  const subheadingStyle = { fontSize: '32px', fontFamily: 'Georgia, serif', fontWeight: 400 };
  const largeTextStyle = { fontSize: '24px', fontWeight: 500, lineHeight: 1.2 };
  const smallTextStyle = { fontSize: '18px' };

  const [tour, setTour] = useState({
    steps: [
      {
        target: '.our-mission',
        content: 'blah blah blah',
        disableBeacon: true,
        placement: 'auto'
      },
      {
        target: '.what-is-broadband',
        content: 'what is braodnabd',
        placement: 'auto'
      },
      {
        target: '.resources-available',
        content: 'reousrces',
        placement: 'auto'
      },
      {
        target: '.explore-classes',
        content: 'classes',
        placement: 'auto'
      },
    ],
    run: false,
  });

  // supposed to reset run so that it runs tour again but it is never called for some reason
  const handleTourCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTour({ run: false });
    }

    console.log(data);
  };

  return (
    <div id={PAGE_IDS.LANDING}>
      <Row className="justify-content-center mx-0 p-5">
        <Joyride
            steps={tour.steps}
            run={tour.run}
            continuous
            hideCloseButton
            showProgress
            showSkipButton
            scrollToFirstStep
            callback={handleTourCallback}
        />
        <Col md={3}>
          <Image fluid roundedCircle src="/images/hawaii-seal.png" alt="State of Hawaii Seal" />
        </Col>
        <Col md={6} className="align-self-center">
          <h1 style={headingStyle}>Broadband for Hawaiʻi</h1>
          <h2 className="pb-3" style={subheadingStyle}>Connecting everyone, everywhere, <p style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '5px' }}>all the time.</p></h2>
          <Button className="px-5 py-3" style={buttonStyle} onClick={() => { setTour({ ...tour, run: !tour.run }); }}>Get started</Button>
        </Col>
      </Row>
      <Row className="align-middle text-center bg-light px-5 pb-5 mx-0 our-mission">
        <h1 className="justify-content-center pt-5 pb-3" style={headingStyle2}>Our mission</h1>
        <Row className="justify-content-center">
          <Col md={{ span: 3 }}>
            <Image src="images/collaboration.png" alt="Engage Icon" />
            <h2 style={subheadingStyle} className="py-2">Engage</h2>
            <p style={smallTextStyle}>Explore the tools provided by Broadband for Hawaiʻi, ask questions, and visit the Help section for FAQs.</p>
          </Col>
          <Col md={{ span: 3 }}>
            <Image src="images/study.png" alt="Educate Icon" />
            <h2 style={subheadingStyle} className="py-2">Educate</h2>
            <p style={smallTextStyle}>Utilize the Resources and Classes Pages that allows you to learn more about the benefits and uses of the Internet.</p>
          </Col>
          <Col md={{ span: 3 }}>
            <Image src="images/account.png" alt="Empower Icon" />
            <h2 style={subheadingStyle} className="py-2">Empower</h2>
            <p style={smallTextStyle}>Share your experience to others and spread the knowledge you have gathered to grow as a community.</p>
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-center px-5 mx-0 what-is-broadband">
        <Col md={5} className="p-5 align-self-center">
          <Row><h1 style={headingStyle2}>What is broadband?</h1></Row>
          <Row>
            <p style={largeTextStyle}>
              Learn more about Broadband for Hawaiʻi and its goal.
            </p>
          </Row>
          <a href="/about"><Button className="px-5 py-3" style={buttonStyle} alt="Learn More">Learn more</Button></a>
        </Col>
        <Col md={5} className="align-self-center p-5"><Image fluid src="images/broadband-icon.png" alt="Broadband Icon" /></Col>
      </Row>
      <Row className="justify-content-center bg-light mx-0 px-5 resources-available">
        <Col md={5} className="p-5 align-self-center">
          <Image fluid src="/images/resource-icon.png" alt="Resources Icon" />
        </Col>
        <Col md={5} className="p-5 align-self-center">
          <Row><h1 style={headingStyle2}>Resources available</h1></Row>
          <Row><p style={largeTextStyle}>Checkout some resources we catered for you to explore the internet and to learn more about its benefits.</p></Row>
          <a href="/resources"><Button className="px-5 py-3" style={buttonStyle} alt="View Resources">View resources</Button></a>
        </Col>
      </Row>
      <Row className="justify-content-center align-middle text-center py-5 mx-0 explore-classes">
        <Row><h1 className="justify-content-center py-3" style={headingStyle2}>Explore classes</h1></Row>
        <Col md={4} className="px-5 align-self-center">
          <Row>
            <p style={largeTextStyle}>
              Want to get more hands-on with learning about the use of the internet?
              Head into the Classes page where you will get some interactive learning experience with the list of interesting topics related to the uses and benefits of the internet.
            </p>
          </Row>
          <a href="/classes"><Button className="px-5 py-3" style={buttonStyle} alt="View Classes">View classes</Button></a>
        </Col>
        <Col md={4} className="align-self-center px-5"><Image fluid src="images/class-icon.png" alt="Class Icon" /></Col>
      </Row>
    </div>
  );
};

export default Landing;
