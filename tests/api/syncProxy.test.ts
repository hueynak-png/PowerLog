import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import latestRoute from '../../api/sync/snapshot/latest';
import downloadRoute from '../../api/sync/snapshot/latest/download';
import metaRoute from '../../api/sync/snapshot/latest/meta';
import statusRoute from '../../api/sync/status';
import { handleProxySyncRoute, type SyncProxyRoute } from '../../server/syncProxy';
import { createSessionToken, SESSION_COOKIE_NAME } from '../../server/webAuth';

const SESSION_SECRET = 'test-session-secret';
const RECOVERY_KEY = 'test-recovery-key';
const WORKER_URL = 'https://sync-worker.example.test';
const originalFetch = global.fetch;

const restoreEnvironment = (name: string, value: string | undefined) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

const originalEnvironment = {
  session: process.env.IRONBASE_SESSION_SECRET,
  key: process.env.IRONBASE_SYNC_RECOVERY_KEY,
  url: process.env.IRONBASE_SYNC_WORKER_URL,
};

const authenticatedRequest = (
  path = 'snapshot/latest/meta',
  method = 'GET',
  body?: Uint8Array,
) => new Request(`https://ironbase.test/api/sync/${path}`, {
  method,
  headers: {
    cookie: `${SESSION_COOKIE_NAME}=${createSessionToken(SESSION_SECRET)}`,
    ...(method === 'POST' ? {
      'content-type': 'application/octet-stream',
      'x-powerlog-app-version': '1.5.0',
      'x-powerlog-platform': 'web',
      'x-powerlog-schema-version': '11',
      'x-powerlog-snapshot-sha256': 'a'.repeat(64),
    } : {}),
  },
  ...(body ? { body } : {}),
});

const jsonResponse = (body: unknown, status = 200, headers: HeadersInit = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json', ...headers },
});

