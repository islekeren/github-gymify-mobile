import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../utils/colors';

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    // Basit doğrulama
    const newErrors = {};
    if (!formData.name) newErrors.name = 'İsim gerekli';
    if (!formData.email) newErrors.email = 'E-posta gerekli';
    if (!formData.password) newErrors.password = 'Şifre gerekli';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Kayıt işlemi
    console.log('Kayıt yapılıyor:', formData);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    setErrors(prev => ({
      ...prev,
      [key]: null
    }));
  };

  return (
    <View style={styles.container}>
      <Input
        label="İsim"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        error={errors.name}
      />

      <Input
        label="E-posta"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Şifre"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        error={errors.password}
        secureTextEntry
      />

      <Input
        label="Şifre Tekrar"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        error={errors.confirmPassword}
        secureTextEntry
      />

      <Button 
        title="Kayıt Ol" 
        onPress={handleSignUp}
      />

      <Button 
        title="Giriş Yap" 
        type="secondary"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
});

export default SignUpScreen; 