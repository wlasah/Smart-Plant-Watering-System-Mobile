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
import styles from '../styles/RegisterScreenStyles';
import { useAuth, usePlants } from '../hooks/useAppHooks';
import { validateEmail, validatePassword } from '../utils/helpers';

const RegisterScreen = ({ navigation }) => {
  const { signUp, isLoading } = useAuth();
  const { refetchPlants } = usePlants();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setRegisterError('');
      const result = await signUp(username.trim(), email.trim(), password);
      if (result.success) {
        // Refetch plants after successful registration
        await refetchPlants();
      } else {
        let errorMessage = result.error || 'Registration failed';
        
        // Check for specific error cases
        if (errorMessage.toLowerCase().includes('already exists')) {
          errorMessage = '❌ This username or email already exists. Please try another.';
        } else if (errorMessage.toLowerCase().includes('invalid email')) {
          errorMessage = '❌ Invalid email format. Please check and try again.';
        } else if (errorMessage.toLowerCase().includes('password')) {
          errorMessage = '❌ Password does not meet requirements. Please try another.';
        }
        
        setRegisterError(errorMessage);
        Alert.alert(
          '📝 Registration Error',
          errorMessage.replace(/❌ /, ''),
          [
            {
              text: 'OK',
              onPress: () => {
                setRegisterError('');
              },
            },
          ]
        );
      }
    } catch (err) {
      const errorMsg = '❌ An unexpected error occurred. Please try again.';
      setRegisterError(errorMsg);
      Alert.alert('Error', errorMsg.replace(/❌ /, ''));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Smart Plant Community</Text>

      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="enter a username"
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
          
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {registerError && (
          <View style={styles.errorAlertBox}>
            <Text style={styles.errorAlertTitle}>Registration Error</Text>
            <Text style={styles.errorAlertMessage}>{registerError}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
