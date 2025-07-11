// SearchBarWithFilter.js

import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const SearchBarWithFilter = ({ onFilterPress, searchQuery, setSearchQuery }) => (
  <View style={styles.searchSection}>
    <View style={styles.searchBox}>
      <Feather name="search" size={18} color="#999" style={{ marginHorizontal: 8 }} />
      <TextInput
        placeholder="Search clothes..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
    <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
      <Ionicons name="options" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 40,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filterButton: {
    backgroundColor: '#f58220',
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default SearchBarWithFilter;
