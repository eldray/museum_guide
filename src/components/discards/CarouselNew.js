import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './CarouselNew.css'; // Add your CSS styles here

const MAX_VISIBILITY = 3;

const Carousel = ({ images }) => {
  const [active, setActive] = useState(0);
  const count = images.length;

  const handlePrev = () => {
    setActive(prevIndex => (prevIndex === 0 ? count - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActive(prevIndex => (prevIndex === count - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='carousel'>
      <button className='nav left' onClick={handlePrev}>
        <TiChevronLeftOutline />
      </button>
      {images.map((image, i) => (
        <div
          key={i}
          className='card-container'
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}
        >
          <img src={image} alt={`Image ${i + 1}`} />
        </div>
      ))}
      <button className='nav right' onClick={handleNext}>
        <TiChevronRightOutline />
      </button>
    </div>
  );
};

export default Carousel;
