import type { CloudBackupState, SyncStatusMeta } from './syncService';

export const getCloudBackupStatusLabel = (state: CloudBackupState | undefined): string => {
  switch (state) {
    case 'synced': return '已同步';
    case 'pending': return '等待上传';
    case 'uploading': return '正在上传';
    case 'offline': return '离线，等待恢复网络';
    case 'remote-update': return '云端有更新';
    case 'conflict': return '同步冲突';
    case 'needs-choice': return '需要选择本机或云端数据';
    case 'unavailable': return '云备份配置不可用';
    case 'error': return '检查失败';
    case 'checking': return '正在检查云备份';
    case 'idle':
    default: return '尚未检查云备份';
  }
};

export const getCloudBackupCheckSuccessMessage = (status: SyncStatusMeta): string => {
  if (status.state === 'error' || status.state === 'unavailable') {
    throw new Error(status.lastError ?? getCloudBackupStatusLabel(status.state));
  }

  switch (status.state) {
    case 'synced': return '云备份已同步。';
    case 'pending': return '云端暂无备份，等待上传。';
    case 'needs-choice': return '需要选择本机或云端数据。';
    case 'remote-update': return '云端有更新，需要选择处理方式。';
    case 'conflict': return '检测到同步冲突，需要手动选择。';
    default: return '已检查云端备份状态。';
  }
};
