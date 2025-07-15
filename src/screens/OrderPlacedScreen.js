// src/screens/OrderSuccessScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const OrderSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Extracting passed order data
  const {
    address,
    user,
    deliveryDate,
    paymentMode,
    amount,
    productImage,
  } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color="green" style={styles.successIcon} />
      <Text style={styles.successTitle}>Order placed, thank you</Text>
      <Text style={styles.successSubtitle}>Confirmation will be sent to your registered phone number.</Text>

      <View style={styles.sectionDivider} />

      {/* Address Section */}
      <View>
        <Text style={styles.sectionTitle}>Shipping to {user?.name} ({address?.label})</Text>
        <Text style={styles.addressText}>{address?.full}</Text>
        <Text style={styles.addressText}>Phone number: {address?.phone}</Text>
      </View>

      <View style={styles.sectionDivider} />

      {/* Delivery Info */}
      <View style={styles.deliveryRow}>
        <Image source={{ uri: productImage }} style={styles.productImage} />
        <View>
          <Text style={styles.deliveryLabel}>Delivery date:</Text>
          <Text style={styles.deliveryValue}>{deliveryDate}</Text>

          <Text style={styles.deliveryLabel}>Amount:</Text>
          <Text style={styles.deliveryValue}>Paid via {paymentMode}</Text>
          <Text style={styles.amount}>${amount}</Text>
        </View>
      </View>

      <View style={styles.sectionDivider} />

      {/* Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cancelText}>Cancel order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('TrackOrder')}>
          <MaterialIcons name="my-location" size={16} color="#fff" />
          <Text style={styles.trackText}>Track order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  deliveryLabel: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f58220',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#f58220',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cancelText: {
    color: '#f58220',
    fontWeight: 'bold',
  },
  trackButton: {
    backgroundColor: '#f58220',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trackText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
