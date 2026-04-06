import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import styles from '../styles/DashboardScreenStyles';
import { usePlants } from '../hooks/useAppHooks';
import { useAuth } from '../hooks/useAppHooks';
import { useUserProfile } from '../hooks/useUserProfile';
import StatsCard from '../components/StatsCard';
import PlantCard from '../components/PlantCard';
import { sortPlantsByMoisture, sortPlantsByLastWatered } from '../utils/helpers';

const DashboardScreen = ({ navigation }) => {
  const { plants, loading, getPlantStats, waterPlant } = usePlants();
  const { user, signOut } = useAuth();
  const { profile, getDisplayName } = useUserProfile();
  const [refreshing, setRefreshing] = useState(false);
  const [avatarColor, setAvatarColor] = useState('#4CAF50');
  const [stats, setStats] = useState({
    totalPlants: 0,
    healthyPlants: 0,
    needsAttention: 0,
    avgMoisture: 0,
  });

  useEffect(() => {
    // Generate consistent color for avatar
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    if (user?.id) {
      const colorIndex = user.id % colors.length;
      setAvatarColor(colors[colorIndex]);
    }
  }, [user?.id]);

  useEffect(() => {
    updateStats();
  }, [plants]);

  const updateStats = async () => {
    const newStats = await getPlantStats();
    setStats(newStats);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateStats();
    } catch (error) {
      console.error('Error refreshing stats:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleWaterPlant = async (plantId) => {
    const result = await waterPlant(plantId);
    if (result.success) {
      Alert.alert('Success', 'Plant watered! 💧');
      await updateStats();
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
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.name}>
            {user?.first_name && user?.last_name
              ? `${user.first_name} ${user.last_name}`
              : user?.username || 'Plant Lover'}
          </Text>
        </View>
        
        {/* Profile Avatar */}
        <TouchableOpacity
          onPress={() => navigation.getParent()?.openDrawer?.()}
          style={{ marginHorizontal: 8 }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: avatarColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {profile?.profile_picture ? (
              <Image
                source={{ uri: profile.profile_picture }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            ) : (
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>
                {getDisplayName()
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </Text>
            )}
          </View>
        </TouchableOpacity>

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
            onPress={() => navigation.navigate('Plants', { screen: 'AddPlant' })}
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
