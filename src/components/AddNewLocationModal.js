import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const AddNewLocationModal = (props) => {

    const { 
        addNewLocationModalOpen, 
        setAddNewLocationModalOpen, 
        selectedLocation, 
        savedLocations, 
        setSavedLocations, 
        resetSelectedLocation 
    } = props;

    const [placeTitle, setPlaceTitle] = useState('');
    const [placeDescription, setPlaceDescription] = useState({descriptionValue: ''});
    const [placeOpen, setPlaceOpen] = useState(false);
    const [showCoordinates, setShowCoordinates] = useState(false);

    const updatePlaceTitleHandler = (e) => {
        setPlaceTitle(e.target.value);
    };

    const updatePlaceDescriptionHandler = (e) => {
        setPlaceDescription({descriptionValue: e.target.value});
    };

    const cancelAddNewLocationHandler = () => {
        resetAddNewModal();
    };

    const addNewLocationToSavedLocations = () => {
        const newLocationObject = {
            id: uuidv4(),
            title: placeTitle,
            address: {
                street: selectedLocation.address.street,
                postalcode: selectedLocation.address.postalcode,
                city: selectedLocation.address.city,
                country: selectedLocation.address.country,
            },
            coordinates: {
                lat: selectedLocation.coordinates.lat,
                lng: selectedLocation.coordinates.lng,
            },
            description: placeDescription.descriptionValue,
            isOpen: placeOpen,
        };
        setSavedLocations([...savedLocations, newLocationObject]);
        resetAddNewModal();
    };

    const resetAddNewModal = () => {
        setAddNewLocationModalOpen(false);
        setPlaceTitle('');
        setPlaceOpen(false);
        resetSelectedLocation();
    };

    return (
        <div className={`modal-overlay ${!addNewLocationModalOpen ? 'hidden' : ''}`}>
            <div className="modal-container">
                <h3>Add new place</h3>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Title:</h4>
                    <input type="text" id="title" name="title" placeholder="Name this place" value={placeTitle} onChange={(e) => {updatePlaceTitleHandler(e)}} />
                </div>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Address:</h4>
                    <p className="modal-text">
                        {selectedLocation.address.street}<br />
                        {selectedLocation.address.postalcode} {selectedLocation.address.city}
                    </p>
                </div>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Place open:</h4>
                    <label className="onOffSwitch">
                        <input type="checkbox" checked={placeOpen} onChange={() => {setPlaceOpen(!placeOpen)}} />
                        <span className="onOffSwitchSlider"></span>
                    </label>
                </div>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Description:</h4>
                    <textarea id="description" name="description" rows="5" cols="32" value={placeDescription.descriptionValue} onChange={(e) => {updatePlaceDescriptionHandler(e)}}></textarea>
                </div>
                <div className={`modal-block-wrapper `}>
                    <div className="title-with-drop-down-arrow-wrapper">
                        <h4 className="modal-label">Coordinates:</h4>
                        <button className={`drop-down-button ${showCoordinates ? 'drop-down-button-rotated' : ''}`} onClick={() => {setShowCoordinates(!showCoordinates)}}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                    <div className={`modal-extra-info ${showCoordinates ? 'modal-extra-info-full-height' : ''}`}>
                        Latitude: {selectedLocation.coordinates.lat}<br />
                        Longitude: {selectedLocation.coordinates.lng}
                    </div>
                </div>
                <div className="modal-buttons-wrapper">
                    <button className="modal-cancel-button" onClick={() => {cancelAddNewLocationHandler()}}>Cancel</button>
                    <button className="modal-add-button" onClick={() => {addNewLocationToSavedLocations()}}>Add place</button>
                </div>
            </div>
            <div className="modal-container-hidden-padding"></div>
        </div>
    );
};

export default AddNewLocationModal;