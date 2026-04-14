import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/AddPlantScreenStyles';
import { usePlants } from '../hooks/useAppHooks';

const AddPlantScreen = ({ navigation }) => {
  const { addPlant } = usePlants();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    waterFrequency: '7',
  });

  const handleAddPlant = async () => {
    if (!formData.name.trim() || !formData.type.trim() || !formData.location.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await addPlant({
      name: formData.name,
      type: formData.type,
      location: formData.location,
      careRequirements: {
        waterFrequency: `Every ${formData.waterFrequency} days`,
        lightRequirement: 'Bright indirect light',
        temperature: '65-75°F',
      },
    });
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', `${formData.name} has been added!`);
      // Navigate back to PlantListHome to refresh the list
      navigation.navigate('PlantListHome');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Plant</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Plant Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Monstera Deliciosa"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Plant Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Tropical Plant"
            value={formData.type}
            onChangeText={(text) => setFormData({ ...formData, type: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Living Room"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Watering Frequency (days)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 7"
            value={formData.waterFrequency}
            onChangeText={(text) => setFormData({ ...formData, waterFrequency: text })}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddPlant}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>🌱 Add Plant</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddPlantScreen;
