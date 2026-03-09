import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getDaysInMonth, getDate, getDay, startOfMonth, addMonths, subMonths, formatDate } from 'date-fns';

const WateringScheduleCalendar = ({ plants, selectedMonth, onMonthChange }) => {
  const monthStart = startOfMonth(selectedMonth);
  const daysInMonth = getDaysInMonth(monthStart);
  const firstDayOfWeek = getDay(monthStart);
  
  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), i));
  }

  // Get plants due on a specific date
  const getPlantsAndCount = (date) => {
    if (!date) return 0;
    const plantsDue = plants.filter(plant => {
      const nextWateringDate = new Date(plant.nextWatering);
      return (
        nextWateringDate.getDate() === date.getDate() &&
        nextWateringDate.getMonth() === date.getMonth() &&
        nextWateringDate.getFullYear() === date.getFullYear()
      );
    });
    return plantsDue.length;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    onMonthChange(subMonths(selectedMonth, 1));
  };

  const goToNextMonth = () => {
    onMonthChange(addMonths(selectedMonth, 1));
  };

  const monthName = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.calendarContainer}>
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.navButton}>← Previous</Text>
        </TouchableOpacity>
        <Text style={styles.monthName}>{monthName}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.navButton}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekdayRow}>
        {weekDays.map(day => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((date, index) => {
          const plantsCount = getPlantsAndCount(date);
          const isTodayDate = isToday(date);
          
          return (
            <View
              key={index}
              style={[
                styles.dayCell,
                isTodayDate && styles.todayCell,
                plantsCount > 0 && styles.hasEventsCell,
              ]}
            >
              {date && (
                <>
                  <Text
                    style={[
                      styles.dayText,
                      isTodayDate && styles.todayDayText,
                      plantsCount > 0 && styles.eventDayText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  {plantsCount > 0 && (
                    <View style={styles.eventIndicator}>
                      <Text style={styles.eventCount}>{plantsCount}</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Plants to water</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#87CEEB' }]} />
          <Text style={styles.legendText}>Today</Text>
        </View>
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
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  navButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    width: '14.28%',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  todayCell: {
    backgroundColor: '#E3F2FD',
    borderColor: '#87CEEB',
  },
  hasEventsCell: {
    backgroundColor: '#F1F8E9',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  todayDayText: {
    color: '#87CEEB',
    fontWeight: 'bold',
  },
  eventDayText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});

export default WateringScheduleCalendar;
