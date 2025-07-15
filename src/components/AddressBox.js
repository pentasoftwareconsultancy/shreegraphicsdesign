// src/components/AddressBox.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'user_addresses';

const AddressBox = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAddresses();
    });
    loadAddresses();
    return unsubscribe;
  }, []);

  const loadAddresses = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setAddresses(parsed);
      const defaultAddr = parsed.find((addr) => addr.isDefault);
      setSelectedId(defaultAddr?.id || parsed[0]?.id);
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const selectAddress = async (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    setAddresses(updated);
    setSelectedId(id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleEdit = (address) => {
    navigation.navigate('AddAddress', { editAddress: address });
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const filtered = addresses.filter((a) => a.id !== id);
          setAddresses(filtered);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => selectAddress(item.id)}
      activeOpacity={0.9}
      style={[
        styles.card,
        item.id === selectedId && { borderColor: '#f58220' },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.radioRow}>
          <MaterialIcons
            name={
              item.id === selectedId
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={20}
            color="#f58220"
          />
          <Text style={styles.nameText}>{item.fullName}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
            <MaterialIcons name="edit" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
            <MaterialIcons name="delete" size={20} color="#d00" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.addressLine}>{item.line1}</Text>
      {item.line2 ? <Text style={styles.addressLine}>{item.line2}</Text> : null}
      <Text style={styles.addressLine}>
        {item.city}, {item.state} - {item.country}
      </Text>
      <Text style={styles.addressLine}>Phone: {item.phone}</Text>
      {item.landmark ? <Text style={styles.addressLine}>Landmark: {item.landmark}</Text> : null}
    </TouchableOpacity>
  );

  if (addresses.length === 0) {
    return (
      <Text style={{ padding: 20, fontSize: 14, color: '#777' }}>
        No saved address found.
      </Text>
    );
  }

  return (
    <FlatList
      data={addresses}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

export default AddressBox;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 10,
  },
  addressLine: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});
