import React, { useState, useEffect } from 'react';
import { calculateBMI, bmiCategory, bmiAdvice } from '../utils/bmi';
import { generateMealPlan } from '../api/aiClient';
import { useI18n } from '../i18n';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Heart, Zap, BookOpen, Dumbbell, Activity } from 'lucide-react'; // Import icons

function DailyProgressChart({ entries }) {
  const { t } = useI18n();
  const data = (entries || []).slice(-30);
  if (!data.length) {
    return <div className="text-center text-gray-500 py-8">{t('noDataChart')}</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: t('calories'), angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: t('weight'), angle: -90, position: 'insideRight' }} />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="calories_consumed" fill="#8884d8" name={t('calories')} />
        <Bar yAxisId="right" dataKey="weight" fill="#82ca9d" name={t('weight')} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ProfileForm() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [conditions, setConditions] = useState({ diabetes: false, hypertension: false, other: false });
  const [bmi, setBmi] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [entryWeight, setEntryWeight] = useState('');
  const [entryCalories, setEntryCalories] = useState('');
  const [entryActivity, setEntryActivity] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('nutriai.profile');
      if (raw) {
        const p = JSON.parse(raw);
        setName(p.name || '');
        setWeight(p.weight || '');
        setHeight(p.height || '');
        setConditions(p.conditions || { diabetes: false, hypertension: false, other: false });
        const computed = calculateBMI(p.weight, p.height);
        setBmi(computed);
      }
    } catch (e) { console.warn('Could not load profile', e); }
  }, []);

  useEffect(() => {
    import('../api/entriesClient').then(m => {
      m.listEntries().then(setEntries).catch(err => console.warn('Failed to load entries', err));
    });
  }, []);

  function saveProfile(e) {
    e && e.preventDefault();
    const profile = { name, weight, height, conditions };
    localStorage.setItem('nutriai.profile', JSON.stringify(profile));
    const computed = calculateBMI(weight, height);
    setBmi(computed);
    alert(t('profileSaved'));
  }

  async function handleGenerate() {
    setIsLoading(true);
    setMealPlan(null);
    const profile = { name, weight, height, conditions };
    try {
      const plan = await generateMealPlan(profile);
      setMealPlan(plan);
    } catch (err) {
      console.error(err);
      alert(t('aiError'));
    } finally {
      setIsLoading(false);
    }
  }

  async function saveEntry(e) {
    e && e.preventDefault();
    const entry = {
      date: new Date().toISOString().slice(0, 10),
      weight: entryWeight || weight,
      calories_consumed: entryCalories ? Number(entryCalories) : null,
      activity_minutes: entryActivity ? Number(entryActivity) : null,
    };
    try {
      const { entries: updatedEntries } = await import('../api/entriesClient').then(m => m.saveEntry(entry));
      setEntries(updatedEntries);
      setEntryCalories('');
      setEntryActivity('');
      setEntryWeight('');
      alert(t('entrySaved'));
    } catch (err) {
      console.warn('Failed to save entry', err);
      alert(t('entrySaveError'));
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">

      <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><User size={32} className="text-blue-500" /> {t('yourProfile')}</h2>
        <form onSubmit={saveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block"><span className="text-gray-700 font-medium">{t('name')}</span><input type="text" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('namePlaceholder')} /></label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block"><span className="text-gray-700 font-medium">{t('weight')} (kg)</span><input type="number" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" /></label>
              <label className="block"><span className="text-gray-700 font-medium">{t('height')} (cm)</span><input type="number" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" /></label>
            </div>
          </div>
          <fieldset className="border rounded-lg p-4 bg-gray-50/50"><legend className="text-base font-medium text-gray-800 px-2 flex items-center gap-2"><Heart size={20} className="text-red-500"/> {t('conditions')}</legend><div className="flex flex-wrap gap-x-6 gap-y-4 mt-2"><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" checked={conditions.diabetes} onChange={(e) => setConditions({ ...conditions, diabetes: e.target.checked })} /> <span className="text-gray-700">{t('diabetes')}</span></label><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" checked={conditions.hypertension} onChange={(e) => setConditions({ ...conditions, hypertension: e.target.checked })} /> <span className="text-gray-700">{t('hypertension')}</span></label><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" checked={conditions.other} onChange={(e) => setConditions({ ...conditions, other: e.target.checked })} /> <span className="text-gray-700">{t('other')}</span></label></div></fieldset>
          <div className="flex items-center justify-between pt-2">
            <div>{bmi != null && (<div className="text-lg"><span className="font-bold">{t('bmi')}:</span> <span className="font-mono bg-gray-100 rounded-md px-3 py-1 text-gray-800">{bmi}</span> <span className="text-gray-600 font-semibold">({t(bmiCategory(bmi))})</span></div>)}</div>
            <div className="flex gap-4">
              <button type="submit" className="px-6 py-2 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105">{t('saveProfile')}</button>
              <button type="button" onClick={handleGenerate} disabled={isLoading} className="px-6 py-2 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 flex items-center gap-2"><Zap size={18} />{isLoading ? t('generating') : t('generatePlan')}</button>
            </div>
          </div>
        </form>
      </section>

      {isLoading && <div className="text-center py-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div><p className="mt-2">{t('aiLoading')}</p></div>}
      {mealPlan && (
        <section className="bg-white rounded-xl shadow-lg p-6 animate-fade-in hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t(mealPlan.summary_key, mealPlan.summary_params)}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2"><BookOpen className="text-green-500" /> {t('meals')}</h3>
              <div className="space-y-4">
                {mealPlan.meals.map((m, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-1">
                    <h4 className="font-bold text-gray-800">{t(m.title)} - <span className="font-semibold text-blue-600">{m.calories} kcal</span></h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                      {m.ingredients.map((ing, i) => (<li key={i}>{t(ing.name)} ({ing.calories} kcal)</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2"><Dumbbell className="text-red-500" /> {t('exercises')}</h3>
              <ul className="space-y-3">
                {mealPlan.exercises.map((ex, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
                    <div className="font-bold text-lg text-green-600">{ex.minutes}'</div>
                    <div>
                      <div className="font-semibold text-gray-800">{t(ex.name)}</div>
                      <div className="text-sm text-gray-500">{t('caloriesBurned', { count: ex.caloriesBurned })}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {bmi && <p className="mt-6 text-center text-gray-600 italic border-t pt-4">{t(bmiAdvice(bmi))}. {t('encouragement')}</p>}
        </section>
      )}

      <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><Activity size={32} className="text-green-500"/> {t('dailyTracker')}</h2>
        <form onSubmit={saveEntry} className="grid sm:grid-cols-3 gap-6 items-end">
          <label className="block"><span className="text-gray-700 font-medium">{t('todayWeight')} (kg)</span><input type="number" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={entryWeight} onChange={(e) => setEntryWeight(e.target.value)} placeholder={weight || '...'} /></label>
          <label className="block"><span className="text-gray-700 font-medium">{t('caloriesConsumed')}</span><input type="number" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={entryCalories} onChange={(e) => setEntryCalories(e.target.value)} placeholder="500" /></label>
          <label className="block"><span className="text-gray-700 font-medium">{t('activityMinutes')}</span><input type="number" className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={entryActivity} onChange={(e) => setEntryActivity(e.target.value)} placeholder="30" /></label>
          <div className="sm:col-span-3 text-center">
            <button type="submit" className="w-full sm:w-auto px-8 py-3 mt-2 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">{t('saveEntry')}</button>
          </div>
        </form>
        <div className="mt-8"><h3 className="text-xl font-semibold mb-4 text-gray-700">{t('progressChart')}</h3><DailyProgressChart entries={entries} /></div>
      </section>

    </div>
  );
}

export default ProfileForm;
