import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Image, CheckBox, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useTheme } from '../contexts/ThemeContext';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const dispatch = useDispatch();
    const { theme } = useTheme();

    const [quantity, setQuantity] = useState(1);
    const [selectedSides, setSelectedSides] = useState([]);
    const [selectedExtras, setSelectedExtras] = useState([]);

    const handleSideToggle = (sideName) => {
        if (selectedSides.includes(sideName)) {
            setSelectedSides(selectedSides.filter(s => s !== sideName));
        } else {
            if (selectedSides.length >= 2) {
                Alert.alert('Limit Reached', 'You can only select up to 2 sides.');
                return;
            }
            setSelectedSides([...selectedSides, sideName]);
        }
    };

    const handleExtraToggle = (extra) => {
        if (selectedExtras.find(e => e.name === extra.name)) {
            setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
        } else {
            setSelectedExtras([...selectedExtras, extra]);
        }
    };

    const calculateTotal = () => {
        const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
        return (product.price + extrasTotal) * quantity;
    };

    const handleAddToCart = () => {
        const itemToAdd = {
            ...product,
            quantity,
            selectedSides,
            selectedExtras,
            totalPrice: (product.price + selectedExtras.reduce((sum, e) => sum + e.price, 0))
        };

        dispatch(addToCart(itemToAdd));
        Alert.alert('Success', 'Item added to cart', [
            { text: 'Continue Shopping', onPress: () => navigation.goBack() },
            { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') }
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.content}>
                    <Text h3 style={[styles.title, { color: theme.colors.textPrimary }]}>{product.name}</Text>
                    <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{product.description}</Text>
                    <Text h4 style={[styles.price, { color: theme.colors.primary }]}>Base Price: R{product.price.toFixed(2)}</Text>

                    {product.sides && product.sides.length > 0 && (
                        <View style={styles.section}>
                            <Text h4 style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Sides (Choose up to 2)</Text>
                            {product.sides.map((side, index) => (
                                <CheckBox
                                    key={index}
                                    title={side}
                                    checked={selectedSides.includes(side)}
                                    onPress={() => handleSideToggle(side)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: theme.colors.textSecondary }}
                                    checkedColor={theme.colors.primary}
                                />
                            ))}
                        </View>
                    )}

                    {product.extras && product.extras.length > 0 && (
                        <View style={styles.section}>
                            <Text h4 style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Extras</Text>
                            {product.extras.map((extra, index) => (
                                <CheckBox
                                    key={index}
                                    title={`${extra.name} (+R${extra.price.toFixed(2)})`}
                                    checked={!!selectedExtras.find(e => e.name === extra.name)}
                                    onPress={() => handleExtraToggle(extra)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: theme.colors.textSecondary }}
                                    checkedColor={theme.colors.primary}
                                />
                            ))}
                        </View>
                    )}

                    <View style={styles.quantityContainer}>
                        <Text h4 style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <Icon
                                name="minus-circle"
                                type="font-awesome"
                                color={theme.colors.primary}
                                size={40}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            />
                            <Text style={[styles.quantityText, { color: theme.colors.textPrimary }]}>{quantity}</Text>
                            <Icon
                                name="plus-circle"
                                type="font-awesome"
                                color={theme.colors.primary}
                                size={40}
                                onPress={() => setQuantity(quantity + 1)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.footer, { 
                backgroundColor: theme.colors.cardBackground,
                borderTopColor: theme.colors.border 
            }]}>
                <Text style={[styles.totalText, { color: theme.colors.textPrimary }]}>Total: R{calculateTotal().toFixed(2)}</Text>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    buttonStyle={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                    titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    title: {
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginBottom: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 24,
        marginHorizontal: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        borderTopWidth: 1,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        width: 150,
        borderRadius: 20,
    },
});

export default ProductDetailsScreen;