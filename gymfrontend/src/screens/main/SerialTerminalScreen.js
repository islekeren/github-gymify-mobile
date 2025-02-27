import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import colors from '../../utils/colors';

const SerialTerminalScreen = ({ route, navigation }) => {
  const { device } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      // Mesajı byte array'e çevir
      const data = Array.from(new TextEncoder().encode(inputText));
      
      // Mesajı gönder (service ve characteristic UUID'leri cihaza göre değiştirilmeli)
      await BleManager.write(
        device.id,
        'SERVICE_UUID',
        'CHARACTERISTIC_UUID',
        data
      );

      // Mesajı listeye ekle
      addMessage('sent', inputText);
      setInputText('');
    } catch (error) {
      console.error('Send message error:', error);
    }
  };

  const addMessage = (type, content) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Serial Terminal</Text>
        <TouchableOpacity onPress={() => setMessages([])}>
          <Icon name="trash-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map(message => (
          <View 
            key={message.id} 
            style={[
              styles.messageBox,
              message.type === 'sent' ? styles.sentMessage : styles.receivedMessage
            ]}
          >
            <Text style={styles.messageContent}>{message.content}</Text>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={colors.secondary}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Icon name="send" size={24} color={colors.text} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBox: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.darkGray,
  },
  messageContent: {
    color: colors.text,
    fontSize: 16,
  },
  messageTime: {
    color: colors.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.darkGray,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SerialTerminalScreen; 