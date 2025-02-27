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

const NotificationsSettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    generalNotification: false,
    sound: false,
    vibrate: false,
    autoUpdate: false,
    newService: false,
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
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsContainer}>
          <View style={styles.settingCard}>
       
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('generalNotification')}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingText}>General Notification</Text>
              </View>
              <View style={[styles.toggle, settings.generalNotification && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('sound')}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingText}>Sound</Text>
              </View>
              <View style={[styles.toggle, settings.sound && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('vibrate')}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingText}>Vibrate</Text>
              </View>
              <View style={[styles.toggle, settings.vibrate && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('autoUpdate')}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingText}>Auto Update</Text>
              </View>
              <View style={[styles.toggle, settings.autoUpdate && styles.toggleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => toggleSetting('newService')}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingText}>New Service Available</Text>
              </View>
              <View style={[styles.toggle, settings.newService && styles.toggleActive]} />
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
  },
  settingsContainer: {
    padding: 16,
  },
  settingCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flex: 1,
  },
  settingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#333',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.success,
  },
});

export default NotificationsSettingsScreen;