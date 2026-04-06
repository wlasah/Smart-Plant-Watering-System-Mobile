import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/MoistureGaugeStyles';
// We rely on react-native-svg for the circular gauge.
// Install with `expo install react-native-svg` if not already available.
import Svg, { Circle } from 'react-native-svg';

const MoistureGauge = ({ level = 0, size = 120, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  const getColor = (l) => {
    if (l >= 70 && l <= 90) return '#4CAF50';
    if (l >= 50 && l < 70) return '#87CEEB';
    if (l >= 30 && l < 50) return '#FFBE0B';
    return '#FF6B6B';
  };

  const color = getColor(level);

  return (
    <View style={[styles.container, { width: size, height: size }]}>      
      <Svg width={size} height={size}>
        <Circle
          stroke="#E8E8E8"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.labelContainer} pointerEvents="none">
        <Text style={[styles.label, { color }]}>{level}%</Text>
      </View>
    </View>
  );
};

export default MoistureGauge;
