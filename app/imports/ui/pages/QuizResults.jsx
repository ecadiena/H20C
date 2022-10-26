import React from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const QuizResults = () => {
  const { _id } = useParams();
  return (
    <Container id={PAGE_IDS.QUIZ_RESULTS_PAGE} className="py-3">
      temp
    </Container>
  );

};

export default QuizResults;
