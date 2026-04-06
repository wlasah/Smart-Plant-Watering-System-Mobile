import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import styles from '../styles/CareGuideScreenStyles';

const CareGuideScreen = () => {
  const guides = [
    {
      title: 'Watering',
      emoji: '💧',
      tips: [
        'Water when top 1-2 inches of soil feels dry',
        'Water more frequently in summer',
        'Reduce watering in winter',
        'Ensure pots have drainage holes',
        'Use room temperature water',
      ],
    },
    {
      title: 'Light',
      emoji: '☀️',
      tips: [
        'Most plants need 6-8 hours of light daily',
        'Place near windows for natural light',
        'Rotate plants weekly for even growth',
        'Low-light plants away from direct sun',
        'High-light plants love morning sun',
      ],
    },
    {
      title: 'Temperature',
      emoji: '🌡️',
      tips: [
        'Keep plants between 65-75°F if possible',
        'Avoid sudden temperature changes',
        'Keep away from heating/cooling vents',
        'Protect from cold drafts',
        'Most tropical plants prefer warmth',
      ],
    },
    {
      title: 'Humidity',
      emoji: '💨',
      tips: [
        'Most indoor plants like 40-60% humidity',
        'Mist leaves occasionally with water',
        'Group plants together for humidity',
        'Use pebble trays under pots',
        'Bathrooms are great for humidity-loving plants',
      ],
    },
    {
      title: 'Fertilizing',
      emoji: '🌱',
      tips: [
        'Fertilize during growing season (spring/summer)',
        'Use balanced fertilizer monthly',
        'Follow package instructions carefully',
        'Do not fertilize in winter',
        'Reduce feeding for slow-growing plants',
      ],
    },
    {
      title: 'Common Problems',
      emoji: '⚠️',
      tips: [
        'Yellow leaves: Usually overwatering',
        'Brown tips: Low humidity or salt buildup',
        'Leggy growth: Insufficient light',
        'Leaf drop: Temperature stress',
        'Pest issues: Inspect new plants before adding',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 Plant Care Guide</Text>
        <Text style={styles.subtitle}>
          Tips for keeping your plants healthy and happy
        </Text>
      </View>

      {guides.map((guide, index) => (
        <View key={index} style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideEmoji}>{guide.emoji}</Text>
            <Text style={styles.guideTitle}>{guide.title}</Text>
          </View>
          <View style={styles.tipsList}>
            {guide.tips.map((tip, tipIndex) => (
              <View key={tipIndex} style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Remember: Every plant is unique. Observe your plants and adjust care
          based on their response!
        </Text>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default CareGuideScreen;
