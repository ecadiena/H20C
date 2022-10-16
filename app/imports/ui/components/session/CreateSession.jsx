import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import swal from 'sweetalert';
import { Sessions } from '../../../api/session/SessionCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';

/* Renders the AddStuff page for adding a document. */
const CreateSession = () => {
  const session = {
    title: '',
    summary: '',
    type: '',
    difficulty: '',
    tags: [],
    dateStart: '',
    dateEnd: '',
    location: '',
  };

  const typeOptions = [
    { value: 'event', label: 'Event' },
    { value: 'course', label: 'Course' },
  ];
  const difficultyOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];
  const tagsOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'security', label: 'Security' },
    { value: 'internet', label: 'Internet' },
  ];
  const updateSession = (event, property) => {
    session[property] = event;
  };

  // On submit, insert the data.
  const submit = () => {
    const { title, summary, type, difficulty, dateStart, dateEnd, location } = session;
    const createdBy = new Date();
    const tags = [];
    session.tags.forEach(tag => {
      tags.push(tag.value);
    });
    const collectionName = Sessions.getCollectionName();
    const definitionData = { title, summary, type, difficulty, tags, dateStart, dateEnd, location, createdBy };
    console.log(definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Session added successfully', 'success');
      });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Form>
          <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control type="title" placeholder="" onChange={(e) => updateSession(e.target.value, 'title')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary: </Form.Label>
            <Form.Control type="summary" placeholder="" onChange={(e) => updateSession(e.target.value, 'summary')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type: </Form.Label>
            <Select options={typeOptions} onChange={(e) => updateSession(e, 'type')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Difficulty: </Form.Label>
            <Select options={difficultyOptions} onChange={(e) => updateSession(e, 'difficulty')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags: </Form.Label>
            <Select options={tagsOptions} isMulti closeMenuOnSelect={false} onChange={(e) => updateSession(e, 'tags')} />
          </Form.Group>
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
