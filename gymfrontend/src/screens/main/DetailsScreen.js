import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detaylar</Text>
      <Text style={styles.text}>Detay içeriği burada olacak</Text>
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

export default DetailsScreen; 