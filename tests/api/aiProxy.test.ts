import proxyAiRequest from '../../api/ai/[endpoint]';
import { createSessionToken, SESSION_COOKIE_NAME } from '../../server/webAuth';

const SESSION_SECRET = 'test-session-secret';
const WORKER_TOKEN = 'test-worker-token';
const WORKER_URL = 'https://worker.example.test';

const originalSessionSecret = process.env.IRONBASE_SESSION_SECRET;
const originalWorkerToken = process.env.IRONBASE_AI_WORKER_TOKEN;
const originalWorkerUrl = process.env.IRONBASE_AI_WORKER_URL;
const originalFetch = global.fetch;

const restoreEnvironment = (name: string, value: string | undefined) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

const authenticatedRequest = (endpoint = 'parse-plan') => new Request(`https://ironbase.test/api/ai/${endpoint}`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    cookie: `${SESSION_COOKIE_NAME}=${createSessionToken(SESSION_SECRET)}`,
  },
  body: JSON.stringify({ planText: 'Week 1 Day 1: Squat 3x5' }),
});

describe('IronBase AI proxy', () => {
  beforeEach(() => {
    process.env.IRONBASE_SESSION_SECRET = SESSION_SECRET;
    process.env.IRONBASE_AI_WORKER_TOKEN = WORKER_TOKEN;
    process.env.IRONBASE_AI_WORKER_URL = WORKER_URL;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  afterAll(() => {
    restoreEnvironment('IRONBASE_SESSION_SECRET', originalSessionSecret);
    restoreEnvironment('IRONBASE_AI_WORKER_TOKEN', originalWorkerToken);
    restoreEnvironment('IRONBASE_AI_WORKER_URL', originalWorkerUrl);
  });

  it('returns 401 before making an upstream request without a valid session', async () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    const response = await proxyAiRequest(new Request('https://ironbase.test/api/ai/parse-plan', {
      method: 'POST',
      body: JSON.stringify({ planText: 'Week 1 Day 1: Squat 3x5' }),
    }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards an allowlisted endpoint and the upstream success response', async () => {
    const fetchMock = jest.fn().mockResolvedValue(new Response(
      JSON.stringify({ success: true, data: { name: 'Two weeks' } }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ));
    global.fetch = fetchMock;

    const response = await proxyAiRequest(authenticatedRequest());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true, data: { name: 'Two weeks' } });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://worker.example.test/ai/parse-plan',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${WORKER_TOKEN}` }),
      }),
    );
  });

  it('preserves an upstream error status and body', async () => {
    global.fetch = jest.fn().mockResolvedValue(new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    ));

    const response = await proxyAiRequest(authenticatedRequest());

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid request' });
  });
});
