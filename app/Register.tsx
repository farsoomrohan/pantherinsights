import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from './responsiveScaling';
import { color } from 'react-native-elements/dist/helpers';
import { auth }  from "@/FirebaseConfig";
import { firebase } from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';

// Register screen for app handles firebase authentication
// routes back to login page

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  // Method to create user in firebase later used for authentication
  const signUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    } else {
      try { 
        const response = await createUserWithEmailAndPassword(auth, email, password)
        .then( (result) => {
          firebase.firestore().collection("users")
          .doc(auth.currentUser?.uid)
          .set( {
            username,
            email,
            uid: auth.currentUser?.uid,
            reviews: []
          })
        }); 
        router.push('./Login');

      } catch (error) { 
        Alert.alert('Registration Error'); console.log(error); 
      } 
      };  

    }
// firebase call commented out to work with expo go

  
  // three text inputs for user paramaters
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.userImage}/>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor={ 'gray'}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={ 'gray'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={ 'gray'}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor={ 'gray'}
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
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scaleHeight(24),
    color: '#fff',
  },
  input: {
    height: scaleHeight(40),
    width: scaleWidth(350),
    borderColor: 'gray',
    borderWidth: scaleBoth(1),
    marginBottom: scaleHeight(12),
    paddingHorizontal: scaleWidth(8),
    color: "white",
  },
  userImage: {
    width: scaleWidth(100), // Adjust width and height as needed
    height: scaleHeight(100),
   },

});

export default Register;
