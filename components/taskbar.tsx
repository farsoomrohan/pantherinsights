import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';

const Toolbar = () => {

  return (
    <View style={styles.toolbar}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profilePicture}
      />
      <View style={styles.rightContainer}>
        <Link href={"/screens/login"} asChild>
        <Pressable>
          <Text style={styles.link}>Login</Text>
        </Pressable>
        </Link>
       <Link href={"/screens/register"} asChild>
        <Pressable>
          <Text style={styles.link}>Sign up</Text>
        </Pressable>
        </Link>
        <TouchableOpacity onPress={() => alert('More options')}>
          <Icon name="more-vert" size={24} color="black" />
        </TouchableOpacity>
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
    backgroundColor: '#fff',
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
  },
  link: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#007BFF',
  },
});

export default Toolbar;
