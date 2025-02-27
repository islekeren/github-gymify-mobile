import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const ChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meydan Okumalar</Text>
      <Text style={styles.text}>Meydan okuma içeriği burada olacak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default ChallengeScreen; 