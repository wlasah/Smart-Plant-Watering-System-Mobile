import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from '../styles/PlantDetailScreenStyles';
import { usePlants } from '../hooks/useAppHooks';
import { getMoistureStatus, formatLastWatered } from '../utils/helpers';
import MoistureGauge from '../components/MoistureGauge';
import WateringHistoryList from '../components/WateringHistoryList';

const PlantDetailScreen = ({ route, navigation }) => {
  const { plant: initialPlant } = route.params;
  const { plants, waterPlant, deletePlant } = usePlants();
  const [watering, setWatering] = useState(false);

  // Find latest plant data from context
  const plant = plants.find(p => p.id === initialPlant.id) || initialPlant;
  const { color } = getMoistureStatus(plant.moisture);

  const getHealthRecommendation = (moisture) => {
    if (moisture >= 60) return 'Your plant is healthy. Continue with regular care.';
    if (moisture >= 40) return 'Moisture is slightly low; water within the next day or two.';
    return 'Soil is dry – water immediately to prevent stress.';
  };

  const handleWater = async () => {
    setWatering(true);
    const result = await waterPlant(plant.id);
    setWatering(false);
    
    if (result.success) {
      Alert.alert('Success', `${plant.name} has been watered! 💧`);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Plant',
      `Are you sure you want to remove ${plant.name}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            const result = await deletePlant(plant.id);
            if (result.success) {
              navigation.goBack();
              Alert.alert('Success', 'Plant removed');
            } else {
              Alert.alert('Error', result.error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantType}>{plant.type}</Text>
      </View>

      {/* Moisture Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💧 Moisture Level</Text>
        <View style={styles.moistureDisplay}>
          <MoistureGauge level={plant.moisture} />
          <Text style={styles.moistureLabel}>
            Last watered: {formatLastWatered(plant.lastWatered)}
          </Text>
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{plant.location}</Text>
        </View>
      </View>

      {/* Care Requirements */}
      {plant.careRequirements && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌿 Care Requirements</Text>
          
          <View style={styles.careItem}>
            <Text style={styles.careLabel}>💧 Watering</Text>
            <Text style={styles.careValue}>
              {plant.careRequirements.waterFrequency}
            </Text>
          </View>

          <View style={styles.careItem}>
            <Text style={styles.careLabel}>☀️ Light</Text>
            <Text style={styles.careValue}>
              {plant.careRequirements.lightRequirement}
            </Text>
          </View>

          <View style={styles.careItem}>
            <Text style={styles.careLabel}>🌡️ Temperature</Text>
            <Text style={styles.careValue}>
              {plant.careRequirements.temperature}
            </Text>
          </View>
        </View>
      )}

      {/* Health Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🩺 Health Recommendations</Text>
        <Text style={styles.recommendationText}>{getHealthRecommendation(plant.moisture)}</Text>
      </View>

      {/* Watering History */}
      {plant.wateringHistory && plant.wateringHistory.length > 0 && (
        <View style={styles.section}>
          <WateringHistoryList history={plant.wateringHistory} />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[styles.actionButton, styles.waterButton]}
          onPress={handleWater}
          disabled={watering}
        >
          <Text style={styles.actionButtonText}>
            {watering ? '⏳ Watering...' : '💧 Water Plant'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>🗑️ Delete Plant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default PlantDetailScreen;
