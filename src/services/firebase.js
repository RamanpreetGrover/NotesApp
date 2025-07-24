import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhSkE7TNr4w8Xhu3VyfI-YIMzQAmMaW3o",
  authDomain: "lab8notesapp.firebaseapp.com",
  projectId: "lab8notesapp",
  storageBucket: "lab8notesapp.firebasestorage.app",
  messagingSenderId: "345736748432",
  appId: "1:345736748432:web:aaf18e92b8414c5f1b6715",
  measurementId: "G-T4GDD9F0BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth with AsyncStorage (persistent login)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
const db = getFirestore(app);

export { auth, db };
