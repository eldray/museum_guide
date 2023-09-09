import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Axios from 'axios';

const FeaturedArtists = () => {
  const [artists, setArtists] = useState([]);

  // Fetch artist data from the backend when the component mounts
  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await Axios.get('api/sample-artists/');
        const data = response.data;
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }

    fetchArtists();
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
        <h2 className="text-3xl text-center text-red-500 font-bold mb-4">Featured Artists</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Artist Cards */}
          {artists.map(artist => (
            <motion.div
              key={artist.id}
              variants={cardVariants}
              className="bg-gray-300 p-4 shadow-xl rounded-lg hover:text-red-500"
            >
              <img
                src={artist.image_url}
                alt={artist.name}
                className="rounded-lg mb-2 w-full"
              />
              <h3 className="text-lg font-semibold text-center hover:text-red-500">
                {artist.name}
              </h3>
              <p className="text-gray-600 text-center hover:text-red-500">
                {artist.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
