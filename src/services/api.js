import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://bcr-innovations-server-1.onrender.com/api',
});

// Interceptor to bypass corrupted browser cache
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() };
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
