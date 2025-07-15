// src/api/receivedFileApi.js
import axios from '../api';

export const createReceivedFile = async (formData) => {
  const token = localStorage.getItem('token');

  const response = await axios.post('/received-files', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const getReceivedFiles = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('/received-files', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
