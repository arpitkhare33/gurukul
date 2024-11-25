import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Adjust this URL based on your backend server
});

export default api;
