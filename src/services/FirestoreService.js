import { db } from './FirebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

export const FirestoreService = {
  // Products - reads from BOTH 'products' and 'foodItems' collections
  addProduct: async (product) => {
    try {
      const productData = {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      // Add to 'products' collection (new standard)
      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Product added to products collection:', docRef.id);
      return { id: docRef.id, ...productData };
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  getAllProducts: async () => {
    try {
      let products = [];
      
      // Try to get from 'products' collection first
      console.log('Fetching from products collection...');
      const productsSnapshot = await getDocs(collection(db, 'products'));
      products = productsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      // If no products, try 'foodItems' collection (legacy)
      if (products.length === 0) {
        console.log('No products found, trying foodItems collection...');
        const foodItemsSnapshot = await getDocs(collection(db, 'foodItems'));
        products = foodItemsSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          _source: 'foodItems' // Mark where it came from
        }));
      }
      
      console.log('Total products fetched:', products.length);
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  updateProduct: async (id, updates) => {
    try {
      // Try to update in 'products' collection first
      const productsDocRef = doc(db, 'products', id);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      try {
        await updateDoc(productsDocRef, updateData);
        console.log('Product updated in products collection:', id);
      } catch (error) {
        // If not found in products, try foodItems
        console.log('Not found in products, trying foodItems collection...');
        const foodItemsDocRef = doc(db, 'foodItems', id);
        await updateDoc(foodItemsDocRef, updateData);
        console.log('Product updated in foodItems collection:', id);
      }
      
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      // Try to delete from 'products' collection first
      try {
        await deleteDoc(doc(db, 'products', id));
        console.log('Product deleted from products collection:', id);
      } catch (error) {
        // If not found in products, try foodItems
        console.log('Not found in products, trying foodItems collection...');
        await deleteDoc(doc(db, 'foodItems', id));
        console.log('Product deleted from foodItems collection:', id);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Legacy method names for backward compatibility
  addFoodItem: async (foodItem) => {
    return FirestoreService.addProduct(foodItem);
  },

  getFoodItems: async () => {
    return FirestoreService.getAllProducts();
  },

  updateFoodItem: async (id, updates) => {
    return FirestoreService.updateProduct(id, updates);
  },

  deleteFoodItem: async (id) => {
    return FirestoreService.deleteProduct(id);
  },

  // Migration utility - copies all foodItems to products collection
  migrateFoodItemsToProducts: async () => {
    try {
      console.log('Starting migration from foodItems to products...');
      const foodItemsSnapshot = await getDocs(collection(db, 'foodItems'));
      let count = 0;
      
      for (const docSnapshot of foodItemsSnapshot.docs) {
        const data = docSnapshot.data();
        await addDoc(collection(db, 'products'), {
          ...data,
          originalId: docSnapshot.id,
          migratedAt: serverTimestamp()
        });
        count++;
      }
      
      console.log(`Migration complete! Migrated ${count} items.`);
      return count;
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  },

  // Restaurants
  addRestaurant: async (restaurant) => {
    try {
      const restaurantData = {
        ...restaurant,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'restaurants'), restaurantData);
      return { id: docRef.id, ...restaurantData };
    } catch (error) {
      console.error('Error adding restaurant:', error);
      throw error;
    }
  },

  getRestaurants: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting restaurants:', error);
      throw error;
    }
  },

  updateRestaurant: async (id, updates) => {
    try {
      const docRef = doc(db, 'restaurants', id);
      await updateDoc(docRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw error;
    }
  },

  deleteRestaurant: async (id) => {
    try {
      await deleteDoc(doc(db, 'restaurants', id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw error;
    }
  },

  // Orders
  addOrder: async (order) => {
    try {
      const orderData = {
        ...order,
        createdAt: serverTimestamp(),
        status: order.status || 'pending'
      };
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order added:', docRef.id);
      return { id: docRef.id, ...orderData };
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const orders = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      console.log('Fetched orders:', orders.length);
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  getOrders: async () => {
    return FirestoreService.getAllOrders();
  },

  updateOrder: async (id, updates) => {
    try {
      const docRef = doc(db, 'orders', id);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, updateData);
      console.log('Order updated:', id);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const docRef = doc(db, 'orders', id);
      await updateDoc(docRef, { 
        status,
        updatedAt: serverTimestamp()
      });
      console.log('Order status updated:', id, status);
      return { id, status };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      console.log('Order deleted:', id);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // Users
  addUser: async (user) => {
    try {
      const userData = {
        ...user,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'users'), userData);
      return { id: docRef.id, ...userData };
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      console.log('Fetched users:', users.length);
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  getUsers: async () => {
    return FirestoreService.getAllUsers();
  },

  updateUser: async (id, updates) => {
    try {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get user by email
  getUserByEmail: async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }
};