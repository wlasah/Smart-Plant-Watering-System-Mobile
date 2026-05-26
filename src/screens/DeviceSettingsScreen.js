import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
} from 'react-native';
import { usePlants } from '../hooks/useAppHooks';

/** @param {{ route: any, navigation: any }} props */
function DeviceSettingsScreen(props) {
  const { route, navigation } = props;
  const { plant } = route.params;
  const { fetchDeviceConfig, saveDeviceConfig, fetchDeviceTelemetry } = usePlants();
  const [deviceId, setDeviceId] = useState(plant.deviceId || 'esp32-plant-01');
  const [autoWater, setAutoWater] = useState(true);
  const [dryThreshold, setDryThreshold] = useState('2500');
  const [wetThreshold, setWetThreshold] = useState('1500');
  const [loading, setLoading] = useState(false);
  const [telemetry, setTelemetry] = useState(/** @type {any[]} */ ([]));

  useEffect(() => {
    navigation.setOptions({ title: `Device settings` });
  }, [navigation]);

  useEffect(() => {
    if (!deviceId) return;
    loadConfigAndTelemetry();
  }, []);

  const loadConfigAndTelemetry = async () => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const config = await fetchDeviceConfig(deviceId);
      if (config) {
        setAutoWater(config.auto_water ?? true);
        setDryThreshold(String(config.dry_threshold ?? 2500));
        setWetThreshold(String(config.wet_threshold ?? 1500));
      }
      const telemetryData = await fetchDeviceTelemetry(deviceId, 10);
      setTelemetry(Array.isArray(telemetryData) ? telemetryData : []);
    } catch (error) {
      console.error('[DeviceSettings] Load error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!deviceId.trim()) {
      Alert.alert('Validation', 'Device ID is required.');
      return;
    }

    const config = {
      device_id: deviceId.trim(),
      plant_id: plant.id,
      auto_water: autoWater,
      dry_threshold: Number(dryThreshold) || 2500,
      wet_threshold: Number(wetThreshold) || 1500,
    };

    setLoading(true);
    try {
      const saved = await saveDeviceConfig(config);
      if (saved) {
        Alert.alert('Saved', 'Device settings saved successfully.');
        await loadConfigAndTelemetry();
      } else {
        Alert.alert('Error', 'Failed to save device config.');
      }
    } catch (error) {
      console.error('[DeviceSettings] Save error', error);
      Alert.alert('Error', 'Unable to save device settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Plant</Text>
        <Text style={styles.value}>{plant.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Device ID</Text>
        <TextInput
          value={deviceId}
          onChangeText={setDeviceId}
          style={styles.input}
          placeholder="Enter device ID"
        />
      </View>

      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.label}>Auto Water</Text>
          <Text style={styles.helpText}>Enable automatic watering when the device is dry.</Text>
        </View>
        <Switch value={autoWater} onValueChange={setAutoWater} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dry Threshold</Text>
        <TextInput
          value={dryThreshold}
          onChangeText={setDryThreshold}
          style={styles.input}
          keyboardType="numeric"
          placeholder="2500"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Wet Threshold</Text>
        <TextInput
          value={wetThreshold}
          onChangeText={setWetThreshold}
          style={styles.input}
          keyboardType="numeric"
          placeholder="1500"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Device Settings'}</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Telemetry</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#4CAF50" />
        ) : telemetry.length === 0 ? (
          <Text style={styles.emptyText}>No telemetry yet for this device.</Text>
        ) : (
          telemetry.map(item => (
            <View key={item.id} style={styles.telemetryRow}>
              <Text style={styles.telemetryText}>Raw: {item.soil_raw}</Text>
              <Text style={styles.telemetryText}>Moisture: {item.soil_percent}%</Text>
              <Text style={styles.telemetryText}>Pump: {item.pump ? 'ON' : 'OFF'}</Text>
              <Text style={styles.telemetryTimestamp}>{new Date(item.created_at).toLocaleString()}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    maxWidth: 250,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  telemetryRow: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  telemetryText: {
    color: '#333',
    fontSize: 14,
  },
  telemetryTimestamp: {
    marginTop: 6,
    color: '#777',
    fontSize: 12,
  },
});

export default DeviceSettingsScreen;
