// src/components/CartItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CartItem = ({ item, onIncrement, onDecrement }) => {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => onDecrement(item.id)}>
          <MaterialIcons name="remove" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity || 1}</Text>
        <TouchableOpacity onPress={() => onIncrement(item.id)}>
          <MaterialIcons name="add" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  itemImage: { width: 60, height: 60, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemTitle: { fontSize: 14, fontWeight: '700' },
  itemSubtitle: { fontSize: 12, color: '#777' },
  itemPrice: { fontSize: 14, fontWeight: '600', color: '#000' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityText: { marginHorizontal: 8 },
});
