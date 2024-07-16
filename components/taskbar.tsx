import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Button } from 'react-native-elements';

const Toolbar = () => {

  return (
    <View style={styles.toolbar}>
      <Image
        source={require( '../assets/images/logo.png')}
        style={styles.profilePicture}
      />
      <Text style = {styles.titleText}> Panther Insights</Text>
      <View style={styles.rightContainer}>
        <Link href={"/screens/login"} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Link>
        <View style={styles.space} /> 
       <Link href={"/screens/register"} asChild>
        <Pressable style={styles.button2}>
            <Text style={styles.buttonText2}>Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000000',
    elevation: 4,
    position: 'absolute',  // Make the toolbar sticky
    top: 0,               
    left: 0,               
    right: 0,             
    zIndex: 1000, 
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  link: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#2563EB',
  },
  titleText: {
    color: '#fff', // White color for text
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginRight: 35,
  },
  space: {
    width: 6
  },

  buttonText: {
    color: '#2563EB', // White text color
    fontSize: 13,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#fff', // Fill color for the rectangle
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  buttonText2: {
    color: '#fff', // White text color
    fontSize: 13,
    fontWeight: 'bold',
  },

  button2: {
    backgroundColor: '#2563EB', // Fill color for the rectangle
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },


});

export default Toolbar;
