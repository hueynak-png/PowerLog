import { Platform } from 'react-native';

export const isWebAccessEnabled = Platform.OS === 'web';

export const logoutWebAccess = async (): Promise<void> => {
  if (!isWebAccessEnabled) return;

  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to lock the application');
  }

  window.location.reload();
};
