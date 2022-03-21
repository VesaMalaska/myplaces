import { useState } from 'react';
import { GoogleMapsSavedLocation } from './MapView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCircle } from '@fortawesome/free-solid-svg-icons';

const SavedLocationListItem = ({ location }) => {

    const [showContent, setShowContent] = useState(false);

    return(
        <div className="saved-location-item-wrapper">
            <div className="title-with-drop-down-arrow-wrapper">
                <h3 className="modal-label">{location.title}</h3>
                <button className={`drop-down-button ${showContent ? 'drop-down-button-rotated' : ''}`} onClick={() => {setShowContent(!showContent)}}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
            <div className="saved-location-item-content-flex-container">
                <div className={`saved-location-item-content-wrapper ${showContent ? 'saved-location-item-content-wrapper-active' : ''}`}>
                    <div className="saved-location-item-block-wrapper">
                        <h4 className="modal-label">Address:</h4>
                        <p className="modal-text">
                            {location.address.street}<br />
                            {location.address.postalcode} {location.address.city}
                        </p>
                    </div>
                    <div className="saved-location-item-block-wrapper">
                        <h4 className="modal-label">Description:</h4>
                        <p className="modal-text">{location.description}</p>
                    </div>
                    
                    <div className="saved-location-item-block-wrapper flex-container-justify-start">
                        <div className={`place-open-indicator ${!location.isOpen ? 'place-closed' : ''}`}><FontAwesomeIcon icon={faCircle} /></div>
                        <p className="modal-text">This place is {location.isOpen ? 'open' : 'closed'}</p>
                    </div>
                </div>
                <div className={`saved-location-map ${showContent ? 'saved-location-map-active' : ''}`}>
                    <GoogleMapsSavedLocation savedLocationCoordinates={location.coordinates} />
                </div>
            </div>
        </div>
    );
};

export default SavedLocationListItem;