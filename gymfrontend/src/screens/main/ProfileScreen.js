import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { usePrivy } from "@privy-io/expo";
import colors from '../../utils/colors';

const ProfileScreen = ({ navigation }) => {
  const { logout, user } = usePrivy();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Could not logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Welcome, {user?.email}</Text>
      
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('AboutYourself')}
      >
        <Text style={styles.menuText}>Tell Us About Yourself</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 