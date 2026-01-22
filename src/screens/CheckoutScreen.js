import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Text, Input, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

const CheckoutScreen = ({ navigation }) => {
    const { user } = useSelector(state => state.auth);
    const { totalAmount, items } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (user) {
            setAddress(user.address || '');
            setCardNumber(user.cardNumber || '');
        }
    }, [user]);

    const handlePlaceOrder = async () => {
        if (!user) {
            Alert.alert('Login Required', 'You must be logged in to place an order.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Login', onPress: () => navigation.navigate('Login') }
            ]);
            return;
        }

        if (!address || !cardNumber || !expiryDate || !cvv) {
            Alert.alert('Error', 'Please provide delivery address and full card details.');
            return;
        }

        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert('Success', 'Order Placed Successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(clearCart());
                        navigation.navigate('Home');
                        // In real app, we'd navigate to an Order History screen
                    }
                }
            ]);
        }, 2000);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text h4 style={styles.header}>Checkout</Text>

            <Text h5 style={styles.sectionTitle}>Delivery Address</Text>
            <Input
                placeholder="Address"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={address}
                onChangeText={setAddress}
                leftIcon={<Icon name="map-marker" type="font-awesome" color={theme.colors.textSecondary} />}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputField}
            />

            <Text h5 style={styles.sectionTitle}>Payment Method</Text>
            <Input
                placeholder="Card Number"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                leftIcon={<Icon name="credit-card" type="font-awesome" color={theme.colors.textSecondary} />}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputField}
            />
            <View style={styles.row}>
                <Input
                    placeholder="MM/YY"
                    placeholderTextColor={theme.colors.textPlaceholder}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    maxLength={5}
                    containerStyle={styles.halfInput}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputField}
                />
                <Input
                    placeholder="CVV"
                    placeholderTextColor={theme.colors.textPlaceholder}
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={3}
                    containerStyle={styles.halfInput}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputField}
                />
            </View>

            <View style={styles.summary}>
                <Text h4 style={styles.summaryTitle}>Order Summary</Text>
                <Text style={styles.summaryText}>Items: {items.length}</Text>
                <Text h3 style={styles.totalPrice}>Total: R{totalAmount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity onPress={handlePlaceOrder} disabled={isProcessing}>
                <LinearGradient
                    colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>{isProcessing ? 'Processing...' : 'Place Order'}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
    header: {
        textAlign: 'center',
        marginBottom: 30,
        color: theme.colors.textPrimary,
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 20,
        color: theme.colors.textPrimary,
    },
    input: {
        color: theme.colors.textPrimary,
    },
    inputField: {
        borderBottomColor: theme.colors.inputBorder,
    },
    summary: {
        marginTop: 30,
        padding: 20,
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 10,
        alignItems: 'center',
    },
    summaryTitle: {
        color: theme.colors.textPrimary,
    },
    summaryText: {
        fontSize: 16,
        marginVertical: 5,
        color: theme.colors.textSecondary,
    },
    totalPrice: {
        color: theme.colors.primary,
        marginVertical: 10,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
});

export default CheckoutScreen;
