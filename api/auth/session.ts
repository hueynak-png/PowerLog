import {
  jsonResponse,
  methodNotAllowed,
  requestIsAuthenticated,
} from '../../server/webAuth';

export function handleSession(request: Request): Response {
  if (request.method !== 'GET') return methodNotAllowed('GET');

  const sessionSecret = process.env.IRONBASE_SESSION_SECRET;
  if (!sessionSecret) return jsonResponse({ authenticated: false });

  try {
    return jsonResponse({
      authenticated: requestIsAuthenticated(request, sessionSecret),
    });
  } catch {
    return jsonResponse({ error: 'Authentication service is temporarily unavailable' }, 500);
  }
}

// Expo's static output uses Vercel's Web Handler form. A default function would
// instead receive Node's IncomingMessage/ServerResponse pair.
export default { fetch: handleSession };
