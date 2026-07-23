import { Platform } from 'react-native';

const LEGACY_CONFIG_KEY = 'powerlog-sync-config';
const STATUS_KEY = 'ironbase-web-backup-status-v1';
const API_BASE = '/api/sync';

export interface SyncConfig { baseUrl: string; recoveryKey: string; clientId: string }
export interface RemoteSnapshotMeta {
  id: string; createdAt: string; sizeBytes: number; sha256: string; schemaVersion: number;
  appVersion?: string; platform?: string; clientId?: string;
}
interface SyncStatusResponse { syncId: string; createdAt: string; latestSnapshot: RemoteSnapshotMeta | null }
export type CloudBackupState = 'checking' | 'synced' | 'pending' | 'uploading' | 'offline' | 'remote-update' | 'conflict' | 'needs-choice' | 'unavailable' | 'idle';
export interface SyncStatusMeta {
  lastManualUploadAt?: string; lastAutoUploadAt?: string; lastRestoreAt?: string; lastCheckAt?: string;
  latestSnapshot?: RemoteSnapshotMeta | null; lastSyncedSha256?: string; lastSyncedAt?: string;
  pending?: boolean; conflict?: boolean; lastError?: string; state?: CloudBackupState;
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());
const readStatus = (): SyncStatusMeta => {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(window.localStorage.getItem(STATUS_KEY) ?? '{}') as SyncStatusMeta; } catch { return {}; }
};
let syncStatus = readStatus();
const saveStatus = () => {
  try { window.localStorage.setItem(STATUS_KEY, JSON.stringify(syncStatus)); } catch { /* status is best effort */ }
  emit();
};
const setStatus = (updates: Partial<SyncStatusMeta>) => { syncStatus = { ...syncStatus, ...updates }; saveStatus(); };

// Old Web-only configuration may contain a Recovery Key. Remove it without reading or reusing it.
if (typeof window !== 'undefined') {
  try { window.localStorage.removeItem(LEGACY_CONFIG_KEY); } catch { /* ignore */ }
}

export const subscribeToSyncStatus = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const configureSync = (_baseUrl: string, _recoveryKey: string) => undefined;
export const getSyncConfig = (): SyncConfig => ({ baseUrl: '', recoveryKey: '', clientId: '' });
export const isSyncConfigured = (): boolean => syncStatus.state !== 'unavailable';
export const getLocalSyncStatus = (): SyncStatusMeta => syncStatus;
export const createRecoveryKey = async (): Promise<never> => { throw new Error('Cloud backup is configured by the server.'); };

const readJsonResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json() as { success?: boolean; data?: T; error?: string; message?: string };
  if (response.status === 503) setStatus({ state: 'unavailable', lastError: payload.message ?? payload.error ?? 'Cloud backup service is unavailable' });
  if (!response.ok || payload.success === false) throw new Error(payload.message ?? payload.error ?? `HTTP ${response.status}`);
  setStatus({ state: syncStatus.state === 'unavailable' ? 'idle' : syncStatus.state, lastError: undefined });
  return payload.data as T;
};

const syncRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, { ...init, credentials: 'same-origin' });
  return readJsonResponse<T>(response);
};

export const getSyncStatus = async (): Promise<SyncStatusResponse> => syncRequest<SyncStatusResponse>('/status').then((status) => {
  setStatus({ lastCheckAt: new Date().toISOString(), latestSnapshot: status.latestSnapshot });
  return status;
});
export const getLatestSnapshotMeta = async (): Promise<RemoteSnapshotMeta | null> => syncRequest<RemoteSnapshotMeta | null>('/snapshot/latest/meta').then((meta) => {
  setStatus({ lastCheckAt: new Date().toISOString(), latestSnapshot: meta });
  return meta;
});
export const uploadSnapshot = async (bytes: Uint8Array, meta: { sha256: string; schemaVersion: number; appVersion?: string; platform?: string }, mode: 'manual' | 'auto' = 'manual'): Promise<RemoteSnapshotMeta> => {
  const response = await fetch(`${API_BASE}/snapshot/latest`, {
    method: 'POST', credentials: 'same-origin', body: bytes,
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-PowerLog-App-Version': meta.appVersion ?? '1.0.0',
      'X-PowerLog-Platform': meta.platform ?? Platform.OS,
      'X-PowerLog-Schema-Version': String(meta.schemaVersion),
      'X-PowerLog-Snapshot-Sha256': meta.sha256,
    },
  });
  const uploaded = await readJsonResponse<RemoteSnapshotMeta>(response);
  const now = new Date().toISOString();
  setStatus({ latestSnapshot: uploaded, lastSyncedSha256: uploaded.sha256.toLowerCase(), lastSyncedAt: now, pending: false, conflict: false, state: 'synced', ...(mode === 'auto' ? { lastAutoUploadAt: now } : { lastManualUploadAt: now }) });
  return uploaded;
};
export const downloadLatestSnapshot = async (): Promise<{ bytes: Uint8Array; meta: RemoteSnapshotMeta }> => {
  const response = await fetch(`${API_BASE}/snapshot/latest/download`, { credentials: 'same-origin' });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({})) as { error?: string; message?: string };
    if (response.status === 503) setStatus({ state: 'unavailable', lastError: payload.message ?? payload.error });
    throw new Error(payload.message ?? payload.error ?? `HTTP ${response.status}`);
  }
  const schemaVersion = Number(response.headers.get('X-PowerLog-Schema-Version'));
  const sha256 = response.headers.get('X-PowerLog-Snapshot-Sha256') ?? '';
  if (!Number.isSafeInteger(schemaVersion) || schemaVersion <= 0 || !/^[a-f0-9]{64}$/i.test(sha256)) throw new Error('Invalid cloud snapshot metadata');
  const bytes = new Uint8Array(await response.arrayBuffer());
  return { bytes, meta: { id: response.headers.get('X-PowerLog-Snapshot-Id') ?? '', createdAt: response.headers.get('X-PowerLog-Created-At') ?? '', sizeBytes: bytes.byteLength, sha256, schemaVersion } };
};
export const markSnapshotRestored = (meta: RemoteSnapshotMeta) => setStatus({ lastRestoreAt: new Date().toISOString(), latestSnapshot: meta, lastSyncedSha256: meta.sha256.toLowerCase(), lastSyncedAt: new Date().toISOString(), pending: false, conflict: false, state: 'synced' });
export const updateCloudBackupStatus = (updates: Partial<SyncStatusMeta>) => setStatus(updates);
