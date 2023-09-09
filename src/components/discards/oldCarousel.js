import React, { useState } from 'react';
import { motion } from 'framer-motion';
import image1 from './images/image (1).jpg';
import image2 from './images/image (2).jpg';
import image3 from './images/image (3).jpg';

const images = [
  image1,
  image2,
  image3,
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {images.map((_, index) => (
          <li
            key={index}
            data-target="#myCarousel"
            data-slide-to={index}
            className={index === activeIndex ? 'active' : ''}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`item${index === activeIndex ? ' active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={image} alt={`Image ${index}`} />
          </motion.div>
        ))}
      </div>

      <a className="left carousel-control" href="#myCarousel" data-slide="prev" onClick={handlePrev}>
        <span className="glyphicon glyphicon-chevron-left"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" data-slide="next" onClick={handleNext}>
        <span className="glyphicon glyphicon-chevron-right"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
