import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../utils/colors';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      setError('E-posta adresi gerekli');
      return;
    }

    // TODO: Şifre sıfırlama işlemi
    console.log('Şifre sıfırlama e-postası gönderiliyor:', email);
    setSuccess(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifremi Unuttum</Text>
      
      {success ? (
        <View>
          <Text style={styles.successText}>
            Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
          </Text>
          <Button 
            title="Giriş Yap" 
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      ) : (
        <>
          <Text style={styles.description}>
            Şifrenizi sıfırlamak için e-posta adresinizi girin.
          </Text>

          <Input
            label="E-posta"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button 
            title="Şifremi Sıfırla" 
            onPress={handleSubmit}
          />

          <Button 
            title="Giriş Yap" 
            type="secondary"
            onPress={() => navigation.navigate('Login')}
          />
        </>
      )}
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
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    color: colors.success,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ForgotPasswordScreen; 