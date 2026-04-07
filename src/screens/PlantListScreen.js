import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/PlantListScreenStyles';
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
    <SafeAreaView style={styles.container}>
      <FlatList
        key={viewMode} // Force re-render when viewMode changes
        data={filteredPlants}
        renderItem={({ item }) => (
          <View
            style={
              viewMode === 'grid'
                ? styles.plantItemContainerGrid
                : styles.plantItemContainer
            }
          >
            <PlantCard
              plant={item}
              onPress={handlePlantPress}
              onWater={handleWater}
              isGridView={viewMode === 'grid'}
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
    </SafeAreaView>
  );
};

export default PlantListScreen;
