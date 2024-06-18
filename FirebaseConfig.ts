// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwN1ItpcYZpmW9ln0EYRwLObhyZNPSYks",
  authDomain: "pantherinsights-5fdb0.firebaseapp.com",
  projectId: "pantherinsights-5fdb0",
  storageBucket: "pantherinsights-5fdb0.appspot.com",
  messagingSenderId: "44004403854",
  appId: "1:44004403854:web:618ccf71ba426e3495b7df",
  measurementId: "G-YSCHR8J8RB"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);