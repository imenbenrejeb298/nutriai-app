// src/components/api.js
const API_BASE_URL = '/.netlify/functions/api';

// Fonction générique pour faire des requêtes API
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text) {
      return null;
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentification
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Profil utilisateur
export const profileAPI = {
  getProfile: async (profileId) => {
    return apiRequest(`/user/profile/${profileId}`);
  },
  
  saveProfile: async (profileId, profileData) => {
    return apiRequest(`/user/profile/${profileId}`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },
};

// Plans de repas
export const mealPlanAPI = {
  generatePlan: async (profile) => {
    return apiRequest('/generate-meal-plan', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  },
};

// Suivi quotidien
export const trackingAPI = {
  getEntries: async (profileId) => {
    return apiRequest(`/entries/${profileId}`);
  },
  
  saveEntry: async (entryData) => {
    return apiRequest('/entries', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  },
};