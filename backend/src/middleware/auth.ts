import type { Context, Next } from 'hono';

import type { Env } from '../index';

/**
 * Simple bearer token auth for personal use.
 * Token is stored as a Cloudflare secret (AUTH_TOKEN).
 */
export const authMiddleware = async (c: Context<{ Bindings: Env }>, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Missing authorization header' }, 401);
  }

  const token = authHeader.slice(7);

  const a = new TextEncoder().encode(token);
  const b = new TextEncoder().encode(c.env.AUTH_TOKEN);
  if (a.byteLength !== b.byteLength) {
    return c.json({ error: 'Invalid token' }, 401);
  }
  let diff = 0;
  for (let i = 0; i < a.byteLength; i++) {
    diff |= a[i] ^ b[i];
  }
  if (diff !== 0) {
    return c.json({ error: 'Invalid token' }, 401);
  }

  await next();
};
