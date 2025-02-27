import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import colors from '../../utils/colors';

const BluetoothDetailScreen = ({ route, navigation }) => {
  const { device } = route.params;
  const [services, setServices] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    getDeviceServices();
  }, []);

  const getDeviceServices = async () => {
    try {
      const deviceServices = await BleManager.retrieveServices(device.id);
      setServices(deviceServices.services);
      setCharacteristics(deviceServices.characteristics);
    } catch (error) {
      console.error('Get services error:', error);
      Alert.alert('Error', 'Failed to get device services');
    }
  };

  const disconnectDevice = async () => {
    try {
      await BleManager.disconnect(device.id);
      navigation.goBack();
    } catch (error) {
      console.error('Disconnect error:', error);
      Alert.alert('Error', 'Failed to disconnect device');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{device.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SerialTerminal', { device })}>
          <Icon name="terminal-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.deviceInfoCard}>
          <Text style={styles.deviceInfoTitle}>Device Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{device.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID:</Text>
            <Text style={styles.infoValue}>{device.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>RSSI:</Text>
            <Text style={styles.infoValue}>{device.rssi} dBm</Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceUuid}>{service}</Text>
            </View>
          ))}
        </View>

        {/* Disconnect Button */}
        <TouchableOpacity 
          style={styles.disconnectButton}
          onPress={disconnectDevice}
        >
          <Text style={styles.disconnectButtonText}>Disconnect</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  deviceInfoCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  deviceInfoTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    color: colors.secondary,
    fontSize: 14,
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  serviceUuid: {
    color: colors.text,
    fontSize: 14,
  },
  disconnectButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  disconnectButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BluetoothDetailScreen; 