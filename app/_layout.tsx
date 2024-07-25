import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { firebase } from '@react-native-firebase/firestore';
import { auth, firebaseConfig } from '@/FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../app/Login';
import Register from '../app/Register';
import TabLayout from './(tabs)/_layout';
import { RootStackParamList } from './navigation';
import { Stack } from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
      setLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !loaded) {
    return null;
  }

  return (
      <ThemeProvider value = {DarkTheme} >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register"/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </ThemeProvider>
             
  );
}