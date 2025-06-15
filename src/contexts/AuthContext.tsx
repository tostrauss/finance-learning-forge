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
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>; // Changed UserCredential to void
  loginWithUsername: (username: string, password: string) => Promise<void>; // Changed UserCredential to void
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  error: string | null;
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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true); // Ensure loading is true at the start
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null); // Ensure user is null if no token
      setLoading(false);
      return;
    }
    try {
      // Assuming you might have an API call here to verify token and get user
      // For now, if a token exists, we'll try to refresh the user.
      // If you have a authAPI.getMe() or similar:
      // const response = await authAPI.getMe();
      // setUser(response.data);
      // If not, you might need a different logic or remove this if refreshUser handles it.
      // For this example, let's assume a direct API call or that refreshUser will be called elsewhere.
      // For now, just setting loading to false if token exists.
      // A more robust checkAuth would validate the token with the backend.
      console.log("Token found, user state should be updated by refreshUser or initial load logic");
    } catch (e) {
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // This is the signup function you likely want to keep (uses authAPI.register)
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
      const { user: signedUpUser, accessToken } = response.data; // Renamed to avoid conflict if 'user' is in scope
      
      localStorage.setItem('accessToken', accessToken);
      setUser(signedUpUser);
      
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

  // Implementation for login
  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      // Replace with your actual API call for login
      const response = await authAPI.login({ email, password }); // Ensure authAPI.login exists and is typed
      const { user: loggedInUser, accessToken } = response.data; // Adjust based on your API response
      
      localStorage.setItem('accessToken', accessToken);
      setUser(loggedInUser);
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to login';
      setError(errorMessage);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Implementation for loginWithUsername
  const loginWithUsername = async (username: string, password: string): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      // Replace with your actual API call for login with username
      // Example: const response = await authAPI.loginWithUsername({ username, password });
      // const { user: loggedInUser, accessToken } = response.data;
      // localStorage.setItem('accessToken', accessToken);
      // setUser(loggedInUser);
      
      // Placeholder implementation:
      console.warn("loginWithUsername called but not fully implemented with API", username);
      toast({
        title: "Login with Username",
        description: "This feature is a placeholder.",
        variant: "default" 
      });
      // For now, let's throw an error or handle as appropriate if it's not implemented
      throw new Error("Login with username is not fully implemented with the backend.");
    } catch (err: any) {
      const errorMessage = err.message || err.response?.data?.error || 'Failed to login with username';
      setError(errorMessage);
      toast({
        title: "Login Failed",
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
    login, // Now correctly refers to the implemented function
    signup,
    logout,
    refreshUser,
    loginWithUsername, // Add loginWithUsername to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};