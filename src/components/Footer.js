import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('/api/subscribe_newsletter/', { email });
      if (response.status === 200) {
        setSubscriptionMessage('Subscribed successfully!');
      }
    } catch (error) {
      console.error(error);
      setSubscriptionMessage('An error occurred while subscribing.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <nav className="flex space-x-4">
            <Link to="/" className="hover:text-red-500 text-sm">Home</Link>
            <Link to="/ArtworksList" className="hover:text-red-500 text-sm">ArtWorks</Link>
            <Link to="/ExhibitsList" className="hover:text-red-500 text-sm">Exhibits</Link>
            <Link to="/UserProfile" className="hover:text-red-500 text-sm">UserProfile</Link>
            <Link to="/ArtistProfile" className="hover:text-red-500 text-sm">ArtistProfile</Link>
            <Link to="/Register" className="hover:text-red-500 text-sm">Sign Up</Link>
          {/* Add more menu links */}
        </nav>
        <div className="flex space-x-4">
          <FaFacebook className="text-3xl hover:text-red-500" />
          <FaTwitter className="text-3xl hover:text-red-500" />
          <FaInstagram className="text-3xl hover:text-red-500" />
          <FaEnvelope className="text-3xl hover:text-red-500" />
        </div>
      </div>

      <div className="mt-6 container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mt-2 md:mt-0 flex items-center">
          <p className="text-gray-600">Subscribe to our newsletter:</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-l-lg px-4 py-2 w-full md:w-auto bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-r-lg md:ml-2 mt-2 md:mt-0"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
        {subscriptionMessage && <p className="text-green-500">{subscriptionMessage}</p>}
        <p className="text-center md:text-left mt-4 md:mt-0 text-sm">
          &copy; 2023 ArtVoyage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
