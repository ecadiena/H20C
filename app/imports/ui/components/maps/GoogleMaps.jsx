import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import { formatRelative } from "date-fns";
//
// import '@reach/combobox/styles.css';
// import mapStyles from "./mapStyles";

const libraries = ['places'];
const mapContainerStyle = {
  width: '80%',
  height: '500px',
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};

export const GoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'loading maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      />
    </div>
  );

};
