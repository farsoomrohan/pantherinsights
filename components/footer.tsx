import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../app/responsiveScaling';

const Footer: React.FC = () => {

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Panther Insights</Text>
        </View>
        <Text style={styles.text}>© 2024 Georgia State University</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
            <Image source={require('../assets/icons/twitter.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/panther.insight?igsh=eGRkNzA1cnRzZmIw&utm_source=qr')}>
            <Image source={require('../assets/icons/instagram.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/panther-insights/')}>
            <Image source={require('../assets/icons/linkedin.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#282627',
    paddingVertical: scaleHeight(20),
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: scaleWidth(32),
    height: scaleHeight(32),
  },
  title: {
    marginLeft: scaleWidth(10),
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  text: {
    marginTop: scaleHeight(10),
    fontSize: scaleFont(14),
    color: '#9a9a9a',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(10),
  },
  icon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    marginHorizontal: scaleWidth(8),
  },
});

export default Footer;
