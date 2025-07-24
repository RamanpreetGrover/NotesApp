import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase.js';
import useNotes from '../hooks/useNotes';
import { useNavigation } from '@react-navigation/native';

const NotesList = () => {
  const { notes, deleteNote } = useNotes();
  const navigation = useNavigation();

  // Handle logout by signing out from Firebase and redirecting to Login
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  // Confirm and delete a note
  const handleDelete = (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteNote(id),
        style: "destructive"
      }
    ]);
  };

  // Render each note card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteEditor', { note: item })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.delete} onPress={() => handleDelete(item.id)}>🗑️</Text>
      </View>
      <Text numberOfLines={2} style={styles.noteContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header buttons for note creation and logout */}
      <View style={styles.topButtonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("NoteEditor")}>
          <Text style={styles.actionButtonText}>+ New Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.logout]} onPress={handleLogout}>
          <Text style={styles.actionButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Notes list or placeholder if empty */}
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  topButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  logout: {
    backgroundColor: 'crimson'
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  noteCard: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  noteContent: {
    fontSize: 14,
    color: "#333"
  },
  delete: {
    fontSize: 18,
    color: "crimson"
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#aaa"
  }
});

export default NotesList;
