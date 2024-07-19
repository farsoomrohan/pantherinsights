import { View, Text, StyleSheet, Button, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import { auth }  from "@/FirebaseConfig";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';


// Login page for app handles firebase authentication and routes to home screen and register screen
// FUTURE NOTE* add more complex password constraints later


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // SignIn method that passes search inputs and firebase auth
    // navigates to home screen after
    const signIn = async () => {
        setLoading(true);
        try {
 /*          const response = await signInWithEmailAndPassword(auth, email, password); */
            router.replace("/tabs");
            console.log('sign in');

        } catch(error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
         <Image source={require('../../assets/images/logo.png')} style={styles.userImage}/>         
            <TextInput value={email} style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)}></TextInput>
            <Button title="Login" onPress={signIn} />
            <Link href={"screens/register"} asChild>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </Link>
        </View>
        </GestureHandlerRootView>
    );



};

const styles = StyleSheet.create({
input: {
    height: scaleHeight(40),
    borderColor: 'gray',
    borderWidth: scaleBoth(1),
    marginBottom: scaleHeight(12),
    paddingHorizontal: scaleWidth(8),
    color: '#fff'
  },
  link: {
    color: 'blue',
    marginTop: scaleHeight(16),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(16),
  },
  userImage: {
    width: scaleWidth(100), // Adjust width and height as needed
    height: scaleHeight(100),
    borderRadius: scaleBoth(50), // Make it circular
  },
});

export default Login;

