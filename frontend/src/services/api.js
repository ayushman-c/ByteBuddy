import axios from 'axios';
import { auth } from './firebase';

const API_URL = import.meta.env.VITE_API_URL || 'https://bytebuddy-backend-ejyc.onrender.com/api';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createOrGetUser = async (userData) => {
  const response = await api.post('/users/auth', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const getAllGigs = async () => {
  const response = await api.get('/gigs');
  return response.data;
};

export const getUserGigs = async () => {
  const response = await api.get('/gigs/my-gigs');
  return response.data;
};

export const createGig = async (gigData) => {
  // Ensure price is a number
  const data = {
    ...gigData,
    price: typeof gigData.price === 'string' ? parseFloat(gigData.price) : gigData.price
  };
  const response = await api.post('/gigs', data);
  return response.data;
};

export const deleteGig = async (gigId) => {
  const response = await api.delete(`/gigs/${gigId}`);
  return response.data;
};

export const improveDescription = async (description) => {
  const response = await api.post('/gemini/improve-description', { description });
  return response.data.improved;
};

export default api;