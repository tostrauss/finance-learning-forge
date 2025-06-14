// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithUsername: (username: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (err) {
      // Token is invalid or expired
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: username });
      await setDoc(doc(db, 'users', cred.user.uid), {
        username,
        email,
        createdAt: serverTimestamp(),
      });
    }
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setError(null);
    setLoading(true);

    try {
      const response = await authAPI.register({ 
        email, 
        password, 
        firstName, 
        lastName 
      });
      const { user, accessToken } = response.data;
      
      // Store the access token
      localStorage.setItem('accessToken', accessToken);
      
      // Set the user in state
      setUser(user);
      
      toast({
        title: "Account created!",
        description: "Welcome to Finance Learning Forge",
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create account';
      setError(errorMessage);
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await authAPI.logout();
    } catch (err) {
      // Even if the server logout fails, we should still clear local state
      console.error('Logout error:', err);
    }
    
    // Clear local storage and state
    localStorage.removeItem('accessToken');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    setLoading(false);
  };

  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};