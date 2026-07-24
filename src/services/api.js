import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bcr-innovations-server-2.onrender.com/api',
});

export default api;
