import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { auth } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addWhitelistedNativeProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';

// Register screen for app handles firebase authentication
// routes back to login page

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const FirebaseAuth = auth;

  // Method to create user in firebase later used for authentication
  const signUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration Success');
    } catch (error) {
      Alert.alert('Registration Error');
      console.log(error);
    }
  };

  // three text inputs for user paramaters
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={signUp} />
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "white",
  },
});

export default Register;
