import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (!error.response) {
      console.error('Network error - make sure your backend is running');
    }
    return Promise.reject(error);
  }
); 