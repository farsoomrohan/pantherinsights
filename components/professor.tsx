import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, FlatList, Alert } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../app/responsiveScaling'; // Import your scaling functions
import Prof from '../components/prof';
import ReviewCard from '../components/ReviewCard';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';
import { auth }  from "@/FirebaseConfig";
import Svg, { Path } from 'react-native-svg';
import { BarChart } from 'react-native-gifted-charts';





// Import other necessary components

interface ProfessorProps {
  professorId: string;
  professorName: string;
  professorEmail: string;
  professorImageUrl: string;

}

const Professor: React.FC<ProfessorProps> = ({
  professorId,
  professorName,
  professorEmail,
  professorImageUrl,

}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<number | null>(null);
  const [organizationError, setOrganizationError] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<number | null>(null);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [grade, setGrade] = useState('');
  const [gradeError, setGradeError] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState<number | null>(null);
  const [engagementError, setEngagementError] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [feedback, setFeedback] = useState<number | null>(null);
  const [organization, setOrganization] = useState<number | null>(null);
  const [availability, setAvailability] = useState<number | null>(null);
  const [engagement, setEngagement] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews(professorName).then((data) => setReviews(data));
    fetchChartData();
  }, [professorName]);

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
            professorName: ratingData.professorName,
            likes: 0,
            comments: [],
          });
          Alert.alert('Review submitted successfully');
        }
      catch (error) { 
        Alert.alert('Registration Error'); console.log(error); 
      } 
  };

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

    } else {
      throw new Error('Review not found');
    }
  } catch (error) {
    Alert.alert('Error updating likes');
    console.error(error);
  }
};

  const fetchChartData = async () => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('Professor')
        .doc(professorName)
        .collection('reviews')
        .get();

      const data = reviewsSnapshot.docs.map(doc => doc.data());
      const aggregatedData = aggregateChartData(data);
      setChartData(aggregatedData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const aggregateChartData = (data: any[]) => {
    const totalReviews = data.length;
    const sumData = data.reduce((acc, review) => {
      acc.availability += review.availability || 0;
      acc.engagement += review.engagement || 0;
      acc.feedback += review.feedback || 0;
      acc.organization += review.organization || 0;
      return acc;
    }, { availability: 0, engagement: 0, feedback: 0, organization: 0 });

    return [
      { category: 'Availability', value: sumData.availability / totalReviews },
      { category: 'Engagement', value: sumData.engagement / totalReviews },
      { category: 'Feedback', value: sumData.feedback / totalReviews },
      { category: 'Organization', value: sumData.organization / totalReviews },
    ];
  };

  
const getFormattedDate = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  return now.toLocaleDateString(undefined, options);
};

