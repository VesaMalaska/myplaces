import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const LocationInfoEditModal = (props) => {
    const { 
        modalOpen, 
        setModalOpen, 
        selectedLocation, 
        savedLocations, 
        setSavedLocations, 
        resetSelectedLocation,
    } = props;

    const { street, postalcode, city, country } = selectedLocation.address;
    const { lat, lng } = selectedLocation.coordinates;

    const [placeTitle, setPlaceTitle] = useState('');
    const [placeDescription, setPlaceDescription] = useState({descriptionValue: ''});
    const [placeOpen, setPlaceOpen] = useState(false);
    const [showCoordinates, setShowCoordinates] = useState(false);

    useEffect(() => {
        setPlaceTitle(selectedLocation.title);
        setPlaceDescription({descriptionValue: selectedLocation.description});
        setPlaceOpen(selectedLocation.isOpen);
    }, [selectedLocation]);

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
        const newLocationTitle = placeTitle !== '' ? placeTitle : 'MyPlace@' + street;
        const locationId = selectedLocation.id === null ? uuidv4() : selectedLocation.id;

        const newLocationObject = {
            id: locationId,
            title: newLocationTitle,
            address: {
                street,
                postalcode,
                city,
                country,
            },
            coordinates: {
                lat,
                lng,
            },
            description: placeDescription.descriptionValue,
            isOpen: placeOpen,
        };

        let filteredSavedLocations = savedLocations;
        if(selectedLocation.id !== null) {
            filteredSavedLocations = savedLocations.filter(savedLocation => {
                return savedLocation.id !== selectedLocation.id;
            });
        }
        setSavedLocations([...filteredSavedLocations, newLocationObject]);
        resetAddNewModal();
    };

    const resetAddNewModal = () => {
        setModalOpen(false);
        setPlaceTitle('');
        setPlaceDescription({descriptionValue: ''});
        setPlaceOpen(false);
        resetSelectedLocation();
    };

    return (
        <div className={`modal-overlay ${!modalOpen ? 'hidden' : ''}`} onClick={() => {resetAddNewModal()}}>
            <div className="modal-container" onClick={(event) => {event.stopPropagation()}}>
                    <h3>My Place <span className="app-icon"><FontAwesomeIcon icon={faLocationDot} /></span></h3>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Title:</h4>
                    <input type="text" id="title" name="title" placeholder="Name this place" value={placeTitle} onChange={(e) => {updatePlaceTitleHandler(e)}} />
                </div>
                <div className="modal-block-wrapper">
                    <h4 className="modal-label">Address:</h4>
                    <p className="modal-text">
                        {street}<br />
                        {postalcode} {city}
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
                    <textarea id="description" name="description" rows="3" cols="32" value={placeDescription.descriptionValue} onChange={(e) => {updatePlaceDescriptionHandler(e)}}></textarea>
                </div>
                <div className={`modal-block-wrapper `}>
                    <div className="title-with-drop-down-arrow-wrapper">
                        <h4 className="modal-label">Coordinates:</h4>
                        <button className={`drop-down-button ${showCoordinates ? 'drop-down-button-rotated' : ''}`} onClick={() => {setShowCoordinates(!showCoordinates)}}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                    <div className={`modal-extra-info ${showCoordinates ? 'modal-extra-info-full-height' : ''}`}>
                        Latitude: {lat}<br />
                        Longitude: {lng}
                    </div>
                </div>
                <div className="modal-buttons-wrapper">
                    <button className="modal-add-button" onClick={() => {addNewLocationToSavedLocations()}}>Save</button>
                    <button className="modal-cancel-button" onClick={() => {cancelAddNewLocationHandler()}}>Cancel</button>
                </div>
            </div>
            <div className="modal-container-hidden-padding"></div>
        </div>
    );
};

export default LocationInfoEditModal;