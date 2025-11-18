import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function DailySummary({ dailyLog }) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [activity, setActivity] = useState('');
  const [entries, setEntries] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Données simulées pour le graphique (dans une vraie application, cela viendrait d'une API)
  useEffect(() => {
    const mockData = [
      { date: '01/11', weight: 115, calories: 2200, activity: 45 },
      { date: '02/11', weight: 114, calories: 2100, activity: 30 },
      { date: '03/11', weight: 114, calories: 2300, activity: 60 },
      { date: '04/11', weight: 113, calories: 2000, activity: 45 },
      { date: '05/11', weight: 113, calories: 2150, activity: 30 },
      { date: '06/11', weight: 112, calories: 1900, activity: 60 },
      { date: '07/11', weight: 112, calories: 2050, activity: 45 }
    ];
    setChartData(mockData);
    setEntries(mockData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      weight: parseFloat(weight) || 0,
      calories: parseInt(calories) || 0,
      activity: parseInt(activity) || 0
    };
    
    // Ajouter la nouvelle entrée aux données existantes
    const updatedData = [...chartData, newEntry];
    setChartData(updatedData);
    setEntries(updatedData);
    
    // Réinitialiser les champs du formulaire
    setWeight('');
    setCalories('');
    setActivity('');
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec les informations du profil */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('dailyTracker')}</h2>
            <p className="text-gray-600 mt-1">{t('track_your_progress')}</p>
          </div>
        </div>
      </div>

      {/* Formulaire de suivi */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('add_daily_entry')}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('todayWeight')} (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="112"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('caloriesConsumed')}
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('activityMinutes')}
            </label>
            <input
              type="number"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="30"
            />
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {t('saveEntry')}
            </button>
          </div>
        </form>
      </div>

      {/* Graphique de progression */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('progressChart')}</h3>
        
        {chartData.length > 0 ? (
          <div className="space-y-8">
            {/* Graphique du poids */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">{t('weight_trend')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      tick={{ fontSize: 12 }}
                      domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Graphique des calories et activité */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">{t('calories_and_activity')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Bar 
                      dataKey="calories" 
                      fill="#3b82f6" 
                      name={t('calories')}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="activity" 
                      fill="#8b5cf6" 
                      name={t('activityMinutes')}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noDataChart')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('add_entries_to_see_chart')}</p>
          </div>
        )}
      </div>

      {/* Historique des entrées */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('entry_history')}</h3>
        {entries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('weight')} (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('calories')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('activityMinutes')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.slice().reverse().map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.calories}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{t('no_entries_yet')}</p>
        )}
      </div>
    </div>
  );
}

export default DailySummary;