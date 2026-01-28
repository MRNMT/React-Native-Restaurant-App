import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/contexts/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import WebAdminScreen from './src/screens/WebAdminScreen';

export default function App() {
  // For web, check if we're on the admin path
  if (Platform.OS === 'web' && window.location.pathname === '/admin') {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <WebAdminScreen />
        </ThemeProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
