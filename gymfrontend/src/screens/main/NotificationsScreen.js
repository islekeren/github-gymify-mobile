import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Success',
      message: "You've been exercising for 2 hours",
      time: 'Today'
    },
    {
      id: 2,
      type: 'workout',
      title: 'New Workout',
      message: "New workout program is available for you",
      time: 'Today'
    },
    {
      id: 3,
      type: 'info',
      title: 'Info',
      message: 'New settings available on your account',
      time: 'Today'
    },
    {
      id: 4,
      type: 'info',
      title: 'Info',
      message: 'New settings available on your account',
      time: 'Today'
    },
    {
      id: 5,
      type: 'feature',
      title: 'New Features are Available',
      message: 'You can now set exercise reminder',
      time: 'Today'
    }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'workout':
        return 'fitness-outline';
      case 'info':
        return 'information-circle-outline';
      case 'feature':
        return 'star-outline';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationGroup}>
            <Text style={styles.timeHeader}>{notification.time}</Text>
            <TouchableOpacity style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                <Icon 
                  name={getNotificationIcon(notification.type)} 
                  size={24} 
                  color="#FFF" 
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Icon name="ellipsis-horizontal" size={20} color="#666" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  notificationList: {
    flex: 1,
  },
  notificationGroup: {
    marginBottom: 20,
  },
  timeHeader: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    marginBottom: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationMessage: {
    color: '#666',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
});

export default NotificationsScreen;