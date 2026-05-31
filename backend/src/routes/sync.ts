import { Hono } from 'hono';
import { z } from 'zod';

import type { Env } from '../index';

export const syncRoutes = new Hono<{ Bindings: Env }>();

const uploadHeadersSchema = z.object({
  schemaVersion: z.coerce.number().int().positive(),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  appVersion: z.string().max(64).optional(),
  platform: z.string().max(32).optional(),
  clientId: z.string().max(128).optional(),
});

interface SyncKeyRow {
  id: string;
  key_hash: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

interface SnapshotManifestRow {
  id: string;
  sync_key_id: string;
  r2_key: string;
  created_at: string;
  size_bytes: number;
  sha256: string;
  schema_version: number;
  app_version: string | null;
  platform: string | null;
  client_id: string | null;
}

const textEncoder = new TextEncoder();
const recoveryKeyAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

const sha256Hex = async (input: string | ArrayBuffer): Promise<string> => {
  const data = typeof input === 'string' ? textEncoder.encode(input) : input;
  return toHex(await crypto.subtle.digest('SHA-256', data));
};

const generateRecoveryKey = (): string => {
  const random = new Uint8Array(16);
  crypto.getRandomValues(random);
  const body = Array.from(random)
    .map((byte) => recoveryKeyAlphabet[byte % recoveryKeyAlphabet.length])
    .join('')
    .match(/.{1,4}/g)
    ?.join('-');

  return `PL-${body ?? crypto.randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;
};

const normalizeRecoveryKey = (key: string): string => key.trim().toUpperCase();

const readRecoveryKey = (authHeader: string | undefined): string | null => {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const key = normalizeRecoveryKey(authHeader.slice(7));
  return key.length > 0 ? key : null;
};

const getAuthorizedSyncKey = async (env: Env, authHeader: string | undefined): Promise<SyncKeyRow | null> => {
  const recoveryKey = readRecoveryKey(authHeader);
  if (!recoveryKey) return null;

  const keyHash = await sha256Hex(recoveryKey);
  const row = await env.SYNC_DB.prepare(
    'SELECT id, key_hash, created_at, last_used_at, revoked_at FROM sync_keys WHERE key_hash = ? AND revoked_at IS NULL',
  ).bind(keyHash).first<SyncKeyRow>();

  if (!row) return null;

  await env.SYNC_DB.prepare('UPDATE sync_keys SET last_used_at = ? WHERE id = ?')
    .bind(new Date().toISOString(), row.id)
    .run();

  return row;
};

const latestSnapshotForKey = async (env: Env, syncKeyId: string): Promise<SnapshotManifestRow | null> =>
  env.SYNC_DB.prepare(
    `SELECT id, sync_key_id, r2_key, created_at, size_bytes, sha256, schema_version, app_version, platform, client_id
     FROM snapshot_manifests
     WHERE sync_key_id = ?
     ORDER BY created_at DESC
     LIMIT 1`,
  ).bind(syncKeyId).first<SnapshotManifestRow>();

const toSnapshotMeta = (row: SnapshotManifestRow) => ({
  id: row.id,
  createdAt: row.created_at,
  sizeBytes: row.size_bytes,
  sha256: row.sha256,
  schemaVersion: row.schema_version,
  appVersion: row.app_version ?? undefined,
  platform: row.platform ?? undefined,
  clientId: row.client_id ?? undefined,
});

syncRoutes.post('/create', async (c) => {
  const recoveryKey = generateRecoveryKey();
  const keyHash = await sha256Hex(recoveryKey);
  const syncId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await c.env.SYNC_DB.prepare(
    'INSERT INTO sync_keys (id, key_hash, created_at) VALUES (?, ?, ?)',
  ).bind(syncId, keyHash, createdAt).run();

  return c.json({
    success: true,
    data: { recoveryKey, syncId, createdAt },
  }, 201);
});

syncRoutes.get('/status', async (c) => {
  const syncKey = await getAuthorizedSyncKey(c.env, c.req.header('Authorization'));
  if (!syncKey) return c.json({ error: 'Invalid recovery key' }, 401);

  const latest = await latestSnapshotForKey(c.env, syncKey.id);
  return c.json({
    success: true,
    data: {
      syncId: syncKey.id,
      createdAt: syncKey.created_at,
      latestSnapshot: latest ? toSnapshotMeta(latest) : null,
    },
  });
});

syncRoutes.get('/snapshot/latest/meta', async (c) => {
  const syncKey = await getAuthorizedSyncKey(c.env, c.req.header('Authorization'));
  if (!syncKey) return c.json({ error: 'Invalid recovery key' }, 401);

  const latest = await latestSnapshotForKey(c.env, syncKey.id);
  return c.json({ success: true, data: latest ? toSnapshotMeta(latest) : null });
});

syncRoutes.post('/snapshot/latest', async (c) => {
  const syncKey = await getAuthorizedSyncKey(c.env, c.req.header('Authorization'));
  if (!syncKey) return c.json({ error: 'Invalid recovery key' }, 401);

  const parsedHeaders = uploadHeadersSchema.safeParse({
    schemaVersion: c.req.header('X-PowerLog-Schema-Version'),
    sha256: c.req.header('X-PowerLog-Snapshot-Sha256'),
    appVersion: c.req.header('X-PowerLog-App-Version') ?? undefined,
    platform: c.req.header('X-PowerLog-Platform') ?? undefined,
    clientId: c.req.header('X-PowerLog-Client-Id') ?? undefined,
  });

  if (!parsedHeaders.success) {
    return c.json({ error: 'Invalid snapshot metadata', details: parsedHeaders.error.issues }, 400);
  }

  const snapshot = await c.req.arrayBuffer();
  if (snapshot.byteLength === 0) return c.json({ error: 'Snapshot body is empty' }, 400);
  if (snapshot.byteLength > 25 * 1024 * 1024) return c.json({ error: 'Snapshot exceeds 25 MB limit' }, 413);

  const actualHash = await sha256Hex(snapshot);
  if (actualHash !== parsedHeaders.data.sha256.toLowerCase()) {
    return c.json({ error: 'Snapshot checksum mismatch' }, 400);
  }

  const snapshotId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const r2Key = `snapshots/${syncKey.id}/${snapshotId}.sqlite`;

  await c.env.SYNC_SNAPSHOTS.put(r2Key, snapshot, {
    httpMetadata: { contentType: 'application/octet-stream' },
    customMetadata: {
      sha256: actualHash,
      schemaVersion: String(parsedHeaders.data.schemaVersion),
      createdAt,
    },
  });

  await c.env.SYNC_DB.prepare(
    `INSERT INTO snapshot_manifests
      (id, sync_key_id, r2_key, created_at, size_bytes, sha256, schema_version, app_version, platform, client_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    snapshotId,
    syncKey.id,
    r2Key,
    createdAt,
    snapshot.byteLength,
    actualHash,
    parsedHeaders.data.schemaVersion,
    parsedHeaders.data.appVersion ?? null,
    parsedHeaders.data.platform ?? null,
    parsedHeaders.data.clientId ?? null,
  ).run();

  const latest = await latestSnapshotForKey(c.env, syncKey.id);
  return c.json({ success: true, data: latest ? toSnapshotMeta(latest) : null }, 201);
});

syncRoutes.get('/snapshot/latest/download', async (c) => {
  const syncKey = await getAuthorizedSyncKey(c.env, c.req.header('Authorization'));
  if (!syncKey) return c.json({ error: 'Invalid recovery key' }, 401);

  const latest = await latestSnapshotForKey(c.env, syncKey.id);
  if (!latest) return c.json({ error: 'No snapshot found' }, 404);

  const object = await c.env.SYNC_SNAPSHOTS.get(latest.r2_key);
  if (!object) return c.json({ error: 'Snapshot object missing' }, 404);

  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-PowerLog-Created-At': latest.created_at,
      'X-PowerLog-Schema-Version': String(latest.schema_version),
      'X-PowerLog-Snapshot-Id': latest.id,
      'X-PowerLog-Snapshot-Sha256': latest.sha256,
    },
  });
});
