import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePrivy } from "@privy-io/expo";
import colors from '../../utils/colors';
import { SafeAreaView, StatusBar } from 'react-native';
import { fetchUserProfile } from '../../services/userService';


const UserScreen = ({ navigation }) => {
  const { logout, user } = usePrivy();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (user?.id) {
          const profile = await fetchUserProfile(user.id);
          
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        Alert.alert('Error', 'Failed to load user profile');
      }
    };

    loadUserProfile();
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Could not logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: 'Edit profile',
      icon: 'create-outline',
      onPress: () => navigation.navigate('UserEdit')
    },
    {
      id: 2,
      title: 'Security',
      icon: 'shield-outline',
      onPress: () => navigation.navigate('SecurityScreen')
    },
    {
      id: 3,
      title: 'Bluetooth',
      icon: 'bluetooth-outline',
      onPress: () => navigation.navigate('BluetoothScreen')
    },
    {
      id: 4,
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('NotificationsSettingsScreen')
    },
    {
      id: 5,
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: handleLogout
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      {/* Cover Photo Section */}
      <View style={styles.coverPhotoSection}>
        <View style={styles.coverPhoto}>
          <TouchableOpacity style={styles.coverCameraButton}>
            <Icon name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <View>
              <Image
              source={require('../../../assets/profile.png')}
              style={styles.profileImage}
              />
            </View>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Icon name="camera-outline" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{userProfile?.first_name || user?.email || 'User'}</Text>
        <Text style={styles.profileBio}>{userProfile?.bio || 'Add a bio to your profile'}</Text>
        <Text style={styles.profileStats}>
          {userProfile?.stats?.moves || 0} moves | {userProfile?.stats?.experience || 0}k experience
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              <Icon 
                name={item.icon} 
                size={20} 
                color={colors.text}
              />
              <Text style={styles.menuItemText}>
                {item.title}
              </Text>
            </View>
            <Icon 
              name="chevron-forward" 
              size={20} 
              color={colors.secondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coverPhotoSection: {
    position: 'relative',
    marginBottom: 60,
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    backgroundColor: colors.darkGray,
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
  profileImageSection: {
    position: 'absolute',
    left: 20,
    bottom: -40,
  },
  profileImageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    borderWidth: 3,
    borderColor: '#000',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  profileInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  profileStats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 15,
  }
});

export default UserScreen; 