import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewCardScreen = ({ navigation }) => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiry, setExpiry] = useState('');
    const [saveCard, setSaveCard] = useState(false);

    const route = useRoute();
    const amount = route.params?.amount || '0.00'

    const formatCardNumber = (number) => {
        return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const getLastFourDigits = (number) => {
        const cleaned = number.replace(/\s/g, '');
        return cleaned.length >= 4 ? cleaned.slice(-4) : '****';
    };

    const handleSavePay = async () => {
        const newCard = {
            number: getLastFourDigits(cardNumber),
            type: 'visa',
        };

        if (saveCard) {
            try {
                const existing = await AsyncStorage.getItem('savedCards');
                const savedCards = existing ? JSON.parse(existing) : [];
                savedCards.push(newCard);
                await AsyncStorage.setItem('savedCards', JSON.stringify(savedCards));
            } catch (e) {
                console.log('Error saving card:', e);
            }
        }

        navigation.navigate('PaymentSuccess', {
            paymentMode: 'Card',
            amount: '$212.99',
            lastFour: newCard.number,
        });
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <CustomHeader title="Enter Card Details" />
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Enter Card Details</Text>
            </View> */}

            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Card Preview */}
                {/* <View style={styles.cardPreview}>
                    <Text style={styles.cardNumber}>
                        **** **** **** {getLastFourDigits(cardNumber)}
                    </Text>
                    <Image
                        source={require('../../assets/images/visa.png')}
                        style={styles.visaLogo}
                    />
                    <View style={styles.cardMetaRow}>
                        <Text style={styles.cardMetaLabel}>CREDIT CARD</Text>
                        <Text style={styles.cardMetaLabel}>EXPIRE DATE</Text>
                    </View>
                    <Text style={styles.expireValue}>{expiry || 'MM/YY'}</Text>
                </View> */}

                {/* Card Holder Name */}
                <Text style={styles.label}>Card Holder’s Name</Text>
                <TextInput
                    style={styles.input}
                    value={cardName}
                    onChangeText={setCardName}
                    placeholder="Your name"
                    autoCapitalize='characters'
                />

                {/* Card Number */}
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    value={formatCardNumber(cardNumber)}
                    onChangeText={setCardNumber}
                    keyboardType="number-pad"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                />

                {/* CVV & Expiry */}
                <View style={styles.row}>
                    <View style={[styles.input, styles.halfInput]}>
                        <Text style={styles.label}>CVV</Text>
                        <TextInput
                            value={cvv}
                            onChangeText={setCvv}
                            keyboardType="number-pad"
                            secureTextEntry
                            maxLength={4}
                            style={styles.innerInput}
                            placeholder="***"
                        />
                    </View>
                    <View style={[styles.input, styles.halfInput]}>
                        <Text style={styles.label}>Expiry</Text>
                        <TextInput
                            value={expiry}
                            onChangeText={setExpiry}
                            keyboardType="number-pad"
                            maxLength={5}
                            style={styles.innerInput}
                            placeholder="MM/YY"
                        />
                    </View>
                </View>

                {/* Save card */}
                <TouchableOpacity
                    onPress={() => setSaveCard(!saveCard)}
                    style={styles.checkboxRow}
                >
                    <MaterialIcons
                        name={saveCard ? 'check-box' : 'check-box-outline-blank'}
                        size={24}
                        color={saveCard ? '#f58220' : '#ccc'}
                    />
                    <Text style={styles.checkboxText}>Save this card for future transaction</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Save & Pay Button */}
            <TouchableOpacity style={styles.payBtn} onPress={handleSavePay}>
                <Text style={styles.payBtnText}>Save & Pay ₹{amount}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddNewCardScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    backBtn: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    scroll: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    cardPreview: {
        backgroundColor: '#1a73e8',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    visaLogo: {
        width: 60,
        height: 30,
        position: 'absolute',
        top: 20,
        right: 20,
        resizeMode: 'contain',
    },
    cardMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cardMetaLabel: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.7,
    },
    expireValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#444',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginBottom: 16,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    innerInput: {
        fontSize: 14,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 8,
    },
    payBtn: {
        backgroundColor: '#f58220',
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    payBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
