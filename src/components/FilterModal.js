import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const FilterModal = ({ visible, price, setPrice, categories, setCategories, onClose }) => {
  const toggleCategory = (cat) => {
    setCategories(
      categories.includes(cat) ? categories.filter((c) => c !== cat) : [...categories, cat]
    );
  };

  const clearFilters = () => {
    setPrice(1000);            // Reset to max price
    setCategories([]);         // Clear selected categories
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.filterContainer}>
          <View style={styles.rangeRow}>
            <Text>₹0</Text>
            <Text>{`₹${price}`}</Text>
          </View>

          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={price}
            minimumTrackTintColor="#f58220"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#f58220"
            onValueChange={(val) => setPrice(val)}
          />

          {['All items', 'T-Shirts', 'Hoodies', 'Jackets', 'Caps', 'Bags'].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleCategory(item)} style={styles.checkboxRow}>
              <View style={[styles.checkbox, categories.includes(item) && styles.checked]} />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Apply</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={{ color: '#f58220', fontWeight: '600' }}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#f58220',
    borderColor: '#f58220',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#f58220',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  clearButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#f58220',
  },
});

export default FilterModal;
