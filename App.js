import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { PlantProvider } from './src/context/PlantContext';
import RootNavigator from './src/navigation/RootNavigator';
// Notifications disabled for local development with Expo Go
// import { initializeNotifications } from './src/utils/notificationService';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize fonts if needed
        await Font.loadAsync({
          // You can add custom fonts here if needed
        });

        // Notifications disabled for local development with Expo Go
        // await initializeNotifications();

        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

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
