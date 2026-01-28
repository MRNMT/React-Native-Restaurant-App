// Database Migration Scripts for FoodDeliveryApp
// This file contains scripts to initialize and migrate data to Firestore

import { db } from '../services/FirebaseConfig';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import { FOOD_ITEMS, CATEGORIES } from '../data/mockData';

// Migration to initialize categories in Firestore
export const initializeCategories = async () => {
  try {
    const batch = writeBatch(db);

    CATEGORIES.forEach(category => {
      const categoryRef = doc(collection(db, 'categories'), category.id);
      batch.set(categoryRef, {
        ...category,
        createdAt: new Date()
      });
    });

    await batch.commit();
    console.log('Categories initialized successfully');
  } catch (error) {
    console.error('Error initializing categories:', error);
    throw error;
  }
};

// Migration to initialize food items in Firestore
export const initializeFoodItems = async () => {
  try {
    const batch = writeBatch(db);

    FOOD_ITEMS.forEach(item => {
      const itemRef = doc(collection(db, 'foodItems'), item.id);
      batch.set(itemRef, {
        ...item,
        restaurantId: 'restaurant_1', // Default restaurant
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await batch.commit();
    console.log('Food items initialized successfully');
  } catch (error) {
    console.error('Error initializing food items:', error);
    throw error;
  }
};

// Migration to initialize default restaurant
export const initializeRestaurants = async () => {
  try {
    const restaurantData = {
      id: 'restaurant_1',
      name: 'Burger Palace',
      address: '456 Food Street, City Center, South Africa',
      rating: 4.2,
      deliveryTime: '30-40 min',
      image: 'https://via.placeholder.com/300x200?text=Burger+Palace',
      cuisineType: 'American',
      isOpen: true,
      location: {
        latitude: -26.2041,
        longitude: 28.0473
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'restaurants', 'restaurant_1'), restaurantData);
    console.log('Default restaurant initialized successfully');
  } catch (error) {
    console.error('Error initializing restaurant:', error);
    throw error;
  }
};

// Migration to create admin user (if not exists)
export const initializeAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminQuery = query(
      collection(db, 'users'),
      where('role', '==', 'admin')
    );
    const adminSnapshot = await getDocs(adminQuery);

    if (!adminSnapshot.empty) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminData = {
      uid: 'admin',
      name: 'Admin',
      surname: 'User',
      email: 'admin@fooddelivery.com',
      contact: '+27123456789',
      address: 'Admin Office, Food Delivery HQ',
      cardNumber: '',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'users', 'admin'), adminData);
    console.log('Admin user initialized successfully');
  } catch (error) {
    console.error('Error initializing admin user:', error);
    throw error;
  }
};

// Run all initial migrations
export const runInitialMigrations = async () => {
  try {
    console.log('Starting database migrations...');

    await initializeCategories();
    await initializeRestaurants();
    await initializeFoodItems();
    await initializeAdminUser();

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

// Migration to migrate AsyncStorage users to Firestore
export const migrateAsyncStorageUsers = async () => {
  try {
    // This would be called from a component that has access to AsyncStorage
    // For now, this is a placeholder function
    console.log('AsyncStorage user migration not implemented yet');
    console.log('This should be called after Firebase Auth migration is complete');
  } catch (error) {
    console.error('Error migrating AsyncStorage users:', error);
    throw error;
  }
};

// Migration to migrate AsyncStorage orders to Firestore
export const migrateAsyncStorageOrders = async () => {
  try {
    // This would be called from a component that has access to AsyncStorage
    // For now, this is a placeholder function
    console.log('AsyncStorage orders migration not implemented yet');
    console.log('This should be called after user migration is complete');
  } catch (error) {
    console.error('Error migrating AsyncStorage orders:', error);
    throw error;
  }
};

// Utility function to check if database is initialized
export const checkDatabaseInitialization = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const foodItemsSnapshot = await getDocs(collection(db, 'foodItems'));
    const restaurantsSnapshot = await getDocs(collection(db, 'restaurants'));

    return {
      categoriesInitialized: !categoriesSnapshot.empty,
      foodItemsInitialized: !foodItemsSnapshot.empty,
      restaurantsInitialized: !restaurantsSnapshot.empty
    };
  } catch (error) {
    console.error('Error checking database initialization:', error);
    return {
      categoriesInitialized: false,
      foodItemsInitialized: false,
      restaurantsInitialized: false
    };
  }
};

export default {
  initializeCategories,
  initializeFoodItems,
  initializeRestaurants,
  initializeAdminUser,
  runInitialMigrations,
  migrateAsyncStorageUsers,
  migrateAsyncStorageOrders,
  checkDatabaseInitialization
};
