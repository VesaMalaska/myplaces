import { useState, useEffect } from 'react';
import './App.css';
import { GoogleMaps } from './components/MapView';
import Header from './components/Header';
import ListView from './components/ListView';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [
    selectedLocation, 
    setSelectedLocation
  ] = useState({
    id: null,
    title: '',
    address: {
      street: '',
      postalcode: '',
      city: '',
      country: '',
    },
    coordinates: {
      lat: null,
      lng: null,
    },
    isOpen: false,
  });
  const [savedLocations, setSavedLocations] = useState([]);
  const [addNewLocationModalOpen, setAddNewLocationModalOpen] = useState(false);

  useEffect(() => {
    getSavedLocationsFromLocalStorage();
  }, []);
  
  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);
  
  const resetSelectedLocation = () => {
    setSelectedLocation({
      id: null,
      title: '',
        address: {
        street: '',
        postalcode: '',
        city: '',
        country: '',
      },
      coordinates: {
        lat: null,
        lng: null,
      },
      description: '',
      isOpen: false,
    });
  };

  const getSavedLocationsFromLocalStorage = () => {
    if(localStorage.getItem('savedLocations') === null){
      localStorage.setItem('savedLocations', JSON.stringify([]));
    } else {
      let savedLocationsLocal = JSON.parse(localStorage.getItem('savedLocations'));
      setSavedLocations(savedLocationsLocal);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header resetSelectedLocation={resetSelectedLocation} setAddNewLocationModalOpen={setAddNewLocationModalOpen} />
        <Routes>
          <Route path='/mapview' element={
            <GoogleMaps  
              savedLocations={savedLocations}
              setSavedLocations={setSavedLocations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setAddNewLocationModalOpen={setAddNewLocationModalOpen}
              addNewLocationModalOpen={addNewLocationModalOpen}
              resetSelectedLocation={resetSelectedLocation}
            />
          } /> 
          <Route path='/listview' element={
              <ListView  
                savedLocations={savedLocations}
                setSavedLocations={setSavedLocations}              
              />
            } 
          />
          <Route path='*' element={<Navigate to='/mapview' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
