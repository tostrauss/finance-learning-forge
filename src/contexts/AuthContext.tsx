import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api'; // Make sure the path is correct

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in when the app loads
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // If a token exists, verify it with the backend
          const response = await authAPI.getMe();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken'); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    // Note: The refresh token is handled automatically by the httpOnly cookie
    localStorage.setItem('accessToken', response.data.accessToken);
    setUser(response.data.user);
  };

  const register = async (data: any) => {
    const response = await authAPI.register(data);
    localStorage.setItem('accessToken', response.data.accessToken);
    setUser(response.data.user);
  };

  const logout = async () => {
    try {
        await authAPI.logout(); // Call the backend logout endpoint
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        localStorage.removeItem('accessToken');
        setUser(null);
        // Redirect to signin to ensure a clean state
        window.location.href = '/signin';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};