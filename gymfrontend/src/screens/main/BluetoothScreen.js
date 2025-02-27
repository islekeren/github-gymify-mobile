import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const BluetoothScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState([
    { id: '1', name: 'Mi Smart Band 6', status: 'Connected', batteryLevel: '85%' },
    { id: '2', name: 'Apple Watch', status: 'Available', batteryLevel: null },
    { id: '3', name: 'Fitness Tracker Pro', status: 'Available', batteryLevel: null },
  ]);

  const toggleBluetooth = () => {
    setBluetoothEnabled(!bluetoothEnabled);
  };

  const startScan = () => {
    setIsScanning(true);
    // Simüle edilmiş tarama - 2 saniye sonra duracak
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bluetooth</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Bluetooth Toggle */}
        <View style={styles.section}>
          <View style={styles.bluetoothCard}>
            <View style={styles.bluetoothHeader}>
              <View style={styles.bluetoothInfo}>
                <Icon 
                  name="bluetooth" 
                  size={24} 
                  color={bluetoothEnabled ? colors.primary : colors.secondary} 
                />
                <Text style={styles.bluetoothTitle}>Bluetooth</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggle, bluetoothEnabled && styles.toggleActive]}
                onPress={toggleBluetooth}
              />
            </View>
            <Text style={styles.bluetoothStatus}>
              {bluetoothEnabled ? 'On' : 'Off'}
            </Text>
          </View>
        </View>

        {/* Scan Button */}
        {bluetoothEnabled && (
          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={startScan}
            disabled={isScanning}
          >
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Scan for Devices'}
            </Text>
            {isScanning && (
              <ActivityIndicator 
                color={colors.text} 
                style={styles.scanningIndicator} 
              />
            )}
          </TouchableOpacity>
        )}

        {/* Connected Devices */}
        {bluetoothEnabled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connected Devices</Text>
            {devices.map(device => (
              <TouchableOpacity 
                key={device.id} 
                style={styles.deviceCard}
              >
                <View style={styles.deviceInfo}>
                  <Icon 
                    name={device.status === 'Connected' ? 'bluetooth' : 'bluetooth-outline'} 
                    size={24} 
                    color={device.status === 'Connected' ? colors.primary : colors.text} 
                  />
                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceStatus}>{device.status}</Text>
                  </View>
                </View>
                {device.batteryLevel && (
                  <View style={styles.batteryInfo}>
                    <Icon name="battery-half-outline" size={20} color={colors.text} />
                    <Text style={styles.batteryText}>{device.batteryLevel}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  section: {
    padding: 16,
  },
  bluetoothCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
  },
  bluetoothHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bluetoothInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bluetoothTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  bluetoothStatus: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 8,
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
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  scanButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  scanningIndicator: {
    marginLeft: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDetails: {
    marginLeft: 12,
  },
  deviceName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  deviceStatus: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 4,
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 4,
  },
});

export default BluetoothScreen; 