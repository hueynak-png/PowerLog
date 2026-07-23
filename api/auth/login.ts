import {
  jsonResponse,
  methodNotAllowed,
  passwordsMatch,
  sessionCookie,
} from '../../server/webAuth';

const ACCESS_PASSWORD_MAX_LENGTH = 1024;

export async function handleLogin(request: Request): Promise<Response> {
  if (request.method !== 'POST') return methodNotAllowed('POST');

  try {
    const accessPassword = process.env.IRONBASE_ACCESS_PASSWORD;
    const sessionSecret = process.env.IRONBASE_SESSION_SECRET;
    if (!accessPassword || !sessionSecret) {
      return jsonResponse({ error: 'Authentication service is temporarily unavailable' }, 500);
    }

    let password: unknown;
    try {
      const body = await request.json() as { password?: unknown };
      password = body.password;
    } catch {
      return jsonResponse({ error: 'Invalid password' }, 401);
    }

    if (
      typeof password !== 'string'
      || password.length === 0
      || password.length > ACCESS_PASSWORD_MAX_LENGTH
      || !passwordsMatch(password, accessPassword)
    ) {
      return jsonResponse({ error: 'Invalid password' }, 401);
    }

    return jsonResponse(
      { authenticated: true },
      200,
      { 'Set-Cookie': sessionCookie(sessionSecret) },
    );
  } catch {
    return jsonResponse({ error: 'Authentication service is temporarily unavailable' }, 500);
  }
}

export default { fetch: handleLogin };
