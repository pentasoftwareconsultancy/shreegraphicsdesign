import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const OfferBanner = () => (
  <View style={styles.banner}>
    <Image source={require('../../assets/images/banner_offer.png')} style={styles.bannerImage} />
    <View style={styles.bannerContent}>
      <Text style={styles.bannerTitle}>New Offer</Text>
      <Text style={styles.bannerSubtitle}>Discount 50% for first bulk order</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order now</Text>
      </TouchableOpacity>
    </View>
    <Image source={require('../../assets/images/model_offer.png')} style={styles.rightImage} />
  </View>
);

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    margin: 20,
    borderRadius: 14,
    overflow: 'hidden',
    width: Dimensions.get('window').width - 40,
  },
  bannerImage: { width: '100%', height: 130, borderRadius: 14 },
  bannerContent: { position: 'absolute', left: 20, top: 20, zIndex: 1 },
  bannerTitle: { fontWeight: 'bold', fontSize: 16, color: '#fff' },
  bannerSubtitle: { fontSize: 12, color: '#fff', marginBottom: 5 },
  orderButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
    elevation: 3,
    marginTop: 5,
  },
  orderButtonText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#f58220',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rightImage: {
    position: 'absolute',
    width: 120,
    height: 120,
    resizeMode: 'contain',
    right: 10,
    top: 10,
    zIndex: 1,
  },
});

export default OfferBanner;
