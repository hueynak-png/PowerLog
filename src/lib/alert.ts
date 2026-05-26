import { Alert, Platform } from 'react-native';

/**
 * Cross-platform confirm dialog.
 * Uses window.confirm on web, Alert.alert on native.
 */
export const confirmAction = (
  title: string,
  message: string,
  onConfirm: () => void | Promise<void>,
): void => {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) {
      void onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: () => void onConfirm() },
    ]);
  }
};

/**
 * Cross-platform alert (info only, no action).
 */
export const showAlert = (title: string, message: string): void => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
