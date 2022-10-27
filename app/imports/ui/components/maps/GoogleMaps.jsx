import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
// import { formatRelative } from "date-fns";
//
// import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';
import Button from 'react-bootstrap/Button';

const libraries = ['places'];
const mapContainerStyle = {
  width: '80%',
  height: '500px',
};
const options = {
  styles: mapStyles,
};

export const GoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBcLgB7aJWH6us6SPcT6S78mPlvbUWzOlQ',
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState({ lat: 43.653225, lng: -79.383186 });

  const onMapClick = React.useCallback((event => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }]);
  }), []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    setCenter({ lat: lat, lng: lng });
    // mapRef.current.panTo({ lat, lng });
    setZoom(14);
  }, []);

  // const locate = () => {
  //   return (
  //     <Button>locate me</Button>
  //   );
  // };

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
            {markers.map((marker) => (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
            { selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>lmao</h2>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
          <Search panTo={panTo} />
        </div>
      ) : ' '}
    </div>
  );

};

const Search = ({ panTo }) => {
  console.log(panTo);
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
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
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        {status === 'OK' && data.map(({ id, description }) => (
          <ComboboxOption key={id} value={description} />
        ))}
      </ComboboxPopover>
    </Combobox>
  );
};
Search.propTypes = {
  panTo: PropTypes.func.isRequired,
};
