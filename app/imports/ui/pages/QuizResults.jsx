import React from 'react';
import { Navigate, useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';
import { Lessons } from '../../api/lesson/LessonCollection';

const QuizQuestion = ({ quizItem, index, selected, correct }) => {
  const correctStyle = { backgroundColor: '#bdf4bd', opacity: 1 };
  const wrongStyle = { backgroundColor: '#ffd3d3', opacity: 1 };
  return (
    <div className="my-5">
      <h3>{`${index + 1}. ${quizItem.question}`}</h3>
      <Form>
        {quizItem.options.map((option, i) => (
          <Form.Check
            disabled
            checked={selected === i}
            id={`question-${index}-option-${i}`}
            key={i}
            name={`question-${index}`}
            type="radio"
            label={option}
            value={i}
            /* eslint-disable-next-line no-nested-ternary */
            style={selected === i ? correct ? correctStyle : wrongStyle : { opacity: 1 }}
          />
        ))}
      </Form>
      <p>{quizItem.feedback ? `Feedback: ${quizItem.feedback}` : ''}</p>
    </div>
  );
};

QuizQuestion.propTypes = {
  quizItem: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  correct: PropTypes.bool.isRequired,
};

const QuizResults = () => {
  const { _id } = useParams();

  const { ready, quiz, lesson } = useTracker(() => {
    const subscription1 = SubmittedQuizzes.subscribeSubmittedQuiz();
    const subscription2 = Lessons.subscribeLesson();
    const rdy = subscription1.ready() && subscription2.ready();
    const qz = SubmittedQuizzes.findOne({ _id: _id }, {});
    const lssn = qz ? Lessons.findOne({ _id: qz.lessonID }, {}) : undefined;

    return {
      quiz: qz,
      lesson: lssn,
      ready: rdy,
    };
  }, [_id]);

  if (lesson === undefined) {
    return <Navigate to={`/quiz-results/${_id}`} />;
  }

  return ready ? (
    <Container id={PAGE_IDS.QUIZ_RESULTS_PAGE} className="py-3">
      <Row>
        <Col xs={9}>
          <h1>Quiz</h1>
          <h4>{lesson.title}</h4>
        </Col>
        <Col className="text-end" xs={3}>
          <h3>{`SCORE: ${(quiz.numCorrect / lesson.quiz.length) * 100}%`}</h3>
        </Col>
      </Row>

      <hr />
      {lesson.quiz.map((item, index) => (
        <QuizQuestion key={index} quizItem={item} index={index} selected={quiz.answers[index].selected} correct={quiz.answers[index].correct} />
      ))}

      <Button className="my-4" variant="primary" type="button" href={`/lesson/${lesson._id}`}>Return to Lesson</Button>
    </Container>
  ) : '';

};

export default QuizResults;
