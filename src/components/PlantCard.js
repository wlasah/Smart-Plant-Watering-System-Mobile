import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { getMoistureStatus, formatLastWatered, getPlantInitials } from '../utils/helpers';

const { width } = Dimensions.get('window');

const PlantCard = ({ plant, onPress, onWater }) => {
  const { color } = getMoistureStatus(plant.moisture);
  const initials = getPlantInitials(plant.name);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(plant)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: color }]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.plantInfo}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.location}>{plant.location}</Text>
        </View>
      </View>

      <View style={styles.moistureContainer}>
        <Text style={styles.label}>Moisture Level</Text>
        <View style={styles.moistureBar}>
          <View
            style={[
              styles.moistureFill,
              { width: `${plant.moisture}%`, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={styles.moistureText}>{plant.moisture}%</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.lastWatered}>
          Last watered: {formatLastWatered(plant.lastWatered)}
        </Text>
        <TouchableOpacity
          style={[styles.waterButton, { borderColor: color }]}
          onPress={() => onWater && onWater(plant.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.waterButtonText, { color }]}>💧 Water</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
  },
  moistureContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  moistureBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  moistureFill: {
    height: '100%',
    borderRadius: 4,
  },
  moistureText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastWatered: {
    fontSize: 12,
    color: '#999',
  },
  waterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  waterButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PlantCard;
