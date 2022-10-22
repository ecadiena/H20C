import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List session table. See pages/Listsession.jsx. */
const LessonItem = ({ session }) => (
  <tr>
    <td>{session.title}</td>
    <td>{session.summary}</td>
    <td>{session.type}</td>
    <td>{session.difficulty}</td>
  </tr>
);

// Require a document to be passed to this component.
LessonItem.propTypes = {
  session: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    // tags: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

export default LessonItem;
