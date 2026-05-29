import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en/common.json';
import zhCN from './locales/zh-CN/common.json';

const LANGUAGE_KEY = 'powerlog_language';

const deviceLocale = getLocales()[0]?.languageTag ?? 'en-US';

function resolveLocale(tag: string): 'en' | 'zh-CN' {
  if (tag.startsWith('zh')) return 'zh-CN';
  return 'en';
}

// Initialize synchronously first — app must render immediately
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { common: en },
    'zh-CN': { common: zhCN },
  },
  lng: resolveLocale(deviceLocale),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

// Load saved language preference in background (non-blocking)
AsyncStorage.getItem(LANGUAGE_KEY)
  .then((saved) => {
    if (saved === 'en' || saved === 'zh-CN') {
      i18n.changeLanguage(saved);
    }
  })
  .catch(() => {});

// Persist language choice when user toggles
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng: string | undefined) => {
  const result = await originalChangeLanguage(lng);
  if (lng) {
    AsyncStorage.setItem(LANGUAGE_KEY, lng).catch(() => {});
  }
  return result;
};

export default i18n;
