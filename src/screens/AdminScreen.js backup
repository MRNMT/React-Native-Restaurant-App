import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Alert,
    SafeAreaView,
    StatusBar,
    TextInput,
    Modal,
    Dimensions,
    RefreshControl
} from 'react-native';
import { Text, Icon, Card, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { AuthService } from '../services/AuthService';
import { FirestoreService } from '../services/FirestoreService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const AdminScreen = ({ navigation }) => {
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const [adminUser, setAdminUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [refreshing, setRefreshing] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0
    });
    const [foodItems, setFoodItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [revenueByDay, setRevenueByDay] = useState([]);
    const [ordersByCategory, setOrdersByCategory] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        restaurantId: '',
        deliveryTime: '',
        address: '',
        rating: '4.0'
    });

    useEffect(() => {
        loadAdminData();
        const interval = setInterval(() => {
            loadAllData();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadAdminData = async () => {
        try {
            const user = await AuthService.getCurrentUser();
            if (user && user.role === 'admin') {
                setAdminUser(user);
                await loadAllData();
            } else {
                Alert.alert('Access Denied', 'You do not have admin privileges');
                navigation.replace('WelcomeScreen');
            }
        } catch (error) {
            console.error('Error loading admin data:', error);
        }
    };

    const loadAllData = async () => {
        try {
            const loadedUsers = await FirestoreService.getUsers();
            setUsers(loadedUsers);

            const loadedFoods = await FirestoreService.getFoodItems();
            setFoodItems(loadedFoods);

            const loadedRestaurants = await FirestoreService.getRestaurants();
            setRestaurants(loadedRestaurants);

            const loadedOrders = await FirestoreService.getOrders();
            setOrders(loadedOrders);

            calculateStatistics(loadedOrders, loadedUsers);
            calculateRevenueTrends(loadedOrders);
            calculateCategoryDistribution(loadedOrders, loadedFoods);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const calculateStatistics = (ordersList, usersList) => {
        const totalOrders = ordersList.length;
        const totalUsers = usersList.filter(u => u.role !== 'admin').length;
        
        const totalRevenue = ordersList.reduce((sum, order) => {
            return sum + (parseFloat(order.totalPrice) || 0);
        }, 0);
        
        const pendingOrders = ordersList.filter(o => 
            o.status === 'pending' || o.status === 'confirmed'
        ).length;
        
        const completedOrders = ordersList.filter(o => 
            o.status === 'delivered' || o.status === 'completed'
        ).length;
        
        const cancelledOrders = ordersList.filter(o => 
            o.status === 'cancelled'
        ).length;
        
        setStats({
            totalOrders,
            totalUsers,
            totalRevenue,
            pendingOrders,
            completedOrders,
            cancelledOrders
        });
    };

    const calculateRevenueTrends = (ordersList) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date;
        });
        
        const revenueByDayData = last7Days.map(date => {
            const dayOrders = ordersList.filter(order => {
                const orderDate = new Date(order.createdAt || order.timestamp);
                return orderDate.toDateString() === date.toDateString();
            });
            
            const dayRevenue = dayOrders.reduce((sum, order) => {
                return sum + (parseFloat(order.totalPrice) || 0);
            }, 0);
            
            return {
                day: days[date.getDay()],
                revenue: dayRevenue
            };
        });
        
        setRevenueByDay(revenueByDayData);
    };

    const calculateCategoryDistribution = (ordersList, foodList) => {
        const categoryCount = {};
        
        ordersList.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const foodItem = foodList.find(f => f.id === item.id || f.name === item.name);
                    const category = foodItem?.category || 'Other';
                    
                    categoryCount[category] = (categoryCount[category] || 0) + item.quantity;
                });
            }
        });
        
        setOrdersByCategory(categoryCount);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadAllData();
        setRefreshing(false);
    };

    const handleAddItem = async () => {
        try {
            if (modalType === 'food') {
                if (!formData.name || !formData.price || !formData.category) {
                    Alert.alert('Error', 'Please fill in all required fields');
                    return;
                }

                const newFood = {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    image: formData.image || 'https://via.placeholder.com/150',
                    restaurantId: formData.restaurantId,
                    rating: parseFloat(formData.rating) || 4.0,
                    available: true,
                    createdAt: new Date().toISOString()
                };

                await FirestoreService.addFoodItem(newFood);
                Alert.alert('Success', 'Food item added successfully');

            } else if (modalType === 'restaurant') {
                if (!formData.name) {
                    Alert.alert('Error', 'Please enter restaurant name');
                    return;
                }

                const newRestaurant = {
                    name: formData.name,
                    address: formData.address || 'No address provided',
                    rating: parseFloat(formData.rating) || 4.0,
                    deliveryTime: formData.deliveryTime || '30-40 min',
                    image: formData.image || 'https://via.placeholder.com/150',
                    cuisineType: formData.category || 'Mixed',
                    isOpen: true,
                    createdAt: new Date().toISOString()
                };

                await FirestoreService.addRestaurant(newRestaurant);
                Alert.alert('Success', 'Restaurant added successfully');
            }
            resetForm();
            await loadAllData();
        } catch (error) {
            console.error('Error adding item:', error);
            Alert.alert('Error', 'Failed to add item');
        }
    };

    const handleUpdateItem = async () => {
        try {
            if (modalType === 'food') {
                const updates = {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    image: formData.image || editingItem.image,
                    restaurantId: formData.restaurantId,
                    updatedAt: new Date().toISOString()
                };
                await FirestoreService.updateFoodItem(editingItem.id, updates);
                Alert.alert('Success', 'Food item updated successfully');

            } else if (modalType === 'restaurant') {
                const updates = {
                    name: formData.name,
                    address: formData.address,
                    deliveryTime: formData.deliveryTime,
                    image: formData.image || editingItem.image,
                    updatedAt: new Date().toISOString()
                };
                await FirestoreService.updateRestaurant(editingItem.id, updates);
                Alert.alert('Success', 'Restaurant updated successfully');
            }
            resetForm();
            await loadAllData();
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'Failed to update item');
        }
    };

    const handleDeleteItem = (id, type) => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (type === 'food') {
                                await FirestoreService.deleteFoodItem(id);
                            } else if (type === 'restaurant') {
                                await FirestoreService.deleteRestaurant(id);
                            }
                            Alert.alert('Success', 'Item deleted successfully');
                            await loadAllData();
                        } catch (error) {
                            console.error('Error deleting item:', error);
                            Alert.alert('Error', 'Failed to delete item');
                        }
                    }
                }
            ]
        );
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await FirestoreService.updateOrder(orderId, {
                status: newStatus,
                updatedAt: new Date().toISOString()
            });
            Alert.alert('Success', 'Order status updated');
            await loadAllData();
        } catch (error) {
            console.error('Error updating order:', error);
            Alert.alert('Error', 'Failed to update order status');
        }
    };

    const openAddModal = (type) => {
        setModalType(type);
        setEditingItem(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            restaurantId: '',
            deliveryTime: '30-40 min',
            address: '',
            rating: '4.0'
        });
        setShowAddModal(true);
    };

    const openEditModal = (item, type) => {
        setModalType(type);
        setEditingItem(item);
        setFormData({
            name: item.name || '',
            description: item.description || '',
            price: item.price?.toString() || '',
            category: item.category || item.cuisineType || '',
            image: item.image || '',
            restaurantId: item.restaurantId || '',
            deliveryTime: item.deliveryTime || '30-40 min',
            address: item.address || '',
            rating: item.rating?.toString() || '4.0'
        });
        setShowAddModal(true);
    };

    const resetForm = () => {
        setShowAddModal(false);
        setEditingItem(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            restaurantId: '',
            deliveryTime: '30-40 min',
            address: '',
            rating: '4.0'
        });
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AuthService.logout();
                            setShowProfileMenu(false);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'WelcomeScreen' }],
                            });
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    const revenueData = {
        labels: revenueByDay.map(d => d.day),
        datasets: [{
            data: revenueByDay.length > 0 
                ? revenueByDay.map(d => d.revenue) 
                : [0, 0, 0, 0, 0, 0, 0]
        }]
    };

    const orderStatusData = [
        { 
            name: 'Pending', 
            population: stats.pendingOrders, 
            color: '#FFA502', 
            legendFontColor: theme.colors.textPrimary 
        },
        { 
            name: 'Completed', 
            population: stats.completedOrders, 
            color: '#4ECDC4', 
            legendFontColor: theme.colors.textPrimary 
        },
        { 
            name: 'Cancelled', 
            population: stats.cancelledOrders, 
            color: '#FF6B6B', 
            legendFontColor: theme.colors.textPrimary 
        }
    ].filter(item => item.population > 0);

    const categoryData = {
        labels: Object.keys(ordersByCategory).length > 0 
            ? Object.keys(ordersByCategory).slice(0, 6)
            : ['No Data'],
        datasets: [{
            data: Object.keys(ordersByCategory).length > 0
                ? Object.values(ordersByCategory).slice(0, 6)
                : [1]
        }]
    };

    const chartConfig = {
        backgroundColor: theme.colors.cardBackground,
        backgroundGradientFrom: theme.colors.cardBackground,
        backgroundGradientTo: theme.colors.cardBackground,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(78, 205, 196, ${opacity})`,
        labelColor: (opacity = 1) => theme.colors.textSecondary,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#4ECDC4'
        }
    };

    const StatCard = ({ title, value, icon, color }) => (
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.statCardContent}>
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <Icon name={icon} type="font-awesome" color={color} size={24} />
                </View>
                <View style={styles.statTextContainer}>
                    <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
                        {value}
                    </Text>
                    <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>
                        {title}
                    </Text>
                </View>
            </View>
        </View>
    );

    const TabButton = ({ title, isActive, onPress }) => (
        <TouchableOpacity 
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
            onPress={onPress}
        >
            <Text style={[
                styles.tabButtonText, 
                { color: isActive ? '#FFFFFF' : theme.colors.textSecondary }
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    const renderDashboard = () => (
        <View>
            <View style={styles.statsContainer}>
                <StatCard 
                    title="Total Orders" 
                    value={stats.totalOrders} 
                    icon="shopping-cart" 
                    color="#FF6B6B" 
                />
                <StatCard 
                    title="Active Users" 
                    value={stats.totalUsers} 
                    icon="users" 
                    color="#4ECDC4" 
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`R${stats.totalRevenue.toFixed(2)}`} 
                    icon="dollar" 
                    color="#95E1D3" 
                />
                <StatCard 
                    title="Pending Orders" 
                    value={stats.pendingOrders} 
                    icon="clock-o" 
                    color="#FFA502" 
                />
            </View>

            {orders.length > 0 ? (
                <>
                    <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Text style={[styles.chartTitle, { color: theme.colors.textPrimary }]}>
                            Weekly Revenue (Real Data)
                        </Text>
                        <LineChart
                            data={revenueData}
                            width={screenWidth - 60}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </Card>

                    {orderStatusData.length > 0 && (
                        <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Text style={[styles.chartTitle, { color: theme.colors.textPrimary }]}>
                                Order Status Distribution
                            </Text>
                            <PieChart
                                data={orderStatusData}
                                width={screenWidth - 60}
                                height={220}
                                chartConfig={chartConfig}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute
                            />
                        </Card>
                    )}

                    {Object.keys(ordersByCategory).length > 0 && (
                        <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Text style={[styles.chartTitle, { color: theme.colors.textPrimary }]}>
                                Orders by Category
                            </Text>
                            <BarChart
                                data={categoryData}
                                width={screenWidth - 60}
                                height={220}
                                chartConfig={chartConfig}
                                style={styles.chart}
                                showValuesOnTopOfBars
                            />
                        </Card>
                    )}
                </>
            ) : (
                <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>
                        No order data available yet. Charts will appear when users place orders.
                    </Text>
                </Card>
            )}
        </View>
    );

    const renderFoodManagement = () => (
        <View>
            <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: '#4ECDC4' }]}
                onPress={() => openAddModal('food')}
            >
                <Icon name="plus" type="font-awesome" color="#FFFFFF" size={16} />
                <Text style={styles.addButtonText}>Add Food Item</Text>
            </TouchableOpacity>

            {foodItems.length > 0 ? (
                foodItems.map((item) => (
                    <Card key={item.id} containerStyle={[styles.itemCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.itemRow}>
                            <View style={styles.itemInfo}>
                                <Text style={[styles.itemName, { color: theme.colors.textPrimary }]}>
                                    {item.name}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    {item.category} - R{item.price?.toFixed(2)}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    {item.description}
                                </Text>
                            </View>
                            <View style={styles.itemActions}>
                                <TouchableOpacity onPress={() => openEditModal(item, 'food')} style={styles.actionButton}>
                                    <Icon name="edit" type="font-awesome" color="#4ECDC4" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteItem(item.id, 'food')} style={styles.actionButton}>
                                    <Icon name="trash" type="font-awesome" color="#FF6B6B" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                ))
            ) : (
                <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>
                        No food items added yet. Click "Add Food Item" to get started.
                    </Text>
                </Card>
            )}
        </View>
    );

    const renderRestaurantManagement = () => (
        <View>
            <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: '#FF6B6B' }]}
                onPress={() => openAddModal('restaurant')}
            >
                <Icon name="plus" type="font-awesome" color="#FFFFFF" size={16} />
                <Text style={styles.addButtonText}>Add Restaurant</Text>
            </TouchableOpacity>

            {restaurants.length > 0 ? (
                restaurants.map((item) => (
                    <Card key={item.id} containerStyle={[styles.itemCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.itemRow}>
                            <View style={styles.itemInfo}>
                                <Text style={[styles.itemName, { color: theme.colors.textPrimary }]}>
                                    {item.name}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    Rating: {item.rating} ⭐ - {item.deliveryTime}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    {item.address}
                                </Text>
                            </View>
                            <View style={styles.itemActions}>
                                <TouchableOpacity onPress={() => openEditModal(item, 'restaurant')} style={styles.actionButton}>
                                    <Icon name="edit" type="font-awesome" color="#4ECDC4" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteItem(item.id, 'restaurant')} style={styles.actionButton}>
                                    <Icon name="trash" type="font-awesome" color="#FF6B6B" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                ))
            ) : (
                <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>
                        No restaurants added yet. Click "Add Restaurant" to get started.
                    </Text>
                </Card>
            )}
        </View>
    );

    const renderOrders = () => (
        <View>
            <View style={styles.orderFilters}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                    Recent Orders ({orders.length})
                </Text>
            </View>

            {orders.length > 0 ? (
                orders
                    .sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp))
                    .map((order) => {
                        const user = users.find(u => u.id === order.userId);
                        return (
                            <Card key={order.id} containerStyle={[styles.itemCard, { backgroundColor: theme.colors.cardBackground }]}>
                                <View style={styles.orderHeader}>
                                    <Text style={[styles.itemName, { color: theme.colors.textPrimary }]}>
                                        Order #{order.id?.substring(0, 8)}
                                    </Text>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                                        <Text style={styles.statusText}>{order.status}</Text>
                                    </View>
                                </View>

                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    Customer: {user?.name || user?.email || 'Unknown'}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    Total: R{parseFloat(order.totalPrice || 0).toFixed(2)}
                                </Text>
                                <Text style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                    Date: {new Date(order.createdAt || order.timestamp).toLocaleString()}
                                </Text>

                                {order.items && order.items.length > 0 && (
                                    <View style={styles.orderItems}>
                                        <Text style={[styles.itemDetails, { color: theme.colors.textPrimary, fontWeight: 'bold' }]}>
                                            Items:
                                        </Text>
                                        {order.items.map((item, index) => (
                                            <Text key={index} style={[styles.itemDetails, { color: theme.colors.textSecondary }]}>
                                                • {item.name} x{item.quantity} - R{(item.price * item.quantity).toFixed(2)}
                                            </Text>
                                        ))}
                                    </View>
                                )}

                                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                    <View style={styles.orderActions}>
                                        <TouchableOpacity
                                            style={[styles.statusButton, { backgroundColor: '#4ECDC4' }]}
                                            onPress={() => handleUpdateOrderStatus(order.id, 'preparing')}
                                        >
                                            <Text style={styles.statusButtonText}>Preparing</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.statusButton, { backgroundColor: '#95E1D3' }]}
                                            onPress={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                        >
                                        <Text style={styles.statusButtonText}>Delivered</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.statusButton, { backgroundColor: '#FF6B6B' }]}
                                            onPress={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                                        >
                                            <Text style={styles.statusButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Card>
                        );
                    })
            ) : (
                <Card containerStyle={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>
                        No orders placed yet. Orders will appear here when customers place them.
                    </Text>
                </Card>
            )}
        </View>
    );

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return '#FFA502';
            case 'confirmed': return '#FFD93D';
            case 'preparing': return '#4ECDC4';
            case 'out for delivery': return '#95E1D3';
            case 'delivered': return '#4ECB71';
            case 'completed': return '#4ECB71';
            case 'cancelled': return '#FF6B6B';
            default: return '#A8A8A8';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>Admin Dashboard</Text>
                        <Text style={styles.headerSubtitle}>Welcome, {adminUser?.name || 'Admin'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowProfileMenu(true)} style={styles.profileButton}>
                        <Icon name="user-circle" type="font-awesome" color="#FFFFFF" size={32} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
                <TabButton title="Dashboard" isActive={activeTab === 'dashboard'} onPress={() => setActiveTab('dashboard')} />
                <TabButton title="Food Items" isActive={activeTab === 'food'} onPress={() => setActiveTab('food')} />
                <TabButton title="Restaurants" isActive={activeTab === 'restaurants'} onPress={() => setActiveTab('restaurants')} />
                <TabButton title="Orders" isActive={activeTab === 'orders'} onPress={() => setActiveTab('orders')} />
            </ScrollView>

            <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'food' && renderFoodManagement()}
                {activeTab === 'restaurants' && renderRestaurantManagement()}
                {activeTab === 'orders' && renderOrders()}
                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Profile Menu Modal */}
            <Modal
                visible={showProfileMenu}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowProfileMenu(false)}
            >
                <TouchableOpacity 
                    style={styles.profileModalOverlay} 
                    activeOpacity={1} 
                    onPress={() => setShowProfileMenu(false)}
                >
                    <View style={[styles.profileMenuContainer, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.profileHeader}>
                            <Icon name="user-circle" type="font-awesome" color={theme.colors.primary} size={60} />
                            <Text style={[styles.profileName, { color: theme.colors.textPrimary }]}>
                                {adminUser?.name || 'Admin'}
                            </Text>
                            <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>
                                {adminUser?.email || 'admin@fooddelivery.com'}
                            </Text>
                            <View style={[styles.adminBadge, { backgroundColor: theme.colors.primary }]}>
                                <Text style={styles.adminBadgeText}>Administrator</Text>
                            </View>
                        </View>

                        <View style={styles.profileMenuItems}>
                            <TouchableOpacity 
                                style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
                                onPress={() => {
                                    toggleTheme();
                                    setShowProfileMenu(false);
                                }}
                            >
                                <Icon 
                                    name={isDarkMode ? "sun-o" : "moon-o"} 
                                    type="font-awesome" 
                                    color={theme.colors.textPrimary} 
                                    size={24} 
                                />
                                <Text style={[styles.menuItemText, { color: theme.colors.textPrimary }]}>
                                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                                </Text>
                                <Icon name="chevron-right" type="font-awesome" color={theme.colors.textSecondary} size={16} />
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.menuItem, { borderBottomWidth: 0 }]}
                                onPress={handleLogout}
                            >
                                <Icon 
                                    name="sign-out" 
                                    type="font-awesome" 
                                    color="#FF6B6B" 
                                    size={24} 
                                />
                                <Text style={[styles.menuItemText, { color: '#FF6B6B' }]}>
                                    Logout
                                </Text>
                                <Icon name="chevron-right" type="font-awesome" color={theme.colors.textSecondary} size={16} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={[styles.closeButton, { backgroundColor: theme.colors.background }]}
                            onPress={() => setShowProfileMenu(false)}
                        >
                            <Text style={[styles.closeButtonText, { color: theme.colors.textPrimary }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Add/Edit Item Modal */}
            <Modal
                visible={showAddModal}
                animationType="slide"
                transparent={true}
                onRequestClose={resetForm}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalScrollView}>
                        <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
                            <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>
                                {editingItem ? 'Edit' : 'Add'} {modalType === 'food' ? 'Food Item' : 'Restaurant'}
                            </Text>

                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: theme.colors.background,
                                    color: theme.colors.textPrimary 
                                }]}
                                placeholder="Name *"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />

                            {modalType === 'food' ? (
                                <>
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Description"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.description}
                                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                                        multiline
                                        numberOfLines={3}
                                    />
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Price *"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.price}
                                        onChangeText={(text) => setFormData({ ...formData, price: text })}
                                        keyboardType="numeric"
                                    />
                                    <TextInput
                                        style={[styles.input, {
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary
                                        }]}
                                        placeholder="Category * (e.g., Fast Food, Italian, or create your own)"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.category}
                                        onChangeText={(text) => setFormData({ ...formData, category: text })}
                                    />
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Image URL (optional)"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.image}
                                        onChangeText={(text) => setFormData({ ...formData, image: text })}
                                    />
                                </>
                            ) : (
                                <>
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Address"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.address}
                                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                                    />
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Delivery Time (e.g., 30-40 min)"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.deliveryTime}
                                        onChangeText={(text) => setFormData({ ...formData, deliveryTime: text })}
                                    />
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Cuisine Type (e.g., Italian, Chinese)"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.category}
                                        onChangeText={(text) => setFormData({ ...formData, category: text })}
                                    />
                                    <TextInput
                                        style={[styles.input, { 
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.textPrimary 
                                        }]}
                                        placeholder="Image URL (optional)"
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={formData.image}
                                        onChangeText={(text) => setFormData({ ...formData, image: text })}
                                    />
                                </>
                            )}

                            <View style={styles.modalActions}>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={resetForm}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={editingItem ? handleUpdateItem : handleAddItem}
                                >
                                    <Text style={styles.buttonText}>{editingItem ? 'Update' : 'Save'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: 4,
    },
    profileButton: {
        padding: 8,
    },
    tabContainer: {
        paddingHorizontal: 20,
        marginTop: 15,
        maxHeight: 50,
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#E0E0E0',
    },
    tabButtonActive: {
        backgroundColor: '#4ECDC4',
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statCard: {
        width: '48%',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statTextContainer: {
        flex: 1,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statTitle: {
        fontSize: 12,
        marginTop: 2,
    },
    chartCard: {
        borderRadius: 15,
        marginTop: 15,
        padding: 15,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 14,
        padding: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 15,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    itemCard: {
        borderRadius: 12,
        marginBottom: 10,
        padding: 15,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDetails: {
        fontSize: 14,
        marginBottom: 3,
    },
    itemActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderItems: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    orderActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    statusButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 3,
        alignItems: 'center',
    },
    statusButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    orderFilters: {
        marginTop: 10,
    },
    profileModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileMenuContainer: {
        width: '85%',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileHeader: {
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
    },
    profileEmail: {
        fontSize: 14,
        marginTop: 5,
    },
    adminBadge: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 15,
        marginTop: 10,
    },
    adminBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileMenuItems: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
    },
    menuItemText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        fontWeight: '500',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalScrollView: {
        maxHeight: '90%',
    },
    modalContent: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#A8A8A8',
    },
    saveButton: {
        backgroundColor: '#4ECDC4',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomPadding: {
        height: 30,
    },
});

export default AdminScreen;