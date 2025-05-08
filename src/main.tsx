// C:\Users\Hamid Malakpour\Desktop\Finance2.6\finance-learning-forge\src\main.tsx

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
