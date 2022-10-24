import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List session table. See pages/Listsession.jsx. */
const LessonItem = ({ lesson }) => (
  <tr>
    <td colSpan="2">{lesson.title}</td>
    <td colSpan="2">{lesson.summary}</td>
  </tr>
);

LessonItem.propTypes = {
  lesson: PropTypes.shape.isRequired,
};

export default LessonItem;
