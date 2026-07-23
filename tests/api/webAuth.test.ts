import login, { handleLogin } from '../../api/auth/login';
import logout, { handleLogout } from '../../api/auth/logout';
import session, { handleSession } from '../../api/auth/session';
import { SESSION_COOKIE_NAME } from '../../server/webAuth';

const ACCESS_PASSWORD = 'test-access-password';
const SESSION_SECRET = 'test-session-secret';

const originalAccessPassword = process.env.IRONBASE_ACCESS_PASSWORD;
const originalSessionSecret = process.env.IRONBASE_SESSION_SECRET;

const restoreEnvironment = (name: string, value: string | undefined) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

describe('IronBase Web access functions', () => {
  beforeEach(() => {
    process.env.IRONBASE_ACCESS_PASSWORD = ACCESS_PASSWORD;
    process.env.IRONBASE_SESSION_SECRET = SESSION_SECRET;
  });

  afterAll(() => {
    restoreEnvironment('IRONBASE_ACCESS_PASSWORD', originalAccessPassword);
    restoreEnvironment('IRONBASE_SESSION_SECRET', originalSessionSecret);
  });

  it('rejects an invalid password without issuing a cookie', async () => {
    const response = await handleLogin(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: 'incorrect' }),
    }));

    expect(response.status).toBe(401);
    expect(response.headers.get('set-cookie')).toBeNull();
    await expect(response.json()).resolves.toEqual({ error: 'Invalid password' });
  });

  it('creates, verifies, and clears an HttpOnly secure session cookie', async () => {
    const loginResponse = await handleLogin(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: ACCESS_PASSWORD }),
    }));

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('HttpOnly; Secure; SameSite=Lax; Path=/'));
    expect(loginResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('Max-Age=2592000'));

    const cookie = loginResponse.headers.get('set-cookie')!.split(';')[0];
    const sessionResponse = handleSession(new Request('https://ironbase.test/api/auth/session', {
      headers: { cookie },
    }));
    await expect(sessionResponse.json()).resolves.toEqual({ authenticated: true });

    const logoutResponse = handleLogout(new Request('https://ironbase.test/api/auth/logout', { method: 'POST' }));
    expect(logoutResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('Max-Age=0'));
    await expect(logoutResponse.json()).resolves.toEqual({ authenticated: false });
  });

  it('returns false for requests without a cookie or with an invalid cookie', async () => {
    const noCookieResponse = handleSession(new Request('https://ironbase.test/api/auth/session'));
    expect(noCookieResponse.status).toBe(200);
    await expect(noCookieResponse.json()).resolves.toEqual({ authenticated: false });

    const invalidCookieResponse = handleSession(new Request('https://ironbase.test/api/auth/session', {
      headers: { cookie: `${SESSION_COOKIE_NAME}=not-a-valid-session` },
    }));
    expect(invalidCookieResponse.status).toBe(200);
    await expect(invalidCookieResponse.json()).resolves.toEqual({ authenticated: false });
  });

  it('uses the Vercel Web Handler export shape', async () => {
    expect(typeof login.fetch).toBe('function');
    expect(typeof session.fetch).toBe('function');
    expect(typeof logout.fetch).toBe('function');

    const response = await session.fetch(new Request('https://ironbase.test/api/auth/session'));
    await expect(response.json()).resolves.toEqual({ authenticated: false });
  });

  it('returns a JSON 500 when required login configuration is absent', async () => {
    delete process.env.IRONBASE_ACCESS_PASSWORD;

    const response = await handleLogin(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: ACCESS_PASSWORD }),
    }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'Authentication service is temporarily unavailable' });
  });
});
