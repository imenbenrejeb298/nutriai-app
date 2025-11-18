import React from 'react';
import { useTranslation } from 'react-i18next'; // CORRECTED
import { Heart, ShieldCheck } from 'lucide-react';

function ConditionsStep({ conditions, setConditions, onFinish, onBack }) {
  const { t } = useTranslation(); // CORRECTED

  const toggleCondition = (key) => {
    setConditions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('welcome_q_conditions')}</h1>
      <p className="text-gray-500 mb-8 -mt-4">{t('conditions_subtitle')}</p>
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => toggleCondition('diabetes')}
          className={`w-full p-6 rounded-lg border-2 text-left text-xl font-semibold flex items-center gap-4 transition ${conditions.diabetes ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-500' : 'bg-white border-gray-300'}`}
        >
          <ShieldCheck className={`transition ${conditions.diabetes ? 'text-blue-500' : 'text-gray-400'}`} />
          {t('diabetes')}
        </button>
        <button
          onClick={() => toggleCondition('hypertension')}
          className={`w-full p-6 rounded-lg border-2 text-left text-xl font-semibold flex items-center gap-4 transition ${conditions.hypertension ? 'bg-red-100 border-red-500 ring-2 ring-red-500' : 'bg-white border-gray-300'}`}
        >
          <Heart className={`transition ${conditions.hypertension ? 'text-red-500' : 'text-gray-400'}`} />
          {t('hypertension')}
        </button>
      </div>
      <div className="flex gap-4 pt-8 w-full max-w-md">
        <button type="button" onClick={onBack} className="w-full bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition">
          {t('back_step')}
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          {t('finish_onboarding')}
        </button>
      </div>
    </div>
  );
}

export default ConditionsStep;
