import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        
        if (userToken && userData) {
          dispatch({
            type: 'RESTORE_TOKEN',
            payload: userToken,
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
      signIn: async (email, password) => {
        try {
          // Simulate API call - validate against stored users
          const usersJSON = await AsyncStorage.getItem('users');
          const users = usersJSON ? JSON.parse(usersJSON) : [];
          
          const user = users.find(u => u.email === email && u.password === password);
          
          if (!user) {
            throw new Error('Invalid credentials');
          }

          const userToken = Math.random().toString(36).substr(2);
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
          }));

          dispatch({
            type: 'SIGN_IN',
            payload: userToken,
            user: { id: user.id, email: user.email, name: user.name },
          });

          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      signUp: async (name, email, password) => {
        try {
          // Get existing users
          const usersJSON = await AsyncStorage.getItem('users');
          const users = usersJSON ? JSON.parse(usersJSON) : [];

          // Check if email already exists
          if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
          }

          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
          };

          users.push(newUser);
          await AsyncStorage.setItem('users', JSON.stringify(users));

          // Auto sign in after registration
          const userToken = Math.random().toString(36).substr(2);
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }));

          dispatch({
            type: 'SIGN_UP',
            payload: userToken,
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
          });

          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userData');
          dispatch({ type: 'SIGN_OUT' });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      signUp: async (name, email, password) => {
        try {
          const usersJSON = await AsyncStorage.getItem('users');
          const users = usersJSON ? JSON.parse(usersJSON) : [];

          if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
          }

          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
          };

          users.push(newUser);
          await AsyncStorage.setItem('users', JSON.stringify(users));

          const userToken = Math.random().toString(36).substr(2);
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }));

          dispatch({
            type: 'SIGN_UP',
            payload: userToken,
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
          });

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
