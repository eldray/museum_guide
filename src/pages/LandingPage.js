import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedArtworks from '../components/FeaturedArtworks';
import FeaturedArtists from '../components/FeaturedArtists';
import UserStories from '../components/UserStories';
import ContactForm from '../components/ContactForm';

const LandingPage = () => {

  return (
    <div>
      <Carousel />
      <About />
      <Services />
      <UserStories />
      <FeaturedArtists  />
      <FeaturedArtworks />
      <ContactForm />

      {/* ... */}
    </div>
  );
};

export default LandingPage;
