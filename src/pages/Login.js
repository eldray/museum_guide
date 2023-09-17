import React from 'react';
import { Link } from 'react-router-dom';
import cover from '../components/images/cover.jpg'; 
import ArtistLogin from './Artists/ArtistLogin';
import UserLogin from './Users/UserLogin';

const Register = () => {
  return (
    <div className="bg-gray-200 p-20">
      <h2 className="text-2xl text-red-500 text-center mb-7">Log In to your Account</h2>
      <div className="container mx-auto flex">
        <div className="w-2/3">
          <img
            src={cover}
            alt="company"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="bg-gray-200 p-5 h-10 flex">
          <Link
            to="/ArtistLogin"
            className="bg-red-500 hover:bg-black text-white text-xl px-10 py-8 rounded-lg mr-4"
          >
            Artist Login
          </Link>
          <Link
            to="/UserLogin"
            className="bg-red-500 hover:bg-black text-white text-xl px-10 py-8 rounded-lg"
          >
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
