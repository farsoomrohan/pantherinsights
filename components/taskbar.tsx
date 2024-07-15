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
          <Button
            title='Login'
          />
        </Link>
        <View style={styles.space} /> 
       <Link href={"/screens/register"} asChild>
        <Button 
          title="Sign Up"
        />
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
  }
});

export default Toolbar;
