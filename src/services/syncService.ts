import { Platform } from 'react-native';

const STORAGE_KEY = 'powerlog-sync-config';

export interface SyncConfig {
  baseUrl: string;
  recoveryKey: string;
  clientId: string;
}

export interface RemoteSnapshotMeta {
  id: string;
  createdAt: string;
  sizeBytes: number;
  sha256: string;
  schemaVersion: number;
  appVersion?: string;
  platform?: string;
  clientId?: string;
}

interface SyncStatusResponse {
  syncId: string;
  createdAt: string;
  latestSnapshot: RemoteSnapshotMeta | null;
}

const normalizeSyncBaseUrl = (baseUrl: string): string =>
  baseUrl.trim().replace(/\/+$/, '').replace(/\/sync$/i, '');

const createClientId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `client-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const loadConfig = (): SyncConfig => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SyncConfig;
        return {
          baseUrl: normalizeSyncBaseUrl(parsed.baseUrl ?? ''),
          recoveryKey: parsed.recoveryKey ?? '',
          clientId: parsed.clientId ?? createClientId(),
        };
      }
    } catch {
      return { baseUrl: '', recoveryKey: '', clientId: createClientId() };
    }
  }

  return { baseUrl: '', recoveryKey: '', clientId: createClientId() };
};

let config: SyncConfig = loadConfig();

const saveConfig = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      return false;
    }
  }
  return false;
};

export const configureSync = (baseUrl: string, recoveryKey: string) => {
  config = {
    baseUrl: normalizeSyncBaseUrl(baseUrl),
    recoveryKey: recoveryKey.trim().toUpperCase(),
    clientId: config.clientId || createClientId(),
  };
  saveConfig();
};

export const getSyncConfig = (): SyncConfig => config;

export const isSyncConfigured = (): boolean =>
  config.baseUrl.length > 0 && config.recoveryKey.length > 0;

const readJsonResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json() as { success?: boolean; data?: T; error?: string; message?: string };
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message ?? payload.error ?? `HTTP ${response.status}`);
  }
  return payload.data as T;
};

const syncRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  if (!isSyncConfigured()) throw new Error('Cloud Sync is not configured.');

  const response = await fetch(`${config.baseUrl}/sync${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${config.recoveryKey}`,
    },
  });

  return readJsonResponse<T>(response);
};

export const createRecoveryKey = async (baseUrl: string): Promise<{ recoveryKey: string; syncId: string; createdAt: string }> => {
  const normalizedBaseUrl = normalizeSyncBaseUrl(baseUrl);
  if (!normalizedBaseUrl) throw new Error('Backend URL is required.');

  const response = await fetch(`${normalizedBaseUrl}/sync/create`, { method: 'POST' });
  const data = await readJsonResponse<{ recoveryKey: string; syncId: string; createdAt: string }>(response);
  configureSync(normalizedBaseUrl, data.recoveryKey);
  return data;
};

export const getSyncStatus = async (): Promise<SyncStatusResponse> =>
  syncRequest<SyncStatusResponse>('/status');

export const getLatestSnapshotMeta = async (): Promise<RemoteSnapshotMeta | null> =>
  syncRequest<RemoteSnapshotMeta | null>('/snapshot/latest/meta');

export const uploadSnapshot = async (
  bytes: Uint8Array,
  meta: { sha256: string; schemaVersion: number; appVersion?: string; platform?: string },
): Promise<RemoteSnapshotMeta> => {
  if (!isSyncConfigured()) throw new Error('Cloud Sync is not configured.');

  const response = await fetch(`${config.baseUrl}/sync/snapshot/latest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.recoveryKey}`,
      'Content-Type': 'application/octet-stream',
      'X-PowerLog-App-Version': meta.appVersion ?? '1.0.0',
      'X-PowerLog-Client-Id': config.clientId,
      'X-PowerLog-Platform': meta.platform ?? Platform.OS,
      'X-PowerLog-Schema-Version': String(meta.schemaVersion),
      'X-PowerLog-Snapshot-Sha256': meta.sha256,
    },
    body: bytes,
  });

  return readJsonResponse<RemoteSnapshotMeta>(response);
};

export const downloadLatestSnapshot = async (): Promise<{ bytes: Uint8Array; meta: RemoteSnapshotMeta }> => {
  if (!isSyncConfigured()) throw new Error('Cloud Sync is not configured.');

  const response = await fetch(`${config.baseUrl}/sync/snapshot/latest/download`, {
    headers: { Authorization: `Bearer ${config.recoveryKey}` },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { error?: string; message?: string };
    throw new Error(error.message ?? error.error ?? `HTTP ${response.status}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  return {
    bytes,
    meta: {
      id: response.headers.get('X-PowerLog-Snapshot-Id') ?? '',
      createdAt: response.headers.get('X-PowerLog-Created-At') ?? '',
      sizeBytes: bytes.byteLength,
      sha256: response.headers.get('X-PowerLog-Snapshot-Sha256') ?? '',
      schemaVersion: Number(response.headers.get('X-PowerLog-Schema-Version') ?? 1),
    },
  };
};
