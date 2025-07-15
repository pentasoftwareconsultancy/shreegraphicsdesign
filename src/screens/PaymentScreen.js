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
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import OrderProgressBar from '../components/OrderProgressBar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const amount = route.params?.amount || '0.00';
    const [savedCards, setSavedCards] = useState([]);

    const [selectedPaymentMode, setSelectedPaymentMode] = useState('gpay');
    const [isPaying, setIsPaying] = useState(false);

    // Fetch cards when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchCards = async () => {
                try {
                    const stored = await AsyncStorage.getItem('savedCards');
                    if (stored) {
                        setSavedCards(JSON.parse(stored));
                    }
                } catch (e) {
                    console.log('Failed to fetch cards', e);
                }
            };

            fetchCards();
        }, [])
    );


    const handlePay = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            navigation.navigate('PaymentSuccess', {
                amount,
                paymentMode:
                    selectedPaymentMode === 'gpay'
                        ? 'Google Pay'
                        : selectedPaymentMode === 'phonepe'
                            ? 'Phone Pe'
                            : 'Cash on Delivery',
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
                <Text style={styles.sectionTitle}>Payment options</Text>

                {/* UPI Section */}
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
                        <Text style={styles.optionText}>
                            {app === 'gpay' ? 'Google Pay' : 'Phone Pe'}
                        </Text>
                        {selectedPaymentMode === app && (
                            <MaterialIcons name="radio-button-checked" color="orange" size={20} />
                        )}
                    </TouchableOpacity>
                ))}

                {/* Add new UPI */}
                <TouchableOpacity style={styles.addRow}>
                    <MaterialIcons name="add" color="orange" size={20} />
                    <Text style={styles.addText}>Add new app</Text>
                </TouchableOpacity>

                {/* Cards */}
                <Text style={[styles.subTitle, { marginTop: 20 }]}>Saved cards</Text>

                {/* mapped dynamic cards */}
                {savedCards.map((card, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionRow}
                        onPress={() => setSelectedPaymentMode(`card-${index}`)}
                    >
                        <Image
                            source={
                                card.type === 'visa'
                                    ? require('../../assets/images/visa.png')
                                    : require('../../assets/images/visa.png') // you can add more logos here
                            }
                            style={styles.cardIcon}
                        />
                        <Text style={styles.optionText}>**** **** **** {card.number}</Text>
                        {selectedPaymentMode === `card-${index}` && (
                            <MaterialIcons name="radio-button-checked" color="orange" size={20} />
                        )}
                    </TouchableOpacity>
                ))}


                {/* Add new card */}
                <TouchableOpacity style={styles.addRow}
                    onPress={() => navigation.navigate('AddNewCard', { amount })}>
                    <MaterialIcons name="add" color="orange" size={20} />
                    <Text style={styles.addText}>Add new card</Text>
                </TouchableOpacity>

                {/* COD */}
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

            {/* Pay Button */}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        marginTop: 40,
    },
    progressBar: {
        flexDirection: 'row',
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
