import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // used to delay screen rendering

  // Track login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign up new user
  const register = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in existing user
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Log out current user
  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, register, login, logout };
};

export default useAuth;
