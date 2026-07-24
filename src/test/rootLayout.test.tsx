import { render } from '@testing-library/react-native';
import { type PropsWithChildren } from 'react';

let mockAuthenticated = false;
const mockInitializeApp = jest.fn();
const mockInitAI = jest.fn();
const mockInitializeAutoSync = jest.fn(() => jest.fn());

jest.mock('expo-font', () => ({ useFonts: jest.fn(() => [true, null]) }));
jest.mock('expo-splash-screen', () => ({ preventAutoHideAsync: jest.fn(), hideAsync: jest.fn() }));
jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));
jest.mock('expo-router', () => {
  const React = require('react');
  const Stack = ({ children }: PropsWithChildren) => React.createElement(React.Fragment, null, children);
  Stack.Screen = () => null;
  return { ErrorBoundary: () => null, Stack };
});
jest.mock('expo-router/head', () => ({ __esModule: true, default: ({ children }: PropsWithChildren) => children ?? null }));
jest.mock('react-native-reanimated', () => ({}));
jest.mock('@/components/useColorScheme', () => ({ useColorScheme: () => 'dark' }));
jest.mock('@/src/features/auth/WebAccessGate', () => {
  const React = require('react');
  return { WebAccessGate: ({ children }: PropsWithChildren) => mockAuthenticated ? React.createElement(React.Fragment, null, children) : null };
});
jest.mock('@/src/i18n', () => ({}));
jest.mock('@/src/stores/useAppStore', () => ({ useAppStore: () => mockInitializeApp }));
jest.mock('@/src/services/aiService', () => ({ initAI: mockInitAI }));
jest.mock('@/src/services/autoSyncService', () => ({ initializeAutoSync: mockInitializeAutoSync }));

let RootLayout: typeof import('../../app/_layout').default;

describe('RootLayout cloud backup lifecycle', () => {
  beforeAll(() => {
    RootLayout = require('../../app/_layout').default;
  });

  beforeEach(() => {
    mockAuthenticated = false;
    mockInitializeApp.mockClear();
    mockInitAI.mockClear();
    mockInitializeAutoSync.mockClear();
  });

  it('does not initialize automatic sync while WebAccessGate is locked', () => {
    render(<RootLayout />);

    expect(mockInitializeAutoSync).not.toHaveBeenCalled();
  });

  it('initializes automatic sync once after WebAccessGate renders authenticated content', () => {
    mockAuthenticated = true;
    render(<RootLayout />);

    expect(mockInitializeAutoSync).toHaveBeenCalledTimes(1);
  });
});
