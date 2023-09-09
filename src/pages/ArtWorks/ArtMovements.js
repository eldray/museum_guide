import axios from 'axios';
import React, { useEffect, useState } from 'react';


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
    <div className="container mx-auto mt-8">
    <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Art Movements</h2>
    <div className="grid grid-cols-2 gap-4">
      {movements.map((movement) => (
        <div key={movement.id} className="border p-2">
          <p className="text-red-500 text-2xl font-bold mt-2 mb-2">{movement.title}</p>
            <img src={movement.image} 
	   alt={movement.title} className="w-2/4" />
            <p>Artists: {movement.artists}</p>
            <p className="text-md text-gray-600 mb-2">Description: {movement.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ArtMovements;
