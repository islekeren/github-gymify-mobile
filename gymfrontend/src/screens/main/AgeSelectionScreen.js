import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated 
} from 'react-native';

const AgeSelectionScreen = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState(20);
  const scrollY = useRef(new Animated.Value(0)).current;
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  const itemHeight = 50;
  const { height: windowHeight } = Dimensions.get('window');

  const renderAge = (age) => {
    const inputRange = [
      (age - 3) * itemHeight,
      (age - 2) * itemHeight,
      (age - 1) * itemHeight,
      age * itemHeight,
      (age + 1) * itemHeight
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1.2, 0.9, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 0.6, 1, 0.6, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={age}
        style={[
          styles.ageItem,
          {
            transform: [{ scale }],
            opacity
          }
        ]}
      >
        <Text style={[
          styles.ageText,
          selectedAge === age && styles.selectedAgeText
        ]}>
          {age}
        </Text>
      </Animated.View>
    );
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newSelectedAge = Math.round(offsetY / itemHeight) + 1;
        if (newSelectedAge !== selectedAge && newSelectedAge > 0 && newSelectedAge <= 100) {
          setSelectedAge(newSelectedAge);
        }
      }
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Old Are You?</Text>
      <Text style={styles.subtitle}>
        Age in years. This will help us to personalize an exercise program plan
      </Text>

      <View style={styles.pickerContainer}>
        
        
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingVertical: windowHeight / 3
          }}
        >
          {ages.map(renderAge)}
        </Animated.ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('WeightSelection')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 40,
  },
  pickerContainer: {
    flex: 1,
    position: 'relative',
  },
 
  ageItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 24,
    color: '#666666',
  },
  selectedAgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgeSelectionScreen;