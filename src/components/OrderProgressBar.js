// src/components/OrderProgressBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderProgressBar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.progressWrapper}>
            <View style={styles.stepWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.circleDone}>
                        <MaterialIcons name="check" size={14} color="#fff" />
                    </View>

                    <Text style={styles.stepTextActive}>confirm Buy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.progressLineActive} />

            <View style={styles.stepWrapper}>
                <View style={styles.circleActive}>
                    <Text style={styles.stepNumber}>2</Text>
                </View>
                <Text style={styles.stepTextActive}>Order summary</Text>
            </View>

            <View style={styles.progressLineInactive} />

            <View style={styles.stepWrapper}>
                <View style={styles.circleInactive}>
                    <Text style={styles.stepNumber}>3</Text>
                </View>
                <Text style={styles.stepTextInactive}>Payment</Text>
            </View>
        </View>
    );
};

export default OrderProgressBar;

const styles = StyleSheet.create({
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    stepWrapper: {
        alignItems: 'center',
        width: 80,
    },
    circleDone: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f58220',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleActive: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f58220',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleInactive: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumber: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    stepTextActive: {
        fontSize: 11,
        marginTop: 6,
        fontWeight: '600',
        color: '#f58220',
        textAlign: 'center',
    },
    stepTextInactive: {
        fontSize: 11,
        marginTop: 6,
        color: '#aaa',
        textAlign: 'center',
    },
    progressLineActive: {
        height: 2,
        backgroundColor: '#f58220',
        flex: 1,
        marginHorizontal: 4,
    },
    progressLineInactive: {
        height: 2,
        backgroundColor: '#ccc',
        flex: 1,
        marginHorizontal: 4,
    },
});
