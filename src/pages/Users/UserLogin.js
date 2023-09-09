import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';+

const UserLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      // Redirect to user profile or dashboard after successful login
      history.push('/user/userprofile'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <Link to="/user/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default UserLogin;