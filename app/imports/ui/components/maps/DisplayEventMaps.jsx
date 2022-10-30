import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import { Button, Modal, Image } from 'react-bootstrap';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};
const options = {
  styles: mapStyles,
};

export const DisplayEventMaps = ({ keys, lat, lng, location }) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: keys,
    libraries,
  });
  const marker = ({ lat: lat, lng: lng });
  const [show, setShow] = useState(false);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'loading maps';

  return (
    <div>
      <Button variant="light" onClick={() => setShow(true)}><Image src="/images/map.png" alt="Map Icon" style={{ height: '25px' }} /></Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <p>Location: {location}</p>
        </Modal.Header>
        <Modal.Body>
          { isLoaded ? (
            <div>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={marker}
                options={options}
              >
                <Marker
                  position={{ lat: marker.lat, lng: marker.lng }}
                />
              </GoogleMap>
            </div>
          ) : ' '}
        </Modal.Body>
      </Modal>
    </div>
  );

};

DisplayEventMaps.propTypes = {
  keys: PropTypes.string.isRequired,
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};
