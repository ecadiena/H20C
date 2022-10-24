import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

/** The Help button appears at sticky bottom right of screen. Rendered by the App Layout component. */
const HelpButton = () => {
  const buttonStyle = { background: '#E9D777', borderColor: '#E9D777', fontSize: '16px', fontWeight: 600, borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px',
    borderTopRightRadius: '50px', borderBottomRightRadius: '50px', right: '20px', position: 'fixed', bottom: '20px' };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="py-2 px-4 align-middle align-self-center" style={buttonStyle} onClick={handleShow}>
        <QuestionCircle />  Help
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Frequently Asked Questions</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4><b>What is Broadband for Hawaiʻi?</b></h4>
          <p>Broadband for Hawaiʻi is text text text text text
            <br />
            Learn more in our <a href="/about">About page</a> and <a href="/resources">Resources page</a>.
          </p>
          <h4><b>How do I sign up for a class?</b></h4>
          <p>To sign up you must first create an account at our <a href="/sign-in-up">Sign Up page</a>.
            <br />You can then sign up for a class through the <a href="/classes">Classes page</a>.
          </p>
          <h4><b>Any other questions or site not functioning properly?</b></h4>
          <p>Please send your question or describe the issue by emailing us at <a href="/">sample@email.com</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HelpButton;
