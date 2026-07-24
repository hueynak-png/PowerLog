import {
  jsonResponse,
  methodNotAllowed,
  requestIsAuthenticated,
} from './webAuth';

const MAX_SNAPSHOT_BYTES = 4 * 1024 * 1024;
const WORKER_TIMEOUT_MS = 55_000;

const SYNC_PROXY_METHODS = {
  status: 'GET',
  'snapshot/latest': 'POST',
  'snapshot/latest/meta': 'GET',
  'snapshot/latest/download': 'GET',
} as const;

export type SyncProxyRoute = keyof typeof SYNC_PROXY_METHODS;

const isSyncProxyRoute = (route: string): route is SyncProxyRoute =>
  Object.hasOwn(SYNC_PROXY_METHODS, route);

const getWorkerUrl = (baseUrl: string, route: SyncProxyRoute): string | undefined => {
  try {
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const url = new URL(`${normalizedBaseUrl}/sync/${route}`);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

const proxyHeaders = (request: Request, recoveryKey: string): Headers => {
  const headers = new Headers({
    Accept: request.headers.get('accept') ?? 'application/json',
    Authorization: `Bearer ${recoveryKey}`,
  });

  for (const name of [
    'content-type',
    'x-powerlog-app-version',
    'x-powerlog-client-id',
    'x-powerlog-platform',
    'x-powerlog-schema-version',
    'x-powerlog-snapshot-sha256',
  ]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  return headers;
};

const responseHeaders = (upstream: Response): Headers => {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Content-Type': upstream.headers.get('content-type') ?? 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  for (const name of [
    'x-powerlog-snapshot-id',
    'x-powerlog-created-at',
    'x-powerlog-snapshot-sha256',
    'x-powerlog-schema-version',
  ]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
};

export async function handleProxySyncRoute(
  request: Request,
  route: SyncProxyRoute,
): Promise<Response> {
  // The four Vercel Function files pass literals. Keep a runtime check as a
  // defense-in-depth boundary so no internal caller can proxy an arbitrary path.
  if (!isSyncProxyRoute(route)) return jsonResponse({ error: 'Not found' }, 404);

  const sessionSecret = process.env.IRONBASE_SESSION_SECRET;
  if (!sessionSecret || !requestIsAuthenticated(request, sessionSecret)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const allowedMethod = SYNC_PROXY_METHODS[route];
  if (request.method !== allowedMethod) return methodNotAllowed(allowedMethod);

  const recoveryKey = process.env.IRONBASE_SYNC_RECOVERY_KEY;
  const workerUrl = process.env.IRONBASE_SYNC_WORKER_URL
    ? getWorkerUrl(process.env.IRONBASE_SYNC_WORKER_URL, route)
    : undefined;
  if (!recoveryKey || !workerUrl) {
    return jsonResponse({ error: 'Cloud backup service is temporarily unavailable' }, 503);
  }

  let body: ArrayBuffer | undefined;
  if (allowedMethod === 'POST') {
    body = await request.arrayBuffer();
    if (body.byteLength > MAX_SNAPSHOT_BYTES) {
      return jsonResponse({ error: 'Snapshot is too large' }, 413);
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WORKER_TIMEOUT_MS);
  try {
    const upstream = await fetch(workerUrl, {
      method: allowedMethod,
      headers: proxyHeaders(request, recoveryKey),
      ...(body ? { body } : {}),
      signal: controller.signal,
    });
    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: responseHeaders(upstream),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return jsonResponse(
      { error: timedOut ? 'Cloud backup request timed out' : 'Cloud backup service is temporarily unavailable' },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
