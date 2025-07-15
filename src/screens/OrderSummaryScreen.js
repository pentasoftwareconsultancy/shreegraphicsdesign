// src/screens/OrderSummaryScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useRoute } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import OrderProgressBar from '../components/OrderProgressBar';
import ProductSummaryCard from '../components/ProductSummaryCard';
import AddressBox from '../components/AddressBox';
import EstimatedDeliveryBox from '../components/EstimatedDeliveryBox';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator } from 'react-native';

const OrderSummaryScreen = ({ navigation }) => {
    const { cartItems } = useCart();
    const route = useRoute();
    const directBuyItem = route.params?.directBuyItem || null;
    const itemsToShow = directBuyItem ? [directBuyItem] : cartItems;

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [message, setMessage] = useState('');
    const [isPaying, setIsPaying] = useState(false);

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

    const handlePay = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            navigation.navigate('PaymentSuccess', { amount: grandTotal });
        }, 2000); // 2 seconds delay
    };

    const renderItem = ({ item }) => (
        <View style={styles.productWrapper}>
            <ProductSummaryCard item={item} />
            <Text style={styles.metaInfo}>Size: {item.size} | Color: {item.color}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title="Order Summary" />
            {/* ✅ Moved out to make non-scrollable */}
            <View style={styles.progressWrapper}>
                <OrderProgressBar />
            </View>

            <FlatList
                data={itemsToShow}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <View style={styles.scrollContainer}>
                        {/* <View style={styles.section}>
                            <OrderProgressBar />
                        </View> */}
                        <Text style={styles.sectionHeader}>Products</Text>
                    </View>
                }
                renderItem={renderItem}
                ListFooterComponent={
                    <View style={styles.scrollContainer}>

                        {/* Amount Section */}
                        <Animatable.View animation="slideInUp" duration={700} delay={300} style={styles.amountSection}>
                            <View style={styles.amountSection}>
                                <Text style={styles.amountTitle}>Amount to Pay</Text>

                                <View style={styles.amountRow}>
                                    <Text style={styles.amountLabel}>Total ({itemsToShow.length} items)</Text>
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

                                <View style={[styles.amountRow, { marginTop: 8 }]}>
                                    <Text style={styles.subtotalLabel}>Sub Total</Text>
                                    <Text style={styles.subtotalValue}>₹{grandTotal}</Text>
                                </View>
                            </View>
                        </Animatable.View>

                        {/* Coupon Input */}
                        <View style={styles.section}>
                            <View style={styles.couponContainer}>
                                <TextInput
                                    placeholder="Enter coupon code"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    value={coupon}
                                    onChangeText={setCoupon}
                                />
                                <TouchableOpacity style={styles.couponButton} onPress={handleApplyCoupon}>
                                    <MaterialIcons name="local-offer" color="#fff" size={16} />
                                    <Text style={styles.couponButtonText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            {message !== '' && (
                                <Text style={[styles.couponMessage, { color: discount > 0 ? 'green' : 'red' }]}>
                                    {message}
                                </Text>
                            )}
                        </View>

                        {/* Delivery Box */}
                        <EstimatedDeliveryBox />

                        {/* Address Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionHeader}>Shipping Address</Text>
                            <TouchableOpacity
                                style={styles.addAddressButton}
                                onPress={() => navigation.navigate('AddAddress')}
                            >
                                <Text style={styles.addAddressText}>+ Add Address</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.section}>
                            <AddressBox />
                        </View>

                        <View style={{ height: 100 }} />
                    </View>
                }
            />

            {/* Sticky Pay Button */}
            <Animatable.View animation="bounceInUp" duration={700} delay={500} style={styles.stickyPayWrapper}>
                <TouchableOpacity
                    style={[styles.payButton, isPaying && { opacity: 0.7 }]}
                    onPress={handlePay}
                    disabled={isPaying}
                >
                    {isPaying ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.payText}>Pay ₹{grandTotal}</Text>
                    )}
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    progressWrapper: {
        paddingHorizontal: 20,
        marginTop: 0,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 12,
        marginBottom: 8,
    },
    addAddressButton: {
        backgroundColor: '#f58220',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    addAddressText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
    productWrapper: {
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    metaInfo: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    amountSection: {
        padding: 16,
        backgroundColor: '#fafafa',
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#eee',
    },
    amountTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    amountLabel: {
        fontSize: 14,
        color: '#444',
    },
    amountValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
    },
    couponAppliedLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666',
    },
    couponAppliedValue: {
        fontSize: 13,
        fontWeight: '500',
        color: '#f58220',
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
    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
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
    couponMessage: {
        marginTop: 6,
        fontSize: 13,
    },
    stickyPayWrapper: {
        position: 'relative',
        bottom: 0,
        left: 50,
        right: 30,
        // backgroundColor: '#fff',
        padding: 16,
        // borderTopWidth: 1,
        borderColor: '#eee',
        elevation: 12,
    },
    payButton: {
        backgroundColor: '#f58220',
        paddingVertical: 16,
        borderRadius: 30,
        bottom: 10,
        alignItems: 'center',
        width: '70%',
        justifyContent: 'center', // ✅ for centering spinner/text
    },
    payText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
