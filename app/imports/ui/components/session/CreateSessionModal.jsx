import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import swal from 'sweetalert';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import { difficultyType, selectFormSetup, Sessions, sessionType, tagType } from '../../../api/session/SessionCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';

const CreateSessionModal = ({ modal }) => {

  const formGroupStyle = { marginTop: '20px' };

  const [session, setSession] = useState({ title: '', summary: '', typeAdapt: '', difficultyAdapt: '', tagsAdapt: [], date: new Date(), startTimeAdapt: '', endTimeAdapt: '', lng: null, lat: null });
  const typeOptions = [];
  const difficultyOptions = [];
  const tagsOptions = [];
  selectFormSetup(typeOptions, sessionType);
  selectFormSetup(difficultyOptions, difficultyType);
  selectFormSetup(tagsOptions, tagType);

  const [eventDropdown, setEventDropdown] = useState(false);
  const [virtual, setVirtual] = useState(false);

  const updateSession = (event, property) => {
    setSession(prevSession => ({ ...prevSession, [property]: event }));
    if (property === 'typeAdapt') {
      setEventDropdown(event.value === 'Event');
    }
  };

  const updateVirtualSession = () => {
    updateSession('virtual');

    setVirtual(!virtual);
  };

  const submit = () => {
    const { title, summary, typeAdapt, difficultyAdapt, tagsAdapt, date, startTimeAdapt, endTimeAdapt, lat, lng } = session;
    const startTime = moment(startTimeAdapt).format('hh:mm a');
    const endTime = moment(endTimeAdapt).format('hh:mm a');
    const tags = tagsAdapt.map(tag => tag.value);
    const owner = Meteor.user().username;
    const type = typeAdapt.value;
    const difficulty = difficultyAdapt.value;

    if (title === '' || summary === '' || tags.length === 0 || !type || !difficulty) {
      swal('Error', 'Please complete all required fields', 'error');
      return;
    }
    if (type === 'Event' && virtual && (date === '' || startTimeAdapt === '' || endTimeAdapt === '')) {
      swal('Error', 'Please complete all required fields', 'error');
      return;
    }
    if (type === 'Event' && !virtual && (lat === null || lng === null || date === '' || startTimeAdapt === '' || endTimeAdapt === '')) {
      swal('Error', 'Please enter a location and place a marker on the map', 'error');
      return;
    }
    if (type === 'Event' && startTimeAdapt > endTimeAdapt) {
      swal('Error', 'Event end time is before the start time', 'error');
      return;
    }

    const collectionName = Sessions.getCollectionName();
    const definitionData = { title, summary, type, difficulty, date, startTime, endTime, tags, owner, lat, lng };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        setEventDropdown(false);
        setVirtual(false);
        setSession({ title: '', summary: '', typeAdapt: '', difficultyAdapt: '', tagsAdapt: [], date: new Date(), startTimeAdapt: '', endTimeAdapt: '', lng: null, lat: null });
        swal('Success', 'Session added successfully', 'success');
        modal.setShow(false);
      });
  };

  return (
    <Modal
      id={COMPONENT_IDS.CLASSES_CREATE_SESSION_MODAL}
      show={modal.show}
      onHide={() => modal.setShow(false)}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title><h2>Create Course / Event</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
        <Form>
          <Form.Group>
            <Form.Label>Title: *</Form.Label>
            <Form.Control value={session.title} type="title" placeholder="" onChange={(e) => updateSession(e.target.value, 'title')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags: *</Form.Label>
            <Select value={session.tagsAdapt} options={tagsOptions} isMulti closeMenuOnSelect={false} onChange={(e) => updateSession(e, 'tagsAdapt')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Difficulty: *</Form.Label>
            <Select value={session.difficultyAdapt} options={difficultyOptions} onChange={(e) => updateSession(e, 'difficultyAdapt')} />
          </Form.Group>
          <Form.Group style={formGroupStyle}>
            <Form.Label>Type: *</Form.Label>
            <Select value={session.typeAdapt} options={typeOptions} onChange={(e) => updateSession(e, 'typeAdapt')} />
          </Form.Group>
          <Form.Group style={formGroupStyle}>
            <Form.Label>Summary: *</Form.Label>
            <Form.Control as="textarea" value={session.summary} type="summary" placeholder="" onChange={(e) => updateSession(e.target.value, 'summary')} />
          </Form.Group>
          { eventDropdown ? (
            <div style={formGroupStyle}>
              <h5>Event Details</h5>
              <Form.Group>
                <Row>
                  <Col>
                    <span>Date: *</span>
                    <DatePicker
                      name="Date"
                      selected={session.date}
                      minDate={new Date()}
                      onChange={(e) => updateSession(e, 'date')}
                      className="form-view"
                    />
                  </Col>
                  <Col>
                    <span>Start Time: *</span>
                    <DatePicker
                      selected={session.startTimeAdapt}
                      onChange={(e) => updateSession(e, 'startTimeAdapt')}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="h:mm aa"
                      className="form-view"
                    />
                  </Col>
                  <Col>
                    <span>End Time: *</span>
                    <DatePicker
                      selected={session.endTimeAdapt}
                      onChange={(e) => updateSession(e, 'endTimeAdapt')}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="h:mm aa"
                      className="form-view"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <br />
                <Form.Check
                  type="checkbox"
                  label="Virtual"
                  onClick={updateVirtualSession}
                />
              </Form.Group>
            </div>
          ) : ''}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={() => modal.setShow(false)}>Cancel</Button>
        <Button type="button" onClick={submit} variant="primary" className="mx-3">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateSessionModal.propTypes = {
  modal: PropTypes.shape({
    show: PropTypes.bool,
    setShow: PropTypes.func,
  }).isRequired,
};

export default CreateSessionModal;
