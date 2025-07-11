import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderBar = () => {
  const navigation = useNavigation(); // ✅ Get navigation object

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.smallText}>Hello, Welcome</Text>
        <Text style={styles.username}>User</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('notification')}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  smallText: { color: '#999', fontSize: 12 },
  username: { fontSize: 18, fontWeight: '700' },
});

export default HeaderBar;
