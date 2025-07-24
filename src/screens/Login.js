import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';

const Login = ({ navigation }) => {
  const { user, login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // If the user is already logged in, send them to Notes screen
  useEffect(() => {
    if (user) {
      navigation.replace("Notes");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        // New account registration
        await register(email, password);
        Alert.alert("Account created", "You can now log in.");
        setIsSignup(false); // Switch back to login mode
      } else {
        // Regular login
        await login(email, password);
      }
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Log In"}</Text>

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login or Signup button */}
      <Button
        title={isSignup ? "Create Account" : "Login"}
        onPress={handleSubmit}
      />

      {/* Toggle between login and signup mode */}
      <Text style={styles.toggle} onPress={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  toggle: {
    marginTop: 16,
    color: "#007BFF",
    textAlign: "center",
  },
});

export default Login;
