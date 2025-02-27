import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../utils/colors'; // colors.js dosyasını import ediyoruz

const TodayWorkoutCard = ({ todayWorkout, onPress, showBorder = true }) => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);
  
  const animatedGradient = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.cardContainer}>
      {showBorder ? (
        <View style={styles.borderContainer}>
          <Animated.View style={[styles.gradientContainer, animatedGradient]}>
            <LinearGradient
              colors={['#00ffff', '#6600ff', '#00ffff', '#6600ff', '#00ffff']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          <View style={styles.mainCard}>
            <TouchableOpacity onPress={onPress}>
              <Image source={todayWorkout.image} style={styles.cardImage} />
              <View style={styles.overlay}>
                <View>
                  <Text style={styles.title}>Day {todayWorkout.day} - {todayWorkout.title}</Text>
                  <Text style={styles.subtitle}>
                    {todayWorkout.duration} | {todayWorkout.level}
                  </Text>
                </View>
                <TouchableOpacity style={styles.bookmarkButton}>
                  <Icon name="bookmark-outline" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.mainCard}>
          <TouchableOpacity onPress={onPress}>
            <Image source={todayWorkout.image} style={styles.cardImage} />
            <View style={styles.overlay}>
              <View>
                <Text style={styles.title}>Day {todayWorkout.day} - {todayWorkout.title}</Text>
                <Text style={styles.subtitle}>
                  {todayWorkout.duration} | {todayWorkout.level}
                </Text>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Icon name="bookmark-outline" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const PlaySectionCard = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedGradient = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.playCardContainer}>
      <View style={styles.borderContainer}>
        <Animated.View style={[styles.gradientContainer, animatedGradient]}>
          <LinearGradient
            colors={['#00ffff', '#6600ff', '#00ffff', '#6600ff', '#00ffff']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <View style={styles.mainCard}>
          <Image 
            source={require('../../../assets/workouts/seatedrow.jpg')} 
            style={styles.cardImage} 
          />
          <View style={styles.overlay}>
            <View>
              <Text style={styles.title}>Connected Equipment</Text>
              <Text style={styles.subtitle}>Seated Row</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>Play ▶</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const WorkoutScreen = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const todayWorkout = {
    day: '01',
    title: 'Warm Up',
    duration: '10 minutes',
    level: 'Intermediate',
    image: require('../../../assets/workouts/warmup.jpg'), // Görsel eklenmeli
  };

  const workoutCategories = [
    {
      id: '1',
      title: 'The Man Doing Pushup',
      duration: '10 minutes',
      level: 'Beginner',
      image: require('../../../assets/workouts/pushup.jpg'),
    },
    {
      id: '2',
      title: 'Best Plan',
      duration: '5 minutes',
      level: 'Intermediate',
      image: require('../../../assets/workouts/plan.jpg'),
    },
  ];

  const newWorkouts = [
    {
      id: '1',
      title: 'Wall Sits',
      duration: '8 minutes',
      level: 'Beginner',
      image: require('../../../assets/workouts/wallsits.jpg'),
    },
    {
      id: '2',
      title: 'Burpees',
      duration: '10 minutes',
      level: 'Advanced',
      image: require('../../../assets/workouts/burpees.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../../assets/profile.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Hello, David</Text>
              <Text style={styles.subtitle}>Let's Begin!</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* New Play Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Equipment Connected, Ready to Play!</Text>
          </View>
          <PlaySectionCard />
        </View>

        {/* Modified Today's Workout Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today Workout Plan</Text>
            <Text style={styles.date}>Mon 22, Apr</Text>
          </View>
          <TodayWorkoutCard 
            todayWorkout={todayWorkout}
            showBorder={false}
          />
        </View>

        {/* Workout Categories */}
        <View style={styles.section}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.sectionTitle}>Workout Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.levelSelector}>
            {['Beginner', 'Intermediate', 'Advance'].map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  selectedLevel === level && styles.levelButtonActive
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={[
                  styles.levelButtonText,
                  selectedLevel === level && styles.levelButtonTextActive
                ]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.workoutGrid}>
            {workoutCategories.map(workout => (
              <TouchableOpacity 
                key={workout.id} 
                style={styles.workoutCard}
              >
                <Image source={workout.image} style={styles.workoutImage} />
                <View style={styles.workoutOverlay}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <Text style={styles.workoutInfo}>
                    {workout.duration} | {workout.level}
                  </Text>
                  <TouchableOpacity style={styles.bookmarkButton}>
                    <Icon name="bookmark-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Workouts */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>New Workouts</Text>
          <View style={styles.newWorkoutsGrid}>
            {newWorkouts.map(workout => (
              <TouchableOpacity 
                key={workout.id} 
                style={styles.newWorkoutCard}
              >
                <Image source={workout.image} style={styles.workoutImage} />
                <View style={styles.workoutOverlay}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <Text style={styles.workoutInfo}>
                    {workout.duration} | {workout.level}
                  </Text>
                  <TouchableOpacity style={styles.bookmarkButton}>
                    <Icon name="bookmark-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAll: {
    color: colors.primary,
    fontSize: 14,
  },
  date: {
    color: colors.primary,
    fontSize: 14,
  },
  cardContainer: {
    width: '100%',
    height: 160,
    marginVertical: 12,
  },
  borderContainer: {
    width: '100%',
    height: '100%',
    padding: 6, // Border thickness
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientContainer: {
    position: 'absolute',
    top: -150, // Ensure gradient covers the entire border
    left: -150,
    right: -150,
    bottom: -150,
  },
  gradient: {
    flex: 1,
    width: '200%', // Make gradient larger to ensure coverage
    height: '200%',
  },
  mainCard: {
    flex: 1,
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#191c29',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bookmarkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelSelector: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  levelButtonActive: {
    backgroundColor: colors.primary,
  },
  levelButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  levelButtonTextActive: {
    color: colors.text,
    fontWeight: '500',
  },
  workoutGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  workoutCard: {
    flex: 1,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    justifyContent: 'flex-end',
  },
  workoutTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  workoutInfo: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  newWorkoutsGrid: {
    marginTop: 12,
    gap: 12,
  },
  newWorkoutCard: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lastSection: {
    paddingBottom: 80, // Bottom tab bar için extra padding
  },
  playCardContainer: {
    width: '100%',
    height: 200, // Taller height
    marginVertical: 12,
  },
  playButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
});

export default WorkoutScreen;