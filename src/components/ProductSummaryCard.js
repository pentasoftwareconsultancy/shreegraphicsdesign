// src/components/ProductSummaryCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProductSummaryCard = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSubtitle}>Dress modern</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productQty}>Qty: {item.quantity || 1}</Text>
        <View style={styles.reviewRow}>
          <MaterialIcons name="star" size={14} color="gold" />
          <Text style={styles.reviewText}>5.0 (7,932 reviews)</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductSummaryCard;

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 12,
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  productSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f58220',
    marginVertical: 4,
  },
  productQty: {
    fontSize: 12,
    color: '#777',
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#007AFF',
  },
});
