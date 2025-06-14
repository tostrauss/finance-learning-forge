// C:\Users\Hamid Malakpour\Desktop\Finance2.6\finance-learning-forge\src\contexts\AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>; // Changed signature
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithUsername: (username: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser]       = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (
    email: string, // Changed parameter order and added new ones
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred.user) {
      const displayName = `${firstName} ${lastName}`.trim();
      await updateProfile(cred.user, { displayName });
      // Storing firstName, lastName, and displayName.
      // Using firstName as 'username' for compatibility with loginWithUsername.
      // You may want to adjust the 'username' strategy if a unique, user-chosen username is required.
      await setDoc(doc(db, 'users', cred.user.uid), {
        username: firstName, // Or another strategy for username if needed
        email,
        firstName,
        lastName,
        displayName,
        createdAt: serverTimestamp(),
      });
    }
  };

  const login = async ( 
    email: string, 
    password:string 
  ): Promise<UserCredential> => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      return cred;
    }finally {
      setLoading(false);
    }
  };
  
  const loginWithUsername = async (
    username: string,
    password: string
  ): Promise<UserCredential> => {
    console.log('[Auth] loginWithUsername called with username:', username);

    // 1) Look up the user’s email by username in Firestore
    const usersRef = collection(db, 'users');
    const q        = query(usersRef, where('username', '==', username));
    const snap     = await getDocs(q);
    console.log('[Auth] Firestore query returned:', snap.size, 'docs');

    if (snap.empty) {
      console.error('[Auth] No user found with that username');
      throw new Error('No user found with that username');
    }

    const { email } = snap.docs[0].data() as { email: string };
    console.log('[Auth] Found email for username:', email);

    // 2) Sign in with the found email
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log('[Auth] signInWithEmailAndPassword succeeded, uid:', cred.user.uid);

    return cred;
  };

  const logout = (): Promise<void> => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, loginWithUsername, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
