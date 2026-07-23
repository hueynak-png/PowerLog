import {
  jsonResponse,
  methodNotAllowed,
  requestIsAuthenticated,
} from '../../server/webAuth';

const ALLOWED_ENDPOINTS = new Set([
  'session-summary',
  'daily-strength-analysis',
  'workout-suggestion',
  'nutrition-tags',
  'weekly-review',
  'generate-plan',
  'parse-plan',
]);

const MAX_REQUEST_BODY_BYTES = 256 * 1024;
const WORKER_TIMEOUT_MS = 55_000;

const getEndpoint = (request: Request): string | undefined => {
  const pathname = new URL(request.url).pathname;
  const endpoint = pathname.split('/').filter(Boolean).at(-1);
  return endpoint && ALLOWED_ENDPOINTS.has(endpoint) ? endpoint : undefined;
};

const getWorkerUrl = (baseUrl: string, endpoint: string): string | undefined => {
  try {
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const url = new URL(`${normalizedBaseUrl}/ai/${endpoint}`);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

export async function handleProxyAiRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') return methodNotAllowed('POST');

  const sessionSecret = process.env.IRONBASE_SESSION_SECRET;
  if (!sessionSecret || !requestIsAuthenticated(request, sessionSecret)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const endpoint = getEndpoint(request);
  if (!endpoint) return jsonResponse({ error: 'Not found' }, 404);

  const workerToken = process.env.IRONBASE_AI_WORKER_TOKEN;
  const workerUrl = process.env.IRONBASE_AI_WORKER_URL
    ? getWorkerUrl(process.env.IRONBASE_AI_WORKER_URL, endpoint)
    : undefined;
  if (!workerToken || !workerUrl) {
    return jsonResponse({ error: 'AI service is temporarily unavailable' }, 503);
  }

  const requestBody = await request.text();
  if (new TextEncoder().encode(requestBody).byteLength > MAX_REQUEST_BODY_BYTES) {
    return jsonResponse({ error: 'Request is too large' }, 413);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WORKER_TIMEOUT_MS);

  try {
    const upstream = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        Accept: request.headers.get('accept') ?? 'application/json',
        Authorization: `Bearer ${workerToken}`,
        'Content-Type': request.headers.get('content-type') ?? 'application/json',
      },
      body: requestBody,
      signal: controller.signal,
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': upstream.headers.get('content-type') ?? 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return jsonResponse(
      { error: timedOut ? 'AI request timed out. Please try again.' : 'AI service is temporarily unavailable' },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export default { fetch: handleProxyAiRequest };
