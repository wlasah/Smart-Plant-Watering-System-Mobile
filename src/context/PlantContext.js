import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plantsAPI } from '../services/api';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch plants from backend on mount and every 30 seconds (only if logged in)
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // Check if user is logged in
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          setPlants([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        const data = await plantsAPI.getAllPlants();
        // Map backend data to app format
        const mappedPlants = data.map(plant => ({
          id: plant.id,
          name: plant.name,
          type: plant.type,
          location: plant.location,
          moisture: plant.moisture,
          lastWatered: plant.last_watered,
          description: plant.description,
          careRequirements: {
            waterFrequency: plant.care_requirements?.water_frequency,
            lightRequirement: plant.care_requirements?.light_requirement,
            temperature: plant.care_requirements?.temperature,
            humidity: plant.care_requirements?.humidity,
          },
          watering_history: plant.watering_history,
          created_at: plant.created_at,
        }));
        setPlants(mappedPlants);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchPlants, 30000);
    return () => clearInterval(interval);
  }, []);

  const waterPlant = useCallback(async (plantId, notes = '') => {
    try {
      const result = await plantsAPI.waterPlant(plantId, notes);
      
      // Update local state with new data
      setPlants(prevPlants =>
        prevPlants.map(plant => {
          if (plant.id === plantId) {
            return {
              ...plant,
              moisture: result.plant.moisture,
              lastWatered: result.plant.last_watered,
            };
          }
          return plant;
        })
      );
      return { success: true };
    } catch (error) {
      console.error('Error watering plant:', error);
      return { success: false, error: error.message || 'Failed to water plant' };
    }
  }, []);

  const addPlant = useCallback(async (plantData) => {
    try {
      // Transform frontend data to backend format
      const backendData = {
        name: plantData.name,
        type: plantData.type,
        location: plantData.location,
        moisture: plantData.moisture || 50,
        description: plantData.description || '',
        care_requirements: {
          water_frequency: plantData.careRequirements?.waterFrequency || 'Every 7 days',
          light_requirement: plantData.careRequirements?.lightRequirement || 'Bright indirect light',
          temperature: plantData.careRequirements?.temperature || '65-75°F',
          humidity: plantData.careRequirements?.humidity || '',
        },
      };

      const result = await plantsAPI.createPlant(backendData);
      
      // Refetch all plants from backend to ensure consistency
      // This prevents duplicates by replacing local state with server data
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        const data = await plantsAPI.getAllPlants();
        const mappedPlants = data.map(plant => ({
          id: plant.id,
          name: plant.name,
          type: plant.type,
          location: plant.location,
          moisture: plant.moisture,
          lastWatered: plant.last_watered,
          description: plant.description,
          careRequirements: {
            waterFrequency: plant.care_requirements?.water_frequency,
            lightRequirement: plant.care_requirements?.light_requirement,
            temperature: plant.care_requirements?.temperature,
            humidity: plant.care_requirements?.humidity,
          },
          watering_history: plant.watering_history,
          created_at: plant.created_at,
        }));
        setPlants(mappedPlants);
      }
      
      return { success: true, plant: result };
    } catch (error) {
      console.error('Error adding plant:', error);
      return { success: false, error: error.message || 'Failed to add plant' };
    }
  }, []);

  const updatePlant = useCallback(async (plantId, updates) => {
    try {
      const backendData = {
        name: updates.name,
        type: updates.type,
        location: updates.location,
        moisture: updates.moisture,
        description: updates.description || '',
        care_requirements: {
          water_frequency: updates.careRequirements?.waterFrequency,
          light_requirement: updates.careRequirements?.lightRequirement,
          temperature: updates.careRequirements?.temperature,
          humidity: updates.careRequirements?.humidity,
        },
      };

      await plantsAPI.updatePlant(plantId, backendData);
      
      // Update local state
      setPlants(prevPlants =>
        prevPlants.map(plant =>
          plant.id === plantId ? { ...plant, ...updates } : plant
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Error updating plant:', error);
      return { success: false, error: error.message || 'Failed to update plant' };
    }
  }, []);

  const deletePlant = useCallback(async (plantId) => {
    try {
      await plantsAPI.deletePlant(plantId);
      
      // Remove from local state
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting plant:', error);
      return { success: false, error: error.message || 'Failed to delete plant' };
    }
  }, []);

  const getPlantStats = useCallback(async () => {
    try {
      const stats = await plantsAPI.getStats();
      return {
        totalPlants: stats.total_plants,
        healthyPlants: stats.healthy,
        needsAttention: stats.needing_water,
        avgMoisture: Math.round(stats.average_moisture || 0),
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to local calculation
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
    }
  }, [plants]);

  // Manually refetch plants (called after login or on demand)
  const refetchPlants = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        setPlants([]);
        return;
      }

      setLoading(true);
      const data = await plantsAPI.getAllPlants();
      const mappedPlants = data.map(plant => ({
        id: plant.id,
        name: plant.name,
        type: plant.type,
        location: plant.location,
        moisture: plant.moisture,
        lastWatered: plant.last_watered,
        description: plant.description,
        careRequirements: {
          waterFrequency: plant.care_requirements?.water_frequency,
          lightRequirement: plant.care_requirements?.light_requirement,
          temperature: plant.care_requirements?.temperature,
          humidity: plant.care_requirements?.humidity,
        },
        watering_history: plant.watering_history,
        created_at: plant.created_at,
      }));
      console.log('[PLANTS] Refetched plants:', mappedPlants.length);
      setPlants(mappedPlants);
    } catch (error) {
      console.error('[PLANTS] Error refetching:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    plants,
    loading,
    waterPlant,
    addPlant,
    updatePlant,
    deletePlant,
    getPlantStats,
    refetchPlants,
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};
