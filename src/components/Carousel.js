import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import image1 from '../components/images/header1.jpg';
import image2 from '../components/images/header2.jpg';
import image3 from '../components/images/header3.jpg';
import image4 from '../components/images/header4.jpg';
import image5 from '../components/images/header5.jpg';

const images = [
  {
    src: image1,
    title: 'Image 1',
    description: 'This is the description for Image 1.',
  },
  {
    src: image2,
    title: 'Image 2',
    description: 'This is the description for Image 2.',
  },
  {
    src: image3,
    title: 'Image 3',
    description: 'This is the description for Image 3.',
  },
  {
    src: image4,
    title: 'Image 4',
    description: 'This is the description for Image 4.',
  },
  {
    src: image5,
    title: 'Image 5',
    description: 'This is the description for Image 5.',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const handlePrev = () => {
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          className="w-full h-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img src={images[currentIndex].src} alt={images[currentIndex].title} />
          <div className="absolute top-1/2 left-0 right-0 text-white text-center p-4">
            <h1 className="text-3xl font-bold">{images[currentIndex].title}</h1>
            <p className="text-xl">{images[currentIndex].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between">
        <FaArrowLeft
          className="text-3xl text-white cursor-pointer"
          onClick={handlePrev}
        />
        <FaArrowRight
          className="text-3xl text-white cursor-pointer"
          onClick={handleNext}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-3 h-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
