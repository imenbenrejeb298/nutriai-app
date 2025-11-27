import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Home,
  User,
  Utensils,
  ShoppingCart,
  Brain,
  Trophy,
  BookOpen,
  CreditCard,
  LogOut,
  Globe
} from 'lucide-react';

function Sidebar() {
  const { t, i18n } = useTranslation(); // We get both t and i18n instance
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('profileId');
    navigate('/auth');
  };

  // CORRECTED: This function now correctly uses the 'i18n' instance
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const menuItems = [
    { icon: Home, labelKey: 'menu_dashboard', path: '/tableau-de-bord' },
    { icon: User, labelKey: 'menu_profile', path: '/profil' },
    { icon: Utensils, labelKey: 'menu_meal_plan', path: '/plan-repas' },
    { icon: ShoppingCart, labelKey: 'menu_shopping', path: '/liste-courses' },
    { icon: Brain, labelKey: 'menu_experts', path: '/experts-ia' },
    { icon: Trophy, labelKey: 'menu_challenges', path: '/defis' },
    { icon: BookOpen, labelKey: 'menu_recipes', path: '/recettes' },
    { icon: CreditCard, labelKey: 'menu_subscription', path: '/abonnement' },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-emerald-600">{t('appTitle')}</h1>
      </div>
      
      <nav className="mt-5 flex-1">
        <ul>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {/* Labels are now translated using the key */}
                  <span>{t(item.labelKey)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="mb-4">
          <div className="flex items-center text-gray-700 mb-2">
            <Globe className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{t('language')}</span>
          </div>
          <select
            value={i18n.language}
            // CORRECTED: The onChange now calls the corrected function
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
