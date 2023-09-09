import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.section
      className="bg-gray-100 py-10"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {/* ... your content */}
      <section className="bg-gray-100 py-10">
      <div className="container mx-auto">

        <h2 className="text-3xl text-center text-red-500 font-bold mb-4">Our Services</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Exhibit Tours</h3>
            <p>Join our guided exhibit tours to explore the artworks and learn about the artists behind them.</p>
          </li>

          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Artwork Workshops</h3>
            <p>Participate in interactive workshops to create your own digital artworks and masterpieces.</p>
          </li>

          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Exhibit Tours</h3>
            <p>Join our guided exhibit tours to explore the artworks and learn about the artists behind them.</p>
          </li>

          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Artwork Workshops</h3>
            <p>Participate in interactive workshops to create your own digital artworks and masterpieces.</p>
          </li>
          {/* Add more services */}
          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Exhibit Tours</h3>
            <p>Join our guided exhibit tours to explore the artworks and learn about the artists behind them.</p>
          </li>

          <li className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Artwork Workshops</h3>
            <p>Participate in interactive workshops to create your own digital artworks and masterpieces.</p>
          </li>
        </ul>
      </div>
    </section>
    </motion.section>
  );
};

export default Services;
