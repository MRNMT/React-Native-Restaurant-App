import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FirestoreService } from '../services/FirestoreService';
import { StorageService } from '../services/StorageService';
import ImagePicker from '../components/ImagePicker';
import MigrateDataButton from '../components/MigrateDataButton';
const WebAdminScreen = ({ navigation }) => {
  const themeContext = useTheme();
  
  // Safe theme access with fallback
  const colors = themeContext?.theme?.colors || themeContext?.colors || {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    primary: '#FF6B35',
    border: '#E0E0E0',
    textPlaceholder: '#999999',
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Dashboard stats
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  // Products state
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '',
    featured: false,
  });

  // Orders state
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Users state
  const [users, setUsers] = useState([]);

  // Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [productsData, ordersData, usersData] = await Promise.all([
        FirestoreService.getAllProducts(),
        FirestoreService.getAllOrders(),
        FirestoreService.getAllUsers(),
      ]);

      const pendingOrders = ordersData.filter(
        (order) => order.status === 'pending'
      ).length;

      const totalRevenue = ordersData
        .filter((order) => order.status === 'completed')
        .reduce((sum, order) => sum + (order.total || 0), 0);

      setStats({
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        totalUsers: usersData.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await FirestoreService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await FirestoreService.getAllOrders();
      setOrders(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error('Error loading orders:', error);
      Alert.alert('Error', 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await FirestoreService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price || !productForm.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock) || 0,
      };

      if (selectedProduct) {
        await FirestoreService.updateProduct(selectedProduct.id, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        await FirestoreService.addProduct(productData);
        Alert.alert('Success', 'Product added successfully');
      }

      setShowProductModal(false);
      resetProductForm();
      loadProducts();
      loadDashboardData();
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await FirestoreService.deleteProduct(productId);
              Alert.alert('Success', 'Product deleted successfully');
              loadProducts();
              loadDashboardData();
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await FirestoreService.updateOrderStatus(orderId, newStatus);
      Alert.alert('Success', 'Order status updated successfully');
      loadOrders();
      loadDashboardData();
      setShowOrderModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicked = async (imageUri) => {
    if (!imageUri) return;

    setLoading(true);
    try {
      const imageUrl = await StorageService.uploadImage(imageUri, 'products');
      setProductForm({ ...productForm, imageUrl });
      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      stock: '',
      featured: false,
    });
    setSelectedProduct(null);
  };

  const openEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      imageUrl: product.imageUrl || '',
      stock: product.stock?.toString() || '',
      featured: product.featured || false,
    });
    setShowProductModal(true);
  };

  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Dashboard Overview
      </Text>
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {stats.totalProducts}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Total Products
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {stats.totalOrders}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Total Orders
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {stats.totalUsers}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Total Users
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            R{stats.totalRevenue.toFixed(2)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Total Revenue
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: '#FF6B6B' }]}>
            {stats.pendingOrders}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Pending Orders
          </Text>
        </View>
      </View>
    </View>
  );

  const renderProducts = () => (
    <View style={styles.contentContainer}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Product Management
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            resetProductForm();
            setShowProductModal(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={[styles.tableHeader, { backgroundColor: colors.card }]}>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Image
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Name
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Category
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Price
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Stock
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Actions
            </Text>
          </View>
          {products.map((product) => (
            <View
              key={product.id}
              style={[styles.tableRow, { borderBottomColor: colors.border }]}
            >
              <Image
                source={{ uri: product.imageUrl || 'https://via.placeholder.com/50' }}
                style={styles.productImage}
              />
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {product.name}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {product.category}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                R{product.price?.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {product.stock || 0}
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                  onPress={() => openEditProduct(product)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#F44336' }]}
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderOrders = () => (
    <View style={styles.contentContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Order Management
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={[styles.tableHeader, { backgroundColor: colors.card }]}>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Order ID
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Customer
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Total
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Status
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Date
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Actions
            </Text>
          </View>
          {orders.map((order) => (
            <View
              key={order.id}
              style={[styles.tableRow, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {order.id.substring(0, 8)}...
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {order.userName || 'Unknown'}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                R{order.total?.toFixed(2)}
              </Text>
              <View style={[styles.statusBadge, getStatusColor(order.status)]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {order.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
              </Text>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
              >
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderUsers = () => (
    <View style={styles.contentContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        User Management
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={[styles.tableHeader, { backgroundColor: colors.card }]}>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Name
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Email
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Role
            </Text>
            <Text style={[styles.tableHeaderText, { color: colors.text }]}>
              Joined
            </Text>
          </View>
          {users.map((user) => (
            <View
              key={user.id}
              style={[styles.tableRow, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {user.name || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {user.email}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {user.role || 'user'}
              </Text>
              <Text style={[styles.tableCell, { color: colors.text }]}>
                {user.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: '#FFA726' };
      case 'processing':
        return { backgroundColor: '#42A5F5' };
      case 'completed':
        return { backgroundColor: '#66BB6A' };
      case 'cancelled':
        return { backgroundColor: '#EF5350' };
      default:
        return { backgroundColor: '#9E9E9E' };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Web Admin Dashboard
        </Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.logoutText, { color: colors.primary }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'dashboard' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'dashboard' ? colors.primary : colors.text },
            ]}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'products' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab('products')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'products' ? colors.primary : colors.text },
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'orders' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab('orders')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'orders' ? colors.primary : colors.text },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'users' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab('users')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'users' ? colors.primary : colors.text },
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {loading && activeTab === 'dashboard' ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'users' && renderUsers()}
          </>
        )}
      </ScrollView>

      {/* Product Modal */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProductModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedProduct ? 'Edit Product' : 'Add Product'}
            </Text>
            <ScrollView>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Product Name *"
                placeholderTextColor={colors.textSecondary}
                value={productForm.name}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, name: text })
                }
              />
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Description"
                placeholderTextColor={colors.textSecondary}
                value={productForm.description}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, description: text })
                }
                multiline
              />
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Price *"
                placeholderTextColor={colors.textSecondary}
                value={productForm.price}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, price: text })
                }
                keyboardType="decimal-pad"
              />
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Category *"
                placeholderTextColor={colors.textSecondary}
                value={productForm.category}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, category: text })
                }
              />
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Stock"
                placeholderTextColor={colors.textSecondary}
                value={productForm.stock}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, stock: text })
                }
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Image URL"
                placeholderTextColor={colors.textSecondary}
                value={productForm.imageUrl}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, imageUrl: text })
                }
              />
              <ImagePicker onImagePicked={handleImagePicked} />
              {productForm.imageUrl ? (
                <Image
                  source={{ uri: productForm.imageUrl }}
                  style={styles.previewImage}
                />
              ) : null}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.border }]}
                  onPress={() => {
                    setShowProductModal(false);
                    resetProductForm();
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleSaveProduct}
                  disabled={loading}
                >
                  <Text style={styles.modalButtonText}>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Order Modal */}
      <Modal
        visible={showOrderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Order Details
            </Text>
            {selectedOrder && (
              <ScrollView>
                <Text style={[styles.orderDetail, { color: colors.text }]}>
                  Order ID: {selectedOrder.id}
                </Text>
                <Text style={[styles.orderDetail, { color: colors.text }]}>
                  Customer: {selectedOrder.userName}
                </Text>
                <Text style={[styles.orderDetail, { color: colors.text }]}>
                  Total: R{selectedOrder.total?.toFixed(2)}
                </Text>
                <Text style={[styles.orderDetail, { color: colors.text }]}>
                  Status: {selectedOrder.status}
                </Text>
                <Text style={[styles.orderDetail, { color: colors.text }]}>
                  Date:{' '}
                  {selectedOrder.createdAt?.toDate?.().toLocaleString() || 'N/A'}
                </Text>

                <Text style={[styles.modalSubtitle, { color: colors.text }]}>
                  Items:
                </Text>
                {selectedOrder.items?.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Text style={[styles.orderItemText, { color: colors.text }]}>
                      {item.name} x {item.quantity}
                    </Text>
                    <Text style={[styles.orderItemText, { color: colors.text }]}>
                      R{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}

                <Text style={[styles.modalSubtitle, { color: colors.text }]}>
                  Update Status:
                </Text>
                <View style={styles.statusButtons}>
                  <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#FFA726' }]}
                    onPress={() =>
                      handleUpdateOrderStatus(selectedOrder.id, 'pending')
                    }
                  >
                    <Text style={styles.statusButtonText}>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#42A5F5' }]}
                    onPress={() =>
                      handleUpdateOrderStatus(selectedOrder.id, 'processing')
                    }
                  >
                    <Text style={styles.statusButtonText}>Processing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#66BB6A' }]}
                    onPress={() =>
                      handleUpdateOrderStatus(selectedOrder.id, 'completed')
                    }
                  >
                    <Text style={styles.statusButtonText}>Completed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#EF5350' }]}
                    onPress={() =>
                      handleUpdateOrderStatus(selectedOrder.id, 'cancelled')
                    }
                  >
                    <Text style={styles.statusButtonText}>Cancelled</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.border, marginTop: 15 }]}
                  onPress={() => setShowOrderModal(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dashboardContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: Platform.OS === 'web' ? '18%' : '48%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableContainer: {
    minWidth: Platform.OS === 'web' ? 1000 : 800,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Platform.OS === 'web' ? '50%' : '90%',
    maxHeight: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderItemText: {
    fontSize: 14,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WebAdminScreen;