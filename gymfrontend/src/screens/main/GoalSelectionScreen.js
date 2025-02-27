import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';

const GoalSelectionScreen = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    { id: 1, title: 'Get Fitter' },
    { id: 2, title: 'Gain Weight' },
    { id: 3, title: 'Lose Weight' },
    { id: 4, title: 'Building Muscles' },
    { id: 5, title: 'Improving Endurance' },
    { id: 6, title: 'Others' },
  ];

  const toggleGoal = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is Your Goal?</Text>
      <Text style={styles.subtitle}>
        You can choose more one. Don't worry you can always change it later
      </Text>

      <ScrollView style={styles.goalsContainer}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalItem,
              selectedGoals.includes(goal.id) && styles.selectedGoalItem
            ]}
            onPress={() => toggleGoal(goal.id)}
          >
            <Text style={[
              styles.goalText,
              selectedGoals.includes(goal.id) && styles.selectedGoalText
            ]}>
              {goal.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedGoals.length === 0 && styles.disabledButton
          ]}
          onPress={() => {
            if (selectedGoals.length > 0) {
              navigation.navigate('Home');
            }
          }}
          disabled={selectedGoals.length === 0}
        >
          <Text style={[
            styles.continueButtonText,
            selectedGoals.length === 0 && styles.disabledButtonText
          ]}>Complete</Text>
        </TouchableOpacity>
      </View>
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
  goalsContainer: {
    flex: 1,
  },
  goalItem: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedGoalItem: {
    backgroundColor: '#333333',
    borderColor: '#FFFFFF',
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedGoalText: {
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
    marginTop: 20,
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
  disabledButton: {
    backgroundColor: '#333333',
    opacity: 0.5,
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
  disabledButtonText: {
    color: '#666666',
  },
});

export default GoalSelectionScreen; 