import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

const AboutYourselfScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.subtitle}>
        To give you a better experience and results we need to know your gender
      </Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity 
          style={[
            styles.genderCircle,
            selectedGender === 'male' && styles.selectedGender
          ]}
          onPress={() => setSelectedGender('male')}
        />
        
        <TouchableOpacity 
          style={[
            styles.genderCircle,
            selectedGender === 'female' && styles.selectedGender
          ]}
          onPress={() => setSelectedGender('female')}
        />
      </View>

      <TouchableOpacity 
        style={[
          styles.nextButton,
          selectedGender ? styles.nextButtonActive : styles.nextButtonInactive
        ]}
        disabled={!selectedGender}
        onPress={() => navigation.navigate('AgeSelection')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 40,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  genderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#333333',
  },
  selectedGender: {
    borderColor: '#FFFFFF',
    backgroundColor: '#333333',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  nextButtonInactive: {
    backgroundColor: '#333333',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AboutYourselfScreen; 