# Food Delivery App

A modern, user-friendly food delivery mobile application built with React Native and Expo. This app allows users to browse restaurants, order food, manage their cart, and track deliveries with a seamless experience.

## Features

- **User Authentication**: Secure login and registration system with Firebase Authentication
- **Restaurant Browsing**: Explore various food categories and restaurants
- **Food Ordering**: Add items to cart, customize orders, and place orders
- **Cart Management**: View, edit, and manage cart items
- **Order Tracking**: Track order status and delivery progress
- **User Profile**: Manage personal information and order history
- **Admin Panel**: Administrative features for managing the app
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Optimized for mobile devices
- **Cloud Storage**: Firebase Storage for product images and user uploads
- **Real-time Database**: Firestore for real-time data synchronization

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Styling**: React Native Elements, Custom Theme
- **Icons**: React Native Vector Icons
- **Async Storage**: For local data persistence
- **Linear Gradient**: For UI enhancements
- **Database**: SQLite (local), Firestore (cloud)

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)
- Firebase account with a project set up

## Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Analytics (optional)

2. **Enable Firebase Services**:
   - **Authentication**: Enable Email/Password authentication
   - **Firestore Database**: Create a Firestore database in production mode
   - **Storage**: Enable Firebase Storage for image uploads

3. **Get Firebase Configuration**:
   - In Project Settings, find your web app configuration
   - Copy the configuration object (apiKey, authDomain, etc.)

4. **Set up Firestore Security Rules** (optional but recommended):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /products/{productId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /orders/{orderId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/food-delivery-app.git
   cd food-delivery-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory of the project:
   ```bash
   touch .env
   ```

   Add your Firebase configuration to the `.env` file:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   **Important**: 
   - Never commit the `.env` file to version control
   - The `.env` file is already included in `.gitignore`
   - Replace all placeholder values with your actual Firebase credentials

4. **Install additional required packages**:
   ```bash
   npm install expo-image-picker
   npm install firebase
   npm install @react-native-async-storage/async-storage
   npm install expo-sqlite
   ```

5. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

6. **Run on device/emulator**:
   - For Android: Press `a` in the terminal or use Expo Go app
   - For iOS: Press `i` in the terminal (macOS only) or use Expo Go app
   - For web: Press `w` in the terminal

## Project Structure

```
food-delivery-app/
├── assets/                    # Static assets (images, icons)
│   ├── adaptive-icon.png      # Adaptive icon for Android
│   ├── crave and click logo.png # App logo
│   ├── favicon.png            # Web favicon
│   ├── icon.png               # App icon
│   └── splash-icon.png        # Splash screen icon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ImagePicker.js     # Image picker component
│   │   ├── MigrateDataButton.js # Data migration utility
│   │   └── ProductCard.js     # Product display component
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.js    # Theme management context
│   ├── data/                  # Mock data and constants
│   │   └── mockData.js        # Sample data for development
│   ├── database/              # Database configuration
│   │   ├── migrations.js      # Database migration scripts
│   │   ├── schema.js          # SQLite schema definitions
│   │   └── seedData.js        # Seed data for local database
│   ├── navigation/            # Navigation configuration
│   │   └── RootNavigator.js   # Main app navigator
│   ├── redux/                 # Redux state management
│   │   ├── authSlice.js       # Authentication state
│   │   ├── cartSlice.js       # Shopping cart state
│   │   └── store.js           # Redux store configuration
│   ├── screens/               # App screens
│   │   ├── WelcomeScreen.js   # Welcome/onboarding screen
│   │   ├── LoginScreen.js     # User login screen
│   │   ├── RegisterScreen.js  # User registration screen
│   │   ├── HomeScreen.js      # Main app screen with food categories
│   │   ├── ProductDetailsScreen.js # Individual product details
│   │   ├── CartScreen.js      # Shopping cart screen
│   │   ├── CheckoutScreen.js  # Order checkout screen
│   │   ├── ProfileScreen.js   # User profile management
│   │   ├── AdminScreen.js     # Admin panel (mobile)
│   │   ├── AdminLoginScreen.js # Admin authentication
│   │   └── WebAdminScreen.js  # Admin panel (web)
│   ├── services/              # API services and utilities
│   │   ├── AuthService.js     # Authentication service
│   │   ├── FirebaseConfig.js  # Firebase configuration
│   │   ├── FirestoreService.js # Firestore database service
│   │   └── StorageService.js  # Firebase Storage service
│   └── theme.js               # App theme configuration
├── .env                       # Environment variables (not in repo)
├── .gitignore                 # Git ignore file
├── App.js                     # Main app component
├── app.json                   # Expo configuration
├── index.js                   # App entry point
├── package.json               # Project dependencies
├── seed.js                    # Database seeding script
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Usage

1. **Launch the app** and you'll see the welcome screen
2. **Register** a new account or **login** with existing credentials
   - **Admin Login**: Use email `admin@fooddelivery.com` and password `admin123` to access admin features
3. **Browse** different food categories on the home screen
4. **Tap** on any food item to view details and add to cart
5. **Manage** your cart by adding/removing items
6. **Proceed to checkout** to place your order
7. **Track** your order status in the profile section
8. **Toggle** between dark and light themes using the sun/moon icon
9. **Admin Features**: Admin users can access the admin dashboard from their profile to manage the app

## Environment Variables

The app requires the following environment variables to be set in your `.env` file:

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Yes |
| `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase Measurement ID | No |

**Note**: All environment variables in Expo must be prefixed with `EXPO_PUBLIC_` to be accessible in the app.

## Database

The app uses a hybrid database approach:

- **SQLite**: For local data persistence and offline functionality
- **Firestore**: For cloud synchronization and real-time updates

### Running Database Migrations

To set up the local database:

```bash
node seed.js
```

This will create the necessary SQLite tables and seed initial data.

## Firebase Hosting

The app's backend is hosted on Firebase, providing:

- **Authentication**: User management and secure login
- **Firestore**: Real-time database for products, orders, and user data
- **Storage**: Cloud storage for product images and user uploads
- **Hosting**: (Optional) Web admin panel hosting

## Deployment

### Building for Production

1. **Android**:
   ```bash
   eas build --platform android
   ```

2. **iOS**:
   ```bash
   eas build --platform ios
   ```

3. **Web** (Admin Panel):
   ```bash
   expo export:web
   firebase deploy --only hosting
   ```

## Troubleshooting

### Firebase Connection Issues
- Verify your `.env` file contains the correct Firebase credentials
- Ensure Firebase services (Auth, Firestore, Storage) are enabled in your Firebase console
- Check that your Firebase security rules allow the necessary operations

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`
- Verify all dependencies are installed: `npm install`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React Native and Expo
- Backend powered by Firebase
- Icons provided by React Native Vector Icons
- UI components from React Native Elements
- State management with Redux Toolkit

## Design

Figma Design: [Food Delivery App](https://www.figma.com/design/raBIWLIVMaP5mxA4PUvcjO/foodDelivery?m=auto&t=0oPvElShgu3Et1yZ-6)

## Contact

For questions or support, please open an issue on GitHub or contact the development team.

---

**Note**: Remember to keep your Firebase credentials secure and never commit your `.env` file to version control.
