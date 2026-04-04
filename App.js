import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProviderDetailsScreen from './src/screens/ProviderDetailsScreen';
import BookingScreen from './src/screens/BookingScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import { colors, radius } from './src/theme';

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

  useEffect(() => {
    setScreenStack([{ name: user ? 'Home' : 'Login', params: {} }]);
  }, [user]);

  const navigation = {
    navigate: (name, params = {}) => {
      setScreenStack((currentStack) => [...currentStack, { name, params }]);
    },
    goBack: () => {
      setScreenStack((currentStack) => (currentStack.length > 1 ? currentStack.slice(0, -1) : currentStack));
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

  return <CurrentScreen navigation={navigation} route={{ params: currentRoute.params }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}