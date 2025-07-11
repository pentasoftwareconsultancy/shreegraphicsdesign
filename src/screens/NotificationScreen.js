import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';

const NotificationScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <CustomHeader title="Notifications" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Order & Delivery Updates</Text>

                    <View style={styles.messageWrapper}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.message}>
                            "Your Design is Being Printed! Sit tight, your awesome T-shirt is coming to life."
                        </Text>
                    </View>

                    <View style={styles.messageWrapper}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.message}>
                            "Order Shipped! Your custom Floral printed hoodie is on its way. Expected delivery: 14 January 2025."
                        </Text>
                    </View>

                    <View style={styles.messageWrapper}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.message}>
                            "Your Package Has Arrived! Check your doorstep for your fresh new T-shirt".
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Abandoned Cart Reminders</Text>

                    <View style={styles.messageWrapper}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.message}>
                            "Your Design Awaits! Complete your order now before it’s gone!"
                        </Text>
                    </View>

                    <View style={styles.messageWrapper}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.message}>
                            "Forgot Something? Your custom [product] is still in your cart. Check out now!"
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        marginRight: 42, // balance space with back icon
    },
    scrollContent: {
        padding: 20,
    },
    sectionWrapper: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        fontSize: 16,
        marginRight: 8,
        lineHeight: 20,
    },
    message: {
        fontSize: 13,
        color: '#000',
        lineHeight: 20,
        flex: 1,
    },
});

export default NotificationScreen;
