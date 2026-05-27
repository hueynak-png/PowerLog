import Constants from 'expo-constants';

export const getAppVersion = (): string => Constants.expoConfig?.version ?? '1.0.0';
