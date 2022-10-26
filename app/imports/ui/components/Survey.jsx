import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CardChecklist } from 'react-bootstrap-icons';

const Account = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setShow(true)} className="survey-button">
        <CardChecklist size={25} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="modal-90w">
        <Modal.Header closeButton />
        <Modal.Body style={{ textAlign: 'center' }}>
          <Form>
            Complete this survey to earn some points.
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Account;
