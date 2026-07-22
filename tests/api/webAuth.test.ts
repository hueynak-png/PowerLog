import login from '../../api/auth/login';
import logout from '../../api/auth/logout';
import session from '../../api/auth/session';

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
    const response = await login(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: 'incorrect' }),
    }));

    expect(response.status).toBe(401);
    expect(response.headers.get('set-cookie')).toBeNull();
    await expect(response.json()).resolves.toEqual({ error: 'Invalid password' });
  });

  it('creates, verifies, and clears an HttpOnly secure session cookie', async () => {
    const loginResponse = await login(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: ACCESS_PASSWORD }),
    }));

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('HttpOnly; Secure; SameSite=Lax; Path=/'));
    expect(loginResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('Max-Age=2592000'));

    const cookie = loginResponse.headers.get('set-cookie')!.split(';')[0];
    const sessionResponse = session(new Request('https://ironbase.test/api/auth/session', {
      headers: { cookie },
    }));
    await expect(sessionResponse.json()).resolves.toEqual({ authenticated: true });

    const logoutResponse = logout(new Request('https://ironbase.test/api/auth/logout', { method: 'POST' }));
    expect(logoutResponse.headers.get('set-cookie')).toEqual(expect.stringContaining('Max-Age=0'));
    await expect(logoutResponse.json()).resolves.toEqual({ authenticated: false });
  });

  it('fails closed when server auth configuration is absent', async () => {
    delete process.env.IRONBASE_ACCESS_PASSWORD;

    const response = await login(new Request('https://ironbase.test/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: ACCESS_PASSWORD }),
    }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: 'Unable to unlock. Please try again later.' });
  });
});
