import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from ' framer-motionreact-icons/fa';
import './Carousel.css';

import image1 from '../components/images/founder.jpg';
import image2 from '../components/images/cover.jpg';
import image3 from '../components/images/user1.jpg';

const images = [image1, image2, image3];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const autoSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (index) => {
    console.error(`Error loading image ${index}: ${images[index]}`);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            {index === activeIndex && (
              <div className="slide-content">
                <p>This is a carousel effect. This is a carousel effect. This is a carousel effect. This is a carousel effect.</p>
              </div>
            )}
            <img
              src={image}
              alt={`Slide ${index}`}
              onError={() => handleImageError(index)} // Handle image loading errors
              className="hidden" // Hide the image, as it's used for preloading
            />
          </motion.div>
        ))}
      </div>
      <FaChevronLeft className="carousel-arrow left" onClick={handlePrev} />
      <FaChevronRight className="carousel-arrow right" onClick={handleNext} />
    </div>
  );
};

export default Carousel;
