// src/services/api.ts
import axios from 'axios';

// The base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies (refresh tokens)
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh the token
      try {
        const response = await api.post('/auth/refresh');
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => api.post('/auth/register', data),
  
  login: (data: {
    email: string;
    password: string;
  }) => api.post('/auth/login', data),
  
  logout: () => api.post('/auth/logout'),
  
  getMe: () => api.get('/auth/me'),
  
  refresh: () => api.post('/auth/refresh'),
};

// Learning API endpoints
export const learningAPI = {
  // Courses
  getCourses: () => api.get('/learning/courses'),
  getCourse: (id: string) => api.get(`/learning/courses/${id}`),
  
  // Progress
  getProgress: () => api.get('/learning/progress'),
  updateProgress: (data: {
    courseId: string;
    moduleId: string;
    score?: number;
  }) => api.post('/learning/progress', data),
};

// Quiz API endpoints
export const quizAPI = {
  // Get quiz (without answers for active taking)
  getQuiz: (quizId: string) => api.get(`/quizzes/${quizId}`),
  
  // Get quiz with answers (after completion)
  getQuizWithAnswers: (quizId: string) => api.get(`/quizzes/${quizId}/answers`),
  
  // Submit quiz
  submitQuiz: (quizId: string, data: {
    answers: Array<{
      questionId: string;
      selectedAnswer: number;
    }>;
    timeSpentSeconds: number;
  }) => api.post(`/quizzes/${quizId}/submit`, data),
  
  // Get user's quiz history
  getQuizHistory: (limit?: number) => 
    api.get('/quizzes/history/me', { params: { limit } }),
  
  // Get best score for a quiz
  getBestScore: (quizId: string) => 
    api.get(`/quizzes/${quizId}/best-score`),
  
  // Get quiz statistics
  getQuizStatistics: (quizId: string) => 
    api.get(`/quizzes/${quizId}/statistics`),
  
  // Get all quizzes for a course
  getCourseQuizzes: (courseId: string) => 
    api.get(`/quizzes/course/${courseId}`),
};

// Cache API endpoints (if needed for development/testing)
export const cacheAPI = {
  get: (key: string) => api.get(`/cache/${key}`),
  set: (data: { key: string; value: string; ttl: number }) => 
    api.post('/cache', data),
  delete: (key: string) => api.delete(`/cache/${key}`),
  flush: () => api.delete('/cache'),
};

export default api;