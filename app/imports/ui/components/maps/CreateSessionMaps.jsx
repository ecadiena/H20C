import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '80%',
  height: '500px',
};
const options = {
  styles: mapStyles,
};

export const CreateSessionMaps = ({ keys, setSession }) => {

  const updateSession = (event, property) => {
    setSession(prevSession => ({ ...prevSession, [property]: event }));
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: keys,
    libraries,
  });
  const [marker, setMarker] = useState({});
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState({ lat: 21.432423, lng: -157.404107 });

  const onMapClick = React.useCallback((event => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    updateSession(event.latLng.lat(), 'lat');
    updateSession(event.latLng.lng(), 'lng');
  }), []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    setCenter({ lat: lat, lng: lng });
    // mapRef.current.panTo({ lat, lng });
    setZoom(16);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'loading maps';

  return (
    <div>
      { isLoaded ? (
        <div>

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
          >
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          </GoogleMap>
          <Search panTo={panTo} setSession={setSession} />
        </div>
      ) : ' '}
    </div>
  );

};

CreateSessionMaps.propTypes = {
  keys: PropTypes.string.isRequired,
  setSession: PropTypes.func.isRequired,
};

const Search = ({ panTo, setSession }) => {
  const updateSession = (event, property) => {
    setSession(prevSession => ({ ...prevSession, [property]: event }));
  };

  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 21.432423, lng: () => -157.404107 },
      radius: 200 * 1000,
    },
  });

  return (
    <Combobox onSelect={async (address) => {
      setValue(address, false);
      clearSuggestions();
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log(`error: ${error}`);
      }
    }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateSession(e.target.value, 'location');
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' && data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
Search.propTypes = {
  panTo: PropTypes.func.isRequired,
  setSession: PropTypes.func.isRequired,
};
