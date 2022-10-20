import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container, Form, Row, Card } from 'react-bootstrap';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Lessons, selectFormSetup } from '../../../api/lesson/LessonCollection';
import { Sessions } from '../../../api/session/SessionCollection';
import { PAGE_IDS } from '../../utilities/PageIDs';

const CreateLesson = () => {
  const [lesson, setLesson] = useState({ sessionID: '', title: '', summary: '', videoLink: '' });
  const [lessonText, setLessonText] = useState([]);
  const [lessonTextForm, setLessonTextForm] = useState({ header: '', body: '' });
  const [quiz, setQuiz] = useState([]);
  const [quizForm, setQuizForm] = useState({ question: '', options: '', correct: '', feedback: '' });

  const { sessionOptions, ready } = useTracker(() => {
    const sessionSubscription = Sessions.subscribeSession();
    const rdy = sessionSubscription.ready();
    const session = Sessions.find({}, { sort: { title: 1 } }).fetch();
    const sessionFilter = [];
    selectFormSetup(sessionFilter, session);
    return {
      ready: rdy,
      sessionOptions: sessionFilter,
    };
  }, []);

  // selectFormSetup(typeOptions, sessionType);

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
    setQuizForm(prevQuizForm => ({ ...prevQuizForm, [property]: event }));
  };

  const addLessonText = () => {
    const updateLessonText = [...lessonText, lessonTextForm];
    setLessonText(updateLessonText);
    setLessonTextForm({ header: '', body: '' });
  };

  const addQuiz = () => {
    const updateQuizText = [...quiz, quizForm];
    setQuiz(updateQuizText);
    setQuizForm({ question: '', options: '', correct: '', feedback: '' });
  };

  // On submit, insert the data.
  const submit = () => {
    const { sessionID, title, summary, videoLink } = lesson;
    const owner = Meteor.user().username;
    const collectionName = Lessons.getCollectionName();
    const definitionData = { sessionID, title, summary, videoLink, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Session added successfully', 'success');
      });
  };

  return (
    (ready ? (
      <Container id={PAGE_IDS.ADD_STUFF} className="py-3">
        <Row className="justify-content-center">
          <Form>
            <Form.Group>
              <Form.Label>Session: </Form.Label>
              <Select options={sessionOptions} onChange={(e) => updateLesson(e, 'sessionID')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control type="title" placeholder="" onChange={(e) => updateLesson(e.target.value, 'title')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Summary: </Form.Label>
              <Form.Control type="summary" placeholder="" onChange={(e) => updateLesson(e.target.value, 'summary')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Video Link: </Form.Label>
              <Form.Control type="videoLink" placeholder="" onChange={(e) => updateLesson(e.target.value, 'videoLink')} />
            </Form.Group>

            { lessonText.map((item) => (
              <Card key={item.header} style={{ marginTop: '20px' }}>
                <Card.Body>
                  <Card.Title>{item.header}</Card.Title>
                  <Card.Text>{item.body}</Card.Text>
                </Card.Body>
              </Card>
            )) }

            <Form.Group>
              <Form.Label>Header: </Form.Label>
              <Form.Control type="header" placeholder="" value={lessonTextForm.header} onChange={(e) => updateLessonTextForm(e.target.value, 'header')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Body: </Form.Label>
              <Form.Control type="body" placeholder="" value={lessonTextForm.body} onChange={(e) => updateLessonTextForm(e.target.value, 'body')} />
            </Form.Group>

            <Form.Group>
              <Button type="button" onClick={() => addLessonText()} variant="primary" className="mx-3">Add Lesson Text</Button>
            </Form.Group>

            { quiz.map((item) => (
              <Card key={item.question} style={{ marginTop: '20px' }}>
                <Card.Body>
                  <Card.Title>{item.question}</Card.Title>
                  <Card.Title>{item.options}</Card.Title>
                  <Card.Title>{item.correct}</Card.Title>
                  <Card.Title>{item.feedback}</Card.Title>
                </Card.Body>
              </Card>
            )) }

            <Form.Group>
              <Form.Label>Question: </Form.Label>
              <Form.Control type="question" placeholder="" value={quizForm.question} onChange={(e) => updateQuizForm(e.target.value, 'question')} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Options: </Form.Label>
              <Form.Control type="question" placeholder="" value={quizForm.options} onChange={(e) => updateQuizForm(e.target.value, 'options')} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Correct: </Form.Label>
              <Form.Control type="question" placeholder="" value={quizForm.correct} onChange={(e) => updateQuizForm(e.target.value, 'correct')} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Feedback: </Form.Label>
              <Form.Control type="question" placeholder="" value={quizForm.feedback} onChange={(e) => updateQuizForm(e.target.value, 'feedback')} />
            </Form.Group>

            <Form.Group>
              <Button type="button" onClick={() => addQuiz()} variant="primary" className="mx-3">Add Quiz</Button>
            </Form.Group>
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
