import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../app/responsiveScaling';

interface MessageProps {
  message: string;
  senderName: string;
  timeStamp: string;
  senderId: string;
  receiverId: string;
}

const Message: React.FC<MessageProps> = ({ message, senderName, timeStamp, senderId, receiverId }) => {
  const isSender = senderId === receiverId;

  return (
    <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
      <View style={[styles.bubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
        <Text style={styles.senderName}>{senderName}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.timeStamp}>{timeStamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxWidth: '100%',
    width: scaleWidth(1000),
  },
  senderContainer: {
    alignSelf: 'center',
  },
  receiverContainer: {
    alignSelf: 'center',
  },
  bubble: {
    borderRadius: scaleBoth(20),
    padding: scaleBoth(10),
  },
  senderBubble: {
    backgroundColor: '#202020',
  },
  receiverBubble: {
    backgroundColor: '#202020',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: scaleHeight(3),
    fontSize: scaleFont(12),
    color: '#2563EB'
  },
  messageText: {
    fontSize: scaleFont(16),
    color: '#fff',
  },
  timeStamp: {
    fontSize: scaleFont(10),
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: scaleHeight(5),
  },
});

export default Message;