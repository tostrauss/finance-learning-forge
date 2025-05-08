// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBYpCMOKwoaz1BZvHw3sNY08YmFbITEXfo",
  authDomain: "finance-learning-05.firebaseapp.com",
  projectId: "finance-learning-05",
  storageBucket: "finance-learning-05.firebasestorage.app",
  messagingSenderId: "198980342027",
  appId: "1:198980342027:web:66eb5c5b787e5332d4520e",
  measurementId: "G-3CBZGHDHMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics
export const analytics = getAnalytics(app);

// Auth client and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore and Storage clients
export const db = getFirestore(app);
export const storage = getStorage(app);
