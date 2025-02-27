import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen, { WorkoutListScreen, CategoryWorkoutListScreen } from '../screens/main/HomeScreen';
import MealsScreen from '../screens/main/MealsScreen';
import WorkoutScreen from '../screens/main/WorkoutScreen';
import ProgressScreen from '../screens/main/ProgressScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import UserScreen from '../screens/main/UserScreen';
import WorkoutDetail from '../screens/main/WorkoutDetail';
import CaloriesDetail from '../screens/main/CaloriesDetail';
import CategoryWorkouts from '../screens/main/CategoryWorkouts';
import FeaturedWorkouts from '../screens/main/FeaturedWorkouts';
import AllCategories from '../screens/main/AllCategories';
import AboutYourselfScreen from '../screens/main/AboutYourselfScreen';
import AgeSelectionScreen from '../screens/main/AgeSelectionScreen';
import WeightSelectionScreen from '../screens/main/WeightSelectionScreen';
import HeightSelectionScreen from '../screens/main/HeightSelectionScreen';
import GoalSelectionScreen from '../screens/main/GoalSelectionScreen';
import UserEditScreen from '../screens/main/UserEditScreen';
import SecurityScreen from '../screens/main/SecurityScreen';
import NotificationsSettingsScreen from '../screens/main/NotificationsSettingsScreen';
import MealsSearchScreen from '../screens/main/MealsSearchScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import BluetoothScreen from '../screens/main/BluetoothScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
      <Stack.Screen name="CaloriesDetail" component={CaloriesDetail} />
      <Stack.Screen name="CategoryWorkouts" component={CategoryWorkouts} />
      <Stack.Screen name="FeaturedWorkouts" component={FeaturedWorkouts} />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="AboutYourself" component={AboutYourselfScreen} />
      <Stack.Screen name="AgeSelection" component={AgeSelectionScreen} />
      <Stack.Screen name="WeightSelection" component={WeightSelectionScreen} />
      <Stack.Screen name="HeightSelection" component={HeightSelectionScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} /> 
      <Stack.Screen name="NotificationsSettingsScreen" component={NotificationsSettingsScreen} /> 
      <Stack.Screen name="MealsSearchScreen" component={MealsSearchScreen} />
      <Stack.Screen name="BluetoothScreen" component={BluetoothScreen} />
      <Stack.Screen name="WorkoutList" component={WorkoutListScreen} />
      <Stack.Screen name="CategoryWorkoutList" component={CategoryWorkoutListScreen} />     
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#333333',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Meals" 
        component={MealsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="restaurant-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Workout" 
        component={WorkoutScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="fitness-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Insight" 
        component={ProgressScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="User" 
        component={UserScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack; 