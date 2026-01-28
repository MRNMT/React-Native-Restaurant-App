import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Header, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../contexts/ThemeContext';
import { FirestoreService } from '../services/FirestoreService';

const HomeScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { theme, toggleTheme, isDarkMode } = useTheme();

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        try {
            const items = await FirestoreService.getFoodItems();
            setFoodItems(items);
        } catch (error) {
            console.error('Error loading food items:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique categories from food items and combine with default categories
    const allCategories = [
        { id: 'all', name: 'All' },
        ...CATEGORIES.slice(1), // Remove 'All' from mock data to avoid duplicates
        ...Array.from(new Set(foodItems.map(item => item.category)))
            .filter(category => category && !CATEGORIES.some(cat => cat.name === category))
            .map((category, index) => ({ id: `custom-${index}`, name: category }))
    ];

    const filteredItems = selectedCategory === 'All'
        ? foodItems
        : foodItems.filter(item => item.category === selectedCategory);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    };

    const renderCategoryItem = ({ item }) => (
        <Button
            title={item.name}
            type={selectedCategory === item.name ? 'solid' : 'outline'}
            containerStyle={styles.categoryBtnContainer}
            buttonStyle={[
                styles.categoryBtn,
                selectedCategory === item.name ? { backgroundColor: theme.colors.primary } : { borderColor: theme.colors.textSecondary }
            ]}
            titleStyle={[
                { fontSize: 14 },
                selectedCategory === item.name ? { color: '#000' } : { color: theme.colors.textSecondary }
            ]}
            onPress={() => setSelectedCategory(item.name)}
        />
    );

    const dynamicStyles = getDynamicStyles(theme);

    return (
        <View style={dynamicStyles.container}>
            <Header
                centerComponent={{ text: 'MENU', style: { color: theme.colors.textPrimary, fontSize: 18, fontWeight: 'bold' } }}
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        {user ? (
                            <Icon
                                name="user"
                                type="font-awesome"
                                color={theme.colors.textPrimary}
                                onPress={() => navigation.navigate('Profile')}
                                containerStyle={{ marginRight: 15 }}
                            />
                        ) : null}

                        <Icon
                            name="shopping-cart"
                            type="font-awesome"
                            color={theme.colors.textPrimary}
                            onPress={() => navigation.navigate('Cart')}
                            containerStyle={{ marginRight: 15 }}
                        />
                        <Icon
                            name={isDarkMode ? "sun-o" : "moon-o"}
                            type="font-awesome"
                            color={theme.colors.textPrimary}
                            onPress={toggleTheme}
                            containerStyle={{ marginRight: 15 }}
                        />
                        {user ? (
                            <Icon
                                name="sign-out"
                                type="font-awesome"
                                color={theme.colors.textPrimary}
                                onPress={handleLogout}
                            />
                        ) : (
                            <Icon
                                name="sign-in"
                                type="font-awesome"
                                color={theme.colors.textPrimary}
                                onPress={() => navigation.navigate('Login')}
                            />
                        )}
                    </View>
                }
                containerStyle={dynamicStyles.header}
                backgroundColor={theme.colors.cardBackground}
            />

            <View style={dynamicStyles.categoriesContainer}>
                <FlatList
                    data={allCategories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            <FlatList
                data={filteredItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.textSecondary }}>No items found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryBtnContainer: {
        marginHorizontal: 5,
        height: 40,
    },
    categoryBtn: {
        borderRadius: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
    },
    listContainer: {
        padding: 10,
        paddingBottom: 20,
    },
});

const getDynamicStyles = (theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    categoriesContainer: {
        paddingVertical: 10,
        backgroundColor: theme.colors.background,
    },
});

export default HomeScreen;
