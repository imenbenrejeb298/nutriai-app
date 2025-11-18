import React from 'react';
import { useTranslation } from 'react-i18next'; // CORRECTED

function MeasurementsStep({ weight, setWeight, height, setHeight, onNext, onBack }) {
  const { t } = useTranslation(); // CORRECTED

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(weight) > 0 && Number(height) > 0) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('welcome_q_measurements')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="flex items-baseline space-x-4">
          <input
            type="number"
            className="w-full text-center text-3xl px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            autoFocus
          />
          <span className="text-2xl text-gray-500">kg</span>
        </div>
        <div className="flex items-baseline space-x-4">
          <input
            type="number"
            className="w-full text-center text-3xl px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
            placeholder="175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <span className="text-2xl text-gray-500">cm</span>
        </div>
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onBack} className="w-full bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition">
            {t('back_step')}
          </button>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-gray-400"
            disabled={!(Number(weight) > 0 && Number(height) > 0)}
          >
            {t('next_step')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MeasurementsStep;
