import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { useTheme } from '../contexts/ThemeContext'; // CHANGED: Import useTheme hook

const ProductCard = ({ product, onPress }) => {
    const { theme } = useTheme(); // Now this will work

    return (
        <TouchableOpacity onPress={onPress}>
            <Card containerStyle={[styles.card, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                <Card.Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.content}>
                    <Text h4 style={[styles.title, { color: theme.colors.textPrimary }]}>{product.name}</Text>
                    <Text style={[styles.price, { color: theme.colors.primary }]}>R{product.price.toFixed(2)}</Text>
                    <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>{product.description}</Text>
                    <Button
                        title="View Details"
                        type="outline"
                        titleStyle={[styles.buttonTitle, { color: theme.colors.primary }]}
                        buttonStyle={[styles.button, { borderColor: theme.colors.primary }]}
                        onPress={onPress}
                    />
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 0,
        marginBottom: 15,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 150,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 10,
    },
    button: {
        borderRadius: 8,
    },
    buttonTitle: {
        // color will be inline
    }
});

export default ProductCard;