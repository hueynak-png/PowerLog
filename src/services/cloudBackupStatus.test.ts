import { describe, expect, it } from '@jest/globals';

import { getCloudBackupCheckSuccessMessage, getCloudBackupStatusLabel } from './cloudBackupStatus';

describe('cloud backup status presentation', () => {
  it('uses explicit labels for idle, checking, empty-cloud, and error states', () => {
    expect(getCloudBackupStatusLabel('idle')).toBe('尚未检查云备份');
    expect(getCloudBackupStatusLabel('checking')).toBe('正在检查云备份');
    expect(getCloudBackupStatusLabel('initial-backup-required')).toBe('云端暂无备份');
    expect(getCloudBackupStatusLabel('error')).toBe('检查失败');
  });

  it('uses success copy only for a completed check', () => {
    expect(getCloudBackupCheckSuccessMessage({ state: 'synced' })).toBe('云备份已同步。');
    expect(getCloudBackupCheckSuccessMessage({ state: 'initial-backup-required' })).toBe('云端暂无备份，请确认本机数据后手动创建首次备份。');
    expect(getCloudBackupCheckSuccessMessage({ state: 'needs-choice' })).toBe('需要选择本机或云端数据。');
    expect(() => getCloudBackupCheckSuccessMessage({ state: 'error', lastError: 'Unauthorized' })).toThrow('Unauthorized');
  });
});
