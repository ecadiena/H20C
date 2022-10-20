import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { Sessions, sessionType, difficultyType, tagType, selectFormSetup } from '../../../api/session/SessionCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../../utilities/PageIDs';

const CreateSession = () => {
  const [session, setSession] = useState({ title: '', summary: '', typeAdapt: '', difficultyAdapt: '', tagsAdapt: [], location: '', date: new Date(), startTimeAdapt: '', endTimeAdapt: '' });
  const typeOptions = [];
  const difficultyOptions = [];
  const tagsOptions = [];
  selectFormSetup(typeOptions, sessionType);
  selectFormSetup(difficultyOptions, difficultyType);
  selectFormSetup(tagsOptions, tagType);

  const [eventDropdown, setEventDropdown] = useState(false);

  const updateSession = (event, property) => {
    setSession(prevSession => ({ ...prevSession, [property]: event }));
    if (property === 'typeAdapt') {
      setEventDropdown(event.value === 'event');
    }
  };

  // On submit, insert the data.
  const submit = () => {
    const { title, summary, typeAdapt, difficultyAdapt, tagsAdapt, location, date, startTimeAdapt, endTimeAdapt } = session;
    const startTime = moment(startTimeAdapt).format('hh:mm a');
    const endTime = moment(endTimeAdapt).format('hh:mm a');
    const tags = tagsAdapt.map(tag => tag.value);
    const owner = Meteor.user().username;
    const type = typeAdapt.value;
    const difficulty = difficultyAdapt.value;
    const collectionName = Sessions.getCollectionName();
    const definitionData = { title, summary, type, difficulty, date, startTime, endTime, tags, location, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Session added successfully', 'success');
        setEventDropdown(false);
      });
  };

  return (
    <Container id={PAGE_IDS.ADD_STUFF} className="py-3">
      <h2>Create Session</h2>
      <Row className="justify-content-center">
        <Form>
          <Form.Group>
            <Form.Label>Title: *</Form.Label>
            <Form.Control type="title" placeholder="" onChange={(e) => updateSession(e.target.value, 'title')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary: *</Form.Label>
            <Form.Control type="summary" placeholder="" onChange={(e) => updateSession(e.target.value, 'summary')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type: *</Form.Label>
            <Select options={typeOptions} onChange={(e) => updateSession(e, 'typeAdapt')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Difficulty: *</Form.Label>
            <Select options={difficultyOptions} onChange={(e) => updateSession(e, 'difficultyAdapt')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags: *</Form.Label>
            <Select options={tagsOptions} isMulti closeMenuOnSelect={false} onChange={(e) => updateSession(e, 'tagsAdapt')} />
          </Form.Group>
          { eventDropdown ? (
            <div>
              <Form.Group>
                <Row>
                  <Col>
                    <p>Date</p>
                    <DatePicker
                      name="Date"
                      selected={session.date}
                      minDate={new Date()}
                      onChange={(e) => updateSession(e, 'date')}
                    />
                  </Col>
                  <Col>
                    <p>Start Time</p>
                    <DatePicker
                      selected={session.startTimeAdapt}
                      onChange={(e) => updateSession(e, 'startTimeAdapt')}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="h:mm aa"
                    />
                  </Col>
                  <Col>
                    <p>End Time</p>
                    <DatePicker
                      selected={session.endTimeAdapt}
                      onChange={(e) => updateSession(e, 'endTimeAdapt')}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="h:mm aa"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Location: </Form.Label>
                <Form.Control type="location" placeholder="" onChange={(e) => updateSession(e.target.value, 'location')} />
              </Form.Group>
            </div>
          ) : ''}
        </Form>
      </Row>
      <br />
      <Row className="justify-content-center">
        <Button type="button" onClick={() => submit()} variant="primary" className="mx-3">Submit</Button>
      </Row>
    </Container>
  );
};

export default CreateSession;
