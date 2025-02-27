import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  Image,
  Animated,
  Easing,
  LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';
import { Swipeable } from 'react-native-gesture-handler';

const MealsSearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState(null);
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  // Sample food data
  const foodData = [
    { id: 1, name: "Creamy scallops and shallots", description: "A delicious seafood dish with creamy sauce..." },
    { id: 2, name: "Grilled Salmon", description: "Fresh salmon with herbs and lemon..." },
    { id: 3, name: "Pasta Primavera", description: "A colorful pasta dish with seasonal vegetables..." },
    // ... add more food items as needed
  ];

  // Load search history on mount
  React.useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) setSearchHistory(JSON.parse(history));
      } catch (error) {
        console.error('Failed to load search history', error);
      }
    };
    loadHistory();
  }, []);

  // Configure LayoutAnimation
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [searchHistory]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = foodData.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle food selection
  const handleFoodSelect = async (food) => {
    try {
      // Update search history
      const newHistory = [food, ...searchHistory.filter(item => item.id !== food.id)].slice(0, 5);
      setSearchHistory(newHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      // Show food details
      toggleModal(food);
    } catch (error) {
      console.error('Failed to save search history', error);
    }
  };

  // Clear search history
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Failed to clear search history', error);
    }
  };

  const toggleModal = (food) => {
    setSelectedFood(food);
    setModalVisible(!isModalVisible);
  };

  // Move foodImages to a separate file or import from MealsScreen
  const foodImages = {
    // Saved & Popular Foods
    'Texas Style Hamburger': require('../../../assets/foods/texasburger.jpg'),
    'Grilled Chicken Salad': require('../../../assets/foods/grilledchicken.jpg'),
    'Spaghetti Carbonara': require('../../../assets/foods/spaghetti.jpg'),
    'Sushi Platter': require('../../../assets/foods/sushi.jpg'),
    'Vegetable Stir Fry': require('../../../assets/foods/stirfry.jpg'),
    'Chocolate Lava Cake': require('../../../assets/foods/lavacake.jpg'),
    'Avocado Toast': require('../../../assets/foods/avocadotoast.jpg'),
    'Caesar Salad': require('../../../assets/foods/caesarsalad.jpg'),
    
    // Recommended Foods
    'Creamy scallops and shallots': require('../../../assets/foods/scallops.jpg'),
    'Grilled Salmon': require('../../../assets/foods/grilledsalmon.jpg'),
    'Pasta Primavera': require('../../../assets/foods/pastaprimavera.jpg'),
    'Chicken Tikka Masala': require('../../../assets/foods/chickentikka.jpg')
  };

  // Add animation value
  const deleteAnim = React.useRef(new Animated.Value(1)).current;

  // Handle delete with animation
  const handleDeleteItem = async (id) => {
    // Animate the red background
    Animated.timing(deleteAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(async () => {
      try {
        const newHistory = searchHistory.filter(item => item.id !== id);
        // LayoutAnimation will handle the smooth transition
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSearchHistory(newHistory);
        await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
        deleteAnim.setValue(1); // Reset animation
      } catch (error) {
        console.error('Failed to delete item', error);
      }
    });
  };

  // Update renderRightActions
  const renderRightActions = (id) => {
    return (
      <Animated.View 
        style={[
          styles.deleteContainer,
          { transform: [{ scaleY: deleteAnim }] }
        ]}
      >
        <Icon name="trash" size={20} color="#FFF" />
      </Animated.View>
    );
  };

  // Update FoodItem
  const FoodItem = ({ name, description, onPress, id }) => (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={() => renderRightActions(id)}
      onSwipeableRightOpen={() => handleDeleteItem(id)}
    >
      <TouchableOpacity 
        style={styles.foodItem}
        onPress={onPress}
      >
        <Image 
          source={foodImages[name]} 
          style={styles.foodImage}
        />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{name}</Text>
          <Text 
            style={styles.foodDescription} 
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          <View style={styles.foodMeta}>
            <View style={styles.metaItem}>
              <Icon name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>15 min</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="flame-outline" size={16} color="#666" />
              <Text style={styles.metaText}>120 Kcal</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Show search history when no query */}
        {searchQuery.length === 0 && searchHistory.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearHistoryText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.map((food) => (
              <FoodItem 
                key={food.id}
                name={food.name}
                description={food.description}
                onPress={() => handleFoodSelect(food)}
                id={food.id}
              />
            ))}
          </View>
        )}

        {/* Show search results */}
        {searchQuery.length > 0 && (
          <View style={styles.resultsContainer}>
            {searchResults.map((food) => (
              <FoodItem 
                key={food.id}
                name={food.name}
                description={food.description}
                onPress={() => handleFoodSelect(food)}
                id={food.id}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>{selectedFood?.name}</Text>
          
          <View style={styles.nutritionSection}>
            <Text style={styles.sectionLabel}>Nutrition</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>120</Text>
                </View>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>15g</Text>
                </View>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>4.2g</Text>
                </View>
                <Text style={styles.nutritionLabel}>Proteins</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>1.1g</Text>
                </View>
                <Text style={styles.nutritionLabel}>Fats</Text>
              </View>
            </View>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionLabel}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              <View style={styles.ingredientItem}>
                <Icon name="checkmark" size={20} color="#FFF" />
                <Text style={styles.ingredientText}>1 heaped tablespoon butter</Text>
              </View>
              <View style={styles.ingredientItem}>
                <Icon name="checkmark" size={20} color="#FFF" />
                <Text style={styles.ingredientText}>1 shallot, finely chopped</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  resultsContainer: {
    padding: 16,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    height: 120, // Fixed height for all cards
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 8, // Added left padding
  },
  foodInfo: {
    flex: 1,
    padding: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
    maxHeight: 40, // Limit to two lines
    lineHeight: 20, // Ensure consistent line height
    overflow: 'hidden',
  },
  foodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    maxHeight: 40,
  },
  foodMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#666',
    fontSize: 14,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 15,
  },
  nutritionSection: {
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nutritionValue: {
    color: '#FFF',
    fontSize: 16,
  },
  nutritionLabel: {
    color: '#666',
    fontSize: 14,
  },
  ingredientsSection: {
    marginTop: 20,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ingredientText: {
    color: '#FFF',
    fontSize: 16,
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
    color: 'FFF',
  },
  clearHistoryText: {
    color: colors.primary,
    fontSize: 14,
  },
  deleteContainer: {
    backgroundColor: '#FF3B30',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 12,
    height: 120,
    paddingRight: 20,
  },
});

export default MealsSearchScreen;