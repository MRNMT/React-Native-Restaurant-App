import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from '../redux/authSlice';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminScreen from '../screens/AdminScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Welcome"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.cardBackground,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.border,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: theme.colors.textPrimary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: theme.colors.textPrimary,
                    },
                    cardStyle: { backgroundColor: theme.colors.background }
                }}
            >
                {/* Public Screens */}
                <Stack.Screen 
                    name="Welcome" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ title: 'Log In' }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ title: 'Create Account' }} 
                />

                {/* Admin Screens */}
                <Stack.Screen 
                    name="AdminLoginScreen" 
                    component={AdminLoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="AdminScreen" 
                    component={AdminScreen} 
                    options={{ 
                        headerShown: false,
                        gestureEnabled: false // Prevent swipe back on admin screen
                    }} 
                />

                {/* User Screens */}
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="ProductDetails" 
                    component={ProductDetailsScreen} 
                    options={{ title: 'Details' }} 
                />
                <Stack.Screen 
                    name="Cart" 
                    component={CartScreen} 
                    options={{ title: 'My Cart' }} 
                />
                <Stack.Screen 
                    name="Checkout" 
                    component={CheckoutScreen} 
                    options={{ title: 'Checkout' }} 
                />
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ title: 'Profile' }} 
                />
                <Stack.Screen 
                    name="Admin" 
                    component={AdminScreen} 
                    options={{ title: 'Admin Dashboard' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;