/**
 * AR Product Preview App
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
