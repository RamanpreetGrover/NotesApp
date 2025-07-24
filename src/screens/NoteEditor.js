import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import useNotes from '../hooks/useNotes';

const NoteEditor = ({ navigation, route }) => {
  const { addNote, updateNote } = useNotes();
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  // Set screen title based on whether we're editing or adding
  useLayoutEffect(() => {
    navigation.setOptions({ title: note ? 'Edit Note' : 'New Note' });
  }, [navigation, note]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Title is required");
      return;
    }

    try {
      if (note) {
        await updateNote(note.id, { title, content });
      } else {
        await addNote({ title, content });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save the note.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Write something..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
      />
      <Button title="Save Note" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 12
  },
  textarea: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    height: 150,
    textAlignVertical: 'top'
  }
});

export default NoteEditor;