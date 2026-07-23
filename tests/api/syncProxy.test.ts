import proxySyncRequest, { handleProxySyncRequest } from '../../api/sync/[...path]';
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

const authenticatedRequest = (path = 'snapshot/latest/meta', method = 'GET') => new Request(`https://ironbase.test/api/sync/${path}`, {
  method,
  headers: {
    cookie: `${SESSION_COOKIE_NAME}=${createSessionToken(SESSION_SECRET)}`,
    ...(method === 'POST' ? {
      'content-type': 'application/octet-stream',
      'x-powerlog-schema-version': '11',
      'x-powerlog-snapshot-sha256': 'a'.repeat(64),
    } : {}),
  },
  ...(method === 'POST' ? { body: new Uint8Array([1, 2, 3]) } : {}),
});

describe('IronBase cloud backup proxy', () => {
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

  it('returns JSON 401 before any upstream request without a session', async () => {
    global.fetch = jest.fn();
    const response = await handleProxySyncRequest(new Request('https://ironbase.test/api/sync/status'));
    expect(response.status).toBe(401);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('proxies an allowlisted metadata request without exposing the recovery key', async () => {
    global.fetch = jest.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, data: null }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));
    const response = await handleProxySyncRequest(authenticatedRequest());
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true, data: null });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://sync-worker.example.test/sync/snapshot/latest/meta',
      expect.objectContaining({ method: 'GET' }),
    );
    const [, requestInit] = jest.mocked(global.fetch).mock.calls[0];
    expect(new Headers(requestInit?.headers).get('authorization')).toBe(`Bearer ${RECOVERY_KEY}`);
    expect(response.headers.get('authorization')).toBeNull();
  });

  it('rejects routes and methods outside the allowlist', async () => {
    const unknown = await handleProxySyncRequest(authenticatedRequest('anything'));
    expect(unknown.status).toBe(404);
    const wrongMethod = await handleProxySyncRequest(authenticatedRequest('status', 'POST'));
    expect(wrongMethod.status).toBe(405);
  });

  it('returns JSON 503 when server-side sync configuration is missing', async () => {
    delete process.env.IRONBASE_SYNC_RECOVERY_KEY;
    const response = await handleProxySyncRequest(authenticatedRequest());
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: 'Cloud backup service is temporarily unavailable' });
  });

  it('uses the Vercel Web Handler export shape', () => {
    expect(typeof proxySyncRequest.fetch).toBe('function');
  });
});
