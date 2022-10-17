import React from 'react';
import CreateSession from '../components/session/CreateSession';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const AddStuff = () => (
  <CreateSession id={PAGE_IDS.ADD_STUFF} />
);

export default AddStuff;
