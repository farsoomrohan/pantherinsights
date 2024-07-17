import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface ReviewCardProps {
  reviewerName: string;
  reviewDate: string;
  rating: number;
  reviewText: string;
  likes: number;
  comments: number;
}
const getLetterGrade = (percentage: number): string => {
  if (percentage >= 97.5) return 'A+';
  if (percentage >= 92.5) return 'A';
  if (percentage >= 89.5) return 'A-';
  if (percentage >= 86.5) return 'B+';
  if (percentage >= 82.5) return 'B';
  if (percentage >= 79.5) return 'B-';
  if (percentage >= 76.5) return 'C+';
  if (percentage >= 72.5) return 'C';
  if (percentage >= 69.5) return 'C-';
  if (percentage >= 66.5) return 'D+';
  if (percentage >= 62.5) return 'D';
  if (percentage >= 59.5) return 'D-';
  return 'F';
};

const getLetterGradeColor = (rating: number): string => {
    if (rating >= 90) return '#008000'; // dark green
    if (rating >= 70) return '#84EAB3'; // light green
    if (rating >= 60) return '#FFD700'; // Yellow
    
    return '#FF0000'; //red
};

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, reviewDate, rating, reviewText, likes, comments}) => {
  const letterGrade = getLetterGrade(rating);
  const letterGradeColor = getLetterGradeColor(rating);

  return (
       <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.reviewerName}>{reviewerName}</Text>
        <Text style={styles.date}>{reviewDate}</Text>
      </View>

      <View style={styles.ratingContainer}>
        <View style={[styles.ratingBox, { backgroundColor: '#333' }]}>
          <Text style={[styles.ratingValue, { color: letterGradeColor }]}>{letterGrade}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{reviewText}</Text>
         <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Icon name="heart" size={20} color="red" />
          <Text style={styles.iconText}>{likes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="comment" size={20} color="#fff" />
          <Text style={styles.iconText}>{comments}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 card: {
    backgroundColor: '#202020',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB'
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingBox: {
    backgroundColor: '#333',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
    color: '#2563EB',
  },
  ratingValue: {
    fontSize: 24,
  },
  reviewText: {
    fontSize: 14,
    color: '#fff',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
  },


});

export default ReviewCard;

