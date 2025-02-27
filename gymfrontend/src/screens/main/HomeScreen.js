import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

// Move this to the top level (before HomeScreen component)
const workoutData = {
  'Beginner': [
    { 
      id: '1', 
      title: 'Beginner Full Body', 
      duration: '20 min',
      image: require('../../../assets/workouts/beginner1.jpg')
    },
    { 
      id: '2', 
      title: 'Beginner Cardio', 
      duration: '15 min',
      image: require('../../../assets/workouts/beginner2.jpg')
    }
  ],
  'Intermediate': [
    { 
      id: '3', 
      title: 'Intermediate HIIT', 
      duration: '25 min',
      image: require('../../../assets/workouts/intermediate1.jpg')
    },
    { 
      id: '4', 
      title: 'Strength Training', 
      duration: '30 min',
      image: require('../../../assets/workouts/intermediate2.jpg')
    }
  ],
  'Advanced': [
    { 
      id: '5', 
      title: 'Advanced Circuit', 
      duration: '35 min',
      image: require('../../../assets/workouts/advanced1.jpg')
    },
    { 
      id: '6', 
      title: 'Pro Challenge', 
      duration: '40 min',
      image: require('../../../assets/workouts/advanced2.jpg')
    }
  ]
};

const HomeScreen = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');

  
  const myWorkouts = [
    { 
      id: '1', 
      title: 'Full Body Workout', 
      duration: '30 min',
      image: require('../../../assets/workouts/fullbody.jpg'),
      description: 'Complete full body activation with compound exercises'
    },
    { 
      id: '2', 
      title: 'HIIT Training', 
      duration: '25 min',
      image: require('../../../assets/workouts/hiit.jpg'),
      description: 'High intensity interval training for fat burn'
    },
    { 
      id: '3', 
      title: 'Yoga Flow', 
      duration: '40 min',
      image: require('../../../assets/workouts/yoga.jpg'),
      description: 'Vinyasa flow for flexibility and balance'
    },
    { 
      id: '4', 
      title: 'Core Crusher', 
      duration: '20 min',
      image: require('../../../assets/workouts/core.jpg'),
      description: 'Intense core strengthening routine'
    }
  ];

  // Ünlü sporcular için yeni veri seti
  const famousAthletes = [
    { 
      id: '1', 
      name: 'Arnold Schwarzenegger',
      sport: 'Bodybuilding',
      image: require('../../../assets/athletes/arnold.jpg')
    },
    { 
      id: '2', 
      name: 'Serena Williams',
      sport: 'Tennis',
      image: require('../../../assets/athletes/serena.jpg')
    },
    { 
      id: '3', 
      name: 'Cristiano Ronaldo',
      sport: 'Football',
      image: require('../../../assets/athletes/ronaldo.jpg')
    },
    { 
      id: '4', 
      name: 'Simone Biles',
      sport: 'Gymnastics',
      image: require('../../../assets/athletes/biles.jpg')
    }
  ];

  // Seviye değişim handler'ı
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const renderWorkoutCard = ({ item }) => (
    <TouchableOpacity style={styles.workoutCard}>
      <Image 
        source={item.image} 
        style={styles.workoutImage}
        resizeMode="cover"
      />
      <View style={styles.playButtonContainer}>
        <Icon name="play-circle" size={40} color="#FFF" />
      </View>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  // Ünlü sporcular için özel render fonksiyonu
  const renderAthleteCard = ({ item }) => (
    <TouchableOpacity style={styles.athleteCard}>
      <Image source={item.image} style={styles.athleteImage} />
      <View style={styles.athleteInfo}>
        <Text style={styles.athleteName}>{item.name}</Text>
        <Text style={styles.athleteSport}>{item.sport}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../../assets/profile.png')}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.greeting}>Hello, David</Text>
              <Text style={styles.motivation}>Start now not tomorrow!</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
              <Icon name="notifications-outline" size={24} color="#FFF" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="bookmark-outline" size={24} color="#FFF" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconContainer}>
                <Icon name="flame-outline" size={20} color="#FFF" />
              </View>
              <Text style={styles.summaryLabel}>Burn Calories</Text>
              <Text style={styles.summaryValue}>240kcal</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.max((240/2500)*100, 5)}%` }]} />
              </View>
            </View>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconContainer}>
                <Icon name="fitness-outline" size={20} color="#FFF" />
              </View>
              <Text style={styles.summaryLabel}>Workout</Text>
              <Text style={styles.summaryValue}>2 done</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.max((2/6)*100, 5)}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* My Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Workouts</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('WorkoutList', { 
                workouts: myWorkouts,
                title: 'My Workouts'
              })}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <Icon name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={myWorkouts}
            renderItem={renderWorkoutCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.workoutList}
          />
        </View>

        {/* Yeni Ünlü Sporcular Bölümü */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout With Stars</Text>
          </View>
          <FlatList
            horizontal
            data={famousAthletes}
            renderItem={renderAthleteCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.athleteList}
          />
        </View>

        {/* Workout Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Categories</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('CategoryWorkoutList', { 
                selectedLevel: selectedLevel
              })}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <Icon name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Seviye Butonları */}
          <View style={styles.levelSelector}>
            {Object.keys(workoutData).map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  selectedLevel === level && styles.levelButtonActive
                ]}
                onPress={() => handleLevelSelect(level)}
              >
                <Text style={[
                  styles.levelButtonText,
                  selectedLevel === level && styles.levelButtonTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Seviyeye Göre Antrenman Listesi */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={workoutData[selectedLevel]}
            renderItem={renderWorkoutCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.workoutList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Create a reusable WorkoutList component
const WorkoutList = ({ workouts }) => {
  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.listImage} />
            <View style={styles.listPlayButton}>
              <Icon name="play-circle" size={40} color="#FFF" />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listDuration}>{item.duration}</Text>
            <Text style={styles.listDescription}>
              {item.description || 'Full body workout session'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Update WorkoutListScreen
const WorkoutListScreen = ({ navigation, route }) => {
  const { workouts, title } = route?.params || {};
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{title}</Text>
      </View>
      <WorkoutList workouts={workouts} />
    </SafeAreaView>
  );
};

// Update CategoryWorkoutListScreen
const CategoryWorkoutListScreen = ({ navigation, route }) => {
  const { selectedLevel } = route?.params || {};
  const [currentLevel, setCurrentLevel] = useState(selectedLevel || 'Intermediate');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{currentLevel} Workouts</Text>
      </View>
      
      <View style={styles.levelSelector}>
        {Object.keys(workoutData).map(level => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelButton,
              currentLevel === level && styles.levelButtonActive
            ]}
            onPress={() => setCurrentLevel(level)}
          >
            <Text style={[
              styles.levelButtonText,
              currentLevel === level && styles.levelButtonTextActive
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <WorkoutList workouts={workoutData[currentLevel]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    resizeMode: 'cover'
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  motivation: {
    fontSize: 12,
    color: colors.secondary,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#666',
    marginRight: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    padding: 16,
  },
  summaryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.darkGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    minWidth: 10,
  },
  workoutList: {
    gap: 12,
  },
  workoutCard: {
    width: 160,
    height: 240,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: 160,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 8,
  },
  workoutInfo: {
    alignItems: 'center',
  },
  workoutTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutDuration: {
    color: colors.secondary,
    fontSize: 14,
  },
  levelSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    minWidth: 100,
  },
  levelButtonActive: {
    backgroundColor: colors.border,
  },
  levelButtonText: {
    color: colors.secondary,
    fontSize: 14,
  },
  levelButtonTextActive: {
    color: colors.text,
    fontWeight: '500',
  },
  athleteCard: {
    width: 140,
    marginRight: 15,
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  athleteImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  athleteInfo: {
    padding: 10,
  },
  athleteName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  athleteSport: {
    color: colors.secondary,
    fontSize: 12,
  },
  athleteList: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 2,
  },
  imageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  listPlayButton: {
    position: 'absolute',
    top: '30%',
    left: '30%',
  },
  textContainer: {
    flex: 1,
    padding: 12,
    paddingRight: 16,
  },
  listTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  listDuration: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  listDescription: {
    color: '#888',
    fontSize: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
  },
});

export { WorkoutListScreen, CategoryWorkoutListScreen };
export default HomeScreen; 