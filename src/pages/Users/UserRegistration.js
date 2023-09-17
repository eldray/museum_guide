import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:8000/api/user/register/', formData);
      console.log('Response:', response);
      const { token, user_id } = response.data;
      console.log('Token:', token);

      // Store the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);

      if (response.status === 201) {
        // Successful registration
        history('/userlogin'); // Redirect to login page
      } else {
        // Handle error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // ... JSX for the registration form
    <div className="flex justify-center items-center h-screen">
    <div className="bg-gray-700 p-6 rounded-lg border-red-500 w-96">
      <h2 className="text-red-500 text-center text-2xl mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-white block">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-white block">
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
        <div className="space-y-2">
          <label htmlFor="password" className="text-white block">
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-white">
        Already have an account? <Link to="/login" className="text-red-500">Login</Link>
      </p>
    </div>
  </div>
  );
};

export default UserRegistration;
