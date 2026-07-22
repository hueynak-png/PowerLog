import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE_NAME = '__Host-ironbase_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const COOKIE_ATTRIBUTES = 'HttpOnly; Secure; SameSite=Lax; Path=/';

const sha256 = (value: string): Buffer => createHash('sha256').update(value).digest();

const signaturesMatch = (received: string, expected: string): boolean =>
  timingSafeEqual(sha256(received), sha256(expected));

export const passwordsMatch = (received: string, expected: string): boolean =>
  signaturesMatch(received, expected);

export const createSessionToken = (
  sessionSecret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): string => {
  const expiresAt = nowSeconds + SESSION_MAX_AGE_SECONDS;
  const payload = `v1.${expiresAt}`;
  const signature = createHmac('sha256', sessionSecret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
};

export const isValidSessionToken = (
  token: string | undefined,
  sessionSecret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): boolean => {
  if (!token) return false;

  const [version, expiresAtRaw, signature, ...extra] = token.split('.');
  if (version !== 'v1' || extra.length > 0 || !/^\d+$/.test(expiresAtRaw) || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isSafeInteger(expiresAt)) return false;

  const payload = `${version}.${expiresAtRaw}`;
  const expectedSignature = createHmac('sha256', sessionSecret).update(payload).digest('base64url');
  return signaturesMatch(signature, expectedSignature) && expiresAt > nowSeconds;
};

export const getCookie = (cookieHeader: string | null, name: string): string | undefined => {
  if (!cookieHeader) return undefined;

  for (const part of cookieHeader.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 1) continue;
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }

  return undefined;
};

export const requestIsAuthenticated = (request: Request, sessionSecret: string): boolean =>
  isValidSessionToken(getCookie(request.headers.get('cookie'), SESSION_COOKIE_NAME), sessionSecret);

export const sessionCookie = (sessionSecret: string): string =>
  `${SESSION_COOKIE_NAME}=${createSessionToken(sessionSecret)}; Max-Age=${SESSION_MAX_AGE_SECONDS}; ${COOKIE_ATTRIBUTES}`;

export const clearedSessionCookie = (): string =>
  `${SESSION_COOKIE_NAME}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${COOKIE_ATTRIBUTES}`;

export const jsonResponse = (
  body: unknown,
  status = 200,
  headers: HeadersInit = {},
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });

export const methodNotAllowed = (method: string): Response =>
  jsonResponse({ error: 'Method not allowed' }, 405, { Allow: method });
