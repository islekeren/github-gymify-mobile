// SavedRecipes.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SavedRecipes = () => {
  const navigation = useNavigation();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar ve SafeAreaView arka plan rengi sayesinde en üst kısım yeşil */}
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Saved Recipes</Text>
      </View>
      
      {/* İçerik kısmını ayrı bir View ile ayırdık */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription}>{recipe.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No saved recipes yet.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'green', // SafeAreaView'nin arka planı yeşil, dolayısıyla status bar alanı da yeşil
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF', // İçerik kısmı beyaz
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80,
  },
  recipeCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default SavedRecipes;
