import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../app/responsiveScaling';


const Toolbar = () => {

  const router = useRouter();

  return (
    <View style={styles.toolbar}>
      <Image
        source={require( '../assets/images/logo.png')}
        style={styles.profilePicture}
      />
      <Text style = {styles.titleText}> Panther Insights</Text>
      <View style={styles.rightContainer}>
      <Pressable style={styles.button} onPress={() => router.push('/screens/login')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
        <View style={styles.space} /> 
      <Pressable style={styles.button2} onPress={() => router.push('/screens/register')}>
          <Text style={styles.buttonText2}>Sign Up</Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleBoth(10),
    backgroundColor: '#000000',
    elevation: 4,
    position: 'absolute',  // Make the toolbar sticky
    top: 0,               
    left: 0,               
    right: 0,             
    zIndex: 1000, 
  },
  profilePicture: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    borderRadius: scaleBoth(20),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  link: {
    marginHorizontal: scaleHeight(10),
    fontSize: scaleFont(16),
    color: '#2563EB',
  },
  titleText: {
    color: '#fff', // White color for text
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginRight: scaleWidth(35),
  },
  space: {
    width: scaleWidth(6)
  },

  buttonText: {
    color: '#2563EB', // White text color
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#fff', // Fill color for the rectangle
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(12),
    borderRadius: scaleBoth(4),
  },

  buttonText2: {
    color: '#fff', // White text color
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },

  button2: {
    backgroundColor: '#2563EB', // Fill color for the rectangle
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(12),
    borderRadius: scaleBoth(4),
  },


});

export default Toolbar;
