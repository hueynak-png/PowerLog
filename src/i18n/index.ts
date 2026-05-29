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

async function detectLanguage(): Promise<'en' | 'zh-CN'> {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'zh-CN') return saved;
  } catch { /* ignore */ }
  return resolveLocale(deviceLocale);
}

// Override changeLanguage to persist preference
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng: string | undefined) => {
  const result = await originalChangeLanguage(lng);
  if (lng) {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch { /* ignore */ }
  }
  return result;
};

// Initialize with saved preference
detectLanguage().then((lng) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { common: en },
      'zh-CN': { common: zhCN },
    },
    lng,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;
