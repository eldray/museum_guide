import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/login/', formData);
      if (response.status === 200) {
        const userType = response.data.user_type;
        if (userType === 'artist') {
          history('/artist-profile');
        } else {
          history('/user-profile');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-700 p-6 rounded-lg border-red-500 w-96">
        <h2 className="text-red-500 mb-4 text-center text-xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-red-500 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-red-500 mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-black text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
