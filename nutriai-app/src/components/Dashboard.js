import React from 'react';
import { useTranslation } from 'react-i18next';
import WeeklyProgressChart from './dashboard/WeeklyProgressChart';

function Dashboard({ profile }) {
  const { t } = useTranslation();

  // Données de démonstration pour le graphique
  const progressData = [
    { day: t('day_mon'), value: 4000 },
    { day: t('day_tue'), value: 3000 },
    { day: t('day_wed'), value: 5200 },
    { day: t('day_thu'), value: 2100 },
    { day: t('day_fri'), value: 4800 },
    { day: t('day_sat'), value: 4300 },
    { day: t('day_sun'), value: 5500 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{t('dashboard_title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Progress */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">{t('today_progress')}</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">1,800</p>
          <p className="text-xs text-gray-500">{t('calories_consumed')}</p>
        </div>

        {/* Calories Target */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">{t('calories_target_title')}</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">2,500</p>
          <p className="text-xs text-gray-500">{t('calories_target_subtitle')}</p>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">{t('weekly_goals')}</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">3/5</p>
          <p className="text-xs text-gray-500">{t('goals_completed')}</p>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">{t('ai_insights')}</h2>
          <p className="mt-1 text-base text-gray-900">{t('ai_recommendation')}</p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('weekly_progress')}</h2>
        <div className="h-72">
          <WeeklyProgressChart data={progressData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
