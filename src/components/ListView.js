import SavedLocationListItem from './SavedLocationListItem';

const ListView = ({ savedLocations, setSavedLocations }) => {    
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
                     />
                ))}
            </div>
        </>
    );
};

export default ListView;