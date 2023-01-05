import React from 'react';
import SavedLocationListItem from './SavedLocationListItem';

const ListView = ({ savedLocations, setSavedLocations, setSelectedLocation, setModalOpen, setModalState }) => {    
    return (
        <>
            <div className="container">
                <h2 className='saved-locations-page-heading'>My Places</h2>

                {savedLocations.map(location => (
                    <SavedLocationListItem 
                        location={location}
                        key={location.id}
                        savedLocations={savedLocations}
                        setSavedLocations={setSavedLocations}
                        setSelectedLocation={setSelectedLocation} 
                        setModalOpen={setModalOpen}
                        setModalState={setModalState} 
                     />
                ))}
            </div>
        </>
    );
};

export default ListView;