import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { profileAPI } from './api';

function ProfileSetup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    healthConditions: [],
    goals: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const profileId = localStorage.getItem('profileId');
    if (!token) {
      navigate('/auth');
    }
    // Vous pouvez charger le profil existant ici si nécessaire
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHealthConditionChange = (condition) => {
    setProfile(prev => {
      const conditions = prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(c => c !== condition)
        : [...prev.healthConditions, condition];
      
      return {
        ...prev,
        healthConditions: conditions
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const profileId = localStorage.getItem('profileId');
      if (profileId) {
        await profileAPI.saveProfile(profileId, profile);
        // Rediriger vers le tableau de bord après sauvegarde
        navigate('/tableau-de-bord');
      }
    } catch (err) {
      console.error('Profile save error:', err);
      setError(t('profile_save_error'));
    } finally {
      setLoading(false);
    }
  };

  const healthConditions = [
    'diabetes',
    'hypertension',
    'heart_disease',
    'allergies',
    'none'
  ];

  const activityLevels = [
    { value: 'sedentary', label: t('activity_sedentary') },
    { value: 'light', label: t('activity_light') },
    { value: 'moderate', label: t('activity_moderate') },
    { value: 'active', label: t('activity_active') },
    { value: 'very_active', label: t('activity_very_active') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('profile_setup_title')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('profile_setup_subtitle')}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('age')}
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('weight')} (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={profile.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('height')} (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={profile.height}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('gender')}
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={profile.gender === 'male'}
                    onChange={handleChange}
                    className="text-emerald-600"
                  />
                  <span className="ml-2">{t('male')}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={profile.gender === 'female'}
                    onChange={handleChange}
                    className="text-emerald-600"
                  />
                  <span className="ml-2">{t('female')}</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                {t('activity_level')}
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={profile.activityLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              >
                <option value="">{t('select_activity_level')}</option>
                {activityLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('health_conditions')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {healthConditions.map(condition => (
                  <label key={condition} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.healthConditions.includes(condition)}
                      onChange={() => handleHealthConditionChange(condition)}
                      className="text-emerald-600 rounded"
                    />
                    <span className="ml-2 text-sm">{t(condition)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                {t('goals')}
              </label>
              <textarea
                id="goals"
                name="goals"
                value={profile.goals}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder={t('goals_placeholder')}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/tableau-de-bord')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('saving')}
                  </span>
                ) : (
                  t('save_profile')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;