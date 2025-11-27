import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Challenges({ profile }) {
  const { t } = useTranslation();
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Données simulées de défis (dans une vraie application, cela viendrait d'une API)
  const mockChallenges = [
    {
      id: 1,
      title: t('challenge_7_days_water'),
      description: t('challenge_7_days_water_desc'),
      duration: 7,
      reward: t('challenge_reward_points', { count: 50 }),
      difficulty: 'easy',
      category: t('category_hydration')
    },
    {
      id: 2,
      title: t('challenge_30_days_exercise'),
      description: t('challenge_30_days_exercise_desc'),
      duration: 30,
      reward: t('challenge_reward_points', { count: 200 }),
      difficulty: 'medium',
      category: t('category_exercise')
    },
    {
      id: 3,
      title: t('challenge_vegetables_daily'),
      description: t('challenge_vegetables_daily_desc'),
      duration: 14,
      reward: t('challenge_reward_points', { count: 100 }),
      difficulty: 'easy',
      category: t('category_nutrition')
    },
    {
      id: 4,
      title: t('challenge_sleep_8_hours'),
      description: t('challenge_sleep_8_hours_desc'),
      duration: 21,
      reward: t('challenge_reward_points', { count: 150 }),
      difficulty: 'medium',
      category: t('category_sleep')
    },
    {
      id: 5,
      title: t('challenge_mindful_eating'),
      description: t('challenge_mindful_eating_desc'),
      duration: 10,
      reward: t('challenge_reward_points', { count: 75 }),
      difficulty: 'easy',
      category: t('category_habits')
    }
  ];

  const startChallenge = (challengeId) => {
    if (!activeChallenges.includes(challengeId)) {
      setActiveChallenges([...activeChallenges, challengeId]);
    }
  };

  const completeChallenge = (challengeId) => {
    if (activeChallenges.includes(challengeId)) {
      setActiveChallenges(activeChallenges.filter(id => id !== challengeId));
      if (!completedChallenges.includes(challengeId)) {
        setCompletedChallenges([...completedChallenges, challengeId]);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{t('menu_challenges')}</h1>
        <p className="text-gray-600 mt-1">{t('challenges_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('available_challenges')}</h2>
            <div className="space-y-4">
              {mockChallenges.map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {t(challenge.difficulty)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{challenge.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {challenge.duration} {t('days')}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {challenge.category}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-600">{challenge.reward}</span>
                    {activeChallenges.includes(challenge.id) ? (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        {t('mark_complete')}
                      </button>
                    ) : completedChallenges.includes(challenge.id) ? (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-500">
                        {t('completed')}
                      </span>
                    ) : (
                      <button
                        onClick={() => startChallenge(challenge.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        {t('start_challenge')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('your_progress')}</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{t('challenges_completed')}</span>
                  <span>{completedChallenges.length} / {mockChallenges.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${(completedChallenges.length / mockChallenges.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">{t('active_challenges')}</h3>
                {activeChallenges.length > 0 ? (
                  <ul className="space-y-2">
                    {activeChallenges.map((challengeId) => {
                      const challenge = mockChallenges.find(c => c.id === challengeId);
                      return challenge ? (
                        <li key={challengeId} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{challenge.title}</span>
                          <button
                            onClick={() => completeChallenge(challengeId)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            {t('complete')}
                          </button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">{t('no_active_challenges')}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-bold mb-2">{t('challenge_rewards')}</h2>
            <p className="text-emerald-100 text-sm mb-4">{t('challenge_rewards_desc')}</p>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{t('total_points')}</p>
                  <p className="text-2xl font-bold">{completedChallenges.length * 50}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;