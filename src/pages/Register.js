import React from 'react';
import { Link } from 'react-router-dom';
import cover from '../components/images/cover.jpg';

const Register = () => {
  return (
    <div className="bg-gray-200 p-20">
      <h2 className="text-2xl text-red-500 text-center mb-7">ArtVoyage Welcomes You</h2>
      <div className="container mx-auto flex">
        <div className="w-2/3">
          <img
            src={cover}
            alt="company"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="bg-gray-200 p-5 h-8 flex">
          <Link
            to="/ArtistRegistration"
            className="bg-red-500 hover:bg-black text-white px-2 py-1 rounded-lg mr-4"
          >
            Artist Registration
          </Link>
          <Link
            to="/UserRegistration"
            className="bg-red-500 hover:bg-black text-white px-2 py-1 rounded-lg"
          >
            User Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
