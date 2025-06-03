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
  storageBucket: "stock-trader-angular.firebasestorage.app",
  messagingSenderId: "739725551861",
  appId: "1:739725551861:web:cd2e3c91a04e2a9c877dbc",
  measurementId: "G-QLCHGXZ623"
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("🔥 Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  throw error;
}

// Optional: Analytics
let analytics;
try {
  analytics = getAnalytics(app);
  console.log("📊 Firebase Analytics initialized");
} catch (error) {
  console.warn("⚠️ Firebase Analytics initialization skipped:", error);
}

// Auth client and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore and Storage clients
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export for use in other files
export { app, analytics };
