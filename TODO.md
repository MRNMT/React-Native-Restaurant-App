- [ ] Set up Firebase project and install dependencies
- [ ] Configure Firebase in the app
- [ ] Create Firestore collections (users, orders, food_items, restaurants, reviews)
- [ ] Migrate AuthService to use Firebase Auth
- [ ] Migrate data from AsyncStorage to Firestore
- [ ] Implement real-time listeners for data updates
- [ ] Update Redux slices to work with Firebase

## Phase 2: Payment Integration
- [ ] Install Stripe SDK
- [ ] Set up Stripe account and API keys
- [ ] Create payment service
- [ ] Update CheckoutScreen with real payment processing
- [ ] Handle payment success/failure scenarios
- [ ] Store payment information securely

## Phase 3: Order Tracking
- [ ] Create OrderTrackingScreen
- [ ] Add detailed order statuses (pending, confirmed, preparing, out for delivery, delivered, cancelled)
- [ ] Implement real-time order status updates
- [ ] Add delivery progress tracking
- [ ] Update AdminScreen to manage order statuses
- [ ] Add order history for users

## Phase 4: Additional Features
- [ ] Push Notifications with Expo
  - [ ] Install expo-notifications
  - [ ] Request notification permissions
  - [ ] Send notifications for order updates
- [ ] Review/Rating System
  - [ ] Create ReviewScreen component
  - [ ] Add rating functionality to ProductDetailsScreen
  - [ ] Store reviews in Firestore
  - [ ] Display ratings in food item cards
- [ ] Restaurant Location Services
  - [ ] Install react-native-maps or expo-location
  - [ ] Add location data to restaurants
  - [ ] Create MapScreen for restaurant locations
  - [ ] Add GPS functionality for delivery tracking

## Phase 5: Testing & Polish
- [ ] Test all new features thoroughly
- [ ] Update UI components as needed
- [ ] Add error handling and loading states
- [ ] Optimize performance
- [ ] Update README with new features
- [ ] Add proper error boundaries

## Phase 6: Web CMS
- [x] Create WebAdminScreen component with Material-UI
- [x] Integrate web admin screen into the app for web platform
- [x] Add navigation to web admin at /admin path

## Current Status
- Starting with Phase 1: Firebase Integration
=======
## Phase 1: Firebase Integration (Backend)
- [x] Set up Firebase project and install dependencies
- [x] Configure Firebase in the app
- [x] Create Firestore collections (users, orders, food_items, restaurants, reviews)
- [x] Migrate AuthService to use Firebase Auth
- [x] Set up Firebase Storage for image uploads
- [x] Create StorageService for handling image uploads
- [x] Create ImagePicker component for easy image selection
- [x] Admin-added items are now displayed to all customers (HomeScreen fetches from Firestore)
- [x] Admin can create custom categories for food items, which are visible to all customers alongside existing categories
- [ ] Migrate data from AsyncStorage to Firestore
- [ ] Implement real-time listeners for data updates
- [ ] Update Redux slices to work with Firebase

## Phase 2: Payment Integration
- [ ] Install Stripe SDK
- [ ] Set up Stripe account and API keys
- [ ] Create payment service
- [ ] Update CheckoutScreen with real payment processing
- [ ] Handle payment success/failure scenarios
- [ ] Store payment information securely

## Phase 3: Order Tracking
- [ ] Create OrderTrackingScreen
- [ ] Add detailed order statuses (pending, confirmed, preparing, out for delivery, delivered, cancelled)
- [ ] Implement real-time order status updates
- [ ] Add delivery progress tracking
- [ ] Update AdminScreen to manage order statuses
- [ ] Add order history for users

## Phase 4: Additional Features
- [ ] Push Notifications with Expo
  - [ ] Install expo-notifications
  - [ ] Request notification permissions
  - [ ] Send notifications for order updates
- [ ] Review/Rating System
  - [ ] Create ReviewScreen component
  - [ ] Add rating functionality to ProductDetailsScreen
  - [ ] Store reviews in Firestore
  - [ ] Display ratings in food item cards
- [ ] Restaurant Location Services
  - [ ] Install react-native-maps or expo-location
  - [ ] Add location data to restaurants
  - [ ] Create MapScreen for restaurant locations
  - [ ] Add GPS functionality for delivery tracking

## Phase 5: Testing & Polish
- [ ] Test all new features thoroughly
- [ ] Update UI components as needed
- [ ] Add error handling and loading states
- [ ] Optimize performance
- [ ] Update README with new features
- [ ] Add proper error boundaries

## Current Status
- Phase 1: Firebase Integration - Storage setup complete, need to migrate data and update Redux
