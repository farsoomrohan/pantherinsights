import { View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from "../navigation";
import { Link } from "expo-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation<LoginScreenNavigationProp>();


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Tabs');
            console.log(response);

        } catch(error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
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
export default Login;

const styles = StyleSheet.create({
input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white'
  },
  link: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});