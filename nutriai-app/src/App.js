import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import './i18n'; // Initialize i18n

import AuthPage from './components/AuthPage';
import OnboardingProcess from './components/OnboardingProcess';
import Dashboard from './components/Dashboard';
import AIEperts from './locales/AIEperts';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import MealPlan from './components/MealPlan';
import ChefAssistant from './components/ChefAssistant';
import Recipes from './components/Recipes';
import Challenges from './components/Challenges';
import ShoppingList from './components/ShoppingList';
import { isElectron } from './api/config';

// Welcome page that navigates to auth page
function WelcomeWrapper() {
  const navigate = useNavigate();
  return <Welcome onStart={() => navigate('/auth')} />;
}

// Layout for the main app
function MainLayout({ children, currentUser, onLogout }) {
  // ... (MainLayout remains the same)
}

function App() {
  const [auth, setAuth] = useState({ token: null, profile_id: null });
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ... (useEffect logic remains the same)
    setIsLoading(false);
  }, []);

  const handleAuth = (authData) => {
    localStorage.setItem('nutriai.token', authData.token);
    localStorage.setItem('nutriai.profile_id', authData.profile_id);
    setAuth(authData);
  };

  const handleOnboardingComplete = (profileData) => {
    // ... (logic remains the same)
  };

  const handleLogout = () => {
    // ... (logic remains the same)
  };

  if (isLoading) {
    return <div className="bg-neutral-900 min-h-screen" />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/welcome" element={<WelcomeWrapper />} />
          <Route path="/auth" element={!auth.token ? <AuthPage onAuth={handleAuth} /> : <Navigate to="/" />} />
          
          <Route 
            path="/*" 
            element={
              auth.token ? (
                !profile ? (
                  <OnboardingProcess onOnboardingComplete={handleOnboardingComplete} />
                ) : (
                  <MainLayout currentUser={profile} onLogout={handleLogout}>
                    <Routes>
                      <Route path="/" element={<Dashboard profile={profile} />} />
                      <Route path="/experts" element={<AIEperts />} />
                      {/* Other routes */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </MainLayout>
                )
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
