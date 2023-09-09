import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const ArtistRegistration = () => {
  const history = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/artist/register/', values);
      if (response.status === 201) {
        // Successful registration
        history('/login'); // Redirect to login page
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-8 ">
      <div className="bg-gray-700 p-6 rounded-lg border-red-500 w-96">
        <h2 className="text-red-500 text-center mb-4">Artist Registration</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            artistType: '',
            biography: '',
            website: '',
            socialMedia: {
              facebook: '',
              twitter: '',
              instagram: '',
            },
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
          {/* ... (form fields) */}
          <div className="space-y-2">
              <label htmlFor="name" className="text-white block">
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-white block">
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="artistType" className="text-white block">
                Type of Artist:
              </label>
              <Field
                as="select"
                id="artistType"
                name="artistType"
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option value="graphic designer">Graphic Designer</option>
                <option value="textile designer">Textile Designer</option>
                <option value="photographer">Photographer</option>
                <option value="painter">Painter</option>
                <option value="sculptor">Sculptor</option>
                {/* Add more options */}
              </Field>
            </div>
            <div className="space-y-2">
              <label htmlFor="biography" className="text-white block">
                Biography:
              </label>
              <Field
                as="textarea"
                id="biography"
                name="biography"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="website" className="text-white block">
                Website:
              </label>
              <Field
                type="text"
                id="website"
                name="website"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <h3 className="text-white text-xl">Social Media Accounts</h3>
            <div className="space-y-2">
              <label htmlFor="socialMedia.facebook" className="text-white block">
                Facebook:
              </label>
              <Field
                type="text"
                id="socialMedia.facebook"
                name="socialMedia.facebook"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="socialMedia.twitter" className="text-white block">
                Twitter:
              </label>
              <Field
                type="text"
                id="socialMedia.twitter"
                name="socialMedia.twitter"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="socialMedia.instagram" className="text-white block">
                Instagram:
              </label>
              <Field
                type="text"
                id="socialMedia.instagram"
                name="socialMedia.instagram"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* more social media fields here */}
        
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
            >
              Register
            </button>
          </div>
        </Form>
        </Formik>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-red-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ArtistRegistration;
