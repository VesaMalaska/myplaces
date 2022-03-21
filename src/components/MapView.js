import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Geocode from "react-geocode";
import { mapContainerStyle, mapInitialCenterCoordinates, mapInitialZoom } from '../utils/mapUtils';

Geocode.setApiKey('AIzaSyAoH9-myuIXGNys5y5f3fFPvtYG_FL0WFo'); 
/* process.env.REACT_APP_GOOGLE_API_KEY */
Geocode.setRegion("fi");
Geocode.setLocationType("ROOFTOP");

const MapView = (props) => {

  const {
    selectedLocation,
    setSelectedLocation, 
    savedLocations,
    setModalOpen
  } = props;

  const openLocationInfoModal = () => {
    setModalOpen(true);
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

  const initMapLocationToState = async (latLng) => {
    try {              
      if(latLng === null) {
        // TODO: Route to error 
        console.log('Initializing map location failed. No coordinates available.');
        return;
      }
      let geocodingApiResponse = await Geocode.fromLatLng(latLng.lat(), latLng.lng());
      const { address_components: addressComponents } = geocodingApiResponse.results[0];
      setSelectedLocation(
        {
          id: null,
          title: '',
          address: {
            street: addressComponents[1].long_name + ' ' + addressComponents[0].long_name,
            postalcode: addressComponents[4].long_name,
            city: addressComponents[2].long_name,
            country: addressComponents[3].long_name,
          },
          coordinates: {
            lat: latLng.lat(),
            lng: latLng.lng(),
          },
          description: '',
          isOpen: false,
        }
      );  
    } catch (error) {
      console.log(`Prosessing Google Geocoding Api response failed. ${error}`);
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey='AIzaSyAoH9-myuIXGNys5y5f3fFPvtYG_FL0WFo'
      >
      {/*googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}*/}

        <GoogleMap
          onClick={e => {
            const { latLng } = e;
            initMapLocationToState(latLng);
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
    </>
  );
}

export default MapView;