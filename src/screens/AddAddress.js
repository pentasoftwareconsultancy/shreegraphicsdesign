// src/screens/AddAddressScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';


const STORAGE_KEY = 'user_addresses';

const AddAddressScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    landmark: '',
    pincode: '',
    label: 'Home',
    isDefault: false,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is needed to auto-fill address.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const [place] = await Location.reverseGeocodeAsync(location.coords);

    if (place) {
      setForm((prev) => ({
        ...prev,
        line1: place.street || '',
        city: place.city || place.subregion || '',
        state: place.region || '',
        country: place.country || '',
        pincode: place.postalCode || '',
      }));
    }
  };

  const handleSave = async () => {
    const { fullName, phone, line1, city, state, country, pincode } = form;

    if (!fullName || !phone || !line1 || !city || !state || !country || !pincode) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert('Invalid Pincode', 'Pincode must be exactly 6 digits.');
      return;
    }

    try {
      const newAddress = {
        ...form,
        id: Date.now().toString(),
      };

      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      let parsed = stored ? JSON.parse(stored) : [];

      if (form.isDefault) {
        parsed = parsed.map((addr) => ({ ...addr, isDefault: false }));
      }

      const updated = [newAddress, ...parsed];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      Alert.alert('Success', 'Address saved!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Add Address" />
      <ScrollView contentContainerStyle={styles.form}>
      <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
  <MaterialIcons name="my-location" size={20} color="#f58220" style={{ marginRight: 8 }} />
  <Text style={styles.locationButtonText}>Use Current Location</Text>
</TouchableOpacity>

        <Input label="Full name" value={form.fullName} onChangeText={(v) => handleChange('fullName', v)} />
        <Input label="Phone number" value={form.phone} keyboardType="phone-pad" onChangeText={(v) => handleChange('phone', v)} />
        <Input label="Address (line 1)" value={form.line1} placeholder="Street/house details" onChangeText={(v) => handleChange('line1', v)} />
        <Input label="Address (line 2)" value={form.line2} placeholder="Apartment details" onChangeText={(v) => handleChange('line2', v)} />

        <View style={styles.row}>
          <Input label="City/District" value={form.city} onChangeText={(v) => handleChange('city', v)} small />
          <Input label="State" value={form.state} onChangeText={(v) => handleChange('state', v)} small />
        </View>

        <View style={styles.row}>
          <Input label="Country" value={form.country} onChangeText={(v) => handleChange('country', v)} small />
          <Input label="Landmark" value={form.landmark} onChangeText={(v) => handleChange('landmark', v)} small />
        </View>

        <Input label="Pincode / ZIP Code" value={form.pincode} keyboardType="numeric" onChangeText={(v) => handleChange('pincode', v)} />
        <Input label="Label (e.g., Home, Work)" value={form.label} onChangeText={(v) => handleChange('label', v)} />
        {/* <Text style={styles.label}>Label</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('label', 'Home')}>
            <View style={[styles.radioCircle, form.label === 'Home' && styles.selectedRadio]} />
            <Text style={styles.radioText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('label', 'Work')}>
            <View style={[styles.radioCircle, form.label === 'Work' && styles.selectedRadio]} />
            <Text style={styles.radioText}>Work</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Set as default address</Text>
          <Switch
            value={form.isDefault}
            onValueChange={(value) => handleChange('isDefault', value)}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Input = ({ label, small, ...props }) => (
  <View style={[styles.inputGroup, small && { flex: 1, marginRight: 10 }]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40
    // backgroundColor: '#fff',
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#f58220',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  saveBtn: {
    backgroundColor: '#f58220',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  cancelText: {
    color: '#f58220',
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#f58220',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  locationButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f58220',
  },
  radioRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: '#f58220',
    borderColor: '#f58220',
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
});
