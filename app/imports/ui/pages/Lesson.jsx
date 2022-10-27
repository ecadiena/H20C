import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Ratio } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Lessons } from '../../api/lesson/LessonCollection';

// Lesson page
const Lesson = () => {
  const { _id } = useParams();
  // const [redirect, setRedirect] = useState('');
  // const answers = [];
  //
  const { ready, lesson } = useTracker(() => {
    const subscription1 = Lessons.subscribeLesson();
    const rdy = subscription1.ready();
    const lssn = Lessons.findOne({ _id: _id }, {});

    return {
      lesson: lssn,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container id={PAGE_IDS.LESSON_PAGE} className="py-3 mb-5 justify-content-center">
      <h1>{lesson.title}</h1>
      <hr />
      <Ratio aspectRatio="16x9">
        <iframe
          width="560"
          height="315"
          src={`${lesson.videoLink}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Ratio>
      {lesson.lessonText.map((item) => (
        <Container>
          <h4>{item.header}</h4>
          {item.body.map((bdy) => (
            <h6>{bdy}</h6>
          ))}
        </Container>
      ))}
    </Container>
  ) : '';
};

export default Lesson;
