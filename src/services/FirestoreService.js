import { db } from './FirebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export const FirestoreService = {
  // Food Items
  addFoodItem: async (foodItem) => {
    try {
      const docRef = await addDoc(collection(db, 'foodItems'), foodItem);
      return { id: docRef.id, ...foodItem };
    } catch (error) {
      console.error('Error adding food item:', error);
      throw error;
    }
  },

  getFoodItems: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'foodItems'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting food items:', error);
      throw error;
    }
  },

  updateFoodItem: async (id, updates) => {
    try {
      const docRef = doc(db, 'foodItems', id);
      await updateDoc(docRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  },

  deleteFoodItem: async (id) => {
    try {
      await deleteDoc(doc(db, 'foodItems', id));
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  },

  // Restaurants
  addRestaurant: async (restaurant) => {
    try {
      const docRef = await addDoc(collection(db, 'restaurants'), restaurant);
      return { id: docRef.id, ...restaurant };
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
      const docRef = await addDoc(collection(db, 'orders'), order);
      return { id: docRef.id, ...order };
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  updateOrder: async (id, updates) => {
    try {
      const docRef = doc(db, 'orders', id);
      await updateDoc(docRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Users
  getUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }
};
