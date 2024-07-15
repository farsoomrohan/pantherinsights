import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, Image, Platform } from 'react-native';
import ReviewCard from '@/components/ReviewCard';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function forumScreen() {
  return (
    <ScrollView style={styles.container}>

      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={98}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={22}
        comments={3}
      />
      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={78}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={11}
        comments={33}
      />
      <ReviewCard 
        reviewDate='June 15, 2024' 
        reviewerName='Sebastian'  
        rating={88}
        reviewText='Professor Henry is very knowledgeable and makes the classes very interesting!'
        likes={43}
        comments={33}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#282627',
  },
});