// Favorites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favoriteExhibits, setFavoriteExhibits] = useState([]);
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);

  useEffect(() => {
    // Fetch favorite exhibits and artworks data from the backend
    axios.get('/api/favorites/').then((response) => {
      setFavoriteExhibits(response.data.favoriteExhibits);
      setFavoriteArtworks(response.data.favoriteArtworks);
    });
  }, []);

  const removeFromFavorites = (id, type) => {
    // Implement remove from favorites logic here
    axios.delete(`/api/favorites/${type}/${id}/`).then(() => {
      // Update state after removal
      if (type === 'exhibit') {
        setFavoriteExhibits(favoriteExhibits.filter((exhibit) => exhibit.id !== id));
      } else {
        setFavoriteArtworks(favoriteArtworks.filter((artwork) => artwork.id !== id));
      }
    });
  };

  return (
    <div>
      <h2>Favorite Exhibits</h2>
      <ul>
        {favoriteExhibits.map((exhibit) => (
          <li key={exhibit.id}>
            {exhibit.name}{' '}
            <button onClick={() => removeFromFavorites(exhibit.id, 'exhibit')}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Favorite Artworks</h2>
      <ul>
        {favoriteArtworks.map((artwork) => (
          <li key={artwork.id}>
            {artwork.title}{' '}
            <button onClick={() => removeFromFavorites(artwork.id, 'artwork')}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;