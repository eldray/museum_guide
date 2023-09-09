import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      .split('=')[1];
    return csrfToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/api/submit_contact_form/',
        { name, email, message },
        {
          headers: {
            'X-CSRFToken': getCsrfToken(),
          },
        }
      );
      // Handle response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white py-10 px-10 flex justify-center items-center h-screen">
      <div className="bg-gray-300 p-6 rounded-lg shadow-2xl border border-gray-300 w-96">
        <h2 className="text-2xl text-center text-red-500 font-semibold mb-4">Contact Us</h2>
        <form className=" rounded-lg border-black-2 p-8" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border bg-gray-100 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border bg-gray-100 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="comments" className="block text-sm font-medium">Comments:</label>
            <textarea
              id="comments"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border bg-gray-100 rounded-lg px-4 py-2"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-500 align-center text-white px-4 py-2 rounded-lg hover:bg-black-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
