import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import { Linking, Alert } from 'react-native';

const OrderSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const sendWhatsAppMessage = () => {
      const adminPhone = '8210129246'; // ✅ Replace with actual admin number
  
      // 🧾 Format each item nicely
      const itemDetails = items
        .map((item, index) => {
          return `\n${index + 1}. *${item.title}* (${item.size || 'N/A'})\n   Qty: ${item.quantity || 1}\n   Price: ₹${item.price}`;
        })
        .join('\n');
  
      // 📦 Complete message
      const message = `🛒 *New Order Placed!*
  
  👤 *Customer Name:* ${address?.fullName}
  📱 *Phone:* ${address?.phone}
  📍 *Address:* ${address?.line1}, ${address?.line2}, ${address?.city}, ${address?.state} - ${address?.pincode}
  🗓️ *Delivery Date:* ${deliveryDate}
  
  🧾 *Order Summary:*
  ${itemDetails}
  
  💰 *Total Amount:* ₹${amount}
  `;
  
      const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  
      Linking.openURL(url).catch(() =>
        Alert.alert('WhatsApp not installed', 'Please install WhatsApp to send message')
      );
    };
  
    sendWhatsAppMessage();
  }, []);
  



  // ✅ Extract data from route safely
  const {
    address = {},
    deliveryDate = '',
    paymentMethod = '',
    amount = 0,
    items = [],
  } = route.params || {};

  return (
    <View style={styles.container}>
      <CustomHeader />

      {/* ✅ Success Icon & Message */}
      <Ionicons name="checkmark-circle" size={80} color="green" style={styles.successIcon} />
      <Text style={styles.successTitle}>Order Placed Successfully!</Text>
      <Text style={styles.successSubtitle}>
        Your order will be delivered soon. Confirmation sent via SMS.
      </Text>

      <View style={styles.sectionDivider} />

      {/* ✅ Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Shipping Address ({address?.label || 'N/A'})
        </Text>
        <Text style={styles.addressText}>{address?.fullName}</Text>
        <Text style={styles.addressText}>{address?.line1}, {address?.line2}</Text>
        <Text style={styles.addressText}>{address?.landmark}</Text>
        <Text style={styles.addressText}>
          {address?.city}, {address?.state} - {address?.pincode}
        </Text>
        <Text style={styles.addressText}>{address?.country}</Text>
        <Text style={styles.addressText}>Phone: {address?.phone}</Text>
      </View>

      <View style={styles.sectionDivider} />

      {/* ✅ Order Items & Delivery Info */}
      <Text style={styles.sectionTitle}>Items Ordered</Text>
      {items.slice(0, 1).map((item, idx) => {
        const imageUri = item.image?.uri || item.image;
        return (
          <View key={idx} style={styles.itemRow}>
            <Image
              source={{ uri: imageUri }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.meta}>Qty: {item.quantity || 1} | ₹{item.price}</Text>
              <Text style={styles.meta}>Delivery by: {deliveryDate}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.sectionDivider} />

      {/* ✅ Payment Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text style={styles.meta}>Paid via: {paymentMethod}</Text>
        <Text style={styles.amount}>₹{amount}</Text>
      </View>

      <View style={styles.sectionDivider} />

      {/* ✅ Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.cancelText}>Cancel Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate('TrackOrder')}
        >
          <MaterialIcons name="my-location" size={16} color="#fff" />
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    // backgroundColor: '#fff',
  },
  successIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f58220',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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
