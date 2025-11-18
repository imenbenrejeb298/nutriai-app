import { API_ENDPOINTS } from './config';

// This is a simplified client. We will only keep the meal plan generation for now.

export async function generateMealPlan(profile) {
  try {
    const response = await fetch(API_ENDPOINTS.generatePlan, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile || {}),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
}
