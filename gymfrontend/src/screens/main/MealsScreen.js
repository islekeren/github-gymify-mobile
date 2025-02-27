import React, { useRef, useImperativeHandle, useState, forwardRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

import FoodModal from '../../components/FoodModal';
import colors from '../../utils/colors';

// Görsellerin tanımlandığı nesne
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
  'Creamy Scallops and Shallots': require('../../../assets/foods/scallops.jpg'),
  'Grilled Salmon': require('../../../assets/foods/grilledsalmon.jpg'),
  'Pasta Primavera': require('../../../assets/foods/pastaprimavera.jpg'),
  'Chicken Tikka Masala': require('../../../assets/foods/chickentikka.jpg')
};

// AIRecipeSection: Yalnızca "Yapay Zeka ile Tarif üret" butonunun etrafında animasyonlu, renk değişen border sağlar.
const AIRecipeSection = ({ onPress }) => {
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
    <View style={styles.aiCardContainer}>
      <View style={styles.borderContainer}>
        <Animated.View style={[styles.gradientContainer, animatedGradient]}>
          <LinearGradient
            colors={['#00ffff', '#6600ff', '#00ffff', '#6600ff', '#00ffff']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <TouchableOpacity style={styles.mainCard} onPress={onPress}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LottieView
              source={require('../../../assets/tavaAnimation.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            <Text style={styles.aiRecipeButtonText}>Get Recipes with AI</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MealsScreen = ({ navigation }) => {
  const modalRef = useRef(null);
  const [savedFoods, setSavedFoods] = useState([1, 2]); // Kaydedilmiş yemekler
  const [popularFoods, setPopularFoods] = useState([1, 2, 3]); // Popüler yemekler

  // SaveButton bileşeni: favori durumunu yönetir.
  const SaveButton = forwardRef(({ initialSaved = false, onToggle }, ref) => {
    const [isSaved, setIsSaved] = useState(initialSaved);
    
    useImperativeHandle(ref, () => ({
      toggleSave: () => {
        const newVal = !isSaved;
        setIsSaved(newVal);
        if (onToggle) onToggle(newVal);
      },
      isSaved: () => isSaved,
    }), [isSaved, onToggle]);
    
    return (
      <TouchableOpacity
        style={[styles.saveButton, isSaved && styles.saveButtonActive]}
        onPress={(event) => {
          event.stopPropagation();
          ref.current.toggleSave();
        }}
      >
        <Icon name={isSaved ? "heart" : "heart-outline"} size={20} color="#FFF" />
      </TouchableOpacity>
    );
  });
  
  // Yemek isimlerinin tanımlandığı mapping
  const foodNames = {
    1: "Texas Style Hamburger",
    2: "Grilled Chicken Salad",
    3: "Spaghetti Carbonara",
    4: "Sushi Platter",
    5: "Vegetable Stir Fry",
    6: "Chocolate Lava Cake",
    7: "Avocado Toast",
    8: "Caesar Salad"
  };

  // Modal'ı tetikleyen fonksiyon
  const toggleModal = (food) => {
    modalRef.current?.showModal(food);
  };

  // Favori ekleme/çıkarma fonksiyonu
  const toggleSave = React.useCallback((section, id, newVal) => {
    if (newVal) {
      setSavedFoods(prev => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setSavedFoods(prev => prev.filter(item => item !== id));
    }
  }, []);
  
  // Kategori görselleri için bileşen
  const CategoryItem = ({ title }) => {
    const categoryImages = {
      Beef: require('../../../assets/foods/beef.jpg'),
      Chicken: require('../../../assets/foods/chicken.jpg'),
      Pasta: require('../../../assets/foods/pasta.jpg'),
      Seafood: require('../../../assets/foods/seafood.jpg'),
      Vegetarian: require('../../../assets/foods/vegetarian.jpg'),
      Desserts: require('../../../assets/foods/desserts.jpg'),
      Breakfast: require('../../../assets/foods/breakfast.jpg'),
      Salads: require('../../../assets/foods/salads.jpg')
    };

    return (
      <TouchableOpacity style={styles.categoryItem}>
        <Image 
          source={categoryImages[title]} 
          style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // FoodItem bileşeni: 'time' prop'u ve nutrition bilgileri dinamik olarak gösterilir.
  const FoodItem = ({ name, description, nutrition, time, onPress }) => (
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
            <Text style={styles.metaText}>{time} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="flame-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{nutrition.calories} Kcal</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // FoodCard bileşeni: Kısa liste elemanı, favori butonu içerir.
  const FoodCard = React.memo(({ id, section, onPress, initialSaved }) => {
    const foodName = foodNames[id];
    const saveButtonRef = useRef();
    
    return (
      <TouchableOpacity 
        style={styles.fastFoodCard}
        onPress={onPress}
      >
        <Image 
          source={foodImages[foodName]} 
          style={styles.foodCardImage}
        />
        <View style={styles.foodOverlay}>
          <Text style={styles.foodNameOverlay}>{foodName}</Text>
          <SaveButton 
            ref={saveButtonRef} 
            initialSaved={initialSaved} 
            onToggle={(newVal) => toggleSave(section, id, newVal)}
          />
        </View>
      </TouchableOpacity>
    );
  });
  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              style={styles.searchBar}
              onPress={() => navigation.navigate('MealsSearchScreen')}
            >
              <Icon name="search-outline" size={20} color="#666" />
              <Text style={styles.searchPlaceholder}>Search</Text>
            </TouchableOpacity>
          </View>
          
          {/* Yapay Zeka ile Tarif Üret Button */}
          <View style={styles.section}>
            <AIRecipeSection onPress={() => navigation.navigate('MealsChatScreen')} />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesList}>
                {['Beef', 'Chicken', 'Pasta', 'Seafood', 'Vegetarian', 'Desserts', 'Breakfast', 'Salads'].map((title, index) => (
                  <CategoryItem key={index} title={title} />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* My Saved Foods */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My saved foods</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('SavedRecipes')}
              >
                <Text style={styles.seeAllText}>See all</Text>
                <Icon name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {savedFoods.map((item) => (
                <FoodCard 
                  key={item} 
                  id={item} 
                  section="saved" 
                  initialSaved={true}
                  onPress={() => toggleModal({ 
                    name: foodNames[item],
                    description: "Delicious meal description...",
                    nutrition: { calories: 500, carbs: 30, proteins: 25, fats: 20 }
                  })}
                />
              ))}
            </ScrollView>
          </View>

          {/* Popular Foods From Users */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Foods From Users</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See all</Text>
                <Icon name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularFoods.map((item) => (
                <FoodCard 
                  key={item} 
                  id={item} 
                  section="popular" 
                  initialSaved={savedFoods.includes(item)}
                  onPress={() => toggleModal({ 
                    name: foodNames[item],
                    description: "Delicious meal description...",
                    nutrition: { calories: 500, carbs: 30, proteins: 25, fats: 20 }
                  })}
                />
              ))}
            </ScrollView>
          </View>

          {/* Recommended */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommend for you</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See all</Text>
                <Icon name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.recommendedGrid}>
              <FoodItem 
                name="Creamy Scallops and Shallots"
                description="A delicious seafood dish with creamy sauce..."
                nutrition={{ calories: 120, carbs: 15, proteins: 4.2, fats: 1.1 }}
                time={15}
                onPress={() => toggleModal({ 
                  name: "Creamy Scallops and Shallots",
                  description: "A delicious seafood dish with creamy sauce...",
                  nutrition: { calories: 120, carbs: 15, proteins: 4.2, fats: 1.1 },
                  ingredients: ["Scallops", "Shallots", "Cream", "Butter", "Parsley"],
                  steps: [
                    "Clean the scallops.",
                    "Sauté shallots in butter.",
                    "Add scallops and cook until golden.",
                    "Pour in cream and reduce.",
                    "Garnish with parsley and serve."
                  ]
                })}
              />
              <FoodItem 
                name="Grilled Salmon"
                description="Fresh salmon with herbs and lemon..."
                nutrition={{ calories: 150, carbs: 0, proteins: 25, fats: 7 }}
                time={10}
                onPress={() => toggleModal({ 
                  name: "Grilled Salmon",
                  description: "Fresh salmon with herbs and lemon...",
                  nutrition: { calories: 150, carbs: 0, proteins: 25, fats: 7 },
                  ingredients: ["Salmon fillet", "Lemon", "Olive oil", "Herbs", "Salt", "Pepper"],
                  steps: [
                    "Preheat grill to medium-high.",
                    "Brush salmon with olive oil and season.",
                    "Grill for 5-7 minutes per side.",
                    "Squeeze lemon over and serve."
                  ]
                })}
              />
              <FoodItem 
                name="Pasta Primavera"
                description="A colorful pasta dish with seasonal vegetables..."
                nutrition={{ calories: 300, carbs: 50, proteins: 10, fats: 5 }}
                time={20}
                onPress={() => toggleModal({ 
                  name: "Pasta Primavera",
                  description: "A colorful pasta dish with seasonal vegetables...",
                  nutrition: { calories: 300, carbs: 50, proteins: 10, fats: 5 },
                  ingredients: ["Pasta", "Bell peppers", "Zucchini", "Tomatoes", "Olive oil", "Basil"],
                  steps: [
                    "Cook pasta al dente.",
                    "Sauté vegetables until tender.",
                    "Mix pasta with vegetables and olive oil.",
                    "Garnish with basil and serve."
                  ]
                })}
              />
              <FoodItem 
                name="Chicken Tikka Masala"
                description="Spicy chicken in a creamy tomato sauce..."
                nutrition={{ calories: 400, carbs: 20, proteins: 30, fats: 20 }}
                time={25}
                onPress={() => toggleModal({ 
                  name: "Chicken Tikka Masala",
                  description: "Spicy chicken in a creamy tomato sauce...",
                  nutrition: { calories: 400, carbs: 20, proteins: 30, fats: 20 },
                  ingredients: ["Chicken", "Tomato puree", "Yogurt", "Spices", "Onions", "Garlic"],
                  steps: [
                    "Marinate chicken in yogurt and spices.",
                    "Grill the chicken until cooked.",
                    "Prepare tomato sauce with onions and garlic.",
                    "Combine chicken with sauce and simmer.",
                    "Serve with rice or naan."
                  ]
                })}
              />
            </View>
          </View>
         
        </ScrollView>
      </SafeAreaView>

      {/* FoodModal, tarif detaylarını göstermek üzere ayrı render edilir */}
      <FoodModal ref={modalRef} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  searchPlaceholder: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  subGreeting: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 4,
  },
  section: {
    padding: 16,
    marginTop: 2,
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 0,
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
  categoriesList: {
    flexDirection: 'row',
    paddingRight: 16,
    marginTop: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
  },
  fastFoodCard: {
    width: 280,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  foodCardImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 0,
    backgroundColor: 'transparent',
  },
  saveButtonActive: {
    backgroundColor: 'transparent',
  },
  recommendedGrid: {
    gap: 0,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    height: 120,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 8,
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
    maxHeight: 40,
    lineHeight: 20,
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
  foodOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  foodNameOverlay: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 24,
  },
  aiRecipeButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  aiRecipeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  animatedBorder: {
    marginHorizontal:4,
    marginVertical: 24,
  },
  // Lottie animasyon stilini ekleyelim
  lottieAnimation: {
    width: 100,
    height: 100,
  },
  aiCardContainer: {
    width: '100%',
    height: 89,
    marginVertical: 0,
  },
  borderContainer: {
    width: '100%',
    height: '100%',
    padding: 3,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientContainer: {
    position: 'absolute',
    top: -150,
    left: -150,
    right: -150,
    bottom: -150,
  },
  gradient: {
    flex: 1,
    width: '200%',
    height: '200%',
  },
  mainCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealsScreen;
