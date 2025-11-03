// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, Utensils, Activity, BookOpen, TrendingUp, Menu, X, Globe,
  Save, Calculator, AlertCircle, CheckCircle2, Plus, Trash2, Droplets, Scale, Smile, Calendar,
  Search, Heart, Clock, Users, Star, Filter, Sparkles, Bookmark, BookmarkCheck, Target, Dumbbell,
  ArrowRight, Award, Fire
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './i18n';

// ==================== COMPOSANTS UI ====================
const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'border border-gray-300 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = '', ...props }) => (
  <label className={`text-sm font-medium leading-none ${className}`} {...props}>
    {children}
  </label>
);

// ==================== STOCKAGE LOCAL ====================
const Storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ==================== PAGES ====================

// Layout Principal
const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const NavContent = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-2' : 'flex-col space-y-1'}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${mobile ? 'text-base' : ''}`}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                NutriAI
              </h1>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <NavContent />
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <select 
                value={language}
                onChange={e => {
                  setLanguage(e.target.value);
                  i18n.changeLanguage(e.target.value);
                }}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="en">🇬🇧 EN</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="es">🇪🇸 ES</option>
                <option value="ar">🇸🇦 AR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-72 bg-white p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                  NutriAI
                </h1>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <NavContent mobile={true} />
          </div>
        </div>
      )}
    </div>
  );
};

// Page d'Accueil
const HomePage = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = Storage.get('healthProfile');
    setProfile(userProfile);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="h-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full glass-effect border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              {t('letsStart')}
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              {t('setupProfile')}
            </p>
            <Button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
            >
              {t('completeProfile')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {t('welcome')}
        </h1>
        <p className="text-gray-600 text-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              {t('bmi')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {profile.bmi || "—"}
            </div>
            <p className="text-sm text-gray-500 mt-1">Poids normal</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-sky-500" />
              {t('calories')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
              1,850
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('todayStats')}</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              {t('water')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              2.0L
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('todayStats')}</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              {t('exercises')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              3
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('todayStats')}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            {t('quickActions')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => alert('Fonctionnalité journal à implémenter')}
              variant="outline"
              className="h-auto py-6 flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
            >
              <Utensils className="w-6 h-6 text-emerald-500" />
              <span className="font-medium">{t('logMeal')}</span>
            </Button>
            <Button
              onClick={() => alert('Fonctionnalité nutrition à implémenter')}
              variant="outline"
              className="h-auto py-6 flex-col gap-2 hover:bg-sky-50 hover:border-sky-300 transition-all"
            >
              <Sparkles className="w-6 h-6 text-sky-500" />
              <span className="font-medium">{t('findRecipe')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Page Profil
const ProfilePage = () => {
  const [language, setLanguage] = useState('fr');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activity_level: 'moderate',
    goal: 'weight_loss'
  });

  useEffect(() => {
    const savedProfile = Storage.get('healthProfile');
    if (savedProfile) {
      setFormData(savedProfile);
      setLanguage(savedProfile.language || 'fr');
    }
  }, []);

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    
    if (weight && height) {
      const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const handleSave = async () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
      setSaveStatus({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }

    setSaving(true);
    
    const profileData = {
      ...formData,
      bmi: calculateBMI(),
      language: language
    };

    Storage.set('healthProfile', profileData);
    
    setSaveStatus({ type: 'success', message: 'Profil sauvegardé avec succès !' });
    setTimeout(() => setSaveStatus(null), 3000);
    setSaving(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          {t('profileTitle')}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {t('profileSubtitle')}
        </p>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-lg ${
          saveStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {saveStatus.message}
        </div>
      )}

      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-500" />
            Informations Personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight">{t('weight')}</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t('height')}</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="175"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">{t('age')}</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">{t('gender')}</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Sélectionnez...</option>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">{t('activityLevel')}</Label>
            <select
              id="activity"
              value={formData.activity_level}
              onChange={(e) => handleInputChange('activity_level', e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="sedentary">Sédentaire</option>
              <option value="light">Légèrement actif</option>
              <option value="moderate">Modérément actif</option>
              <option value="active">Très actif</option>
              <option value="athlete">Athlète</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">{t('goals')}</Label>
            <select
              id="goal"
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="weight_loss">Perdre du poids</option>
              <option value="maintain">Maintenir le poids</option>
              <option value="weight_gain">Prendre du poids</option>
              <option value="muscle_gain">Prendre du muscle</option>
            </select>
          </div>

          {formData.weight && formData.height && (
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg border border-emerald-200">
              <div className="text-center">
                <div className="text-sm text-gray-600">Votre IMC</div>
                <div className="text-3xl font-bold text-emerald-600">{calculateBMI()}</div>
                <div className="text-sm text-gray-500 mt-1">Poids normal</div>
              </div>
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-3"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : t('saveProfile')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== APP PRINCIPALE ====================
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;