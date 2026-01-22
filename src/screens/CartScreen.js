import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, Image, Icon, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { theme } from '../theme';

const CartScreen = ({ navigation }) => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantity = (id, currentQty, change) => {
        const newQty = currentQty + change;
        if (newQty < 1) return;
        dispatch(updateQuantity({ cartItemId: id, quantity: newQty }));
    };

    const handleClear = () => {
        if (items.length === 0) return;
        Alert.alert('Confirm', 'Are you sure you want to clear your cart?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: () => dispatch(clearCart()) }
        ]);
    };

    const renderItem = ({ item }) => (
        <ListItem bottomDivider containerStyle={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitle}>
                    R{(item.totalPrice * item.quantity).toFixed(2)}
                </ListItem.Subtitle>
                {item.selectedSides && item.selectedSides.length > 0 && (
                    <Text style={styles.options}>Sides: {item.selectedSides.join(', ')}</Text>
                )}
                {item.selectedExtras && item.selectedExtras.length > 0 && (
                    <Text style={styles.options}>Extras: {item.selectedExtras.map(e => e.name).join(', ')}</Text>
                )}

                <View style={styles.quantityContainer}>
                    <Icon name="minus" type="font-awesome" size={15} color={theme.colors.textPrimary} onPress={() => handleQuantity(item.cartItemId, item.quantity, -1)} />
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Icon name="plus" type="font-awesome" size={15} color={theme.colors.textPrimary} onPress={() => handleQuantity(item.cartItemId, item.quantity, 1)} />
                </View>
            </ListItem.Content>
            <Icon name="trash" type="font-awesome" color={theme.colors.error} onPress={() => handleRemove(item.cartItemId)} />
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.cartItemId}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
                contentContainerStyle={styles.list}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>R{totalAmount.toFixed(2)}</Text>
                </View>

                <View style={styles.buttonsRow}>
                    <Button
                        title="Clear Cart"
                        type="outline"
                        onPress={handleClear}
                        containerStyle={styles.btnContainer}
                        buttonStyle={{ borderColor: theme.colors.error }}
                        titleStyle={{ color: theme.colors.error }}
                        disabled={items.length === 0}
                    />
                    <Button
                        title="Checkout"
                        onPress={() => navigation.navigate('Checkout')}
                        containerStyle={styles.btnContainer}
                        buttonStyle={{ backgroundColor: theme.colors.primary }}
                        disabled={items.length === 0}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    list: {
        padding: 10,
        paddingBottom: 20,
    },
    itemContainer: {
        alignItems: 'flex-start',
        backgroundColor: theme.colors.cardBackground,
        borderColor: theme.colors.border,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.textPrimary,
    },
    subtitle: {
        color: theme.colors.primary,
        marginTop: 5,
        fontWeight: 'bold',
    },
    options: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: 80,
        justifyContent: 'space-between',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: theme.colors.textSecondary,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.cardBackground,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnContainer: {
        width: '48%',
    },
});

export default CartScreen;
