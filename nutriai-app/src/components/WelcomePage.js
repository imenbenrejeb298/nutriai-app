import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleStart = () => {
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('welcome_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            {t('welcome_subtitle')}
          </p>
          <button
            onClick={handleStart}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
          >
            {t('welcome_get_started')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;