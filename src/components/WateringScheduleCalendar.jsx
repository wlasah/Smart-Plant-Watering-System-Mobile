import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WateringScheduleCalendar = ({ plants, reminders, selectedMonth, onMonthChange, onAddReminder, onRemoveReminder }) => {
  // Placeholder calendar view
  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarHeader}>Monthly Calendar (Coming Soon)</Text>
      {/* Render calendar grid, plant watering dates, and reminders here */}
      {/* Example: List reminders for the month */}
      <View style={styles.remindersSection}>
        <Text style={styles.remindersHeader}>Reminders</Text>
        {reminders && reminders.length > 0 ? (
          reminders.map(rem => (
            <View key={rem.id} style={styles.reminderItem}>
              <Text>{rem.text} - {new Date(rem.date).toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => onRemoveReminder(rem.id)}>
                <Text style={styles.removeBtn}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No reminders for this month.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4CAF50',
  },
  remindersSection: {
    marginTop: 16,
  },
  remindersHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    padding: 8,
    backgroundColor: '#e8f5e9',
    borderRadius: 6,
  },
  removeBtn: {
    color: '#f44336',
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default WateringScheduleCalendar;
