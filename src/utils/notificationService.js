import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const initializeNotifications = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Notification permissions not granted');
      return;
    }
    console.log('Notifications initialized');
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

export const schedulePlantReminder = async (plant) => {
  try {
    // Schedule notification for next watering time (e.g., 7 days from last watering)
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered.getTime() + 7 * 24 * 60 * 60 * 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Time to water ${plant.name}! 💧`,
        body: `Your ${plant.name} in ${plant.location} is looking dry`,
        badge: 1,
      },
      trigger: {
        date: nextWatering,
      },
    });

    await AsyncStorage.setItem(`reminder_${plant.id}`, nextWatering.toISOString());
    return { success: true };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return { success: false, error: error.message };
  }
};

export const cancelPlantReminder = async (plantId) => {
  try {
    const reminders = await Notifications.getAllScheduledNotificationsAsync();
    const toCancel = reminders.filter(r => 
      r.content?.body?.includes(plantId)
    );
    
    for (const reminder of toCancel) {
      await Notifications.cancelScheduledNotificationAsync(reminder.identifier);
    }
    
    await AsyncStorage.removeItem(`reminder_${plantId}`);
    return { success: true };
  } catch (error) {
    console.error('Error canceling notification:', error);
    return { success: false, error: error.message };
  }
};

export const sendTestNotification = async () => {
  try {
    await Notifications.presentNotificationAsync({
      title: 'Welcome to Smart Plant! 🌱',
      body: 'Tap to start managing your plants',
      badge: 1,
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
  }
};

export const setupDailyReminders = async (plants) => {
  try {
    // Clear all existing reminders
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule reminders for plants needing water
    for (const plant of plants) {
      if (plant.moisture <= 40) {
        await schedulePlantReminder(plant);
      }
    }
  } catch (error) {
    console.error('Error setting up daily reminders:', error);
  }
};
