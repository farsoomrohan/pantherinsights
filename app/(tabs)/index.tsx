import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text, ImageBackground, Dimensions, Pressable, Platform, Alert} from 'react-native';
import React from 'react';

import Toolbar from '../../components/taskbar';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import ReviewCard from '@/components/ReviewCard';
import Footer from '@/components/footer';
import Carousel from '@/components/Carousel';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';
import { auth } from '@/FirebaseConfig';
import { firebase } from '@react-native-firebase/firestore';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export default function HomeScreen() {
  const [search, setSearch] = React.useState('');

const updateLikes = async (professorName: string, reviewerName: string, action: string) => {
  try {
    // Reference to the reviews collection
    const reviewsCollectionRef = firebase.firestore()
      .collection('Professors')
      .doc(professorName)
      .collection('reviews');

    // Query to find the specific review by reviewerName
    const reviewsQuerySnapshot = await reviewsCollectionRef
      .where('reviewerName', '==', reviewerName)
      .limit(1) // Assuming each reviewer has only one review per professor
      .get();

    if (!reviewsQuerySnapshot.empty) {
      const reviewDoc = reviewsQuerySnapshot.docs[0];
      const currentLikes = reviewDoc.data().likes || 0;

      // Determine the new likes count
      let newLikes;
      if (action === 'like') {
        newLikes = currentLikes + 1;
      } else if (action === 'dislike') {
        newLikes = currentLikes - 1;
      } else {
        throw new Error('Invalid action');
      }

      // Update the review document with the new likes count
      await reviewDoc.ref.update({ likes: newLikes });

      Alert.alert('Likes updated successfully');
    } else {
      throw new Error('Review not found');
    }
  } catch (error) {
    Alert.alert('Error updating likes');
    console.error(error);
  }
};
const images = [
  'https://via.placeholder.com/300', // Sample image URLs
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
 
  // Add more image URLs as needed
];
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar} />
      <StatusBar barStyle="light-content" />
    <ScrollView>
     <Toolbar />
      <View style={styles.contentContainer}>
        <ImageBackground source={require('../../assets/images/gsu.jpeg')} style={styles.imgBackground} resizeMode='stretch'>

         <LinearGradient
          colors={["#09203f", "#537895"]}
          start={[0.0, 0.0]}
          style={styles.linearGradient}
          >
          <Text style = {styles.homeTitle}>
            Helping students discover professors
suited to their learning
style
          </Text>
                          <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search Professors..."
                    placeholderTextColor="grey"
                    value={search}
                    onChangeText={setSearch}
                  />
                 <Pressable onPress={() => {console.log('search')}}>
                  <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                 </Pressable>
                </View>
        
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.space1}></View>
      <Text style = {styles.homeText}>Trending Profesors</Text>

      <View style={styles.space2}></View>
      <Carousel slides={images}/>

      <View style={styles.space1}></View>
      <Text style = {styles.homeText}>Trending Posts</Text>
      <View style={styles.space2}></View>

      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={98}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={22}
        comments={[]}
        grade='A'
        feedback={5}
        organization={5}
        availability={4}
        engagement={3}
        updateLikes={updateLikes} 
        professorName='Louis Henry'
      />
      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={50}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={11}
        comments={[]}
        grade='A'
        feedback={5}
        organization={5}
        availability={4}
        engagement={3}
        updateLikes={updateLikes}
        professorName='Louis Henry'
      />
      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={88}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={43}
        comments={[]}
        grade='A'
        feedback={5}
        organization={5}
        availability={4}
        engagement={3}
        updateLikes={updateLikes}
        professorName='Louis Henry'
      />

    <View style={styles.space1}></View>
    <Footer/>

    </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282627',
  },
  gestureHandler: {
    flex: 1,
  },
  titleText: {
    color: '#fff', // White color for text
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
  },
   rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: scaleWidth(20),
    marginTop: scaleHeight(50),
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(20),
    backgroundColor: '#fff',
    borderRadius: scaleWidth(20),
    paddingHorizontal: 10,
    width: '85%',
    height: 50,
  },
  searchBar: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
  searchIcon: {
    marginLeft: scaleWidth(10),
  },
  professorImage: {
    width: '85%', // Adjust size as needed
    aspectRatio: 1,
    borderRadius: scaleBoth(150), // This makes the image circular
  },
  imgBackground: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - scaleHeight(155),
    alignItems: "center",
    
  },
  linearGradient: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - scaleHeight(155),
    opacity: 0.75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeTitle: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(30),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "center",
    width: scaleWidth(388),
    height: scaleHeight(92),
    marginTop: scaleHeight(-300)
  },
  space1: {
    height: scaleHeight(50)
  },
  space2: {
    height: scaleHeight(20)
  },
 
  homeText: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(32),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "left",
    width: scaleWidth(227),
    height: scaleHeight(32),
    marginLeft: scaleWidth(10),
  },
   statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#000000', // Match this with your Toolbar background color
  },
});
