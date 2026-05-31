import '@testing-library/react-native/extend-expect';

// Mock expo-sqlite for repository tests that need a DB handle
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
}));

// Mock AsyncStorage for store/service tests
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock expo-localization for i18n tests
jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageTag: 'en-US' }]),
}));

// Mock expo-font for component tests
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, null]),
}));
