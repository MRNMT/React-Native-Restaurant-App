import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { StorageService } from '../services/StorageService';
import { useTheme } from '../contexts/ThemeContext';

const ImagePickerComponent = ({
  onImageSelected,
  currentImage,
  placeholder = 'Select Image',
  type = 'general', // 'food', 'restaurant', 'profile', 'category'
  id = null
}) => {
  const { theme } = useTheme();
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadImage = async (fileUri) => {
    try {
      setUploading(true);

      // Validate image
      StorageService.validateImage(fileUri);

      // Upload based on type
      let uploadResult;
      switch (type) {
        case 'food':
          uploadResult = await StorageService.uploadFoodItemImage(fileUri, id || 'temp');
          break;
        case 'restaurant':
          uploadResult = await StorageService.uploadRestaurantImage(fileUri, id || 'temp');
          break;
        case 'profile':
          uploadResult = await StorageService.uploadUserProfileImage(fileUri, id || 'temp');
          break;
        case 'category':
          uploadResult = await StorageService.uploadCategoryImage(fileUri, id || 'temp');
          break;
        default:
          // General upload
          const fileName = `image_${Date.now()}.jpg`;
          uploadResult = await StorageService.uploadImage(fileUri, 'general', fileName);
      }

      // Call the callback with the result
      if (onImageSelected) {
        onImageSelected({
          path: uploadResult.path,
          url: uploadResult.url
        });
      }

      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.imageContainer,
          { borderColor: theme.colors.border, backgroundColor: theme.colors.cardBackground }
        ]}
        onPress={showImageOptions}
        disabled={uploading}
      >
        {currentImage ? (
          <Image source={{ uri: currentImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Icon
              name="camera"
              type="font-awesome"
              color={theme.colors.textSecondary}
              size={40}
            />
            <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
              {uploading ? 'Uploading...' : placeholder}
            </Text>
          </View>
        )}

        {uploading && (
          <View style={styles.overlay}>
            <Icon
              name="spinner"
              type="font-awesome"
              color="#FFFFFF"
              size={30}
            />
          </View>
        )}
      </TouchableOpacity>

      {currentImage && (
        <TouchableOpacity
          style={[styles.changeButton, { backgroundColor: theme.colors.primary }]}
          onPress={showImageOptions}
          disabled={uploading}
        >
          <Text style={styles.changeButtonText}>
            {uploading ? 'Uploading...' : 'Change Image'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  changeButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ImagePickerComponent;
