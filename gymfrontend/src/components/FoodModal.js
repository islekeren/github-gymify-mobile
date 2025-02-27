import React, { useImperativeHandle, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodModal = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    showModal: (food) => {
      setSelectedFood(food);
      setIsVisible(true);
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    },
    hideModal: () => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }
  }));

  return (
    <>
      {/* Modal */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriverForBackdrop
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>{selectedFood?.name}</Text>
          
          <View style={styles.nutritionSection}>
            <Text style={styles.sectionLabel}>Nutrition</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>{selectedFood?.nutrition?.calories}</Text>
                </View>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>{selectedFood?.nutrition?.carbs}g</Text>
                </View>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>{selectedFood?.nutrition?.proteins}g</Text>
                </View>
                <Text style={styles.nutritionLabel}>Proteins</Text>
              </View>
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionCircle}>
                  <Text style={styles.nutritionValue}>{selectedFood?.nutrition?.fats}g</Text>
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
    </>
  );
});

const styles = StyleSheet.create({
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
});

export default FoodModal; 