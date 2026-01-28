import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqJxpMMSEA5zVrdeTO5pW8SMHT8LSfw6M",
  authDomain: "fooddeliveryapp-83889.firebaseapp.com",
  projectId: "fooddeliveryapp-83889",
  storageBucket: "fooddeliveryapp-83889.firebasestorage.app",
  messagingSenderId: "488477526775",
  appId: "1:488477526775:web:e06940466ee7fa2eda21f2",
  measurementId: "G-N2H25RN36J"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web' ? browserLocalPersistence : getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export default app;
