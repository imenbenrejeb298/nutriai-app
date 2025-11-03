import React, { useEffect, useState } from 'react';
import './App.css';
import ProfileForm from './components/ProfileForm';
import AuthForm from './components/AuthForm';
import { I18nProvider, useI18n } from './i18n';

function Header() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">NutriAI</h1>
      <div className="flex items-center">
        <label htmlFor="lang" className="mr-2 text-sm">{t('language')}:</label>
        <select id="lang" value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white text-gray-800 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </header>
  );
}

function App() {
  const [auth, setAuth] = useState({ token: null, profile_id: null });

  useEffect(() => {
    const token = localStorage.getItem('nutriai.token');
    const profile_id = localStorage.getItem('nutriai.profile_id');
    if (token) setAuth({ token, profile_id });
  }, []);

  function handleLogout() {
    localStorage.clear(); // Clear all app data on logout
    setAuth({ token: null, profile_id: null });
  }

  return (
    <I18nProvider>
      <div className="App bg-gray-100 min-h-screen font-sans">
        <Header />
        <main className="p-4 md:p-8">
          {!auth.token ? (
            <AuthForm onAuth={(a) => setAuth(a)} />
          ) : (
            <div>
              <div className="flex justify-end mb-6">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  Sign out
                </button>
              </div>
              <ProfileForm />
            </div>
          )}
        </main>
      </div>
    </I18nProvider>
  );
}

export default App;
