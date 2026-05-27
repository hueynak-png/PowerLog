import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { authMiddleware } from './middleware/auth';
import { aiRoutes } from './routes/ai';
import { syncRoutes } from './routes/sync';

export interface Env {
  DEEPSEEK_API_KEY: string;
  GPT_API_KEY: string;
  AUTH_TOKEN: string;
  ENVIRONMENT: string;
  SYNC_DB: D1Database;
  SYNC_SNAPSHOTS: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>();

// CORS for frontend
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: [
    'Content-Type',
    'Authorization',
    'X-PowerLog-App-Version',
    'X-PowerLog-Client-Id',
    'X-PowerLog-Platform',
    'X-PowerLog-Schema-Version',
    'X-PowerLog-Snapshot-Sha256',
  ],
  exposeHeaders: [
    'X-PowerLog-Created-At',
    'X-PowerLog-Schema-Version',
    'X-PowerLog-Snapshot-Id',
    'X-PowerLog-Snapshot-Sha256',
  ],
}));

// Auth middleware for all /ai routes
app.use('/ai/*', authMiddleware);

// Mount AI routes
app.route('/ai', aiRoutes);

app.route('/sync', syncRoutes);

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'powerlog-backend' }));

export default app;