describe('IronBase explicit cloud backup Functions', () => {
  beforeEach(() => {
    process.env.IRONBASE_SESSION_SECRET = SESSION_SECRET;
    process.env.IRONBASE_SYNC_RECOVERY_KEY = RECOVERY_KEY;
    process.env.IRONBASE_SYNC_WORKER_URL = WORKER_URL;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  afterAll(() => {
    restoreEnvironment('IRONBASE_SESSION_SECRET', originalEnvironment.session);
    restoreEnvironment('IRONBASE_SYNC_RECOVERY_KEY', originalEnvironment.key);
    restoreEnvironment('IRONBASE_SYNC_WORKER_URL', originalEnvironment.url);
  });

  it('exposes the four concrete Vercel Function files and no longer relies on a catch-all route', () => {
    const root = path.resolve(__dirname, '../..');
    for (const routeFile of [
      'api/sync/status.ts',
      'api/sync/snapshot/latest.ts',
      'api/sync/snapshot/latest/meta.ts',
      'api/sync/snapshot/latest/download.ts',
    ]) {
      expect(existsSync(path.join(root, routeFile))).toBe(true);
    }
    expect(existsSync(path.join(root, 'api/sync/[...path].ts'))).toBe(false);

    const config = JSON.parse(readFileSync(path.join(root, 'vercel.json'), 'utf8')) as { functions: Record<string, { maxDuration?: number }> };
    expect(config.functions['api/sync/**/*.ts']?.maxDuration).toBe(60);
  });

  it('returns JSON 401 before any upstream request without a session', async () => {
    global.fetch = jest.fn();

    const response = await statusRoute.fetch(new Request('https://ironbase.test/api/sync/status'));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('proxies GET /api/sync/status through the status Function', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({ success: true, data: { latestSnapshot: null } }));

    const response = await statusRoute.fetch(authenticatedRequest('status'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true, data: { latestSnapshot: null } });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://sync-worker.example.test/sync/status',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('proxies POST /api/sync/snapshot/latest with the bytes and schema-11 SHA headers', async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({ success: true, data: { id: 'snapshot-1' } }, 201));

    const response = await latestRoute.fetch(authenticatedRequest('snapshot/latest', 'POST', bytes));

    expect(response.status).toBe(201);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://sync-worker.example.test/sync/snapshot/latest',
      expect.objectContaining({ method: 'POST' }),
    );
    const [, init] = jest.mocked(global.fetch).mock.calls[0];
    expect(new Uint8Array(init?.body as ArrayBuffer)).toEqual(bytes);
    const headers = new Headers(init?.headers);
    expect(headers.get('x-powerlog-schema-version')).toBe('11');
    expect(headers.get('x-powerlog-snapshot-sha256')).toBe('a'.repeat(64));
    expect(headers.get('authorization')).toBe(`Bearer ${RECOVERY_KEY}`);
    expect(response.headers.get('authorization')).toBeNull();
  });

  it('proxies the metadata and download Functions, including snapshot metadata response headers', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce(jsonResponse({ success: true, data: null }))
      .mockResolvedValueOnce(new Response(new Uint8Array([9, 8]), {
        status: 200,
        headers: {
          'content-type': 'application/octet-stream',
          'x-powerlog-snapshot-id': 'snapshot-1',
          'x-powerlog-created-at': '2026-07-24T00:00:00.000Z',
          'x-powerlog-snapshot-sha256': 'b'.repeat(64),
          'x-powerlog-schema-version': '11',
        },
      }));

    const meta = await metaRoute.fetch(authenticatedRequest('snapshot/latest/meta'));
    const download = await downloadRoute.fetch(authenticatedRequest('snapshot/latest/download'));

    expect(meta.status).toBe(200);
    await expect(meta.json()).resolves.toEqual({ success: true, data: null });
    expect(download.status).toBe(200);
    expect(download.headers.get('x-powerlog-snapshot-id')).toBe('snapshot-1');
    expect(download.headers.get('x-powerlog-schema-version')).toBe('11');
    expect(new Uint8Array(await download.arrayBuffer())).toEqual(new Uint8Array([9, 8]));
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      'https://sync-worker.example.test/sync/snapshot/latest/meta',
      expect.objectContaining({ method: 'GET' }),
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      'https://sync-worker.example.test/sync/snapshot/latest/download',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it.each([
    ['status', statusRoute, 'POST', 'GET'],
    ['snapshot/latest', latestRoute, 'GET', 'POST'],
    ['snapshot/latest/meta', metaRoute, 'POST', 'GET'],
    ['snapshot/latest/download', downloadRoute, 'POST', 'GET'],
  ])('returns JSON 405 and Allow: %s for the concrete Function method', async (routePath, route, method, allowedMethod) => {
    const response = await route.fetch(authenticatedRequest(routePath, method));

    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe(allowedMethod);
    await expect(response.json()).resolves.toEqual({ error: 'Method not allowed' });
  });

  it('does not proxy arbitrary paths even if an internal caller passes an invalid route', async () => {
    global.fetch = jest.fn();

    const response = await handleProxySyncRoute(
      authenticatedRequest('anything'),
      'anything' as unknown as SyncProxyRoute,
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'Not found' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('keeps the 4 MB upload limit before calling the Worker', async () => {
    global.fetch = jest.fn();
    const tooLarge = new Uint8Array(4 * 1024 * 1024 + 1);

    const response = await latestRoute.fetch(authenticatedRequest('snapshot/latest', 'POST', tooLarge));

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({ error: 'Snapshot is too large' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('passes through Worker error status and JSON without exposing the recovery key', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({ error: 'Worker rejected snapshot' }, 502));

    const response = await latestRoute.fetch(authenticatedRequest('snapshot/latest', 'POST', new Uint8Array([1])));

    expect(response.status).toBe(502);
    expect(await response.clone().text()).not.toContain(RECOVERY_KEY);
    await expect(response.json()).resolves.toEqual({ error: 'Worker rejected snapshot' });
    expect(response.headers.get('authorization')).toBeNull();
  });

  it('returns JSON 503 when server-side sync configuration is missing', async () => {
    delete process.env.IRONBASE_SYNC_RECOVERY_KEY;

    const response = await statusRoute.fetch(authenticatedRequest('status'));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: 'Cloud backup service is temporarily unavailable' });
  });
});
