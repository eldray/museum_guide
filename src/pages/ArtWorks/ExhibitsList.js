import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExhibitsList = () => {
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    axios.get('/api/exhibits/')
      .then(response => {
        setExhibits(response.data);
      })
      .catch(error => {
        console.error('Error fetching exhibits:', error);
      });
  }, []);

  return (
    <div className="container mt-24">
      <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Exhibits Coming Up In Our Museum</h2>
      <div className="grid grid-cols-2 gap-4">
        {exhibits.map((exhibit) => (
          <div key={exhibit.id} className="border p-2">
            <Link to={`/exhibits/${exhibit.id}`}>
              <p className="text-red-500 text-2xl font-bold mt-2 mb-2">{exhibit.title}</p>
              <img src={exhibit.image} alt={exhibit.title} className="w-2/4 h-100 object-cover" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitsList;
