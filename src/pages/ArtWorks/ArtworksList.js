import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArtworksList = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch Artworks from the backend JSON file
    axios.get('/api/artworks/')
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error('Error fetching artworks:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl text-center text-red-500 font-semibold mb-4">Artworks In Our Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="border p-2">
            <Link to={`/artworks/${artwork.id}`}>
            <p className="text-red-500 text-2xl font-bold mt-2 mb-2">{artwork.title}</p>
              </Link>
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <p className="text-red-700">{artwork.by_artist}</p>
              <p className="text-red-700">{artwork.artist}</p>
              <p className="text-gray-700">{artwork.description}</p>
              <p className="text-gray-700">Price: {artwork.price}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksList;
