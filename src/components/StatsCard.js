import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StatsCardStyles';

const StatsCard = ({ icon, value, label, color = '#4CAF50' }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default StatsCard;
