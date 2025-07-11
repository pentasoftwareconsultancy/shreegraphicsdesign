import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('intro'); // Replace with your main screen
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="fadeInDown"
                duration={2000}
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Animatable.Text
                animation="fadeInUp"
                delay={1000}
                duration={2000}
                style={styles.text}
            >
                Graphics Design
            </Animatable.Text>

            {/* ✅ Version text properly inside <Text> and animated */}
            {/* <Animatable.Text
                animation="fadeIn"
                delay={2500}
                duration={1000}
                style={styles.version}
            >
                Version 1.0.0
            </Animatable.Text> */}
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 34,
        color: '#000',
        fontFamily: 'dancingscript-bold',
        marginTop: 10,
    },
    version: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
    },
});
