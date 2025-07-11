// src/components/AddressBox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddressBox = () => {
  return (
    <View style={styles.addressBox}>
      <Text style={styles.addressTitle}>Delivery Address</Text>
      <Text style={styles.addressName}>Kaustubh Sharma</Text>
      <Text style={styles.addressDetails}>
        Flat:4, build no:33, Shree shweta society, 12–4B, sector–2, near ganesh mandir, lane–6
      </Text>
      <Text style={styles.addressCity}>KURULI, PUNE–411025</Text>
      <Text style={styles.addressPhone}>Phone number:9575356669</Text>

      <View style={styles.addressActions}>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={18} color="#f58220" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={18} color="#f58220" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressBox;

const styles = StyleSheet.create({
  addressBox: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  addressName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  addressDetails: {
    fontSize: 13,
    color: '#555',
  },
  addressCity: {
    fontSize: 13,
    color: '#555',
  },
  addressPhone: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 12,
  },
});
