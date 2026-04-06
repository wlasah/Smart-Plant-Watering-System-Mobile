import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/PlantCardStyles';
import { getMoistureStatus, formatLastWatered, getPlantInitials } from '../utils/helpers';

const PlantCard = ({ plant, onPress, onWater, isGridView }) => {
  const { color } = getMoistureStatus(plant.moisture);
  const initials = getPlantInitials(plant.name);

  return (
    <TouchableOpacity
      style={[styles.card, isGridView && styles.cardGrid]}
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

export default PlantCard;
