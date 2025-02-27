import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const UserEditScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    bio: '',
    gender: '',
    email: 'example1995@gmail.com',
    phone: '0545305xxxx',
    birthday: ''
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.coverContainer}>
          <View style={styles.coverPhoto}>
            <TouchableOpacity style={styles.coverCameraButton}>
              <Icon name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileImageWrapper}>
            <View style={styles.profileImage} />
            <TouchableOpacity style={styles.profileCameraButton}>
              <Icon name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              placeholder="Tell us something about you..."
              placeholderTextColor="#666"
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
              multiline
            />
          </View>

          <View style={styles.genderContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity 
                style={[styles.genderButton, formData.gender === 'Female' && styles.genderButtonActive]}
                onPress={() => setFormData({...formData, gender: 'Female'})}
              >
                <Text style={[styles.genderButtonText, formData.gender === 'Female' && styles.genderButtonTextActive]}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genderButton, formData.gender === 'Male' && styles.genderButtonActive]}
                onPress={() => setFormData({...formData, gender: 'Male'})}
              >
                <Text style={[styles.genderButtonText, formData.gender === 'Male' && styles.genderButtonTextActive]}>Male</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={formData.birthday}
              onChangeText={(text) => setFormData({...formData, birthday: text})}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity 
            style={styles.aboutButton}
            onPress={() => navigation.navigate('AboutYourself')}
          >
            <Text style={styles.aboutButtonText}>Tell Us About Yourself</Text>
            <Icon name="chevron-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  saveText: {
    color: colors.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    marginBottom: 60,
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    backgroundColor: '#1C1C1E',
    position: 'relative',
  },
  coverCameraButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'absolute',
    left: '50%',
    bottom: -50,
    transform: [{translateX: -50}],
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    borderWidth: 4,
    borderColor: '#000',
  },
  profileCameraButton: {
    position: 'absolute',
    right: -8,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.darkGray,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    fontSize: 16,
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: colors.darkGray,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
  },
  genderButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  genderButtonTextActive: {
    fontWeight: '600',
  },
  aboutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  aboutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UserEditScreen; 