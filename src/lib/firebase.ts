// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1O-9q63pm6mKhMsYDgXGmfod3RioArTQ",
  authDomain: "stock-trader-angular.firebaseapp.com",
  projectId: "stock-trader-angular",
  storageBucket: "stock-trader-angular.appspot.com",
  messagingSenderId: "739725551861",
  appId: "1:739725551861:web:your-app-id", // You'll need to provide the correct App ID
  measurementId: "G-your-measurement-id" // You'll need to provide the correct Measurement ID if you're using Analytics
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
