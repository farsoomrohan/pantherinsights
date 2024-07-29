import { StyleSheet, ScrollView, Image, Platform, View, Pressable, Text} from 'react-native';
import ReviewCard from '@/components/ReviewCard';
import Message from '@/components/message';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../responsiveScaling';
import Footer from '@/components/footer';


export default function messageScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.homeText}>Find a study partner today!</Text>
      <View style={styles.space2}></View>
      <View style = {styles.row}>
        <Pressable style={styles.button2} onPress={() => console.log('messages filter')}>
          <Text style={styles.buttonText2}>Messages</Text>
        </Pressable>
       <Pressable style={styles.button2} onPress={() => console.log('notifications filter')}>
          <Text style={styles.buttonText2}>Notifications</Text>
        </Pressable>
       <Pressable style={styles.button2} onPress={() => console.log('reviews filter')}>
          <Text style={styles.buttonText2}>Reviews</Text>
        </Pressable>
      </View>
      <View style={styles.space2}></View>
      <Message
        message="Hello, this is a message."
        senderName="Sebastian "
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
      <Message
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
        senderName="John Doe"
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
      <Message
        message="Hello, this is a message."
        senderName="farhan"
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
      <Message
        message="Hello, this is a message."
        senderName="farhan"
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
       <Message
        message="Hello, this is a message."
        senderName="farhan"
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
       <Message
        message="Hello, this is a message."
        senderName="farhan"
        timeStamp="10:30 AM"
        senderId="1"
        receiverId="2" 
      />
 
      <Footer/> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleBoth(16),
    backgroundColor: '#282627',
  },

  space: {
    height: scaleHeight(50),
  },
  space2: {
    height: scaleHeight(25),
  },

  row: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  buttonText2: {
    color: '#fff', // White text color
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },

  button2: {
    backgroundColor: '#2563EB', // Fill color for the rectangle
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(12),
    borderRadius: scaleBoth(4),
  },
  homeText: {
    fontSize: scaleFont(24),
    lineHeight: scaleHeight(32),
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "left",
    height: scaleHeight(32),
  },

});
