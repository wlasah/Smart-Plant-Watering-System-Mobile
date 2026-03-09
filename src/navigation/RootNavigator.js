import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAppHooks';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PlantListScreen from '../screens/PlantListScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import AddPlantScreen from '../screens/AddPlantScreen';
import CareGuideScreen from '../screens/CareGuideScreen';
import CareScheduleScreen from '../screens/CareScheduleScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: 'white' },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DashboardHome" component={DashboardScreen} />
    <Stack.Screen
      name="PlantDetail"
      component={PlantDetailScreen}
      options={{ animationEnabled: true }}
    />
  </Stack.Navigator>
);

const PlantsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="PlantListHome" component={PlantListScreen} />
    <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
    <Stack.Screen name="AddPlant" component={AddPlantScreen} />
  </Stack.Navigator>
);

const AppStack = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Plants"
        component={PlantsStack}
        options={{
          tabBarLabel: 'Plants',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🌱</Text>,
        }}
      />
      <Tab.Screen
        name="CareGuide"
        component={CareGuideScreen}
        options={{
          tabBarLabel: 'Guide',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🌿</Text>,
        }}
      />
      <Tab.Screen
        name="CareSchedule"
        component={CareScheduleScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🗓️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return null; // Show splash screen here if needed
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

// Helper for tab bar icons
const Text = ({ style, children }) => {
  const React = require('react');
  return React.createElement(require('react-native').Text, { style }, children);
};

export default RootNavigator;
