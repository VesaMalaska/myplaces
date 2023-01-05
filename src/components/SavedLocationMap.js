import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { mapInitialZoom, savedLocationMapContainerStyle } from '../utils/mapUtils';

const SavedLocationMap = ({ savedLocationCoordinates }) => {

    const SavedLocationMarker = () => {
      if(savedLocationCoordinates.lat !== null || savedLocationCoordinates.lat !== undefined) {
        return (
          <Marker 
            position={savedLocationCoordinates}
          />
        );
      } else return '';
    };
  
    return (
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        > 
  
          <GoogleMap
            mapContainerStyle={savedLocationMapContainerStyle}
            center={savedLocationCoordinates}
            zoom={mapInitialZoom + 2}
          >
            <SavedLocationMarker />
          </GoogleMap>
        </LoadScript>
    );
  };

  export default SavedLocationMap;