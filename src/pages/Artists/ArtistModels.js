import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistModels = () => {
  const [artistModels, setArtistModels] = useState([]);

  useEffect(() => {
    async function fetchArtistModels() {
      try {
        // Replace '/api/artist-models/' with your actual API endpoint
        const response = await axios.get('/api/artist-models/');
        const data = response.data;

        setArtistModels(data);
      } catch (error) {
        console.error('Error fetching artist models:', error);
      }
    }

    fetchArtistModels();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Artists In Our Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artistModels.map((artistModel) => (
          <div key={artistModel.id} className="bg-white rounded-lg shadow-lg">
            <img
              src={artistModel.image_path}
              alt={artistModel.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg text-red-500 font-semibold mb-2">{artistModel.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{artistModel.biography}</p>
              <p className="text-sm text-gray-600 mb-2">Years Active: {artistModel.years_active}</p>
              <p className="text-sm text-gray-600 mb-2">Art Movement: {artistModel.art_movement}</p>
              <p className="text-sm text-gray-600 mb-2">Art Medium: {artistModel.art_medium}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistModels;
