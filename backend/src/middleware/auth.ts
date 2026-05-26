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

  if (token !== c.env.AUTH_TOKEN) {
    return c.json({ error: 'Invalid token' }, 401);
  }

  await next();
};
