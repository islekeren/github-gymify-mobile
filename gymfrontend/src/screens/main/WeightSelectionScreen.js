import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';

const WeightSelectionScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('64.5');
  const [unit, setUnit] = useState('kg'); // 'kg' or 'lb'

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>What is Your Weight?</Text>
        <Text style={styles.subtitle}>
          Weight in {unit}. Don't worry, you can always change it later
        </Text>

        <View style={styles.weightContainer}>
          <View style={styles.circle}>
            <Text style={styles.enterWeight}>Enter Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.weightInput}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
                maxLength={5}
              />
            </View>
            <View style={styles.unitSelector}>
              <TouchableOpacity 
                style={[styles.unitButton, unit === 'kg' && styles.selectedUnit]}
                onPress={() => setUnit('kg')}
              >
                <Text style={[styles.unitText, unit === 'kg' && styles.selectedUnitText]}>KG</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.unitButton, unit === 'lb' && styles.selectedUnit]}
                onPress={() => setUnit('lb')}
              >
                <Text style={[styles.unitText, unit === 'lb' && styles.selectedUnitText]}>LB</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('HeightSelection')}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  weightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterWeight: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightInput: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 120,
  },
  unitSelector: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 4,
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  selectedUnit: {
    backgroundColor: '#FFFFFF',
  },
  unitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedUnitText: {
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeightSelectionScreen; 