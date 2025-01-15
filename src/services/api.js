import axios from 'axios';

const api = axios.create({
  baseURL: 'https://673eaf3ca9bc276ec4b54929.mockapi.io/videos',
});

export default api;
