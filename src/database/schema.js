export const FOOD_ITEM_SCHEMA = {
  id: 'string (auto-generated)',
  name: 'string',
  description: 'string',
  price: 'number',
  category: 'string',
  image: 'string (URL)',
  restaurantId: 'string (reference to restaurants.id)',
  rating: 'number',
  available: 'boolean',
  sides: 'array of strings',
  extras: 'array of objects',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};
=======
// Food Items Collection Schema
export const FOOD_ITEM_SCHEMA = {
  id: 'string (auto-generated)',
  name: 'string',
  description: 'string',
  price: 'number',
  category: 'string',
  image: 'string (Firebase Storage path or URL)',
  imageUrl: 'string (download URL from Firebase Storage)',
  restaurantId: 'string (reference to restaurants.id)',
  rating: 'number',
  available: 'boolean',
  sides: 'array of strings',
  extras: 'array of objects',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};
