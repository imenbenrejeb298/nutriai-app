/**
 * API / Environment Configuration
 */

export const isElectron = () => {
  // ... isElectron function is unchanged
};

const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment ? 'http://localhost:9999' : '';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  generatePlan: `${API_BASE_URL}/api/generate-meal-plan`,
  entries: `${API_BASE_URL}/api/entries`,
  // Add other endpoints as you build them
};
