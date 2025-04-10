// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAiOJ8hPu0D8-KIfosL62-351qb1j7EsfA',
  authDomain: 'skyy-prep.firebaseapp.com',
  projectId: 'skyy-prep',
  storageBucket: 'skyy-prep.firebasestorage.app',
  messagingSenderId: '981819643846',
  appId: '1:981819643846:web:db7540c768996d7bda44c7',
  measurementId: 'G-NTPCY200LY',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
