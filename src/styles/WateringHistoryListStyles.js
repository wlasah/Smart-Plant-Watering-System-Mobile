import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  list: {},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  amount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  empty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 16,
  },
});

export default styles;
