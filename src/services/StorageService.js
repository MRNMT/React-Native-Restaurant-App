import { storage } from './FirebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Storage paths
export const STORAGE_PATHS = {
  FOOD_ITEMS: 'foodItems',
  RESTAURANTS: 'restaurants',
  CATEGORIES: 'categories',
  USER_PROFILES: 'userProfiles'
};

export const StorageService = {
  // Upload image to Firebase Storage
  uploadImage: async (fileUri, path, fileName) => {
    try {
      // Create a reference to the file location
      const storageRef = ref(storage, `${path}/${fileName}`);

      // Convert URI to blob for React Native
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Upload the file
      const snapshot = await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      return {
        path: snapshot.ref.fullPath,
        url: downloadURL
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  // Upload food item image
  uploadFoodItemImage: async (fileUri, foodItemId) => {
    const fileName = `food_item_${foodItemId}_${Date.now()}.jpg`;
    return await StorageService.uploadImage(fileUri, STORAGE_PATHS.FOOD_ITEMS, fileName);
  },

  // Upload restaurant image
  uploadRestaurantImage: async (fileUri, restaurantId) => {
    const fileName = `restaurant_${restaurantId}_${Date.now()}.jpg`;
    return await StorageService.uploadImage(fileUri, STORAGE_PATHS.RESTAURANTS, fileName);
  },

  // Upload category image
  uploadCategoryImage: async (fileUri, categoryId) => {
    const fileName = `category_${categoryId}_${Date.now()}.jpg`;
    return await StorageService.uploadImage(fileUri, STORAGE_PATHS.CATEGORIES, fileName);
  },

  // Upload user profile image
  uploadUserProfileImage: async (fileUri, userId) => {
    const fileName = `profile_${userId}_${Date.now()}.jpg`;
    return await StorageService.uploadImage(fileUri, STORAGE_PATHS.USER_PROFILES, fileName);
  },

  // Delete image from Firebase Storage
  deleteImage: async (imagePath) => {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  },

  // Get download URL for an existing image path
  getImageUrl: async (imagePath) => {
    try {
      const imageRef = ref(storage, imagePath);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
    }
  },

  // Validate image file
  validateImage: (fileUri) => {
    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = fileUri.split('.').pop().toLowerCase();

    if (!supportedFormats.includes(fileExtension)) {
      throw new Error('Unsupported image format. Please use JPG, PNG, or GIF.');
    }

    return true;
  },

  // Compress image if needed (placeholder for future implementation)
  compressImage: async (fileUri, quality = 0.8) => {
    // This would use a library like react-native-image-resizer
    // For now, return the original URI
    console.log('Image compression not implemented yet');
    return fileUri;
  }
};

export default StorageService;
