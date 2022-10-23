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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
