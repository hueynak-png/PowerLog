import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { authMiddleware } from './middleware/auth';
import { aiRoutes } from './routes/ai';

export interface Env {
  DEEPSEEK_API_KEY: string;
  GPT_API_KEY: string;
  AUTH_TOKEN: string;
  ENVIRONMENT: string;
}

const app = new Hono<{ Bindings: Env }>();

// CORS for frontend
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Auth middleware for all /ai routes
app.use('/ai/*', authMiddleware);

// Mount AI routes
app.route('/ai', aiRoutes);

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'powerlog-backend' }));

export default app;
