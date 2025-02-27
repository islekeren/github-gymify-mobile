import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const SecurityScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    location: false,
    faceId: false,
    rememberMe: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsContainer}>
          {/* Location */}
          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('location')}
            >
              <View style={styles.settingLeft}>
                <Icon 
                  name="location-outline" 
                  size={24} 
                  color={colors.text} 
                  style={styles.settingIcon}
                />
                <View>
                  <Text style={styles.settingText}>Location</Text>
                  <Text style={styles.settingDescription}>Enable location access</Text>
                </View>
              </View>
              <View style={[styles.toggle, settings.location && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          {/* Face ID */}
          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('faceId')}
            >
              <View style={styles.settingLeft}>
                <Icon 
                  name="scan-outline" 
                  size={24} 
                  color={colors.text} 
                  style={styles.settingIcon}
                />
                <View>
                  <Text style={styles.settingText}>Face ID</Text>
                  <Text style={styles.settingDescription}>Use Face ID for login</Text>
                </View>
              </View>
              <View style={[styles.toggle, settings.faceId && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          {/* Remember Me */}
          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('rememberMe')}
            >
              <View style={styles.settingLeft}>
                <Icon 
                  name="key-outline" 
                  size={24} 
                  color={colors.text} 
                  style={styles.settingIcon}
                />
                <View>
                  <Text style={styles.settingText}>Remember Me</Text>
                  <Text style={styles.settingDescription}>Save login info</Text>
                </View>
              </View>
              <View style={[styles.toggle, settings.rememberMe && styles.toggleActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password Button */}
        {/* <TouchableOpacity 
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity> */}
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
  content: {
    flex: 1,
  },
  settingsContainer: {
    padding: 16,
  },
  settingCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    color: colors.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: colors.border,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: colors.success,
  },
  changePasswordButton: {
    backgroundColor: '#FF3B30',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  changePasswordText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SecurityScreen;