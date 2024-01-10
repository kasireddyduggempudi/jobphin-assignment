import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://659bd0dcd565feee2dabc845.mockapi.io', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
