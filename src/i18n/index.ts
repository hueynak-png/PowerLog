import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en/common.json';
import zhCN from './locales/zh-CN/common.json';

const deviceLocale = getLocales()[0]?.languageTag ?? 'en-US';

function resolveLocale(tag: string): 'en' | 'zh-CN' {
  if (tag.startsWith('zh')) return 'zh-CN';
  return 'en';
}

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

export default i18n;
