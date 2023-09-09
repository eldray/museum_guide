import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArtworkDetail = ({ artworkId }) => {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    axios.get(`/api/artworks/${artworkId}/`)
      .then(response => {
        setArtwork(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [artworkId]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
    <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Artwork Detail </h2>
      <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
      <img src={artwork.image} alt={artwork.title} className="w-full mb-4 rounded-lg" />
      <p className="text-gray-700">{artwork.description}</p>
      <p className="mt-2">Artist: {artwork.artist}</p>
      <p>Price: ${artwork.price}</p>
      {/* Add more details and styling */}
      
      {/* Link back to ArtworksList */}
      <Link to="/artworks">Back to Artworks</Link>
    </div>
  );
};

export default ArtworkDetail;
