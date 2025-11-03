import React, { createContext, useContext, useState } from 'react';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

const resources = { en, fr, es, ar };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('fr');

  const t = (key) => {
    const entry = resources[lang] && resources[lang][key];
    if (entry) return entry;
    // fallback to English
    return resources.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export default I18nContext;
