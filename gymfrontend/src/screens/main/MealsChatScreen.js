// screens/MealsChatScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import getRecipe from '../../services/openaiService';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors'; // Örneğin; { background, darkGray, primary, secondary }

const MealsChatScreen = () => {
  const navigation = useNavigation();

  const [userInput, setUserInput] = useState('');
  const [recipeData, setRecipeData] = useState({
    recipeType: '',
    servings: '',
    prepTime: '',
    difficulty: '',
  });
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showServingsModal, setShowServingsModal] = useState(false);
  const [showPrepTimeModal, setShowPrepTimeModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showPreRecipeAnimation, setShowPreRecipeAnimation] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Tanımlı mesaj havuzu
  const messagesPool = [
    "Yumurtalar kırılıyor...",
    "Hamur açılıyor...",
    "Kabartma tozu ekleniyor...",
    "Tüm malzemeler karıştırılıyor...",
    "Fırın ısıtılıyor...",
    "Pastanın şekli veriliyor..."
  ];

  // Örnek AI tarafından üretilmiş tarif önerileri
  useEffect(() => {
    setAiSuggestions([
      { id: '1', name: 'Çikolatalı Kek' },
      { id: '2', name: 'Sebzeli Makarna' },
      { id: '3', name: 'Izgara Tavuk' },
    ]);
  }, []);

  const handleGenerateRecipe = async (selectedRecipeType) => {
    setLoading(true);
    try {
      const response = await getRecipe({
        ...recipeData,
        recipeType: selectedRecipeType || userInput,
      });
      setLoading(false);
      // Tarif verilerini RecipeScreen'e gönderiyoruz
      navigation.navigate('RecipeScreen', { recipe: response.recipe });
    } catch (error) {
      setLoading(false);
      console.error("Tarif alınırken hata oluştu:", error);
      alert("Tarif alınırken bir hata oluştu: " + error.message);
    }
  };

  // Arama butonuna basıldığında önce animasyon overlay'i ve tek tek mesaj gösterilsin
  const handlePreRecipeAnimation = async () => {
    setShowPreRecipeAnimation(true);
    setCurrentMessage(""); // Önceki mesajı temizle
    let messageIndex = 0;
    const intervalId = setInterval(() => {
      if (messageIndex < messagesPool.length) {
        setCurrentMessage(messagesPool[messageIndex]);
        messageIndex++;
      } else {
        // Mesaj havuzunun son mesajı her seferinde gösterilsin
        setCurrentMessage(messagesPool[messagesPool.length - 1]);
      }
    }, 1000);

    try {
      await handleGenerateRecipe();
    } catch (error) {
      // Hata durumunda interval temizlenecek
    } finally {
      clearInterval(intervalId);
      setShowPreRecipeAnimation(false);
    }
  };

  // Eğer ön animasyon veya tarif oluşturma devam ediyorsa, tüm ekranı animasyon overlay'i kaplasın.
  if (showPreRecipeAnimation || loading) {
    return (
      <View style={styles.preRecipeAnimationOverlay}>
        <LottieView
          source={require('../../../assets/animation.json')}
          autoPlay
          loop
          style={styles.preRecipeAnimation}
        />
        <Text style={styles.preRecipeAnimationText}>
          {currentMessage}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ÜST KISIM (Geri Butonu + Başlık) */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarif Oluştur</Text>
      </View>

      {/* ARAMA ALANI */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Şef'e öneride bulun"
          value={userInput}
          onChangeText={setUserInput}
          placeholderTextColor={colors.secondary}
        />
        <TouchableOpacity onPress={handlePreRecipeAnimation} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* BUBBLES (Kişi Sayısı, Hazırlık Süresi, Zorluk Seviyesi) */}
      <View style={styles.bubblesContainer}>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => setShowServingsModal(true)}
        >
          <Text style={styles.bubbleText}>
            {recipeData.servings
              ? `Kişi Sayısı: ${recipeData.servings} Kişilik`
              : 'Kişi Sayısı'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bubble}
          onPress={() => setShowPrepTimeModal(true)}
        >
          <Text style={styles.bubbleText}>
            {recipeData.prepTime
              ? `Hazırlık Süresi: ${recipeData.prepTime}`
              : 'Hazırlık Süresi'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bubble}
          onPress={() => setShowDifficultyModal(true)}
        >
          <Text style={styles.bubbleText}>
            {recipeData.difficulty
              ? `Zorluk: ${recipeData.difficulty}`
              : 'Zorluk Seviyesi'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* TARİF ÖNERİLERİ BAŞLIĞI */}
      <Text style={styles.suggestionsTitle}>Tarif Önerileri</Text>

      {/* TARİF ÖNERİLERİ LİSTESİ */}
      <FlatList
        data={aiSuggestions}
        renderItem={({ item }) => (
          <View style={styles.recipeSuggestionWrapper}>
            <TouchableOpacity
              style={styles.recipeSuggestion}
              onPress={() => handleGenerateRecipe(item.name)}
            >
              <Text style={styles.recipeSuggestionText}>{item.name}</Text>
            </TouchableOpacity>
            {item.name === 'Izgara Tavuk' && (
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('../../../assets/animation.json')}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.suggestionsList}
      />

      {/* Modallar */}
      {/* KİŞİ SAYISI SEÇİM MODALI */}
      <Modal visible={showServingsModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kaç kişilik olsun?</Text>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((serving) => (
              <TouchableOpacity
                key={serving}
                style={styles.modalOption}
                onPress={() => {
                  setRecipeData((prev) => ({ ...prev, servings: serving }));
                  setShowServingsModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{serving} Kişilik</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowServingsModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HAZIRLIK SÜRESİ SEÇİM MODALI */}
      <Modal visible={showPrepTimeModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hazırlık Süresi</Text>
            {['30 dakikadan az', '30-60 dakika', '1-2 saat', '2 saatten fazla'].map((time) => (
              <TouchableOpacity
                key={time}
                style={styles.modalOption}
                onPress={() => {
                  setRecipeData((prev) => ({ ...prev, prepTime: time }));
                  setShowPrepTimeModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{time}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowPrepTimeModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ZORLUK SEVİYESİ SEÇİM MODALI */}
      <Modal visible={showDifficultyModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Zorluk Seviyesi</Text>
            {['Kolay', 'Orta', 'Zor'].map((level) => (
              <TouchableOpacity
                key={level}
                style={styles.modalOption}
                onPress={() => {
                  setRecipeData((prev) => ({ ...prev, difficulty: level }));
                  setShowDifficultyModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{level}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowDifficultyModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: colors.background,
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

  /* Arama Alanı */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  searchButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    marginLeft: 10,
  },

  /* Bubbles (Kişi Sayısı, Süre, Zorluk) */
  bubblesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  bubbleText: {
    fontSize: 14,
    color: "white",
    textAlign: 'center',
  },

  /* Tarif Önerileri Başlığı */
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    color: colors.primary,
  },
  /* Tarif Önerileri Listesi */
  suggestionsList: {
    width: '100%',
    marginTop: 10,
  },
  recipeSuggestionWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  recipeSuggestion: {
    backgroundColor: colors.darkGray,
    padding: 15,
    borderRadius: 12,
  },
  recipeSuggestionText: {
    fontSize: 16,
    color: "white",
  },

  /* Modal Stilleri */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.secondary,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  /* Animasyon (Lottie) */
  animationContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  animation: {
    width: 200,
    height: 200,
    marginRight: 50,
  },

  /* Pre-Recipe / Loading Animation Overlay */
  preRecipeAnimationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  preRecipeAnimation: {
    width: 250,
    height: 250,
  },
  messagesContainer: {
    marginTop: 20,
  },
  preRecipeAnimationText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    lineHeight: 28,
  },
});

export default MealsChatScreen;
