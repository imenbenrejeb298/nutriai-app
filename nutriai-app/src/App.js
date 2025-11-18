import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './i18n'; // Initialize i18n

import AuthPage from './components/AuthPage';
import OnboardingProcess from './components/OnboardingProcess';
import Dashboard from './components/Dashboard';
import AIEperts from './locales/AIEperts';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';

// Import des nouveaux composants à créer
import MealPlan from './components/MealPlan';
import ChefAssistant from './components/ChefAssistant';
import Recipes from './components/Recipes';
import Challenges from './components/Challenges';
import ShoppingList from './components/ShoppingList';

// Import de la fonction isElectron
import { isElectron } from './api/config';

// Layout component
function MainLayout({ children, currentUser, onLogout }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} currentUser={currentUser} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
           <h1 className="text-xl font-bold text-gray-900">Nutri AI</h1>
           <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
           </button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState({ token: null, profile_id: null });
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  // This effect should only run ONCE on startup.
  useEffect(() => {
    const profileKey = isElectron() ? 'local_profile' : localStorage.getItem('nutriai.profile_id');
    const token = isElectron() ? 'electron_user' : localStorage.getItem('nutriai.token');

    if (token && profileKey) {
      setAuth({ token, profile_id: profileKey });
      const savedProfile = localStorage.getItem(`nutriai.profile.${profileKey}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } else {
      setProfile(null); // Ensure profile is cleared if no auth
    }
    setIsLoading(false);
  }, []); // CORRECTED: The dependency array is now empty.

  const handleAuth = (authData) => {
    localStorage.setItem('nutriai.token', authData.token);
    localStorage.setItem('nutriai.profile_id', authData.profile_id);
    setAuth(authData);
  };

  const handleOnboardingComplete = (profileData) => {
    localStorage.setItem(`nutriai.profile.${auth.profile_id}`, JSON.stringify(profileData));
    setProfile(profileData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: null, profile_id: null });
    setProfile(null);
  };

  if (isLoading) {
    return <div className="bg-neutral-900 min-h-screen" />;
  }

  return (
    <Router>
      <div className="App">
        {showWelcome ? (
          <Welcome onStart={() => setShowWelcome(false)} />
        ) : !auth.token ? (
          <AuthPage onAuth={handleAuth} />
        ) : !profile ? (
          <OnboardingProcess onOnboardingComplete={handleOnboardingComplete} />
        ) : (
          <MainLayout currentUser={profile} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Dashboard profile={profile} />} />
              <Route path="/experts" element={<AIEperts />} />
              {/* Ajout des nouvelles routes */}
              <Route path="/plan" element={<MealPlan profile={profile} />} />
              <Route path="/chef" element={<ChefAssistant profile={profile} />} />
              <Route path="/recipes" element={<Recipes profile={profile} />} />
              <Route path="/challenges" element={<Challenges profile={profile} />} />
              <Route path="/shopping" element={<ShoppingList profile={profile} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainLayout>
        )}
      </div>
    </Router>
  );
}

export default App;
