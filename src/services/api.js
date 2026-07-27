import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bcr-innovations-server-1.onrender.com/api',
});

export default api;
