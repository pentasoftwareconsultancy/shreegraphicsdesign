import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EstimatedDeliveryBox = () => {
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + 5);

    const day = estimatedDate.getDate();
    const month = estimatedDate.toLocaleString('default', { month: 'short' }); // e.g., Jul
    const year = estimatedDate.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Delivery</Text>
      <View style={styles.row}>
        <Text style={styles.date}>{getEstimatedDeliveryDate()}</Text>
        <Text style={styles.time}>| 9:00 AM - 9:00 PM</Text>
      </View>
    </View>
  );
};

export default EstimatedDeliveryBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fefefe',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 13,
    color: '#757575',
    fontWeight: '600',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2e7d32', // green tone
  },
  time: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
  },
});
