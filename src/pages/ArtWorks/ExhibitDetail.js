import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExhibitDetail = ({ exhibitId })=> {
  console.log("ExhibitDetail component rendered");

  const [exhibit, setExhibit] = useState(null);

  useEffect(() => {
    axios.get(`/api/exhibits/${exhibitId}/`)
      .then(response => {
        setExhibit(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [exhibitId]);

  if (!exhibit) {
    return <div> Error Loading Exhibits...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
    <h2 className="text-3xl font-semibold mb-4 text-red-500 text-center">Exhibit Detail </h2>
      <h2 className="text-2xl font-bold mb-2">{exhibit.title}</h2>
      <p className="text-gray-700">{exhibit.description}</p>
      {/* Add navigation links to related exhibits or sections */}
    </div>
  );
};

export default ExhibitDetail;
