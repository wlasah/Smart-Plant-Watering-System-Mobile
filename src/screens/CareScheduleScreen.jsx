import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { PlantContext } from '../context/PlantContext';
import WateringScheduleCalendar from '../components/WateringScheduleCalendar';

const CareScheduleScreen = () => {
  const { plants, reminders, addReminder, removeReminder, loading } = useContext(PlantContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Care Schedule & Reminders</Text>
      <WateringScheduleCalendar
        plants={plants}
        reminders={reminders}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onAddReminder={addReminder}
        onRemoveReminder={removeReminder}
      />
      {/* Custom reminders UI can be added here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default CareScheduleScreen;
