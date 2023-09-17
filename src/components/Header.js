import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import ArtworkSearchInput from './ArtworkSearchInput';

const Header = () => {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <header className="bg-gray-900 text-white z-10 mt-0 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="ml-50 rounded-full h-10 mr-4" />
          <nav className="flex items-center space-x-4 text-xl font-bold">
            <Link to="/" className="hover:text-red-500 text-sm">Home</Link>
            <Link to="/ArtworksList" className="hover:text-red-500 text-sm">ArtWorks</Link>
            <Link to="/ExhibitsList" className="hover:text-red-500 text-sm">Exhibits</Link>
            <Link to="/ArtistModels" className="hover:text-red-500 text-sm">Artists</Link>
            <Link to="/ArtMovements" className="hover:text-red-500 text-sm">Movements</Link>
            <Link to="/AboutPage" className="hover:text-red-500 text-sm">About</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-gray-800 hover:text-white hover:bg-red-500 px-2 py-1 rounded-full transition-colors text-sm">Login</Link>
          <Link to="/register" className="bg-gray-800 hover:text-white hover:bg-red-500 px-2 py-1 rounded-full transition-colors text-sm">Register</Link>
          <ArtworkSearchInput onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
