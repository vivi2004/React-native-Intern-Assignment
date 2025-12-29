import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductCatalogScreen from '../screens/ProductCatalogScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ARViewScreen from '../screens/ARViewScreen';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

import ProfileScreen from '../screens/ProfileScreen';

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    }}>
    <Tab.Screen
      name="Catalog"
      component={ProductCatalogScreen}
      options={{
        tabBarLabel: 'Catalog',
        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📦</Text>,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>❤️</Text>,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ARView"
      component={ARViewScreen}
      options={{
        headerShown: false,
        presentation: 'fullScreenModal',
      }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;

