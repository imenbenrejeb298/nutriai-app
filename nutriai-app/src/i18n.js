import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  es: { translation: es },
  ar: { translation: ar }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en',
    debug: true, // Activer le debug pour voir les changements
    interpolation: {
      escapeValue: false
    }
  });

// Charger la langue sauvegardée après l'initialisation
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['fr', 'en', 'es', 'ar'].includes(savedLanguage)) {
    i18n.changeLanguage(savedLanguage);
  }
}

export default i18n;