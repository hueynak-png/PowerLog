import {
  clearedSessionCookie,
  jsonResponse,
  methodNotAllowed,
} from '../../server/webAuth';

export function handleLogout(request: Request): Response {
  if (request.method !== 'POST') return methodNotAllowed('POST');

  try {
    return jsonResponse(
      { authenticated: false },
      200,
      { 'Set-Cookie': clearedSessionCookie() },
    );
  } catch {
    return jsonResponse({ error: 'Authentication service is temporarily unavailable' }, 500);
  }
}

export default { fetch: handleLogout };
