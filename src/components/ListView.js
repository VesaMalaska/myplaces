import SavedLocationListItem from './SavedLocationListItem';

const ListView = ({ savedLocations, setSavedLocations }) => {    
    return (
        <>
            <div className="container">
                <h1>This is places page!</h1>

                {savedLocations.map(location => (
                    <SavedLocationListItem location={location} />
                ))}
            </div>
        </>
    );
};

export default ListView;