import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your machine's IP address. Find it by running 'ipconfig' in PowerShell
// Look for "IPv4 Address" (typically 192.168.x.x)
// For Android emulator (MEmu): try 192.168.1.10 or 10.0.2.2
// For physical phone on same WiFi: use 192.168.1.10
// For development on same machine: use localhost
const API_BASE = 'http://192.168.1.10:8000';  // Using physical IP for both MEmu and physical phone
const API_BASE_URL = `${API_BASE}/api`;

/**
 * Helper function to make API requests with authentication token
 */
const fetchWithToken = async (endpoint, options = {}) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers.Authorization = `Token ${token}`;
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
        message: data.detail || data.message || 'An error occurred',
        data,
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
      const response = await fetch(`${API_BASE_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
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
      console.log(`[AUTH] Attempting login for user: ${username}`);
      console.log(`[AUTH] Login endpoint: ${API_BASE}/api-token-auth/`);
      
      const response = await fetch(`${API_BASE}/api-token-auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
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
      if (error.message?.includes('Network')) {
        throw {
          status: 0,
          message: 'Cannot connect to server. Make sure your phone is on the same WiFi network and Django is running.',
          error: error.message,
        };
      }
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
