import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);

  // Initialize with demo data
  useEffect(() => {
    const initializePlants = async () => {
      try {
        const storedPlants = await AsyncStorage.getItem('plants');
        if (storedPlants) {
          setPlants(JSON.parse(storedPlants));
        } else {
          // Demo data for first-time users
          const demoPlants = [
            {
              id: '1',
              name: 'Monstera Deliciosa',
              location: 'Living Room',
              type: 'Tropical Plant',
              moisture: 45,
              lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              wateringHistory: [],
              careRequirements: {
                waterFrequency: 'Every 7 days',
                lightRequirement: 'Bright indirect light',
                temperature: '68-86°F',
              },
            },
            {
              id: '2',
              name: 'Pothos Golden',
              location: 'Bedroom',
              type: 'Vine',
              moisture: 35,
              lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              wateringHistory: [],
              careRequirements: {
                waterFrequency: 'Every 5 days',
                lightRequirement: 'Low to bright indirect light',
                temperature: '65-75°F',
              },
            },
            {
              id: '3',
              name: 'Snake Plant',
              location: 'Office',
              type: 'Succulent',
              moisture: 25,
              lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              wateringHistory: [],
              careRequirements: {
                waterFrequency: 'Every 14 days',
                lightRequirement: 'Low to bright light',
                temperature: '60-75°F',
              },
            },
          ];
          
          await AsyncStorage.setItem('plants', JSON.stringify(demoPlants));
          setPlants(demoPlants);
        }
      } catch (error) {
        console.error('Error loading plants:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePlants();
  }, []);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem('reminders');
        if (storedReminders) {
          setReminders(JSON.parse(storedReminders));
        }
      } catch (error) {
        console.error('Error loading reminders:', error);
      }
    };
    loadReminders();
  }, []);

  const savePlants = useCallback(async (updatedPlants) => {
    try {
      await AsyncStorage.setItem('plants', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error saving plants:', error);
    }
  }, []);

  const saveReminders = useCallback(async (updatedReminders) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }, []);

  const waterPlant = useCallback(async (plantId) => {
    try {
      const updatedPlants = plants.map(plant => {
        if (plant.id === plantId) {
          const newWaterEntry = {
            date: new Date().toISOString(),
            amount: 250, // ml
          };
          return {
            ...plant,
            moisture: Math.min(100, plant.moisture + 20),
            lastWatered: new Date().toISOString(),
            wateringHistory: [...(plant.wateringHistory || []), newWaterEntry],
          };
        }
        return plant;
      });
      await savePlants(updatedPlants);
      return { success: true };
    } catch (error) {
      console.error('Error watering plant:', error);
      return { success: false, error: error.message };
    }
  }, [plants, savePlants]);

  const addPlant = useCallback(async (plant) => {
    try {
      const newPlant = {
        id: Date.now().toString(),
        ...plant,
        moisture: 50,
        lastWatered: new Date().toISOString(),
        wateringHistory: [],
      };
      const updatedPlants = [...plants, newPlant];
      await savePlants(updatedPlants);
      return { success: true, plant: newPlant };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [plants, savePlants]);

  const updatePlant = useCallback(async (plantId, updates) => {
    try {
      const updatedPlants = plants.map(plant =>
        plant.id === plantId ? { ...plant, ...updates } : plant
      );
      await savePlants(updatedPlants);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [plants, savePlants]);

  const deletePlant = useCallback(async (plantId) => {
    try {
      const updatedPlants = plants.filter(plant => plant.id !== plantId);
      await savePlants(updatedPlants);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [plants, savePlants]);

  const addReminder = useCallback(async (plantId, dayOfWeek, time) => {
    try {
      const newReminder = {
        id: Date.now().toString(),
        plantId,
        dayOfWeek, // 'Monday', 'Tuesday', etc.
        time, // '09:00'
        enabled: true,
      };
      const updatedReminders = [...reminders, newReminder];
      await saveReminders(updatedReminders);
      return { success: true, reminder: newReminder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [reminders, saveReminders]);

  const removeReminder = useCallback(async (reminderId) => {
    try {
      const updatedReminders = reminders.filter(r => r.id !== reminderId);
      await saveReminders(updatedReminders);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [reminders, saveReminders]);

  const toggleReminder = useCallback(async (reminderId) => {
    try {
      const updatedReminders = reminders.map(r =>
        r.id === reminderId ? { ...r, enabled: !r.enabled } : r
      );
      await saveReminders(updatedReminders);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [reminders, saveReminders]);

  const getPlantStats = useCallback(() => {
    const totalPlants = plants.length;
    const healthyPlants = plants.filter(p => p.moisture > 40).length;
    const needsAttention = plants.filter(p => p.moisture <= 40).length;
    const avgMoisture = plants.length > 0
      ? Math.round(plants.reduce((sum, p) => sum + p.moisture, 0) / plants.length)
      : 0;

    return {
      totalPlants,
      healthyPlants,
      needsAttention,
      avgMoisture,
    };
  }, [plants]);

  const value = {
    plants,
    loading,
    waterPlant,
    addPlant,
    updatePlant,
    deletePlant,
    getPlantStats,
    reminders,
    addReminder,
    removeReminder,
    toggleReminder,
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};
