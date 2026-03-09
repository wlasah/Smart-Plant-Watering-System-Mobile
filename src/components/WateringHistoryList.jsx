import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

// Displays up to the last 10 watering events passed in through `history`.
// Each entry is expected to have at least a `date` and `amount` property. If
// `id` is available it will be used as the key; otherwise the index is used.

const WateringHistoryList = ({ history = [] }) => {
  const entries = history.slice(-10).reverse();

  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (entries.length === 0) {
    return <Text style={styles.empty}>No watering history available.</Text>;
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
          <Text style={styles.amount}>💧 {item.amount}</Text>
        </View>
      )}
      contentContainerStyle={styles.list}
      scrollEnabled={false}
    />
  );
};

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

export default WateringHistoryList;
