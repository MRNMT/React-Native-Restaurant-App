import { auth, db } from './FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Simulate delay for better UX
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthService = {
  register: async (userData) => {
    await delay(1000);
    try {
      // Prevent registration for admin
      if (userData.email.toLowerCase() === 'admin@fooddelivery.com') {
        throw new Error('Admin account cannot be registered. Please contact support.');
      }

      // Check if user already exists in Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', userData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error('User already exists');
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Save user data to Firestore
      const newUser = {
        uid: userCredential.user.uid,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        contact: userData.contact,
        address: userData.address,
        cardNumber: userData.cardNumber || '',
        role: 'user',
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);

      return newUser;
    } catch (error) {
      // Handle Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('User already exists');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      }
      throw error;
    }
  },

  login: async (email, password) => {
    await delay(1000);
    try {
      // Special handling for admin login
      if (email.toLowerCase() === 'admin@fooddelivery.com') {
        if (password === 'admin123') {
          // Check if admin exists in Firestore
          const adminDoc = await getDoc(doc(db, 'users', 'admin'));
          if (adminDoc.exists()) {
            return adminDoc.data();
          } else {
            // Create admin user if not exists
            const adminUser = {
              uid: 'admin',
              email: 'admin@fooddelivery.com',
              name: 'Admin',
              surname: 'User',
              role: 'admin',
              createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', 'admin'), adminUser);
            return adminUser;
          }
        } else {
          throw new Error('Invalid credentials');
        }
      }

      // Regular user login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      // Handle Firebase errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid credentials');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  },

  getCurrentUser: async () => {
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe();
          if (user) {
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              resolve(userDoc.data());
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  updateProfile: async (updatedData) => {
    await delay(500);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');

      // Update user data in Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        ...updatedData,
        updatedAt: new Date().toISOString()
      });

      // Get updated user data
      const updatedDoc = await getDoc(userRef);
      return updatedDoc.data();
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Failed to update profile');
    }
  }
};
