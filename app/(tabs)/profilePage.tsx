import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming FontAwesome icons are used
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';

const ProfileScreen: React.FC = () => {
  // Replace with actual user data
  const userName = "John Doe"; // Example user name

  // Function to handle navigation
  const navigateTo = (route: string) => {
    // Navigation logic here
    console.log(`Navigating to ${route}`);
  };

  // List of options with icons
  const options = [
    { title: 'Profile', icon: 'user' },
    { title: 'My Posts', icon: 'file-text-o' },
    { title: 'My Reviews', icon: 'star-o' },
    { title: 'Notifications', icon: 'bell-o' },
    { title: 'Settings', icon: 'cog' },
    { title: 'Sign Out', icon: 'sign-out' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <View style={styles.userContainer}>
        <View style={styles.userImageContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.userImage}
          />
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => navigateTo(option.title.toLowerCase())}
          >
            <Icon name={option.icon} size={20} color="#fff" />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282627',
    padding: scaleBoth(20),
  },
  space: {
    height: scaleHeight(100),
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  userImageContainer: {
    marginBottom: scaleHeight(10),
  },
  userImage: {
    width: scaleWidth(100), // Adjust width and height as needed
    height: scaleHeight(100),
    borderRadius: scaleBoth(50), // Make it circular
  },
  userName: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    color: '#fff'
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    borderBottomWidth: scaleHeight(1),
    borderBottomColor: '#ccc',
  },
  optionText: {
    marginLeft: scaleWidth(20),
    fontSize: scaleFont(18),
    color: '#fff',
  },
});

export default ProfileScreen;
