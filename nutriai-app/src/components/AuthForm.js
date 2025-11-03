import React, { useState } from 'react';

function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login'); // or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  async function submit(e) {
    e && e.preventDefault();
    setError(null);
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name }) });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Auth failed');
        return;
      }
      // store token
      if (data.token) localStorage.setItem('nutriai.token', data.token);
      if (data.profile_id) localStorage.setItem('nutriai.profile_id', data.profile_id);
      onAuth && onAuth({ token: data.token, profile_id: data.profile_id });
    } catch (err) {
      setError('Network error');
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-2">
        {mode === 'register' && (
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full border px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border px-2 py-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full border px-2 py-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" className="text-sm" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create account' : 'Have an account? Sign in'}</button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
