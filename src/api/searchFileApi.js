import axios from '../api';

export const searchFiles = async (params) => {
  const response = await axios.get('/search-files', { params });
  return response.data;
};
