import { useSyncExternalStore } from 'react';

const colorSchemeQuery = '(prefers-color-scheme: dark)';

const getColorScheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'light';
  }

  return window.matchMedia(colorSchemeQuery).matches ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const mediaQueryList = window.matchMedia(colorSchemeQuery);

  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', callback);
    return () => mediaQueryList.removeEventListener('change', callback);
  }

  mediaQueryList.addListener(callback);
  return () => mediaQueryList.removeListener(callback);
};

export function useColorScheme() {
  return useSyncExternalStore(subscribe, getColorScheme, () => 'light');
}
