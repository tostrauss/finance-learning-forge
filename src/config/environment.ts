// src/config/environment.ts

export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  ALPHA_VANTAGE_API_KEY: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
  
  // Firebase Configuration
  FIREBASE_CONFIG: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },

  // Auth Configuration
  ACCESS_TOKEN_SECRET: import.meta.env.VITE_ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: import.meta.env.VITE_REFRESH_TOKEN_SECRET,

  // Environment
  NODE_ENV: import.meta.env.MODE,

  // Helper methods
  isDevelopment: () => import.meta.env.MODE === 'development',
  isProduction: () => import.meta.env.MODE === 'production'
};