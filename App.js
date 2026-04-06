import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProviderDetailsScreen from './src/screens/ProviderDetailsScreen';
import BookingScreen from './src/screens/BookingScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import { seedDemoUser } from './src/utils/storage';
import { colors, radius } from './src/theme';

const AUTH_SCREENS = new Set(['Login', 'Register']);

const screenMap = {
  Login: LoginScreen,
  Register: RegisterScreen,
  Home: HomeScreen,
  ProviderDetails: ProviderDetailsScreen,
  Booking: BookingScreen,
  Appointments: AppointmentsScreen,
};

function AppNavigator() {
  const { user, isBootstrapping } = useAuth();
  const [screenStack, setScreenStack] = useState([{ name: 'Login', params: {} }]);

  // Redirect based on auth state
  useEffect(() => {
    setScreenStack([{ name: user ? 'Home' : 'Login', params: {} }]);
  }, [user]);

  // Android hardware back button
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setScreenStack((stack) => {
        if (stack.length > 1) {
          return stack.slice(0, -1);
        }
        return stack;
      });
      return true;
    });
    return () => sub.remove();
  }, []);

  const navigation = {
    navigate: (name, params = {}) => {
      setScreenStack((stack) => {
        // Replace auth screens instead of stacking them
        if (AUTH_SCREENS.has(name)) {
          return [{ name, params }];
        }
        // Avoid duplicate top-of-stack (e.g. navigating to Appointments twice)
        const top = stack[stack.length - 1];
        if (top.name === name) {
          // Update params (e.g. successMessage refresh) but don't duplicate
          return [...stack.slice(0, -1), { name, params }];
        }
        return [...stack, { name, params }];
      });
    },
    goBack: () => {
      setScreenStack((stack) => (stack.length > 1 ? stack.slice(0, -1) : stack));
    },
    setOptions: () => {},
  };

  if (isBootstrapping) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <View style={{ paddingVertical: 18, paddingHorizontal: 22, borderRadius: radius.pill, backgroundColor: colors.surfaceElevated }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  const currentRoute = screenStack[screenStack.length - 1];
  const CurrentScreen = screenMap[currentRoute.name] || LoginScreen;

  return (
    <CurrentScreen
      navigation={navigation}
      route={{ params: currentRoute.params }}
      // Pass a key derived from params so screens re-mount when params change
      key={currentRoute.name === 'Appointments' ? JSON.stringify(currentRoute.params) : currentRoute.name}
    />
  );
}

export default function App() {
  useEffect(() => {
    seedDemoUser();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
