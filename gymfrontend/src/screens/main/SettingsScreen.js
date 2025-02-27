import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      
      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => {/* TODO: Profil ayarları */}}
      >
        <Text style={styles.settingText}>Profil Ayarları</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => {/* TODO: Bildirim ayarları */}}
      >
        <Text style={styles.settingText}>Bildirim Ayarları</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => {/* TODO: Gizlilik ayarları */}}
      >
        <Text style={styles.settingText}>Gizlilik</Text>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Versiyon 1.0.0</Text>
      </View>
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
  settingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: {
    color: colors.text,
    opacity: 0.5,
  },
});

export default SettingsScreen; 