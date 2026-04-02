import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { PlantProvider } from './src/context/PlantContext';
import RootNavigator from './src/navigation/RootNavigator';
// Notifications disabled for local development with Expo Go
// import { initializeNotifications } from './src/utils/notificationService';

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(true);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PlantProvider>
          <RootNavigator />
        </PlantProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
