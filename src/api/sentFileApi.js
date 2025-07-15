// src/api/sentFileApi.js
import axios from '../api';

export const fetchSentFiles = () =>
  axios.get('/sent-files').then(res => res.data);

export const createSentFile = formData =>
  axios.post('/sent-files', formData).then(res => res.data);
