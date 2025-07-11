// src/screens/OrderSummaryScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useRoute } from '@react-navigation/native'; // ✅ Correct import
import CustomHeader from '../components/CustomHeader';
import OrderProgressBar from '../components/OrderProgressBar';
import ProductSummaryCard from '../components/ProductSummaryCard';
import AddressBox from '../components/AddressBox';

const OrderSummaryScreen = ({ navigation }) => {
    const { cartItems } = useCart();
    const route = useRoute(); // ✅ Correct usage
    const directBuyItem = route.params?.directBuyItem || null;
    const itemsToShow = directBuyItem ? [directBuyItem] : cartItems;

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [message, setMessage] = useState('');

    const calculateTotal = () => {
        return itemsToShow.reduce((total, item) => {
            const price = parseFloat(item.price?.replace(/[^\d.-]/g, '') || 0);
            return total + price * (item.quantity || 1);
        }, 0);
    };

    const total = calculateTotal();
    const grandTotal = (total - discount).toFixed(2);

    const handleApplyCoupon = () => {
        if (coupon.toLowerCase() === 'save10') {
            const discountAmount = total * 0.1;
            setDiscount(discountAmount);
            setMessage('Coupon applied successfully!');
        } else {
            setDiscount(0);
            setMessage('Invalid coupon code.');
        }
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Order Summary" />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <OrderProgressBar />
                </View>

                <View style={styles.section}>
                    {(directBuyItem ? [directBuyItem] : cartItems).map((item, index) => (
                        <View key={index} style={styles.productWrapper}>
                            <ProductSummaryCard item={item} />
                            <Text style={styles.metaInfo}>Size: {item.size} | Color: {item.color}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.amountSection}>
                    <Text style={styles.amountTitle}>Amount to pay</Text>

                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>Total ({directBuyItem ? 1 : cartItems.length} items)</Text>

                        <Text style={styles.amountValue}>₹{total.toFixed(2)}</Text>
                    </View>

                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>Shipping Fee</Text>
                        <Text style={styles.amountValue}>₹0.00</Text>
                    </View>

                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>Discount</Text>
                        <Text style={styles.amountValue}>₹{discount.toFixed(2)}</Text>
                    </View>

                    {discount > 0 && (
                        <View style={styles.amountRow}>
                            <Text style={styles.couponAppliedLabel}>Coupon Applied</Text>
                            <Text style={styles.couponAppliedValue}>{coupon.toUpperCase()}</Text>
                        </View>
                    )}

                    <View style={styles.amountRow}>
                        <Text style={styles.subtotalLabel}>Sub Total</Text>
                        <Text style={styles.subtotalValue}>₹{grandTotal}</Text>
                    </View>
                </View>

                {/* Coupon Section */}
                <View style={styles.section}>
                    <View style={styles.couponContainer}>
                        <TextInput
                            placeholder="Enter coupon code"
                            style={styles.input}
                            autoCapitalize='none'
                            value={coupon}
                            onChangeText={setCoupon}
                        />
                        <TouchableOpacity style={styles.couponButton} onPress={handleApplyCoupon}>
                            <MaterialIcons name="local-offer" color="#fff" size={16} />
                            <Text style={styles.couponButtonText}>Apply coupon</Text>
                        </TouchableOpacity>
                    </View>
                    {message !== '' && (
                        <Text style={{ color: discount > 0 ? 'green' : 'red', marginTop: 6 }}>{message}</Text>
                    )}
                </View>



                <View style={styles.section}>
                    <AddressBox />
                </View>
            </ScrollView>
            <View style={styles.stickyPayWrapper}>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payText}>Pay ₹{grandTotal}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100, // To avoid overlap with sticky button
        backgroundColor: '#fff',
    },
    section: {
        
        marginBottom: 24,
    },
    productWrapper: {
        marginBottom: 12,
    },
    metaInfo: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    amountSection: {
        marginVertical: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    amountTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#000',
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    amountLabel: {
        fontSize: 14,
        color: '#444',
    },
    amountValue: {
        fontSize: 14,
        color: '#444',
    },
    subtotalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    subtotalValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#f58220',
    },
    couponAppliedLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
    },
    couponAppliedValue: {
        fontSize: 13,
        fontWeight: '500',
        color: '#f58220',
    },
    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
    },
    couponButton: {
        backgroundColor: '#f58220',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    couponButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
    },
    stickyPayWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        // backgroundColor: '#fff',
        // borderTopWidth: 1,
        // borderColor: '#eee',
    },
    payButton: {
        backgroundColor: '#f58220',
        paddingVertical: 16,
        borderRadius: 30,
        bottom: 15,
        alignItems: 'center',
        width: '100%',
    },
    payText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
