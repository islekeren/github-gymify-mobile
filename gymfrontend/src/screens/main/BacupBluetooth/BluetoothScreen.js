import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import { BleManagerEmitter } from 'react-native-ble-manager';
import colors from '../../utils/colors';

const BluetoothScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    // BLE Manager'ı başlat
    BleManager.start({ showAlert: false });

    // Bluetooth durumunu kontrol et
    checkBluetoothState();

    // Event listeners
    const listeners = [
      BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral),
      BleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      BleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectPeripheral),
      BleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectPeripheral),
    ];

    return () => {
      // Cleanup
      listeners.forEach(listener => listener.remove());
    };
  }, []);

  const checkBluetoothState = async () => {
    try {
      const enabled = await BleManager.checkState();
      setBluetoothEnabled(enabled === 'on');
    } catch (error) {
      console.error('Bluetooth state check error:', error);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startScan = async () => {
    if (!bluetoothEnabled) {
      Alert.alert('Error', 'Please enable Bluetooth');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Error', 'Location permission is required for Bluetooth scanning');
      return;
    }

    try {
      setIsScanning(true);
      setDevices([]);
      await BleManager.scan([], 5, true); // 5 saniye tara
    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  };

  const handleDiscoverPeripheral = (peripheral) => {
    if (!peripheral.name) return;
    setDevices(prevDevices => {
      if (prevDevices.findIndex(d => d.id === peripheral.id) === -1) {
        return [...prevDevices, peripheral];
      }
      return prevDevices;
    });
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleConnectPeripheral = (peripheral) => {
    setConnectedDevices(prev => [...prev, peripheral]);
  };

  const handleDisconnectPeripheral = (peripheral) => {
    setConnectedDevices(prev => prev.filter(d => d.id !== peripheral.id));
  };

  const connectToDevice = async (device) => {
    try {
      await BleManager.connect(device.id);
      navigation.navigate('BluetoothDetail', { device });
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Error', 'Failed to connect to device');
    }
  };

  const toggleBluetooth = async () => {
    if (bluetoothEnabled) {
      // Bluetooth'u kapat
      await BleManager.disableBluetoothAdapter();
    } else {
      // Bluetooth'u aç
      await BleManager.enableBluetoothAdapter();
    }
    setBluetoothEnabled(!bluetoothEnabled);
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
        {bluetoothEnabled && connectedDevices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connected Devices</Text>
            {connectedDevices.map(device => (
              <TouchableOpacity 
                key={device.id} 
                style={styles.deviceCard}
                onPress={() => navigation.navigate('BluetoothDetail', { device })}
              >
                <View style={styles.deviceInfo}>
                  <Icon 
                    name="bluetooth" 
                    size={24} 
                    color={colors.primary}
                  />
                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceStatus}>Connected</Text>
                  </View>
                </View>
                <Icon 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.secondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Available Devices */}
        {bluetoothEnabled && devices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Devices</Text>
            {devices.map(device => (
              <TouchableOpacity 
                key={device.id} 
                style={styles.deviceCard}
                onPress={() => connectToDevice(device)}
              >
                <View style={styles.deviceInfo}>
                  <Icon 
                    name="bluetooth-outline" 
                    size={24} 
                    color={colors.text} 
                  />
                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceStatus}>Available</Text>
                  </View>
                </View>
                <Text style={styles.rssiText}>{device.rssi} dBm</Text>
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