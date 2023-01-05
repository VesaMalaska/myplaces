import React, { useState, useEffect } from 'react';
import './App.css';
import MapView from './components/MapView';
import Header from './components/Header';
import ListView from './components/ListView';
import LocationInfoEditModal from './components/LocationInfoEditModal';
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
    description: '',
    isOpen: false,
  });
  const [savedLocations, setSavedLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
        <Header resetSelectedLocation={resetSelectedLocation} setModalOpen={setModalOpen} />
        <Routes>
          <Route path='/mapview' element={
            <MapView  
              savedLocations={savedLocations}
              setSavedLocations={setSavedLocations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setModalOpen={setModalOpen}
              resetSelectedLocation={resetSelectedLocation}
            />
          } /> 
          <Route path='/listview' element={
            <ListView  
              savedLocations={savedLocations}
              setSavedLocations={setSavedLocations}
              setSelectedLocation={setSelectedLocation} 
              setModalOpen={setModalOpen}          
            />
          } />
          <Route path='*' element={<Navigate to='/mapview' />} />
        </Routes>
        <LocationInfoEditModal 
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedLocation={selectedLocation}
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
          resetSelectedLocation={resetSelectedLocation}
        />
      </div>
    </Router>
  );
}

export default App;
