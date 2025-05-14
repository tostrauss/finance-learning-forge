// vite.config.ts (project root)
// Disable TS checking for this config file
// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Map '@' to your 'src' directory so imports like '@/components/...' resolve correctly
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    // You can disable the overlay if you want by uncommenting:
    // hmr: { overlay: false }
  }
});
