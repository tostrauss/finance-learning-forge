/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'; // Import from vitest/config
import react from '@vitejs/plugin-react';
import path from 'path'; // Make sure to import 'path'

// Removed incorrect import: import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Ensure this file exists
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        rewrite: (apiPath) => apiPath.replace(/^\/api/, ''), // Renamed 'path' variable to 'apiPath' to avoid conflict
        secure: false,
      },
    },
  },
});