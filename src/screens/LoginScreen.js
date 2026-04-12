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
import styles from '../styles/LoginScreenStyles';
import { useAuth, usePlants } from '../hooks/useAppHooks';
import { validatePassword } from '../utils/helpers';

const LoginScreen = ({ navigation }) => {
  const { signIn, isLoading } = useAuth();
  const { refetchPlants } = usePlants();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      console.log('[LoginScreen] Starting login process...');
      setLoginError(''); // Clear previous error
      const result = await signIn(username.trim(), password);
      
      console.log('[LoginScreen] Sign in result:', result);
      
      if (result.success) {
        console.log('[LoginScreen] Login successful, refetching plants...');
        // Refetch plants after successful login
        await refetchPlants();
        console.log('[LoginScreen] Plants refetched successfully');
      } else {
        console.error('[LoginScreen] Login failed:', result.error);
        // Set specific error message
        let errorMessage = result.error || 'Invalid username or password';
        
        console.log('[LoginScreen] Raw error message:', errorMessage);
        console.log('[LoginScreen] Checking error patterns...');
        
        // Check for specific error cases - be more comprehensive
        const errorLower = errorMessage.toLowerCase();
        
        if (errorLower.includes('network') || errorLower.includes('connect') || errorLower.includes('fetch failed')) {
          console.log('[LoginScreen] Detected as network error');
          errorMessage = '❌ Network error. Cannot connect to server. Please check your connection.';
        } else if (errorLower.includes('invalid') || errorLower.includes('incorrect') || errorLower.includes('wrong')) {
          console.log('[LoginScreen] Detected as invalid credentials');
          errorMessage = '❌ Invalid username or password. Please try again.';
        } else if (errorLower.includes('not found') || errorLower.includes('does not exist')) {
          console.log('[LoginScreen] Detected as user not found');
          errorMessage = '❌ Username not found. Please check and try again.';
        } else if (errorLower.includes('space') || errorLower.includes('character')) {
          console.log('[LoginScreen] Detected as format error');
          errorMessage = `❌ ${errorMessage}`;
        } else {
          // If we didn't match any pattern, prepend icon to the original message
          console.log('[LoginScreen] No pattern matched, using original error');
          if (!errorMessage.startsWith('❌')) {
            errorMessage = `❌ ${errorMessage}`;
          }
        }
        
        setLoginError(errorMessage);
        
        // Also show alert for better visibility
        Alert.alert(
          '🔐 Login Failed',
          errorMessage.replace(/❌ /, ''),
          [
            {
              text: 'Try Again',
              onPress: () => {
                setPassword(''); // Clear password field
              },
            },
            {
              text: 'Sign Up',
              onPress: () => navigation.navigate('Register'),
            },
          ]
        );
      }
    } catch (err) {
      console.error('[LoginScreen] Unexpected error:', err);
      const errorMsg = '❌ An unexpected error occurred. Please try again.';
      setLoginError(errorMsg);
      Alert.alert('Error', errorMsg.replace(/❌ /, ''));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🌱 Smart Plant</Text>
      <Text style={styles.subtitle}>Your Personal Plant Care Companion</Text>

      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="lawrence gwapo"
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
          
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        {loginError && (
          <View style={styles.errorAlertBox}>
            <Text style={styles.errorAlertTitle}>Login Failed</Text>
            <Text style={styles.errorAlertMessage}>{loginError}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          disabled={isLoading}
        >
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
