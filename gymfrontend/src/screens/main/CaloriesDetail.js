import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CaloriesDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calories Details</Text>
      {/* Kalori detayları buraya gelecek */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },
});

export default CaloriesDetail; 