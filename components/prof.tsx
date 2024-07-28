import { scaleBoth, scaleFont, scaleHeight, scaleWidth } from '@/app/responsiveScaling';
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
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: scaleBoth(20),
  },
  name: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(30),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "center",
    width: scaleWidth(200),
    height: scaleHeight(35), 
  },
  email: {
    color: '#2563EB',
    textAlign: 'center',
  },
});

export default Prof;
