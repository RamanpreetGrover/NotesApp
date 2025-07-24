import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import NotesList from './src/screens/NotesList';
import NoteEditor from './src/screens/NoteEditor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Notes" component={NotesList} />
        <Stack.Screen name="NoteEditor" component={NoteEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
