import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateMealPlan } from '../api/aiClient';

function MealPlan({ profile }) {
  const { t } = useTranslation();
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    generatePlan();
  }, [profile]);

  async function generatePlan() {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateMealPlan(profile);
      setMealPlan(plan);
    } catch (err) {
      console.error('Failed to generate plan:', err);
      setError(t('aiError'));
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
          <p className="text-gray-600">{t('aiLoading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('menu_meal_plan')}</h1>
            <p className="text-gray-600 mt-1">{t('meal_plan_subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={generatePlan}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {t('generatePlan')}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {mealPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('meals')}</h2>
              <div className="space-y-6">
                {mealPlan.meals && mealPlan.meals.map((meal, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{t(meal.name_key)}</h3>
                    <ul className="mt-2 space-y-1">
                      {meal.ingredients && meal.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <svg className="h-4 w-4 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t(ingredient.key, ingredient.params)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('exercises')}</h2>
              <div className="space-y-4">
                {mealPlan.exercises && mealPlan.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100">
                        <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{t(exercise.name_key)}</h3>
                      <p className="text-sm text-gray-500 mt-1">{t('caloriesBurned', { count: exercise.calories_burned })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('summary')}</h2>
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="text-emerald-800">
                  {t(mealPlan.summary_key, mealPlan.summary_params)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlan;