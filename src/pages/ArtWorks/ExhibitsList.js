import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExhibitDetail from './ExhibitDetail'

const ExhibitsList = () => {
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    // Fetch exhibits from the backend JSON file
    axios.get('/api/exhibits/')  // Adjust the URL as needed
      .then(response => {
        setExhibits(response.data);
      })
      .catch(error => {
        console.error('Error fetching exhibits:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
    <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Exhibits Coming Up In Our Museum</h2>
    <div className="grid grid-cols-2 gap-4">
      {exhibits.map((exhibit) => (
        <div key={exhibit.id} className="border p-2">
          <Link to={`/exhibits/${exhibit.id}`}>
            <p className="text-red-500 text-2xl font-bold mt-2 mb-2">{exhibit.title}</p>
          </Link>
          <img src={exhibit.image} 
	   alt={exhibit.title} className="w-2/4" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ExhibitsList;
