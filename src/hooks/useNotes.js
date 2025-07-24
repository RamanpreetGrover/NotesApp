import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { auth } from '../services/firebase';

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Listen for real-time updates, only if user is logged in
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'notes'),
      where('uid', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setNotes(results);
    });

    return unsubscribe;
  }, []);

  // Add a new note
  const addNote = async (note) => {
    await addDoc(collection(db, 'notes'), {
      ...note,
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });
  };

  // Update an existing note
  const updateNote = async (id, updatedFields) => {
    const noteRef = doc(db, 'notes', id);
    await updateDoc(noteRef, updatedFields);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const noteRef = doc(db, 'notes', id);
    await deleteDoc(noteRef);
  };

  return { notes, addNote, updateNote, deleteNote };
};

export default useNotes;