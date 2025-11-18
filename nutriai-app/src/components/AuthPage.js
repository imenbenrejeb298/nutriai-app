import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../api/config';

function AuthPage({ onAuth }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const url = `${API_BASE_URL}/auth/${mode}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'auth_failed');
      }
      if (data.token) localStorage.setItem('nutriai.token', data.token);
      if (data.profile_id) localStorage.setItem('nutriai.profile_id', data.profile_id);
      onAuth && onAuth({ token: data.token, profile_id: data.profile_id });
    } catch (err) {
      console.error('Auth error:', err);
      setError(t('network_error'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">NutriAI</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' ? 'Vous avez déjà un compte ? Connectez-vous' : 'Créez votre compte pour commencer'}
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-lg font-medium text-gray-900 mb-6">{mode === 'login' ? 'Login' : 'Register'}</h2>
          {error && <div className="mb-4 rounded-md bg-red-50 p-4"><div className="flex"><div className="ml-3"><h3 className="text-sm font-medium text-red-800">{error}</h3></div></div></div>}
          <form className="space-y-6" onSubmit={submit}>
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                <div className="mt-1"><input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" /></div>
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <div className="mt-1"><input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" /></div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="mt-1"><input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" /></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Se souvenir de moi</label>
              </div>
              <div className="text-sm"><a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Mot de passe perdu ?</a></div>
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50">
                {isLoading ? 'Chargement...' : (mode === 'login' ? 'Login' : 'Créer un compte')}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <p>Ou <button onClick={() => setMode('register')} className="font-medium text-emerald-600 hover:text-emerald-500">créez un compte gratuitement</button></p>
            ) : (
              <p>Vous avez déjà un compte ? <button onClick={() => setMode('login')} className="font-medium text-emerald-600 hover:text-emerald-500">Connectez-vous</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
