// src/utils/axiosConfig.js
import axios from 'axios';
import { URLBASE } from '../config/constants';

const axiosInstance = axios.create({
  baseURL: URLBASE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;