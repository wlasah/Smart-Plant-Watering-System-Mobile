import AsyncStorage from '@react-native-async-storage/async-storage';

// Use environment variable if available, otherwise default to local IP
// .env file should have: EXPO_PUBLIC_API_URL=https://smart-plant-backend-39w7.onrender.com
const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.10:8000';
const API_BASE_URL = `${API_BASE}/api`;

/**
 * Helper function to make API requests with authentication token
 */
const fetchWithToken = async (endpoint, options = {}) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    
    console.log(`[API] ${options.method || 'GET'} ${endpoint} - Token: ${token ? 'YES ✓' : 'MISSING ✗'}`);
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers.Authorization = `Token ${token}`;
    } else {
      console.warn(`[API] WARNING: No token available for ${endpoint}`);
    }
    
    let response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (networkError) {
      console.error(`Network error on ${endpoint}:`, networkError);
      throw {
        status: 0,
        message: 'Network request failed. Check your connection and server status.',
        error: networkError.message,
      };
    }
    
    if (!response.ok) {
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw {
          status: response.status,
          message: 'Server error',
          error: e.message,
        };
      }
      throw {
        status: response.status,
        message: data.detail || data.message || 'An error occurred',
        data,
      };
    }
    
    // Handle 204 No Content (successful DELETE)
    if (response.status === 204) {
      return { success: true };
    }
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw {
        status: response.status,
        message: 'Invalid response from server',
        error: e.message,
      };
    }
    
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Authentication API endpoints
 */
export const authAPI = {
  /**
   * Register a new user
   */
  register: async (username, email, password) => {
    try {
      // Extra safety: trim values at API layer
      let trimmedUsername = username.trim();
      const trimmedEmail = email.trim();
      
      // NOW: Backend handles spaces! Don't convert them
      console.log('[AUTH] Registering user:', trimmedUsername);
      const response = await fetch(`${API_BASE_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password,
          password_confirm: password,
        }),
      });
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw {
          status: response.status,
          message: 'Invalid response from server',
          error: e.message,
        };
      }
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.detail || data.message || 'Registration failed',
          data,
        };
      }
      
      return data;
    } catch (networkError) {
      console.error('Registration network error:', networkError);
      throw {
        status: 0,
        message: 'Network request failed. Check your connection and server status.',
        error: networkError.message,
      };
    }
  },

  /**
   * Login user and get token
   */
  login: async (username, password) => {
    try {
      // Extra safety: trim username at API layer
      let trimmedUsername = username.trim();
      
      // NOW: Backend handles spaces! Don't convert them
      console.log(`[AUTH] Attempting login for user: ${trimmedUsername}`);
      console.log(`[AUTH] Login endpoint: ${API_BASE}/api/users/login/`);
      
      const response = await fetch(`${API_BASE}/api/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password }),
      });
      
      console.log(`[AUTH] Response status: ${response.status}`);
      
      let data;
      try {
        data = await response.json();
        console.log(`[AUTH] Response data:`, data);
      } catch (e) {
        console.error('[AUTH] JSON parse error:', e);
        throw {
          status: response.status,
          message: 'Invalid response from server',
          error: e.message,
        };
      }
      
      if (!response.ok) {
        const errorMsg = data.detail || data.message || data.non_field_errors?.[0] || 'Login failed';
        console.error(`[AUTH] Login failed: ${errorMsg}`, data);
        throw {
          status: response.status,
          message: errorMsg,
          data,
        };
      }
      
      console.log('[AUTH] Login successful, token:', data.token?.substring(0, 10) + '...');
      return data;
    } catch (error) {
      console.error('[AUTH] Login error:', error);
      console.error('[AUTH] Error status:', error.status);
      console.error('[AUTH] Error message:', error.message);
      console.error('[AUTH] Full error object:', JSON.stringify(error, null, 2));
      
      // Only treat as network error if it's actually a network error
      if (error.status === 0 || error.message?.includes('fetch failed')) {
        throw {
          status: 0,
          message: 'Cannot connect to server. Make sure your phone is on the same WiFi network and Django is running.',
          error: error.message,
        };
      }
      
      // Re-throw other errors as-is so they can be properly handled
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: () => fetchWithToken('/users/me/'),

  /**
   * Logout (delete token)
   */
  logout: () => fetchWithToken('/users/logout/', { method: 'POST' }),
};

/**
 * Plants API endpoints
 */
export const plantsAPI = {
  /**
   * Get all plants for current user
   */
  getAllPlants: () => fetchWithToken('/plants/'),

  /**
   * Get a specific plant by ID
   */
  getPlant: (plantId) => fetchWithToken(`/plants/${plantId}/`),

  /**
   * Create a new plant
   */
  createPlant: (plantData) =>
    fetchWithToken('/plants/', {
      method: 'POST',
      body: JSON.stringify(plantData),
    }),

  /**
   * Update an existing plant
   */
  updatePlant: (plantId, plantData) =>
    fetchWithToken(`/plants/${plantId}/`, {
      method: 'PUT',
      body: JSON.stringify(plantData),
    }),

  /**
   * Delete a plant
   */
  deletePlant: (plantId) =>
    fetchWithToken(`/plants/${plantId}/`, {
      method: 'DELETE',
    }),

  /**
   * Water a plant and record in history
   */
  waterPlant: (plantId, notes = '') =>
    fetchWithToken(`/plants/${plantId}/water/`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    }),

  /**
   * Get plants that need watering (moisture < 40%)
   */
  getPlantsNeedingWater: () => fetchWithToken('/plants/needing_water/'),

  /**
   * Get statistics about plants
   */
  getStats: () => {
    console.log('[STATS] Fetching plant statistics');
    return fetchWithToken('/plants/stats/').then(data => {
      console.log('[STATS] Received:', data);
      return data;
    }).catch(error => {
      console.error('[STATS] Error:', error);
      throw error;
    });
  },
};

/**
 * Watering History API endpoints
 */
export const historyAPI = {
  /**
   * Get all watering history for current user
   */
  getHistory: () => fetchWithToken('/watering-history/'),

  /**
   * Get watering history for a specific plant
   */
  getPlantHistory: (plantId) =>
    fetchWithToken(`/watering-history/by_plant/?plant_id=${plantId}`),
};

export default {
  authAPI,
  plantsAPI,
  historyAPI,
};
