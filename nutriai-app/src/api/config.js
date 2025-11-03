/**
 * API Configuration for Netlify deployment.
 * The API is now served from the same domain as the frontend,
 * under the `/.netlify/functions/api` path, which is rewritten from `/api`.
 */

// When deployed on Netlify, all calls to /api/* will be redirected to our function.
// In local development, we will use the Netlify Dev server which simulates this.
export const API_BASE_URL = ''; // No base URL needed, requests are relative to the site itself
