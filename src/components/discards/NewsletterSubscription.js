import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/api/subscribe_newsletter/',
        { email }
      );
      // Handle response, show success message, etc.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-6 container mx-auto flex flex-col md:flex-row items-center justify-between">
      <form onSubmit={handleSubmit} className="mt-2 md:mt-0 flex items-center">
        <p className="text-gray-600">Subscribe to our newsletter:</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-l-lg px-4 py-2 w-full md:w-auto bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-r-lg md:ml-2 mt-2 md:mt-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
