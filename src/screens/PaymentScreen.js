// ✅ PaymentScreen.js — Updated with proper functionalities, clean UI, and inline comments

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import OrderProgressBar from '../components/OrderProgressBar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const amount = route.params?.amount || '0.00';

    const [savedCards, setSavedCards] = useState([]);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('gpay');
    const [isPaying, setIsPaying] = useState(false);

    // 🔁 Fetch saved cards when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            const fetchSavedCards = async () => {
                try {
                    const stored = await AsyncStorage.getItem('savedCards');
                    setSavedCards(stored ? JSON.parse(stored) : []);
                } catch (e) {
                    console.log('Error fetching cards:', e);
                }
            };
            fetchSavedCards();
        }, [])
    );

    // 🗑️ Delete a card
    const handleDeleteCard = async (index) => {
        try {
            const stored = await AsyncStorage.getItem('savedCards');
            let cards = stored ? JSON.parse(stored) : [];
            cards.splice(index, 1);
            await AsyncStorage.setItem('savedCards', JSON.stringify(cards));
            setSavedCards(cards);
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    // 💰 Simulate Payment
    const handlePay = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            navigation.navigate('orderplaced', {
                amount,
                address: route.params.address,
                items: route.params.items,
                deliveryDate: route.params.deliveryDate,
                paymentMethod: selectedPaymentMode === 'cod'
                    ? 'Cash on Delivery'
                    : selectedPaymentMode === 'gpay'
                        ? 'Google Pay'
                        : 'Phone Pe',
            });
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Order Summary" />
            <View style={styles.progressBar}>
                <OrderProgressBar step={3} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.sectionTitle}>Payment Options</Text>

                {/* 🔘 UPI Apps */}
                <Text style={styles.subTitle}>UPI Apps</Text>
                {['gpay', 'phonepe'].map((app) => (
                    <TouchableOpacity
                        key={app}
                        style={styles.optionRow}
                        onPress={() => setSelectedPaymentMode(app)}
                    >
                        <Image
                            source={
                                app === 'gpay'
                                    ? require('../../assets/images/gpay.png')
                                    : require('../../assets/images/phonepe.png')
                            }
                            style={styles.upiIcon}
                        />
                        <Text style={styles.optionText}>{app === 'gpay' ? 'Google Pay' : 'Phone Pe'}</Text>
                        {selectedPaymentMode === app && (
                            <MaterialIcons name="radio-button-checked" color="orange" size={20} />
                        )}
                    </TouchableOpacity>
                ))}

                {/* ➕ Add UPI */}
                <TouchableOpacity style={styles.addRow}>
                    <MaterialIcons name="add" color="orange" size={20} />
                    <Text style={styles.addText}>Add new app</Text>
                </TouchableOpacity>

                {/* 💳 Saved Cards */}
                <Text style={[styles.subTitle, { marginTop: 20 }]}>Saved Cards</Text>
                {savedCards.map((card, index) => (
                    <View key={index} style={styles.savedCardRow}>
                        <TouchableOpacity
                            style={styles.optionRow}
                            onPress={() => setSelectedPaymentMode(card.number)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image
                                    source={require('../../assets/images/visa.png')}
                                    style={styles.cardIcon}
                                />
                                <Text style={styles.optionText}>**** **** **** {card.number}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteCard(index)}>
                                <MaterialIcons name="delete" size={22} color="red" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* ➕ Add Card */}
                <TouchableOpacity
                    style={styles.addRow}
                    onPress={() => navigation.navigate('AddNewCard', { amount })}
                >
                    <MaterialIcons name="add" color="orange" size={20} />
                    <Text style={styles.addText}>Add new card</Text>
                </TouchableOpacity>

                {/* 🚚 COD */}
                <Text style={[styles.subTitle, { marginTop: 20 }]}>Cash on Delivery</Text>
                <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => setSelectedPaymentMode('cod')}
                >
                    <MaterialIcons name="delivery-dining" color="gray" size={24} />
                    <Text style={styles.optionText}>Cash on Delivery</Text>
                    {selectedPaymentMode === 'cod' && (
                        <MaterialIcons name="radio-button-checked" color="orange" size={20} />
                    )}
                </TouchableOpacity>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* 💳 Pay Button */}
            <Animatable.View animation="bounceInUp" duration={700} delay={500} style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, isPaying && { opacity: 0.7 }]}
                    onPress={handlePay}
                    disabled={isPaying}
                >
                    {isPaying ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.payText}>Pay ₹{amount}</Text>
                    )}
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default PaymentScreen;

// 🎨 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    progressBar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    scroll: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    upiIcon: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    cardIcon: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
        marginRight: 12,
    },
    optionText: {
        fontSize: 14,
        flex: 1,
    },
    addRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    addText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 6,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    payButton: {
        backgroundColor: '#f58220',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    payText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
