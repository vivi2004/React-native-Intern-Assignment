import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// Models API
export const modelsAPI = {
  getAll: (category?: string) =>
    api.get('/models', { params: category ? { category } : {} }),
  getById: (id: string) => api.get(`/models/${id}`),
  create: (data: any) => api.post('/models', data),
  update: (id: string, data: any) => api.put(`/models/${id}`, data),
  delete: (id: string) => api.delete(`/models/${id}`),
};

// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  add: (modelId: string) => api.post(`/favorites/${modelId}`),
  remove: (modelId: string) => api.delete(`/favorites/${modelId}`),
  check: (modelId: string) => api.get(`/favorites/check/${modelId}`),
};

export default api;

