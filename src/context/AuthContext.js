import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
            user: action.user,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  // Restore token on app start
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const auth_token = await AsyncStorage.getItem('auth_token');
        const userData = await AsyncStorage.getItem('userData');
        
        if (auth_token && userData) {
          dispatch({
            type: 'RESTORE_TOKEN',
            payload: auth_token,
            user: JSON.parse(userData),
          });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', payload: null, user: null });
        }
      } catch (e) {
        console.error('Failed to restore token:', e);
        dispatch({ type: 'RESTORE_TOKEN', payload: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          // Call Django backend login endpoint
          const response = await authAPI.login(username, password);
          
          // Store token and user data
          await AsyncStorage.setItem('auth_token', response.token);
          
          // Get user details
          try {
            const user = await authAPI.getCurrentUser();
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            
            dispatch({
              type: 'SIGN_IN',
              payload: response.token,
              user,
            });
          } catch (e) {
            // If getting user fails, still sign in with basic user data
            await AsyncStorage.setItem('userData', JSON.stringify({
              username,
              id: null,
            }));
            
            dispatch({
              type: 'SIGN_IN',
              payload: response.token,
              user: { username },
            });
          }

          return { success: true };
        } catch (error) {
          const errorMessage = error.message || 'Login failed';
          return { success: false, error: errorMessage };
        }
      },

      signUp: async (username, email, password) => {
        try {
          // Call Django backend register endpoint
          const response = await authAPI.register(username, email, password);
          
          // Store token and user data
          await AsyncStorage.setItem('auth_token', response.token);
          await AsyncStorage.setItem('userData', JSON.stringify(response.user));

          dispatch({
            type: 'SIGN_UP',
            payload: response.token,
            user: response.user,
          });

          return { success: true };
        } catch (error) {
          const errorMessage = error.data?.username?.[0] || 
                               error.data?.email?.[0] || 
                               error.message || 
                               'Registration failed';
          return { success: false, error: errorMessage };
        }
      },

      signOut: async () => {
        try {
          // Optional: Call backend logout endpoint
          try {
            await authAPI.logout();
          } catch (e) {
            console.warn('Logout API call failed:', e);
          }

          // Clear stored data
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('userData');
          dispatch({ type: 'SIGN_OUT' });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};
