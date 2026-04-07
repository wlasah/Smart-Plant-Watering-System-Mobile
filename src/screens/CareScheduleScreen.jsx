import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import styles from '../styles/CareScheduleScreenStyles';
import { PlantContext } from '../context/PlantContext';
import { formatDistanceToNow } from 'date-fns';
import WateringScheduleCalendar from '../components/WateringScheduleCalendar';

const CareScheduleScreen = () => {
  const { plants } = useContext(PlantContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Sort plants by next watering date
  const getScheduledPlants = () => {
    return plants
      .map(plant => {
        // Parse watering frequency (e.g., "Every 7 days" -> 7)
        const frequencyMatch = plant.careRequirements?.waterFrequency?.match(/\d+/);
        const daysBetweenWatering = frequencyMatch ? parseInt(frequencyMatch[0]) : 7;
        const lastWatered = new Date(plant.lastWatered);
        const nextWatering = new Date(lastWatered.getTime() + daysBetweenWatering * 24 * 60 * 60 * 1000);
        const daysUntilDue = Math.ceil((nextWatering - new Date()) / (1000 * 60 * 60 * 24));
        
        console.log(`[SCHEDULE] ${plant.name}:`, {
          lastWatered: lastWatered.toISOString(),
          frequency: daysBetweenWatering,
          nextWatering: nextWatering.toISOString(),
          today: new Date().toISOString(),
          daysUntilDue,
        });
        
        return {
          ...plant,
          nextWatering,
          daysUntilDue,
        };
      })
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  };

  const scheduledPlants = getScheduledPlants();

  const getStatusColor = (daysUntilDue) => {
    if (daysUntilDue <= 0) return '#FF6B6B'; // Red - urgent
    if (daysUntilDue <= 2) return '#FFBE0B'; // Yellow - soon
    return '#4CAF50'; // Green - ok
  };

  const getStatusText = (daysUntilDue) => {
    if (daysUntilDue <= 0) return 'WATER NOW';
    if (daysUntilDue === 1) return 'Tomorrow';
    return `In ${daysUntilDue} days`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>📅 Care Schedule</Text>

      {/* Watering Schedule Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Watering Schedule</Text>
        {scheduledPlants.length === 0 ? (
          <Text style={styles.emptyText}>No plants added yet</Text>
        ) : (
          <FlatList
            data={scheduledPlants}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <View style={styles.plantInfo}>
                  <Text style={styles.plantName}>{item.name}</Text>
                  <Text style={styles.plantType}>{item.type}</Text>
                </View>
                <View style={styles.statusSection}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.daysUntilDue) }]}>
                    <Text style={styles.statusText}>{getStatusText(item.daysUntilDue)}</Text>
                  </View>
                  <Text style={styles.moistureInfo}>💧 {item.moisture}%</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Calendar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Overview</Text>
        <WateringScheduleCalendar
          plants={scheduledPlants}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CareScheduleScreen;
