// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // 🔁 Update if your backend runs on a different port
});

// Attach token from localStorage to every request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
