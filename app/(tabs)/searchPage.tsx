import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, Image, Platform, Alert } from 'react-native';
import ReviewCard from '@/components/ReviewCard';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';
import Professor from '@/components/professor';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';


export default function searchScreen() {
    const fetchProfessorData = async (professorId: string) => {
    // Implement fetch logic
  };

  const fetchReviews = async (professorName: string) => {
    // Implement fetch logic
    try {
    const reviewsSnapshot = await firebase.firestore()
      .collection('Professors')
      .doc(professorName)
      .collection('reviews')
      .orderBy('reviewDate', 'asc')
      .get();
    
      if (reviewsSnapshot.empty) {
      console.log('No matching documents.');
      return [];
    }
    const reviewsData = reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return reviewsData;
  } catch (error) {
    console.log('Error fetching reviews:', error);
    return [];
  }
  };

  const addRating = async (ratingData: any) => {
    // Implement add rating logic
          try { 
          await firebase.firestore().collection('Professors')
          .doc(ratingData.professorName)
          .collection('reviews')
          .add({
            feedback: ratingData.feedback,
            organization: ratingData.organization,
            availability: ratingData.availability,
            grade: ratingData.grade,
            engagement: ratingData.engagement,
            rating: ratingData.rating,
            reviewText: ratingData.reviewText,
            reviewDate: ratingData.reviewDate,
            reviewerName: ratingData.reviewerName,
          });
          Alert.alert('Review submitted successfully');
        }
      catch (error) { 
        Alert.alert('Registration Error'); console.log(error); 
      } 
  };

  const updateLikes = async (reviewId: string, action: string) => {
    // Implement update likes logic
  };
  return (
      <Professor 
        professorId={'010203'}
        professorName={'Louis Henry'}
        professorEmail={'henry@gmail.com'}
        professorImageUrl={'https://cas.gsu.edu/files/2019/08/henry.jpg'}
        fetchProfessorData={fetchProfessorData}
        fetchReviews={fetchReviews}
        addRating={addRating}
        updateLikes={updateLikes} 
      />
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282627',
  },
});
