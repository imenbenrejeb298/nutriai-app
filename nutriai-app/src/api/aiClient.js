import { API_BASE_URL } from './config';

/**
 * API client for generating meal plans.
 * It calls the backend endpoint `/api/generate-meal-plan`.
 */

export async function generateMealPlan(profile) {
  const token = localStorage.getItem('nutriai.token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/api/generate-meal-plan`, {
    method: 'POST',
    headers,
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const errorPayload = await res.text();
    console.error('Backend returned an error:', errorPayload);
    throw new Error('Failed to generate meal plan from backend.');
  }

  const data = await res.json();
  return data;
}
