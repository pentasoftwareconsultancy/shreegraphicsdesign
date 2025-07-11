// src/screens/FavoriteScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorite } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext'; // ✅ Import CartContext
import CustomHeader from '../components/CustomHeader';

const FavoriteScreen = () => {
  const { favorites, toggleFavorite, removeFavorite } = useFavorite();
  const { addToCart } = useCart(); // ✅ Use cart context
  const [addedItems, setAddedItems] = useState([]);


  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      quantity: 1,
      size: item.size || 'M',
      color: item.color || item?.colors?.[0] || '#60a69f',
    });

    setAddedItems((prev) => [...prev, item.id]); // ✅ Track added item
    Alert.alert('Success', 'Item added to cart!');
  };


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => toggleFavorite(item)}
        >
          <MaterialIcons name="favorite" size={20} color="orange" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subTitle}>Dress Modern</Text>
      <Text style={styles.price}>₹{item.price}</Text>
  
      <View style={styles.actions}>
        {/* 🔁 Updated Conditional Cart Button */}
        {addedItems.includes(item.id) ? (
          <View style={[styles.cartBtn, { backgroundColor: '#f58220' }]}>
            <MaterialIcons name="check" size={16} color="#fff" />
            <Text style={[styles.cartText, { color: '#fff' }]}>Added to Cart</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => handleAddToCart(item)}
          >
            <MaterialIcons name="shopping-cart" size={16} color="#f58220" />
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
  
        <TouchableOpacity
          onPress={() => removeFavorite(item.id)}
          style={styles.deleteBtn}
        >
          <MaterialIcons name="delete" size={18} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Favourites" />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet!</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContainer: { padding: 16, paddingTop: 10 },
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 130,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  subTitle: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 6,
  },
  price: {
    fontWeight: '700',
    color: '#f58220',
    paddingHorizontal: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f58220',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  cartText: {
    color: '#f58220',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#888',
  },
});

export default FavoriteScreen;
