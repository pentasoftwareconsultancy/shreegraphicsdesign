// src/screens/CartScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import CustomHeader from '../components/CustomHeader';
import CartItem from '../components/CartItem';
import SavedItem from '../components/SavedItem';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, incrementQuantity, decrementQuantity } = useCart();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeader title="My Cart" />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your Cart is Empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          )}
          contentContainerStyle={styles.cartList}
        />
      )}

      {/* <Text style={styles.savedHeader}>Saved for later</Text>
      <View style={styles.savedList}>
        {[1, 2, 3, 4].map((_, i) => (
          <SavedItem
            key={i}
            item={{
              image: cartItems[0]?.image,
              title: 'Sample print',
              subtitle: 'Dress',
              price: '₹194.99',
            }}
          />
        ))}
      </View> */}

      <TouchableOpacity
        style={[
          styles.checkoutBtn,
          cartItems.length === 0 && styles.disabledBtn, // apply gray if empty
        ]}
        disabled={cartItems.length === 0} // disable if cart is empty
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <MaterialIcons name="lock" size={16} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.checkoutText}>Proceed to Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 30 },
  cartList: { marginTop: 20 },
  savedHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
  },
  savedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f58220',
    paddingVertical: 12,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
