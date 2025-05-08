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
  signup: (username: string, email: string, password: string) => Promise<void>;
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
