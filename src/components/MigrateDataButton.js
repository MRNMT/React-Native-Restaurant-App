import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { FirestoreService } from '../services/FirestoreService';

const MigrateDataButton = ({ onMigrateComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleMigrate = async () => {
    Alert.alert(
      'Migrate Data',
      'This will copy all items from foodItems to products collection. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Migrate',
          onPress: async () => {
            setLoading(true);
            try {
              const count = await FirestoreService.migrateFoodItemsToProducts();
              Alert.alert(
                'Success', 
                `Successfully migrated ${count} items from foodItems to products collection!`
              );
              if (onMigrateComplete) onMigrateComplete();
            } catch (error) {
              console.error('Error migrating data:', error);
              Alert.alert('Error', 'Failed to migrate data: ' + error.message);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={handleMigrate}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>🔄 Migrate Data</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MigrateDataButton;