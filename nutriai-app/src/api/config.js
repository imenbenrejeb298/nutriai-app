/**
 * API Configuration
 * Change the API_BASE_URL to your deployed backend server URL.
 */

// For local development, the proxy in package.json handles requests to the backend.
// For production builds (web, Android, iOS), we need the full public URL of the server.
export const API_BASE_URL = 'http://localhost:5000'; // <-- CHANGE THIS WHEN YOU DEPLOY YOUR BACKEND
