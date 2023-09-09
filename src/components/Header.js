import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import ArtworkSearchInput from './ArtworkSearchInput';

const Header = () => {
  const handleSearch = (query) => {
    // Implement your search logic here
    console.log('Searching for:', query);
  };

  return (
    <header className="bg-gray-900 text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="ml-50 rounded-full h-10 mr-4" />
          <nav className="flex items-center space-x-6 text-xl font-bold">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <Link to="/ArtworksList" className="hover:text-red-500">ArtWorks</Link>
            <Link to="/ExhibitsList" className="hover:text-red-500">Exhibits</Link>
            <Link to="/ArtistModels" className="hover:text-red-500">Artists</Link>
            <Link to="/ArtMovements" className="hover:text-red-500">Movements</Link>
            <Link to="/AboutPage" className="hover:text-red-500">About</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-gray-800 hover:text-white hover:bg-red-500 px-2 py-1 rounded-full transition-colors">Login</Link>
          <Link to="/register" className="bg-gray-800 hover:text-white hover:bg-red-500 px-2 py-1 rounded-full transition-colors">Register</Link>
          <ArtworkSearchInput onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
