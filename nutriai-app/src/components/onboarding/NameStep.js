import React from 'react';
import { useTranslation } from 'react-i18next'; // CORRECTED

function NameStep({ name, setName, onNext }) {
  const { t } = useTranslation(); // CORRECTED

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome_q_name')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          className="w-full text-center text-2xl px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
          placeholder={t('name_placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-400"
          disabled={!name.trim()}
        >
          {t('next_step')}
        </button>
      </form>
    </div>
  );
}

export default NameStep;
