// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// paste your config here from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB-TFyf2dEei2gKz5t7kev42T3jdX32NQA",
  authDomain: "e-commerce-e144e.firebaseapp.com",
  projectId: "e-commerce-e144e",
  storageBucket: "e-commerce-e144e.firebasestorage.app",
  messagingSenderId: "569300932753",
  appId: "1:569300932753:web:9d732052d373373bfac730",
  measurementId: "G-4L3W9TLEBG"
};

const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);
export const auth = getAuth(app);
