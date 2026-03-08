import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { usePlants } from '../hooks/useAppHooks';
import PlantCard from '../components/PlantCard';
import { searchPlants, filterPlantsByStatus } from '../utils/helpers';

const PlantListScreen = ({ navigation }) => {
  const { plants, waterPlant } = usePlants();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPlants = useMemo(() => {
    let result = plants;
    
    // Apply search
    result = searchPlants(result, searchQuery);
    
    // Apply filter
    result = filterPlantsByStatus(result, filterStatus);
    
    return result;
  }, [plants, searchQuery, filterStatus]);

  const handleWater = async (plantId) => {
    const result = await waterPlant(plantId);
    if (result.success) {
      // Success feedback in component
    }
  };

  const handlePlantPress = (plant) => {
    navigation.navigate('PlantDetail', { plant });
  };

  const renderHeader = () => (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {[
          { label: 'All', value: 'all' },
          { label: 'Healthy', value: 'healthy' },
          { label: 'Needs Water', value: 'needsWater' },
        ].map(filter => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterButton,
              filterStatus === filter.value && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === filter.value && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPlant')}
        >
          <Text style={styles.addButtonText}>➕ Add Plant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🌱</Text>
      <Text style={styles.emptyTitle}>No Plants Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery ? 'Try a different search' : 'Add your first plant to get started'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {filteredPlants.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <View style={styles.plantItemContainer}>
              <PlantCard
                plant={item}
                onPress={handlePlantPress}
                onWater={handleWater}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  clearIcon: {
    fontSize: 16,
    color: '#999',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  filterTextActive: {
    color: 'white',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  plantItemContainer: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default PlantListScreen;
