
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // if using older expo
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import BottomNavigator from './BottomNavigation';
import NotificationScreen from '../screens/NotificationScreen';
import CustomHeader from '../components/CustomHeader';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import AddAddress from '../screens/AddAddress';
import PaymentScreen from '../screens/PaymentScreen';
import AddNewCardScreen from '../screens/AddNewCardScreen';

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
    return Font.loadAsync({
        'dancingscript-bold': require('../../assets/fonts/Dancing_Script/DancingScript-Bold.ttf'),
        'poppins-bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'poppins-light-italic': require('../../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
        'poppis-light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),

    });
};

export default function AppNavigator() {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
            <Stack.Screen name="splashscreen" component={SplashScreen} />
            <Stack.Screen name='intro' component={IntroScreen} />
            <Stack.Screen name='home' component={BottomNavigator} />

            {/* Notification Screen */}
            <Stack.Screen
                name="notification"
                component={NotificationScreen}
                options={({ navigation }) => ({

                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

            {/* ProductDetail Screen */}
            <Stack.Screen
                name='ProductDetail'
                component={ProductDetail}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

            {/* CartScreen */}
            <Stack.Screen
                name='Cart'
                component={CartScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

            {/* OrderSummaryScreen */}
            <Stack.Screen
                name='OrderSummary'
                component={OrderSummaryScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />


            {/* AddAddress */}
            <Stack.Screen
                name='AddAddress'
                component={AddAddress}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

            {/* PaymentSuccess */}
            <Stack.Screen
                name='PaymentSuccess'
                component={PaymentScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

            {/* AddNewCard */}
            <Stack.Screen
                name='AddNewCard'
                component={AddNewCardScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                })}
            />

        </Stack.Navigator>
    );
}