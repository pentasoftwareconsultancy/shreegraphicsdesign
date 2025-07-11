// src/components/SavedItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SavedItem = ({ item }) => {
  return (
    <View style={styles.savedCard}>
      <Image source={item.image} style={styles.savedImage} />
      <MaterialIcons name="favorite-border" size={16} color="#f58220" style={styles.savedFavIcon} />
      <Text style={styles.savedTitle}>{item.title}</Text>
      <Text style={styles.savedSubtitle}>{item.subtitle}</Text>
      <View style={styles.savedRow}>
        <Text style={styles.savedPrice}>{item.price}</Text>
        <View style={styles.starRow}>
          <MaterialIcons name="star" size={12} color="gold" />
          <Text style={styles.starRating}>5.0</Text>
        </View>
      </View>
    </View>
  );
};

export default SavedItem;

const styles = StyleSheet.create({
  savedCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    position: 'relative',
  },
  savedImage: { width: '100%', height: 100, borderRadius: 10 },
  savedFavIcon: { position: 'absolute', top: 10, right: 10 },
  savedTitle: { fontSize: 13, fontWeight: '600', marginTop: 5 },
  savedSubtitle: { fontSize: 11, color: '#888' },
  savedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedPrice: { fontSize: 13, fontWeight: '700' },
  starRow: { flexDirection: 'row', alignItems: 'center' },
  starRating: { fontSize: 11, marginLeft: 2 },
});
