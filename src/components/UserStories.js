
import React, { useEffect, useState } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import user1 from './images/user1.jpg';
import user2 from './images/user2.JPG';
import user3 from './images/user3.jpg';
import user4 from './images/user4.JPG';

const userStories = [
  {
    name: 'John',
    image: user1,
    story: "I was amazed by the variety of artworks. The digital format brings a new dimension to art.ArtVoyage has become my one-stop shop for digital art",
  },
  {
    name: 'Linda',
    image: user4,
    story: "As an art enthusiast, ArtVoyage provided me with a platform to reach view various artworks at the comfort of my place.  All my friends do is talk about their experiences, you can't be left out.",
  },
  {
    name: 'Ama',
    image: user2,
    story: "As an artist, ArtVoyage provided me with a platform to reach a global audience.!",
  },
  {
    name: 'Philippa',
    image: user3,
    story: "As an artist, ArtVoyage provided me with a platform to reach a global audience. An incredible opportunity!",
  },
];

const UserStories = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % userStories.length);
    }, 5000); // Change story every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="py-10"
      ref={ref}
      initial={{ x: -50 }}
      animate={controls}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl text-center text-red-500 font-bold mb-4">User Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
          {userStories.map((user, index) => (
            <motion.div
              key={index}
              className={`bg-white p-4 shadow border-black rounded-lg flex space-x-4 ${index === activeIndex ? '' : 'hidden'}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <img src={user.image} alt={`${user.name}'s photo`} className="w-24 h-24 rounded-full" />
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default UserStories;
