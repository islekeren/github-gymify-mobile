import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CategoryWorkouts = ({ route }) => {
  const { level } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{level} Workouts</Text>
      {/* Kategori egzersizleri buraya gelecek */}
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

export default CategoryWorkouts; 