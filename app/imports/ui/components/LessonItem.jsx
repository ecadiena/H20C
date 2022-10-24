import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List session table. See pages/Listsession.jsx. */
const LessonItem = ({ lesson }) => (
  <td style={{ marginRight: '20px' }}>{lesson.title}</td>
);

LessonItem.propTypes = {
  lesson: PropTypes.shape.isRequired,
};

export default LessonItem;
