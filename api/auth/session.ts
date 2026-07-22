import {
  jsonResponse,
  methodNotAllowed,
  requestIsAuthenticated,
} from '../../server/webAuth';

export default function session(request: Request): Response {
  if (request.method !== 'GET') return methodNotAllowed('GET');

  const sessionSecret = process.env.IRONBASE_SESSION_SECRET;
  return jsonResponse({
    authenticated: Boolean(sessionSecret) && requestIsAuthenticated(request, sessionSecret),
  });
}
