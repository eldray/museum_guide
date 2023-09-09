import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.section
      className="bg-white py-10"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {/* About Content */}
      <section className="bg-white py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center text-red-500 font-bold mb-4">About Us</h2>
        <p className="text-gray-600 mb-2">
          Discover a world of art and creativity at ArtVoyage Museum. Our museum showcases a diverse collection of digital artworks that will inspire and captivate your imagination.
        </p>
            <p className="text-gray-600 mb-2">
              ArtVoyage is an Interactive Museum Guide and Digital Art Gallery platform that allows museum visitors to explore exhibits and artworks while providing a space for artists to showcase and sell their digital creations.
            </p>
            <p className="text-gray-600 mb-2">
              We believe in the power of digital art to inspire, provoke thought, and challenge conventions. Our services encompass a wide range of artistic styles and forms, from intricate digital paintings to mesmerizing generative art.
            </p>
            <Link to="/AboutPage" className="bg-red-500 hover:bg-black hover:hover:text-white px-5 py-3 rounded-full">Read More</Link>
      </div>
    </section>
    </motion.section>
  );
};

export default About;
