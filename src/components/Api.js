import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Add an interceptor for request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
