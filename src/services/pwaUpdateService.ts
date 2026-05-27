import { Platform } from 'react-native';

type UpdateListener = () => void;

const listeners = new Set<UpdateListener>();
let updateAvailable = false;

const notify = () => {
  updateAvailable = true;
  listeners.forEach((listener) => listener());
};

if (Platform.OS === 'web' && typeof window !== 'undefined') {
  window.addEventListener('powerlog:update-available', notify);
}

export const hasPwaUpdateAvailable = (): boolean => updateAvailable;

export const subscribeToPwaUpdates = (listener: UpdateListener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const reloadForPwaUpdate = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.reload();
};
