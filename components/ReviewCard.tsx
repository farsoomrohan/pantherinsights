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

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, reviewDate, rating, reviewText, likes, comments}) => {
  const letterGrade = getLetterGrade(rating);

  return (
       <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.reviewerName}>{reviewerName}</Text>
        <Text style={styles.date}>{reviewDate}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating:</Text>
        <Text style={styles.ratingValue}>{letterGrade}</Text>
      </View>
      <Text style={styles.reviewText}>{reviewText}</Text>
         <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Icon name="heart" size={20} color="red" />
          <Text style={styles.iconText}>{likes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="comment" size={20} color="#333" />
          <Text style={styles.iconText}>{comments}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 card: {
    backgroundColor: 'white',
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
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingValue: {
    fontSize: 14,
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
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
    color: '#333',
  },


});

export default ReviewCard;

