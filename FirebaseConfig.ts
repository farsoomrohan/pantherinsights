// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firestore from '@react-native-firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCwN1ItpcYZpmW9ln0EYRwLObhyZNPSYks",
  authDomain: "pantherinsights-5fdb0.firebaseapp.com",
  databaseURL: "https://xxxxx.firebaseio.com",
  projectId: "pantherinsights-5fdb0",
  storageBucket: "pantherinsights-5fdb0.appspot.com",
  messagingSenderId: "44004403854",
  appId: "1:44004403854:web:618ccf71ba426e3495b7df",
  measurementId: "G-YSCHR8J8RB"
};
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  }
  else {
    console.log("Firebase analytics not supported in this enviorment");
  }
});

// Initialize Firebase
export const db = firestore;
export {app, auth };