import axios from 'axios';

// The base URL for your new backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an interceptor to automatically add the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // We will store the token here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If a request is unauthorized, log the user out
      localStorage.removeItem('accessToken');
      // Redirect to the sign-in page
      window.location.href = '/signin'; 
    }
    return Promise.reject(error);
  }
);

// Define API calls for authentication
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'), // We need a logout endpoint call
};

// Define API calls for learning data
export const learningAPI = {
  getCourses: () => api.get('/learning/courses'),
  getCourse: (id: string) => api.get(`/learning/courses/${id}`),
  getProgress: () => api.get('/learning/progress'),
  updateProgress: (data: any) => api.post('/learning/progress', data),
};

export default api;