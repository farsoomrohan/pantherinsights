import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text} from 'react-native';
import React from 'react';

import Toolbar from '../../components/taskbar';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import Carousel from '../../components/Carousel';

export default function HomeScreen() {
  const [search, setSearch] = React.useState('');

const images = [
  'https://via.placeholder.com/300', // Sample image URLs
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
 
  // Add more image URLs as needed
];

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Toolbar />
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Innovating Experince</Text>
        <View style={styles.rowContainer}>
         <TextInput
           style={styles.searchBar}
           placeholder='Search Professor'
           />
          <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }} // Replace with the actual URL of the professor's image
           style={styles.professorImage}
          />
         </View>
        </View> 
      </View>
    <Carousel images={images} />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureHandler: {
    flex: 1,
  },
  titleText: {
    color: '#fff', // White color for text
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: -200, 
  },
   rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 50,
  },
    contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
   searchBar: {
    flex: 1,
    height: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginTop: 75, 
    color: 'white',
  },
  professorImage: {
    width: '85%', // Adjust size as needed
    aspectRatio: 1,
    borderRadius: 150, // This makes the image circular
  },
});
