import { StyleSheet } from 'react-native';

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

export default styles;
