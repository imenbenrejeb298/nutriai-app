import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Import i18n configuration FIRST
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';
import MealPlan from './components/MealPlan';
import ShoppingList from './components/ShoppingList';
import AIEperts from './components/AIEperts';
import Challenges from './components/Challenges';
import Recipes from './components/Recipes';
import Subscription from './components/Subscription';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/bienvenue" element={<WelcomePage />} />
          <Route path="/tableau-de-bord" element={<Dashboard />} />
          <Route path="/profil" element={<ProfileSetup />} />
          <Route path="/plan-repas" element={<MealPlan />} />
          <Route path="/liste-courses" element={<ShoppingList />} />
          <Route path="/experts-ia" element={<AIEperts />} />
          <Route path="/defis" element={<Challenges />} />
          <Route path="/recettes" element={<Recipes />} />
          <Route path="/abonnement" element={<Subscription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;