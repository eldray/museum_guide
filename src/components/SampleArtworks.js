// SampleArtworks

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Axios from 'axios';

const SampleArtworks = () => {
  const [artworks, setArtworks] = useState([]);

  // Fetch artwork data from the backend when the component mounts
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const response = await Axios.get('api/sample-artworks/');
        const data = response.data;
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    }

    fetchArtworks();
  }, []);

  // Variants for motion effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Featured Artworks</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Artwoks Cards */}
          {artworks.map(artworks => (
            <motion.div
              key={artworks.id}
              variants={cardVariants}
              className="bg-gray-300 p-4 shadow-xl rounded-lg hover:text-red-500"
            >
              <img
                src={artworks.image_url}
                alt={artworks.title}
                className="rounded-lg mb-2 w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold text-center hover:text-red-500">
                {artworks.title}
              </h3>
              <p className="text-gray-600 text-center hover:text-red-500">
                {artworks.artist}
              </p>
              <p className="text-gray-600" >{artworks.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SampleArtworks;
