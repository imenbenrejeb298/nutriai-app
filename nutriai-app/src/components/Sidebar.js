import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  UtensilsCrossed, 
  ChefHat, 
  BookOpen, 
  Trophy, 
  ShoppingCart,
  User,
  Lock
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'menu_dashboard', path: '/' },
  { id: 'experts', icon: Brain, labelKey: 'menu_experts', path: '/experts' },
  { id: 'mealPlan', icon: UtensilsCrossed, labelKey: 'menu_meal_plan', path: '/plan' },
  { id: 'chefAssistant', icon: ChefHat, labelKey: 'menu_chef', path: '/chef' },
  { id: 'recipes', icon: BookOpen, labelKey: 'menu_recipes', path: '/recipes' },
  { id: 'challenges', icon: Trophy, labelKey: 'menu_challenges', path: '/challenges' },
  { id: 'shopping', icon: ShoppingCart, labelKey: 'menu_shopping', path: '/shopping' },
];

function Sidebar({ isOpen, onClose, currentUser, onLogout }) {
  const { t, i18n } = useTranslation();
  const displayName = currentUser?.name || 'Utilisateur';

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col border-r border-gray-200`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{t('appTitle')}</div>
              <div className="text-sm text-gray-500">Assistant nutrition IA</div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{t(item.labelKey)}</span>
              </NavLink>
            ))}
          </nav>

          <div className="px-4 py-6 border-t border-gray-200 space-y-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{displayName}</div>
                <div className="text-xs text-gray-500">Préférences</div>
              </div>
            </div>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Débloquer mes accès
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Lock className="w-3 h-3" />
                {t('logout')}
              </button>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-transparent text-xs text-gray-500 focus:outline-none focus:ring-0 border-0"
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="ar">AR</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
