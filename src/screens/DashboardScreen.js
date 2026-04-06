import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import styles from '../styles/DashboardScreenStyles';
import { usePlants } from '../hooks/useAppHooks';
import { useAuth } from '../hooks/useAppHooks';
import StatsCard from '../components/StatsCard';
import PlantCard from '../components/PlantCard';
import { sortPlantsByMoisture, sortPlantsByLastWatered } from '../utils/helpers';

const DashboardScreen = ({ navigation }) => {
  const { plants, loading, getPlantStats, waterPlant } = usePlants();
  const { user, signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalPlants: 0,
    healthyPlants: 0,
    needsAttention: 0,
    avgMoisture: 0,
  });

  useEffect(() => {
    updateStats();
  }, [plants]);

  const updateStats = () => {
    const newStats = getPlantStats();
    setStats(newStats);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      updateStats();
      setRefreshing(false);
    }, 1000);
  };

  const handleWaterPlant = async (plantId) => {
    const result = await waterPlant(plantId);
    if (result.success) {
      Alert.alert('Success', 'Plant watered! 💧');
      updateStats();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handlePlantPress = (plant) => {
    navigation.navigate('PlantDetail', { plant });
  };

  const plantsNeedingAttention = plants.filter(p => p.moisture <= 40);
  const recentlyWatered = sortPlantsByLastWatered(plants).slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.name}>{user?.name || 'Plant Lover'}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert('Sign Out', 'Are you sure?', [
              { text: 'Cancel', onPress: () => {} },
              {
                text: 'Sign Out',
                onPress: () => signOut(),
                style: 'destructive',
              },
            ]);
          }}
        >
          <Text style={styles.logoutText}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <StatsCard
          icon="🌱"
          value={stats.totalPlants}
          label="Total Plants"
          color="#4CAF50"
        />
        <StatsCard
          icon="💚"
          value={stats.healthyPlants}
          label="Healthy Plants"
          color="#87CEEB"
        />
        <StatsCard
          icon="⚠️"
          value={stats.needsAttention}
          label="Need Attention"
          color="#FF6B6B"
        />
        <StatsCard
          icon="💧"
          value={`${stats.avgMoisture}%`}
          label="Avg Moisture"
          color="#FFD700"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Plants')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionText}>View All Plants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CareGuide')}
        >
          <Text style={styles.actionIcon}>🌿</Text>
          <Text style={styles.actionText}>Care Guide</Text>
        </TouchableOpacity>
      </View>

      {/* Plants Needing Water */}
      {plantsNeedingAttention.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚠️ Needs Water</Text>
            <Text style={styles.sectionCount}>{plantsNeedingAttention.length}</Text>
          </View>
          {plantsNeedingAttention.slice(0, 3).map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onPress={handlePlantPress}
              onWater={handleWaterPlant}
            />
          ))}
        </View>
      )}

      {/* Recently Watered */}
      {recentlyWatered.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💧 Recently Watered</Text>
          </View>
          {recentlyWatered.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onPress={handlePlantPress}
              onWater={handleWaterPlant}
            />
          ))}
        </View>
      )}

      {/* Empty State */}
      {plants.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🌱</Text>
          <Text style={styles.emptyTitle}>No Plants Yet</Text>
          <Text style={styles.emptyText}>
            Start by adding your first plant to track its care
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('PlantList')}
          >
            <Text style={styles.emptyButtonText}>Add Your First Plant</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default DashboardScreen;
