import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtMovements = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    // Fetch exhibits from the backend JSON file
    axios.get('/api/movements/')
      .then(response => {
        setMovements(response.data);
      })
      .catch(error => {
        console.error('Error fetching Art Movements:', error);
      });
  }, []);

  return (
    <div className="container mt-24">
      <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Art Movements</h2>
      <div className="grid grid-cols-3 gap-4">
        {movements.map((movement) => (
          <div key={movement.id} className="container border p-4">
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-2xl font-bold mt-2 mb-2 text-center">{movement.title}</p>
              <img
                src={movement.image}
                alt={movement.title}
                className="w-full h-100 object-cover"
              />
              <p className="text-md text-red-700 mb-2">Artists: {movement.artists}</p>
              <p className="text-md text-gray-600">Description: {movement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtMovements;
