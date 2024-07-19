import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, Image, Platform } from 'react-native';
import ReviewCard from '@/components/ReviewCard';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function messageScreen() {
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
  container: {
    flex: 1,
    padding: scaleBoth(16),
    backgroundColor: '#282627',
  },
});
