import { StyleSheet, ScrollView, Image, Platform, Alert } from 'react-native';
import ReviewCard from '@/components/ReviewCard';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';
import Professor from '@/components/professor';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';
import React, { useState, useEffect } from 'react';

type Professor = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export default function searchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);

const fetchProfessors = async (query: string) => {
  setLoading(true);
  try {
    const snapshot = await firebase.firestore()
      .collection('professors')
      .where('name', '>=', query)
      .where('name', '<=', query + '\uf8ff')
      .get();

    const professorsList: Professor[] = snapshot.docs.map(doc => {
      const data = doc.data() as Professor;
      return {
        ...data,
        id: doc.id
      };
    });

    setProfessors(professorsList);
  } catch (error) {
    console.error("Error fetching professors: ", error);
  } finally {
    setLoading(false);
  }
};
  
  return (
      <Professor 
        professorId={'010203'}
        professorName={'Louis Henry'}
        professorEmail={'lhenry23@gsu.edu'}
        professorImageUrl={'https://cas.gsu.edu/files/2019/08/henry.jpg'}
        
      />
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282627',
  },
});
