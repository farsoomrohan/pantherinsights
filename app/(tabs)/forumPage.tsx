import { StyleSheet, ScrollView, Image, Platform } from 'react-native';
import ReviewCard from '@/components/ReviewCard';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';


export default function forumScreen() {
  return (
    <ScrollView style={styles.container}>


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
