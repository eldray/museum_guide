import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState({ artworks: [], exhibits: [], artists: [], movements:[] });
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q');

  useEffect(() => {
    if (searchTerm) {
      async function fetchSearchResults() {
        try {
          const response = await axios.get(`/api/search/?q=${encodeURIComponent(searchTerm)}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
      fetchSearchResults();
    }
  }, [searchTerm, location]);

  return (
    <div className="container mt-24">
    {searchResults.artworks.length === 0 && searchResults.exhibits.length === 0 &&
      searchResults.artists.length === 0 && searchResults.movements.length === 0 && (
        <h2 className="text-2xl font-semibold mb-4 text-center">No Search Result Found</h2>
      )}
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-red-500 text-center">Artworks</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {searchResults.artworks.map((artwork) => (
          <div key={artwork.id} className="border p-2">
            <img src={artwork.image} alt={artwork.title} className="w-3/4" />
            <h3 className="mt-2">{artwork.title}</h3>
            <p>Artist: {artwork.by_artist}</p>
            <p>Artist No.: {artwork.artist}</p>
            <p>Description: {artwork.description}</p>
            {/* Add other artwork information */}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-red-500 text-center">Exhibits</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {searchResults.exhibits.map((exhibit) => (
          <div key={exhibit.id} className="border p-2">
            {/* Display exhibit information */}
            <img src={exhibit.image} alt={exhibit.name} className="w-2/4" />
            <h3 className="mt-2">{exhibit.name}</h3>
            <p>Start Date: {exhibit.start_date}</p>
            <p>End Date: {exhibit.end_date}</p>
            <p>Info: {exhibit.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-red-500 text-center">Artists</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {searchResults.artists.map((artist) => (
          <div key={artist.id} className="border p-2">
            <img src={artist.image_path} alt={artist.name} className="w-full" />
            <h3 className="mt-2">{artist.name}</h3>
            <p>Biography: {artist.biography}</p>
            <p>Years Active: {artist.years_active}</p>
            <p>Art Movement: {artist.art_movement}</p>
            <p>Art Medium: {artist.art_medium}</p>
            {/* Add other artist information */}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-red-500 text-center">Art Movements</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {searchResults.movements.map((movement) => (
          <div key={movement.id} className="border p-2">
            {/* Display exhibit information */}
            <img src={movement.image} alt={movement.name} className="w-full" />
            <h3 className="mt-2">{movement.name}</h3>
            <p>Artists: {movement.artists}</p>
            <p>Info: {movement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
      {/* Rest of the code */}
      {/* ... */}
    </div>
  );
};

export default SearchResults;
