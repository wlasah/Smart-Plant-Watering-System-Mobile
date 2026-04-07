import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles/WateringScheduleCalendarStyles';
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
    if (!date) return { count: 0, color: null };
    const plantsDue = plants.filter(plant => {
      const nextWateringDate = new Date(plant.nextWatering);
      const isMatch = (
        nextWateringDate.getDate() === date.getDate() &&
        nextWateringDate.getMonth() === date.getMonth() &&
        nextWateringDate.getFullYear() === date.getFullYear()
      );
      if (isMatch) {
        console.log(`[CALENDAR] Found plant "${plant.name}" due on ${date.toDateString()}: nextWatering=${nextWateringDate.toISOString()}, daysUntilDue=${plant.daysUntilDue}`);
      }
      return isMatch;
    });
    
    // Determine color based on urgency (using same logic as status badges)
    let color = null;
    if (plantsDue.length > 0) {
      const urgency = plantsDue[0].daysUntilDue;
      if (urgency <= 0) color = '#FF6B6B'; // Red - urgent
      else if (urgency <= 2) color = '#FFBE0B'; // Yellow - soon
      else color = '#4CAF50'; // Green - ok
    }
    
    return { count: plantsDue.length, color };
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
          const plantsData = getPlantsAndCount(date);
          const isTodayDate = isToday(date);
          
          return (
            <View
              key={index}
              style={[
                styles.dayCell,
                isTodayDate && styles.todayCell,
                plantsData.count > 0 && styles.hasEventsCell,
              ]}
            >
              {date && (
                <>
                  <Text
                    style={[
                      styles.dayText,
                      isTodayDate && styles.todayDayText,
                      plantsData.count > 0 && styles.eventDayText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  {plantsData.count > 0 && (
                    <View style={[styles.eventIndicator, { backgroundColor: plantsData.color }]}>
                      <Text style={styles.eventCount}>{plantsData.count}</Text>
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

export default WateringScheduleCalendar;
