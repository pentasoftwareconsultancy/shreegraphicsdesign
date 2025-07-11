import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigations/AppNavigator';
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FavoriteProvider>
    </CartProvider>
  );
}
