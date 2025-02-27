import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;
  const { title, description, ingredients, steps, nutrition, image, imageUrl } = recipe;

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  useEffect(() => {
    checkIfSaved();
  }, [savedRecipes]);

  const loadSavedRecipes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@saved_recipes');
      if (jsonValue != null) {
        setSavedRecipes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Saved recipes could not be loaded.', e);
    }
  };

  const checkIfSaved = () => {
    const exists = savedRecipes.find((item) => item.title === title);
    setIsSaved(!!exists);
  };

  const toggleSaveRecipe = async () => {
    try {
      if (isSaved) {
        const updatedRecipes = savedRecipes.filter((item) => item.title !== title);
        await AsyncStorage.setItem('@saved_recipes', JSON.stringify(updatedRecipes));
        setSavedRecipes(updatedRecipes);
        Alert.alert('Başarılı', 'Tarif kayıtlardan kaldırıldı.');
      } else {
        const newRecipe = {
          title,
          description,
          ingredients,
          steps,
          nutrition,
          image,
          imageUrl,
        };
        const updatedRecipes = [...savedRecipes, newRecipe];
        await AsyncStorage.setItem('@saved_recipes', JSON.stringify(updatedRecipes));
        setSavedRecipes(updatedRecipes);
        Alert.alert('Başarılı', 'Tarif başarıyla kaydedildi.');
      }
    } catch (e) {
      console.error('Error toggling the recipe save status.', e);
      Alert.alert('Hata', 'İşlem sırasında bir hata oluştu.');
    }
  };

  const renderContent = () => (
    <>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title || 'Tarifin Adı'}</Text>
        <TouchableOpacity onPress={toggleSaveRecipe}>
          <FontAwesome name="bookmark" size={24} color={isSaved ? '#FF6347' : '#ccc'} />
        </TouchableOpacity>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}

      {ingredients && ingredients.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Malzemeler</Text>
          {ingredients.map((item, index) => (
            <Text key={index} style={styles.contentText}>
              - {item}
            </Text>
          ))}
        </>
      )}

      {steps && steps.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Nasıl Yapılır</Text>
          {steps.map((step, index) => (
            <Text key={index} style={styles.contentText}>
              {index + 1}. {step}
            </Text>
          ))}
        </>
      )}

      {nutrition && (
        <>
          <Text style={styles.sectionTitle}>Besin Değerleri</Text>
          <Text style={styles.contentText}>Kalori: {nutrition.calories}</Text>
          <Text style={styles.contentText}>Protein: {nutrition.protein}</Text>
          <Text style={styles.contentText}>Yağ: {nutrition.fat}</Text>
          <Text style={styles.contentText}>Karbonhidrat: {nutrition.carbohydrates}</Text>
        </>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      {/* Üst Kısım Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Üretilen Tarif</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          {!imageLoaded && !imageError && (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
          )}
          <Image
            source={
              typeof image === 'number'
                ? image
                : { uri: image || imageUrl }
            }
            style={styles.image}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        </View>
        {imageLoaded && !imageError ? (
          renderContent()
        ) : imageError ? (
          <Text style={styles.errorText}>
            Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'colors.background'  , 
  },
  /* Üst Kısım (Header) */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // iPhone çentikli ekranlar için boşluk
    paddingBottom: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
  },
  scrollContent: { 
    paddingBottom: 80, 
    paddingTop: 10 
  },
  imageContainer: {
    width: '95%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    marginTop: 8,
  },
  image: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 16 
  },
  loader: { 
    position: 'absolute' 
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  description: { 
    fontSize: 16, 
    marginHorizontal: 15, 
    marginBottom: 10 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
  },
  contentText: { 
    fontSize: 16, 
    marginHorizontal: 15, 
    marginTop: 10 
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  // Diğer mevcut stil tanımlamaları aynı kalabilir...
});

export default RecipeScreen;
