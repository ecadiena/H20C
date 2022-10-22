import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container, Form, Row, Card, Col } from 'react-bootstrap';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Lessons, selectOptionSetup, selectSessionSetup } from '../../../api/lesson/LessonCollection';
import { Sessions } from '../../../api/session/SessionCollection';
import { PAGE_IDS } from '../../utilities/PageIDs';

const CreateLesson = () => {
  const [lesson, setLesson] = useState({ sessionID: '', title: '', summary: '', videoLink: '' });
  const [lessonText, setLessonText] = useState([]);
  const [lessonTextForm, setLessonTextForm] = useState({ header: '', body: '' });
  const [quiz, setQuiz] = useState([]);
  const [quizForm, setQuizForm] = useState({ question: '', options: '', correct: '', feedback: '' });
  const [quizOptions, setQuizOptions] = useState({ A: '', B: '', C: '', D: '' });
  const quizOptionSelect = [];
  const quizChoice = ['1', '2', '3', '4'];
  selectOptionSetup(quizOptionSelect, quizChoice);

  const [lessonDropdown, setLessonDropDown] = useState(false);
  const [quizDropdown, setQuizDropdown] = useState(false);

  const { sessionOptions, ready } = useTracker(() => {
    const sessionSubscription = Sessions.subscribeSession();
    const rdy = sessionSubscription.ready();
    const session = Sessions.find({}, { sort: { title: 1 } }).fetch();
    const sessionFilter = [];
    selectSessionSetup(sessionFilter, session);
    return {
      ready: rdy,
      sessionOptions: sessionFilter,
    };
  }, []);

  const updateLesson = (event, property) => {
    if (property === 'sessionID') {
      setLesson(prevLesson => ({ ...prevLesson, [property]: event.value }));
    } else {
      setLesson(prevLesson => ({ ...prevLesson, [property]: event }));
    }
  };

  const updateLessonTextForm = (event, property) => {
    setLessonTextForm(prevLessonFormText => ({ ...prevLessonFormText, [property]: event }));
  };
  const updateQuizForm = (event, property) => {
    if (property === 'correct') {
      setQuizForm(prevQuizForm => ({ ...prevQuizForm, [property]: event.value }));
    } else {
      setQuizForm(prevQuizForm => ({ ...prevQuizForm, [property]: event }));
    }
  };
  const updateQuizOptions = (event, property) => {
    setQuizOptions(prevQuizOptions => ({ ...prevQuizOptions, [property]: event }));
  };

  const addLessonText = () => {
    const updateLessonText = [...lessonText, lessonTextForm];
    setLessonText(updateLessonText);
    setLessonTextForm({ header: '', body: '' });
  };

  const addQuiz = () => {
    quizForm.options = [quizOptions.A, quizOptions.B, quizOptions.C, quizOptions.D];
    const updateQuizText = [...quiz, quizForm];
    setQuiz(updateQuizText);
    setQuizForm({ question: '', options: '', correct: '', feedback: '' });
    setQuizOptions({ A: '', B: '', C: '', D: '' });
  };

  const handleLessonText = (event) => {
    setLessonText(lessonText.filter((text) => text.header !== event));
  };

  const handleQuiz = (event) => {
    setQuiz(quiz.filter((q) => q.question !== event));
  };

  // On submit, insert the data.
  const submit = () => {
    const { sessionID, title, summary, videoLink } = lesson;
    const owner = Meteor.user().username;
    const collectionName = Lessons.getCollectionName();
    const definitionData = { sessionID, title, summary, videoLink, owner, lessonText, quiz };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Lesson added successfully', 'success');
        setLessonText([]);
        setQuiz([]);
        setLesson({ sessionID: sessionID, title: '', summary: '', videoLink: '' });
      });
  };

  return (
    (ready ? (
      <Container id={PAGE_IDS.ADD_STUFF} className="py-3">
        <h2>Create Lesson</h2>
        <Row className="justify-content-center">
          <Form>
            <Form.Group>
              <Form.Label>Session: *</Form.Label>
              <Select options={sessionOptions} onChange={(e) => updateLesson(e, 'sessionID')} />
            </Form.Group>
            <Form.Group>
              <Form.Label required>Title: *</Form.Label>
              <Form.Control value={lesson.title} type="title" placeholder="" onChange={(e) => updateLesson(e.target.value, 'title')} />
              <div className="valid-feedback">
                Looks good!
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Summary: *</Form.Label>
              <Form.Control value={lesson.summary} type="summary" placeholder="" onChange={(e) => updateLesson(e.target.value, 'summary')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Video Link: </Form.Label>
              <Form.Control value={lesson.videoLink} type="videoLink" placeholder="" onChange={(e) => updateLesson(e.target.value, 'videoLink')} />
            </Form.Group>

            <Row md={4}>
              { lessonText.map((item, index) => (
                <Col key={`lessonText${index}`}>
                  <Card style={{ marginTop: '20px' }}>
                    <Card.Body>
                      <Card.Title>Header: {item.header}</Card.Title>
                      <Card.Text>Body: {item.body}</Card.Text>
                      <Button onClick={() => handleLessonText(item.header)}>-</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )) }
            </Row>

            { lessonDropdown ? (
              <>
                <br />
                <Button type="button" onClick={() => setLessonDropDown(!lessonDropdown)} variant="secondary">Minimize Lesson Text</Button>
                <Form.Group>
                  <Form.Label>Header: </Form.Label>
                  <Form.Control type="header" placeholder="" value={lessonTextForm.header} onChange={(e) => updateLessonTextForm(e.target.value, 'header')} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body: </Form.Label>
                  <Form.Control as="textarea" type="body" placeholder="" value={lessonTextForm.body} onChange={(e) => updateLessonTextForm(e.target.value, 'body')} />
                </Form.Group>

                <br />
                <Button type="button" onClick={() => addLessonText()} variant="primary">+</Button>
              </>
            ) : (
              <>
                <br />
                <Button type="button" onClick={() => setLessonDropDown(!lessonDropdown)} variant="primary">Add Lesson Text</Button>
              </>
            )}

            <br />

            <Row md={2}>
              { quiz.map((item, count) => (
                <Col key={`quiz${count}`}>
                  <Card style={{ marginTop: '20px' }}>
                    <Card.Body>
                      <Card.Title>Question: {item.question}</Card.Title>
                      <Card.Title>Options</Card.Title>
                      <Row>
                        { item.options.map((option, index) => (
                          <Col key={`option${index}`}>
                            <p>{index + 1}: {option}</p>
                          </Col>
                        )) }
                      </Row>
                      <Card.Title>Correct Answer: {item.correct}</Card.Title>
                      <Card.Title>Feedback: {item.feedback}</Card.Title>
                      <Button onClick={() => handleQuiz(item.question)}>-</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )) }
            </Row>

            { quizDropdown ? (
              <>
                <br />
                <Button type="button" onClick={() => setQuizDropdown(!quizDropdown)} variant="secondary">Minimize Quiz</Button>
                <Form.Group>
                  <Form.Label>Question: </Form.Label>
                  <Form.Control type="question" placeholder="" value={quizForm.question} onChange={(e) => updateQuizForm(e.target.value, 'question')} />
                </Form.Group>

                <Row>
                  <Form.Label>Options: </Form.Label>
                  <Col>
                    <Form.Group>
                      <Form.Label>1. </Form.Label>
                      <Form.Control type="question" placeholder="" value={quizOptions.A} onChange={(e) => updateQuizOptions(e.target.value, 'A')} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>2. </Form.Label>
                      <Form.Control type="question" placeholder="" value={quizOptions.B} onChange={(e) => updateQuizOptions(e.target.value, 'B')} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>3. </Form.Label>
                      <Form.Control type="question" placeholder="" value={quizOptions.C} onChange={(e) => updateQuizOptions(e.target.value, 'C')} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>4. </Form.Label>
                      <Form.Control type="question" placeholder="" value={quizOptions.D} onChange={(e) => updateQuizOptions(e.target.value, 'D')} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Label>Correct Answer: </Form.Label>
                      <Select options={quizOptionSelect} onChange={(e) => updateQuizForm(e, 'correct')} />
                    </Form.Group>
                  </Col>
                  <Col sm={8}>
                    <Form.Group>
                      <Form.Label>Answer Feedback: </Form.Label>
                      <Form.Control type="question" placeholder="" value={quizForm.feedback} onChange={(e) => updateQuizForm(e.target.value, 'feedback')} />
                    </Form.Group>
                  </Col>
                </Row>

                <br />
                <Button type="button" onClick={() => addQuiz()} variant="primary">+</Button>
              </>
            ) : (
              <>
                <br />
                <Button type="button" onClick={() => setQuizDropdown(!quizDropdown)} variant="primary">Add Quiz</Button>
              </>
            ) }
          </Form>
        </Row>
        <br />
        <Row className="justify-content-center">
          <Button type="button" onClick={() => submit()} variant="primary" className="mx-3">Submit</Button>
        </Row>
      </Container>
    ) : ' ')
  );
};

export default CreateLesson;
