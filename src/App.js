import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigations/AppNavigator';
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CartProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </FavoriteProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './navigations/AppNavigator';
// import { FavoriteProvider } from './context/FavoriteContext';
// import { CartProvider } from './context/CartContext';

// export default function App() {
//   return (
//     <CartProvider>
//       <FavoriteProvider>
//         <NavigationContainer>
//           <AppNavigator />
//         </NavigationContainer>
//       </FavoriteProvider>
//     </CartProvider>
//   );
// }
