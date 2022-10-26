import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import CreateSession from '../components/session/CreateSession';
import CreateLesson from '../components/lesson/CreateLesson';

/* A simple static component to render some text for the landing page. */
const AddStuff = () => {
  // const buttonStyle = { background: '#1762A7', borderColor: '#1762A7', fontSize: '14px', fontWeight: 600 };
  // const headingStyle = { fontSize: '72px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  // const headingStyle2 = { fontSize: '64px', fontFamily: 'Georgia, serif', fontWeight: 500 };
  const subheadingStyle = { fontSize: '32px', fontFamily: 'Georgia, serif', fontWeight: 400 };
  // const largeTextStyle = { fontSize: '24px', fontWeight: 500, lineHeight: 1.2 };
  // const smallTextStyle = { fontSize: '18px' };
  const [showSesh, setShowSesh] = useState(false);
  const [showLes, setShowLes] = useState(false);

  const handleCloseSesh = () => setShowSesh(false);
  const handleShowSesh = () => setShowSesh(true);
  const handleCloseLes = () => setShowLes(false);
  const handleShowLes = () => setShowLes(true);
  // <>
  //   <CreateSession />
  //   <CreateLesson />
  // </>
  return (
    <Container>
      <h2 style={subheadingStyle}>Create your own classes</h2>
      <div>
        <Button variant="primary" onClick={handleShowSesh} className="me-2" alt="Create Session">
          Create Session
        </Button>
        <Button variant="primary" onClick={handleShowLes} alt="Create Lesson">
          Create Lesson
        </Button>

        <Modal show={showSesh} onHide={handleCloseSesh}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Create Session</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <CreateSession />
          </Modal.Body>
        </Modal>

        <Modal show={showLes} onHide={handleCloseLes}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Create Lesson</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <CreateLesson />
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default AddStuff;
