import axios from 'axios';
import router from '@/router';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

// Interceptor to set the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push({ name: 'UserLogin' }); // Send user to the login page
    }
    return Promise.reject(error);
  }
);

export default instance;
