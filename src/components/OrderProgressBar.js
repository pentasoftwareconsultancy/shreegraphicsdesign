import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const steps = [
    { id: 1, label: 'Confirm Buy' },
    { id: 2, label: 'Order Summary' },
    { id: 3, label: 'Payment' },
];

const OrderProgressBar = ({ step = 2 }) => {
    return (
        <View style={styles.container}>
            <View style={styles.stepContainer}>
                {steps.map((s, index) => (
                    <React.Fragment key={s.id}>
                        <View style={styles.stepWrapper}>
                            <View
                                style={[
                                    styles.circle,
                                    step >= s.id ? styles.activeCircle : styles.inactiveCircle,
                                ]}
                            >
                                {step > s.id ? (
                                    <MaterialIcons name="check" size={16} color="white" />
                                ) : (
                                    <Text style={styles.circleText}>{s.id}</Text>
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    step >= s.id ? styles.activeLabel : styles.inactiveLabel,
                                ]}
                            >
                                {s.label}
                            </Text>
                        </View>

                        {index < steps.length - 1 && (
                            <View
                                style={[
                                    styles.line,
                                    step > s.id ? styles.activeLine : styles.inactiveLine,
                                ]}
                            />
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default OrderProgressBar;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepWrapper: {
        alignItems: 'center',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeCircle: {
        backgroundColor: '#f58220',
    },
    inactiveCircle: {
        backgroundColor: '#ccc',
    },
    circleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    stepLabel: {
        fontSize: 10,
        textAlign: 'center',
        width: 60,
    },
    activeLabel: {
        color: '#f58220',
        fontWeight: '600',
    },
    inactiveLabel: {
        color: '#999',
    },
    line: {
        height: 4,
        width: 70,
        marginHorizontal: 5,
        marginTop: -21,
    },
    activeLine: {
        backgroundColor: '#f58220',
    },
    inactiveLine: {
        backgroundColor: '#ccc',
    },
});
