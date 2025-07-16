import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EstimatedDeliveryBox = () => {
  /**
   * Calculates the estimated delivery date by adding 5 days to the current date.
   * Returns the date in the format: `DD Mon, YYYY` (e.g., 13 Jul, 2025).
   */
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + 5);

    const day = String(estimatedDate.getDate()).padStart(2, '0');
    const month = estimatedDate.toLocaleString('default', { month: 'short' });
    const year = estimatedDate.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Delivery</Text>
      <View style={styles.row}>
        <Text style={styles.date}>{getEstimatedDeliveryDate()}</Text>
        <Text style={styles.time}>| 9:00 AM – 9:00 PM</Text>
      </View>
    </View>
  );
};

export default EstimatedDeliveryBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop:20,
    borderColor: '#ddd',
    backgroundColor: '#fcfcfc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginBottom: 20,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    // Elevation for Android
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2e7d32', // Green tone
  },
  time: {
    fontSize: 13,
    color: '#555',
    marginLeft: 10,
  },
});
