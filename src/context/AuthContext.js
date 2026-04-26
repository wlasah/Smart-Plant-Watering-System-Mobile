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
        
        console.log('[AUTH] Restoring token on app start');
        console.log('[AUTH] Token found:', !!auth_token);
        console.log('[AUTH] User data found:', !!userData);
        
        if (auth_token && userData) {
          // Validate token by calling an authenticated endpoint
          try {
            const user = await authAPI.getCurrentUser();
            console.log('[AUTH] Token validated successfully');
            dispatch({
              type: 'RESTORE_TOKEN',
              payload: auth_token,
              user: JSON.parse(userData),
            });
          } catch (validationError) {
            console.warn('[AUTH] Token validation failed:', validationError.message);
            // Token is invalid (expired or from different backend)
            console.log('[AUTH] Clearing invalid token - user needs to login again');
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('userData');
            dispatch({ type: 'RESTORE_TOKEN', payload: null, user: null });
          }
        } else {
          console.log('[AUTH] No token found - user needs to login');
          dispatch({ type: 'RESTORE_TOKEN', payload: null, user: null });
        }
      } catch (e) {
        console.error('[AUTH] Failed to restore token:', e);
        dispatch({ type: 'RESTORE_TOKEN', payload: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          // Trim username for consistency
          const trimmedUsername = username.trim();
          console.log('[AUTH] Attempting login:', trimmedUsername);
          
          // Call Django backend login endpoint
          const response = await authAPI.login(trimmedUsername, password);
          
          console.log('[AUTH] Login successful, saving token');
          
          // Store token and user data
          await AsyncStorage.setItem('auth_token', response.token);
          
          // Get user details
          try {
            const user = await authAPI.getCurrentUser();
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            
            console.log('[AUTH] User data saved:', user.username);
            
            dispatch({
              type: 'SIGN_IN',
              payload: response.token,
              user,
            });
          } catch (e) {
            // If getting user fails, still sign in with basic user data
            console.warn('[AUTH] Could not fetch user details, using basic data');
            
            await AsyncStorage.setItem('userData', JSON.stringify({
              username: trimmedUsername,
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
          console.error('[AUTH] Login failed:', error);
          const errorMessage = error.message || 'Login failed';
          return { success: false, error: errorMessage };
        }
      },

      signUp: async (username, email, password) => {
        try {
          // Trim inputs for consistency
          const trimmedUsername = username.trim();
          const trimmedEmail = email.trim();
          console.log('[AUTH] Attempting registration:', trimmedUsername);
          
          // Call Django backend register endpoint
          const response = await authAPI.register(trimmedUsername, trimmedEmail, password);
          
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
            // 401 error is expected if token is already invalid/expired
            // User is effectively logged out in that case
            if (e.status === 401) {
              console.log('Token already invalid - user was already logged out on server');
            } else {
              console.warn('Logout API call failed:', e);
            }
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
