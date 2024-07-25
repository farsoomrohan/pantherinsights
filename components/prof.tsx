import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type ProfProps = {
  profName: string;
  profEmail: string;
  profImageUrl: string;
};

const Prof: React.FC<ProfProps> = ({ profName, profEmail, profImageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profImageUrl }} style={styles.image} />
      <Text style={styles.name}>{profName}</Text>
      <Text style={styles.email}>{profEmail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '40%', // Adjust based on your requirement
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    color: 'gray',
    textAlign: 'center',
  },
});

export default Prof;
