import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

const HelpButton = () => {
  const buttonStyle = { background: '#E9D777', borderColor: '#E9D777', fontSize: '16px', fontWeight: 600, borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px',
    borderTopRightRadius: '50px', borderBottomRightRadius: '50px', right: '20px', position: 'fixed', bottom: '20px' };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="py-2 px-4 align-middle align-self-center faq" style={buttonStyle} onClick={handleShow}>
        <QuestionCircle />  Help
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><b>Frequently Asked Questions</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4><b>How do I sign up for a class?</b></h4>
          <p>To sign up, you must first create an account at the <a href="/sign-in-up">Sign Up page</a>.
            <br />You can then sign up for a class through the <a href="/classes">Classes page</a>.
          </p>

          <h4><b>What is my data being used for?</b></h4>
          <p>Our team collects user data to improve the user experience and ensure that our engineers are creating a quality application.
          </p>

          <h4><b>What is 2FA?</b></h4>
          <p>2FA stands for Two Factor Authentication. This makes your account with us more protected since you are the only
            one who can access it if you sign up. Simply download an authenticator app of your choice and follow the on screen prompts
            in the <a href="/sign-in-up">Sign Up page</a>. You may always disable this option in your personal profile page.
          </p>

          <h4><b>What are the points use for?</b></h4>
          <p>Once you reach a certain number of points accumulated by taking our quizzes, you are eligible to sign up for a Unit Exam.
          </p>

          <h4><b>What is the Unit Exam?</b></h4>
          <p>This event is an in-person, proctored exam that will determine if you have successfully completed the course and are
            properly equipped with the necessary knowledge to have a sustainable and long lasting condo.
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