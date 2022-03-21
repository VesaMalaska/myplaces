import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNewLocationModal from './AddNewLocationModal';
import Geocode from "react-geocode";
import { mapContainerStyle, mapInitialCenterCoordinates, mapInitialZoom } from '../utils/mapUtils';

Geocode.setApiKey('AIzaSyAoH9-myuIXGNys5y5f3fFPvtYG_FL0WFo'); {/* process.env.REACT_APP_GOOGLE_API_KEY */}
Geocode.setRegion("fi");
Geocode.setLocationType("ROOFTOP");

const MapView = (props) => {

  const {
    selectedLocation,
    setSelectedLocation, 
    savedLocations,
    setSavedLocations,
    setAddNewLocationModalOpen,
    addNewLocationModalOpen,
    resetSelectedLocation
  } = props;

  const openLocationInfoModal = () => {
    setAddNewLocationModalOpen(true);
  };

  const SavedLocationsMarkers = () => {
    if(savedLocations.length > 0) {
      return (
        savedLocations.map(savedLocation => (
          <Marker 
            position={savedLocation.coordinates}
            key={savedLocation.id}
            title={savedLocation.title}
          />
        ))
      );
    } else return '';
  };

  const SelectedLocationMarker = () => {
    if(selectedLocation.coordinates.lat !== null) {
      return (
        <Marker 
          position={selectedLocation.coordinates}
        />
      );
    } else return '';
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey='AIzaSyAoH9-myuIXGNys5y5f3fFPvtYG_FL0WFo'
      >
      {/*googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}*/}

        <GoogleMap
          onClick={async e => {
            let addressComponents = await Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng());
            addressComponents = addressComponents.results[0].address_components;
            setSelectedLocation(
              {
                address: {
                  street: addressComponents[1].long_name + ' ' + addressComponents[0].long_name,
                  postalcode: addressComponents[4].long_name,
                  city: addressComponents[2].long_name,
                  country: addressComponents[3].long_name,
                },
                coordinates: {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                }
              }
            );
          }}
          mapContainerStyle={mapContainerStyle}
          center={mapInitialCenterCoordinates}
          zoom={mapInitialZoom}
        >
          <SavedLocationsMarkers />
          <SelectedLocationMarker />
          <button className={`add-new-location-button ${selectedLocation.coordinates.lat === null ? 'hidden' : ''}`} onClick={() => {openLocationInfoModal()}} >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </GoogleMap>
      </LoadScript>
      
      <AddNewLocationModal 
        addNewLocationModalOpen={addNewLocationModalOpen}
        setAddNewLocationModalOpen={setAddNewLocationModalOpen}
        selectedLocation={selectedLocation}
        savedLocations={savedLocations}
        setSavedLocations={setSavedLocations}
        resetSelectedLocation={resetSelectedLocation}
      />
    </>
  );
}

export default MapView;