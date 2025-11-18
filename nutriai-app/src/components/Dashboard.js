import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateMealPlan } from '../api/aiClient';
import DailySummary from './dashboard/DailySummary';
import ProfileForm from './ProfileForm';

function Dashboard({ profile, onLogout }) {
  const { t } = useTranslation();
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [dailyLog, setDailyLog] = useState({ calories_consumed: 0, activity_minutes: 0 });

  // Données pour le graphique de progression
  const progressData = [
    { name: 'Lun', calories: 4000, goal: 2400 },
    { name: 'Mar', calories: 3000, goal: 2400 },
    { name: 'Mer', calories: 2000, goal: 2400 },
    { name: 'Jeu', calories: 2780, goal: 2400 },
    { name: 'Ven', calories: 1890, goal: 2400 },
    { name: 'Sam', calories: 2390, goal: 2400 },
    { name: 'Dim', calories: 3490, goal: 2400 },
  ];

  const expertsPreview = [
    { id: 1, name: 'Dr. Olivia Dubois', role: t('expert_role_nutritionist'), color: 'from-emerald-500 to-emerald-600' },
    { id: 2, name: 'Alexandre Moreau', role: t('expert_role_coach'), color: 'from-orange-500 to-orange-600' },
    { id: 3, name: 'Professeur IA', role: t('expert_role_educator'), color: 'from-indigo-500 to-indigo-600' },
  ];

  async function handleGeneratePlan() {
    setIsLoadingPlan(true);
    try {
      const plan = await generateMealPlan(profile);
      setMealPlan(plan);
    } catch (err) {
      console.error('Failed to generate plan:', err);
    } finally {
      setIsLoadingPlan(false);
    }
  }

  const handleLogCalories = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const calories = parseInt(formData.get('calories') || '0');
    setDailyLog(prev => ({
      ...prev,
      calories_consumed: prev.calories_consumed + calories
    }));
    e.target.reset();
  };

  // Calcul de l'IMC
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Catégorie d'IMC
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return t('underweight');
    if (bmi < 25) return t('normal');
    if (bmi < 30) return t('overweight');
    return t('obese');
  };

  const bmi = calculateBMI(profile?.weight, profile?.height);
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-8">
      {/* Section de bienvenue */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('welcome_dashboard', { name: profile?.name || 'Utilisateur' })}</h1>
            <p className="text-gray-600 mt-1">{t('dashboard_subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={handleGeneratePlan}
            disabled={isLoadingPlan}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {isLoadingPlan ? t('generating') : t('generate_my_plan')}
          </button>
        </div>
      </div>

      {/* Résumé du profil */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('yourProfile')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('name')}</h3>
              <p className="text-lg font-semibold text-gray-900">{profile?.name || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('weight')}</h3>
              <p className="text-lg font-semibold text-gray-900">{profile?.weight || 'N/A'} kg</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('height')}</h3>
              <p className="text-lg font-semibold text-gray-900">{profile?.height || 'N/A'} cm</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('bmi')}</h3>
              <p className="text-lg font-semibold text-gray-900">{bmi} ({bmiCategory})</p>
            </div>
          </div>
          
          {profile?.conditions && profile.conditions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">{t('conditions')}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.conditions.map((condition, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {t(condition)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conseil personnalisé */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('personal_advice')}</h2>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-emerald-700">
                  {bmi < 18.5 && t('gain_weight_advice')}
                  {bmi >= 18.5 && bmi < 25 && t('maintain_weight_advice')}
                  {bmi >= 25 && bmi < 30 && t('lose_weight_advice')}
                  {bmi >= 30 && t('medical_advice')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suivi quotidien */}
      <DailySummary dailyLog={dailyLog} />

      {/* Plan de repas */}
      {mealPlan && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('meal_plan_title')}</h2>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-emerald-800">
              {t(mealPlan.summary_key, mealPlan.summary_params)}
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-3">{t('meals')}</h3>
              <div className="space-y-3">
                {mealPlan.meals && mealPlan.meals.map((meal, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900">{t(meal.name_key)}</h4>
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
            
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-3">{t('exercises')}</h3>
              <div className="space-y-3">
                {mealPlan.exercises && mealPlan.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start border border-gray-200 rounded-lg p-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100">
                        <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">{t(exercise.name_key)}</h4>
                      <p className="text-sm text-gray-500 mt-1">{t('caloriesBurned', { count: exercise.calories_burned })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ProfileForm />
    </div>
  );
}

export default Dashboard;