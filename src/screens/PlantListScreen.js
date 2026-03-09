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
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

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
      // Reset filter to 'all' to show the updated plant
      setFilterStatus('all');
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

      {/* Filter Buttons & View Toggle */}
      <View style={styles.filterHeaderRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {[
            { label: 'All', value: 'all' },
            { label: 'Healthy', value: 'healthy' },
            { label: 'Needs Water', value: 'needsWater' },
            { label: 'Unhealthy', value: 'unhealthy' },
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

        {/* View Mode Toggle */}
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'list' && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text
              style={[
                styles.viewToggleIcon,
                viewMode === 'list' && styles.viewToggleIconActive,
              ]}
            >
              ☰
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'grid' && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Text
              style={[
                styles.viewToggleIcon,
                viewMode === 'grid' && styles.viewToggleIconActive,
              ]}
            >
              ⊞
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
      <FlatList
        data={filteredPlants}
        renderItem={({ item }) => (
          <View
            style={[
              styles.plantItemContainer,
              viewMode === 'grid' && styles.plantItemContainerGrid,
            ]}
          >
            <PlantCard
              plant={item}
              onPress={handlePlantPress}
              onWater={handleWater}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridColumnWrapper : null}
        scrollEnabled={true}
      />
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
    flex: 1,
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
  filterHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    gap: 6,
  },
  viewToggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viewToggleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  viewToggleIcon: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  viewToggleIconActive: {
    color: 'white',
  },
  plantItemContainerGrid: {
    flex: 1,
    paddingHorizontal: 8,
  },
  gridColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
});

export default PlantListScreen;
