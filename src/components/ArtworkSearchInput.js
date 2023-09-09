import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArtworkSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search/results?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by title or artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} // Add this line
        className="bg-gray-800 text-white px-4 py-2 rounded-full w-64"
      />
      <button
        onClick={() => {
          if (searchTerm.trim() !== '') {
            navigate(`/search/results?q=${encodeURIComponent(searchTerm)}`);
          }
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-full ml-4"
      >
        Search
      </button>
    </div>
  );
};

export default ArtworkSearchInput;
