import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faListUl, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Header = ({ resetSelectedLocation, setAddNewLocationModalOpen }) => {
    const cancelAddingNewLocation = () => {
        resetSelectedLocation();
        setAddNewLocationModalOpen(false);
    };

    return (
        <header>
            <div className="flex-container">
                <h1>My Places <span className="app-icon"><FontAwesomeIcon icon={faLocationDot} /></span></h1>
                <nav className='flex-container '>
                    <NavLink to="/mapview" className="nav-link" onClick={() => {cancelAddingNewLocation()}}>
                        <FontAwesomeIcon icon={faMapLocationDot} />
                    </NavLink>
                    <NavLink to="/listview" className="nav-link" onClick={() => {cancelAddingNewLocation()}}>
                        <FontAwesomeIcon icon={faListUl} />
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;