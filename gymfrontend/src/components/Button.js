import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const Button = ({ onPress, title, type = 'primary', disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        styles[type],
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${type}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: colors.primary,
  },
});

export default Button; 