const getUsername = async () => {
  try {
    const userDoc = await firebase.firestore().collection('users')
      .doc(auth.currentUser?.uid)
      .get();

    if (userDoc.exists) {
      // Retrieve username from the user document
      const userData = userDoc.data();
      const username = userData?.username; // Replace 'username' with the actual field name
      console.log(username);
      if(username !== undefined) {
        return username; // Return the username
 
      } else {
        console.error('username is undefined');
        return "Anonymous";
      }

    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
  };

  useEffect(() => {
    fetchReviews(professorName).then((data) => setReviews(data));
  }, [professorName]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setRating(null);
    setReview('');
    setRatingError(false);
    setReviewError(false);
    setRatingValue(0);
    setSelectedFeedback(null);
    setSelectedOrganization(null);
    setSelectedAvailability(null);
    setGrade('');
    setSelectedEngagement(null);
    setFeedbackError(false);
    setOrganizationError(false);
    setAvailabilityError(false);
    setGradeError(false);
    setEngagementError(false);
    setFeedback(null);
    setOrganization(null);
    setAvailability(null);
    setEngagement(null);

  };
const handleSubmit = async () => {
  // Initialize error state variables
  let hasError = false;

  // Check each field and update error states accordingly
  if (selectedFeedback === null) {
    setFeedbackError(true);
    hasError = true;
  } else {
    setFeedbackError(false);
  }

  if (selectedOrganization === null) {
    setOrganizationError(true);
    hasError = true;
  } else {
    setOrganizationError(false);
  }

  if (selectedAvailability === null) {
    setAvailabilityError(true);
    hasError = true;
  } else {
    setAvailabilityError(false);
  }

  if (grade === '') {
    setGradeError(true);
    hasError = true;
  } else {
    setGradeError(false);
  }

  if (selectedEngagement === null) {
    setEngagementError(true);
    hasError = true;
  } else {
    setEngagementError(false);
  }

  if (rating === null) {
    setRatingError(true);
    hasError = true;
  } else {
    setRatingError(false);
  }

  if (review.trim() === '') {
    setReviewError(true);
    hasError = true;
  } else {
    setReviewError(false);
  }

  // If there are any errors, stop form submission
  if (hasError) {
    return;
  }
  // If no errors, proceed with submission
  try {
    const username = await getUsername();
    const date = getFormattedDate();
    await addRating({
      reviewerName: username,
      reviewDate: date,
      rating,
      reviewText: review,
      professorName,
      likes: 0,
      comments: [],
      feedback: selectedFeedback,
      organization: selectedOrganization,
      availability: selectedAvailability,
      grade,
      engagement: selectedEngagement,
    });

    closeModal();
    const fetchedReviews = await fetchReviews(professorName);
    setReviews(fetchedReviews);
  } catch (error) {
    console.error('Error adding rating:', error);
    Alert.alert('Error', 'There was an error adding your rating. Please try again.');
  }
};


  const handleLikeDislike = async (professorName: string, reviewerName: string,  action: string) => {
    await updateLikes(professorName, reviewerName, action);
    await fetchReviews(professorName).then((data) => setReviews(data));
  };

  const calculateAverageRating = (reviews: any) => {
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc: any, review: any) => acc + parseFloat(review.rating), 0);
    return sum / reviews.length;
  };

  const mapRatingToGrade = (averageRating: any) => {
    if (!averageRating) return 'N/A';
    if (averageRating >= 9.7) return 'A+';
    if (averageRating >= 9.3) return 'A';
    if (averageRating >= 9.0) return 'A-';
    if (averageRating >= 8.7) return 'B+';
    if (averageRating >= 8.3) return 'B';
    if (averageRating >= 8.0) return 'B-';
    if (averageRating >= 7.7) return 'C+';
    if (averageRating >= 7.3) return 'C';
    if (averageRating >= 7.0) return 'C-';
    if (averageRating >= 6.0) return 'D';
    return 'F';
  };

  const averageRating = calculateAverageRating(reviews);
  const overallGrade = mapRatingToGrade(averageRating);

  const getReviewColor = (rating: number) => {
    if (rating >= 9) return styles.textGreenDark;
    if (rating >= 7) return styles.textGreenLight;
    if (rating >= 5) return styles.textYellow;
    return styles.textRed;
  };

  const getGradeColor = (grade: string | null) => {
    if (!grade) return styles.textWhite;
    if (grade.startsWith('A')) return styles.textGreenDark;
    if (grade.startsWith('B')) return styles.textGreenLight;
    if (grade.startsWith('C')) return styles.textYellow;
    if (grade === 'D') return styles.textOrange;
    if (grade === 'F') return styles.textRed;
    return styles.textWhite;
  };
 const renderOptionButton = (label: string, value: number, type: string) => {
    const selected = type === 'feedback' ? feedback === value :
                      type === 'organization' ? organization === value :
                      type === 'availability' ? availability === value :
                      type === 'engagement' ? engagement === value : false;

    const handlePress = () => {
      switch(type) {
        case 'feedback':
          setFeedback(value);
          setSelectedFeedback(value);
          setFeedbackError(false);
          break;
        case 'organization':
          setOrganization(value);
          setSelectedOrganization(value);
          setOrganizationError(false);
          break;
        case 'availability':
          setAvailability(value);
          setSelectedAvailability(value);
          setAvailabilityError(false);
          break;
        case 'engagement':
          setEngagement(value);
          setSelectedEngagement(value);
          setEngagementError(false);
          break;
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          selected && styles.optionButtonSelected
        ]}
        onPress={handlePress}
      >
        <Text style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.container2}>
    <ReviewCard
      reviewerName={item.reviewerName}
      reviewDate={item.reviewDate}
      rating={item.rating}
      reviewText={item.reviewText}
      likes={item.likes}
      comments={item.comments}
      feedback={item.feedback}
      availability={item.availability}
      organization={item.organization}
      engagement={item.engagement}
      grade={item.grade}
      professorName={item.professorName}
      updateLikes={handleLikeDislike}
    />
    </View>
 );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.profContainer}>
              <Prof profName={professorName} profEmail={professorEmail} profImageUrl={professorImageUrl} />
              <View style={styles.ratingContainer}>
                <Text style={styles.overallRatingText}>Overall Rating</Text>
                <Text style={[styles.ratingValue, getGradeColor(overallGrade)]}>{overallGrade}</Text>

              </View>
            </View>
            <BarChart data = {chartData}/>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Student Reviews</Text>
              <TouchableOpacity style={styles.addReviewButton} onPress={openModal}>
                <Text style={styles.addReviewButtonText}>Add New Review +</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Review For {professorName}:</Text>
            <ScrollView>
              <View style={styles.formGroup}>
                <Text style={styles.label}>How helpful and timely was the feedback provided on assignments and exams?</Text>
                <View style={styles.optionsContainer}>
                  {renderOptionButton("1 - Not helpful at all", 1, 'feedback')}
                  {renderOptionButton("2 - Slightly helpful", 2, 'feedback')}
                  {renderOptionButton("3 - Moderately helpful", 3, 'feedback')}
                  {renderOptionButton("4 - Very helpful", 4, 'feedback')}
                  {renderOptionButton("5 - Extremely helpful", 5, 'feedback')}
                </View>
                {feedbackError && <Text style={styles.errorText}>Please select a feedback rating.</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>How well did the professor organize the course material?</Text>
                <View style={styles.optionsContainer}>
                  {renderOptionButton("1 - Very Poor", 1, 'organization')}
                  {renderOptionButton("2 - Poor", 2, 'organization')}
                  {renderOptionButton("3 - Average", 3, 'organization')}
                  {renderOptionButton("4 - Good", 4, 'organization')}
                  {renderOptionButton("5 - Excellent", 5, 'organization')}
                </View>
                {organizationError && <Text style={styles.errorText}>Please select an organization rating.</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>How available was the professor outside of class?</Text>
                <View style={styles.optionsContainer}>
                  {renderOptionButton("1 - Not available at all", 1, 'availability')}
                  {renderOptionButton("2 - Slightly available", 2, 'availability')}
                  {renderOptionButton("3 - Moderately available", 3, 'availability')}
                  {renderOptionButton("4 - Very available", 4, 'availability')}
                  {renderOptionButton("5 - Extremely available", 5, 'availability')}
                </View>
                {availabilityError && <Text style={styles.errorText}>Please select an availability rating.</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>How engaged was the professor in the class?</Text>
                <View style={styles.optionsContainer}>
                  {renderOptionButton("1 - Not engaged at all", 1, 'engagement')}
                  {renderOptionButton("2 - Slightly engaged", 2, 'engagement')}
                  {renderOptionButton("3 - Moderately engaged", 3, 'engagement')}
                  {renderOptionButton("4 - Very engaged", 4, 'engagement')}
                  {renderOptionButton("5 - Extremely engaged", 5, 'engagement')}
                </View>
                {engagementError && <Text style={styles.errorText}>Please select an engagement rating.</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Overall Grade</Text>
                <TextInput
                  style={styles.textInput}
                  value={grade}
                  onChangeText={(text) => {
                    setGradeError(text.trim() === '');
                    setGrade(text);
                  }}
                  placeholder="Enter the grade"
                  placeholderTextColor="grey"
                />
                {gradeError && <Text style={styles.errorText}>Please enter a grade.</Text>}
              </View>
 
              <View style={styles.formGroup}>
                <Text style={styles.label}>Your Rating</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={rating !== null ? rating.toString() : ''}
                  onChangeText={(text) => {
                    const value = Number(text);
                    setRatingError(isNaN(value) || value < 1 || value > 10);
                    setRating(value);
                  }}
                  placeholder="Enter rating between 1 and 10"
                  placeholderTextColor='grey'
                />
                {ratingError && <Text style={styles.errorText}>Please enter a valid rating between 1 and 5.</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Your Review</Text>
                <TextInput
                  style={styles.textInput2}
                  multiline
                  numberOfLines={4}
                  value={review}
                  onChangeText={(text) => {
                    setReviewError(text.trim() === '');
                    setReview(text);
                  }}
                  placeholder="Write your review here"
                  placeholderTextColor='grey'
                />
                {reviewError && <Text style={styles.errorText}>Please enter your review.</Text>}
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282627',
    padding: scaleWidth(16),
  },
  container2: {
    flex: 1,
  },
 

  header: {
    alignItems: 'center',
    marginTop: scaleHeight(50),
    color: '#fff',
  },
  profContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginTop: scaleHeight(10),
    alignItems: 'center',
    marginRight: scaleWidth(10)
  },
  overallRatingText: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(30),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "center",
    width: scaleWidth(200),
    height: scaleHeight(30),

  },
  ratingValue: {
    fontSize: scaleFont(32),
    fontWeight: 'bold',
    marginTop: scaleHeight(5),
  },
  reviewSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  reviewTitle: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(30),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "center",
    width: scaleWidth(200),
    height: scaleHeight(30),
    marginRight: scaleWidth(25),
  },
  addReviewButton: {
    backgroundColor: '#2563EB',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(6),
    borderRadius: scaleWidth(5),
    marginRight: scaleWidth(10),
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(10),
    marginBottom: scaleHeight(10),
    flexDirection: 'row',
    elevation: scaleWidth(3),
  },
  reviewRating: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(10),
  },
  reviewRatingText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(5),
  },
  reviewAuthor: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: scaleFont(14),
    color: '#777',
  },
  reviewText: {
    fontSize: scaleFont(16),
    color: '#fff',
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(10),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#282627',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(20),
    elevation: scaleWidth(5),
  },
  modalTitle: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginBottom: scaleHeight(20),
    color: "#fff",
    marginTop: scaleHeight(40),
  },
  formGroup: {
    marginBottom: scaleHeight(15),
  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: scaleHeight(5),
    color: "#fff"
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(5),
    margin: scaleWidth(4),
  },
  optionButtonSelected: {
    backgroundColor: '#007BFF',
  },
  optionButtonText: {
    color: '#333',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },

  optionButtonTextSelected: {
    color: '#fff',
  },
  textInput: {
    height: scaleHeight(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: scaleWidth(5),
    paddingHorizontal: scaleWidth(8),
    fontSize: scaleFont(16),
    color: '#fff',
  },
  textInput2: {
    height: scaleHeight(150),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: scaleWidth(5),
    paddingHorizontal: scaleWidth(8),
    fontSize: scaleFont(16),
    color: '#fff',
  },
 
  errorText: {
    color: 'red',
    fontSize: scaleFont(14),
    marginTop: scaleHeight(5),
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(5),
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(5),
    alignItems: 'center',
    marginBottom: scaleHeight(50),
  },
  cancelButtonText: {
    color: '#333',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  textGreenDark: {
    color: '#2E7D32',
  },
  textGreenLight: {
    color: '#66BB6A',
  },
  textYellow: {
    color: '#FFEB3B',
  },
  textRed: {
    color: '#D32F2F',
  },
  textOrange: {
    color: '#FFA000',
  },
  textWhite: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: scaleHeight(100),
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: scaleHeight(20),
    backgroundColor: '#333', // Dark background for the chart
    borderRadius: scaleWidth(8),
    padding: scaleWidth(10),
  },
});

export default Professor;
