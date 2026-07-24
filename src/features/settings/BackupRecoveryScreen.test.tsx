import { render, waitFor } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  useRouter: () => ({}),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children }: { children: unknown }) =>
      React.createElement(View, null, children),
    useSafeAreaInsets: () => ({ top: 0 }),
  };
});

jest.mock('@/src/components/ui', () => {
  const React = require('react');
  const { Pressable, Text, View } = require('react-native');
  return {
    Button: ({ title, onPress }: { title: string; onPress: () => void }) =>
      React.createElement(
        Pressable,
        { accessibilityRole: 'button', onPress },
        React.createElement(Text, null, title),
      ),
    Card: ({ children }: { children: unknown }) =>
      React.createElement(View, null, children),
    SectionHeader: ({ title, subtitle }: { title: string; subtitle: string }) =>
      React.createElement(
        View,
        null,
        React.createElement(Text, null, title),
        React.createElement(Text, null, subtitle),
      ),
  };
});

jest.mock('@/src/hooks/useDatabase', () => ({
  useDatabase: () => ({}),
}));

jest.mock('@/src/services/snapshotBackupService', () => ({
  formatSnapshotSize: (sizeBytes: number) => `${sizeBytes} bytes`,
}));

jest.mock('@/src/services/backupRecoveryService', () => ({
  getBackupMeta: jest.fn(),
  getCurrentDbMeta: jest.fn(),
  listBackupKeys: jest.fn(),
  restoreFromBackup: jest.fn(),
}));

import {
  getBackupMeta,
  getCurrentDbMeta,
  listBackupKeys,
} from '@/src/services/backupRecoveryService';

import { BackupRecoveryScreen } from './BackupRecoveryScreen';

const mockGetBackupMeta = jest.mocked(getBackupMeta);
const mockGetCurrentDbMeta = jest.mocked(getCurrentDbMeta);
const mockListBackupKeys = jest.mocked(listBackupKeys);

describe('BackupRecoveryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCurrentDbMeta.mockResolvedValue({
      sizeBytes: 1_200_000,
      programCount: 1,
      workoutSessionCount: 0,
    });
    mockListBackupKeys.mockResolvedValue(['powerlog-db-backup-2026-07-24T00:00:00.000Z']);
    mockGetBackupMeta.mockResolvedValue({
      createdAt: '2026-07-24T00:00:00.000Z',
      sizeBytes: 1_200_000,
      programCount: 1,
      workoutSessionCount: 0,
    });
  });

  it('shows database size, plans, and workout sessions without calling a planned database empty', async () => {
    const screen = render(<BackupRecoveryScreen />);

    await waitFor(() => expect(screen.getByText('数据库大小')).toBeTruthy());

    expect(screen.getAllByText('1')).toHaveLength(1);
    expect(screen.getAllByText('0')).toHaveLength(1);
    expect(screen.getByText('计划：1')).toBeTruthy();
    expect(screen.getByText('训练记录：0')).toBeTruthy();
    expect(screen.queryByText('Empty')).toBeNull();
    expect(screen.queryByText('✗ Empty')).toBeNull();
    expect(screen.queryByText('暂无计划和训练记录')).toBeNull();
  });

  it('uses a neutral empty-data notice only when both plans and workout sessions are zero', async () => {
    mockGetCurrentDbMeta.mockResolvedValue({
      sizeBytes: 1_200_000,
      programCount: 0,
      workoutSessionCount: 0,
    });
    mockListBackupKeys.mockResolvedValue([]);

    const screen = render(<BackupRecoveryScreen />);

    await waitFor(() => {
      expect(screen.getByText('暂无计划和训练记录')).toBeTruthy();
    });
    expect(screen.queryByText('Empty')).toBeNull();
  });
});
