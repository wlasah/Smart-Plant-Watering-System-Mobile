import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 16,
    paddingVertical: 8,
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  plantType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  moistureDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  moistureValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  moistureBar: {
    height: 12,
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  moistureFill: {
    height: '100%',
    borderRadius: 6,
  },
  moistureInfo: {
    gap: 8,
  },
  moistureLabel: {
    fontSize: 14,
    color: '#666',
  },
  recommendationText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  careItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  careLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  careValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    fontSize: 13,
    color: '#666',
  },
  historyAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  waterButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FFE8E8',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
});

export default PlantDetailScreen;
