import {
  clearedSessionCookie,
  jsonResponse,
  methodNotAllowed,
} from '../../server/webAuth';

export default function logout(request: Request): Response {
  if (request.method !== 'POST') return methodNotAllowed('POST');

  return jsonResponse(
    { authenticated: false },
    200,
    { 'Set-Cookie': clearedSessionCookie() },
  );
}
