import type { Context } from 'hono';
import type { ZodType } from 'zod';

import type { Env } from '../index';
import type { AIProvider, ChatMessage } from '../services/deepseek';

export interface AIHandlerConfig<T = any> {
  schema: ZodType<T>;
  createProvider: (apiKey: string) => AIProvider;
  buildPrompt: (data: T) => ChatMessage[];
  chatOptions?: { temperature?: number; maxTokens?: number };
  transformResponse?: (content: any) => any;
  envKey: 'DEEPSEEK_API_KEY' | 'GPT_API_KEY';
}

/**
 * Factory that creates a Hono route handler for AI endpoints.
 * Eliminates the repeated pattern of:
 *   body parse → schema validate → provider create → prompt build → AI call → JSON parse → respond.
 */
export const createAIHandler = <T = any>(config: AIHandlerConfig<T>) => {
  return async (c: Context<{ Bindings: Env }>) => {
    const body = await c.req.json();
    const parsed = config.schema.safeParse(body);

    if (!parsed.success) {
      return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
    }

    const apiKey = c.env[config.envKey] as unknown as string;
    const provider = config.createProvider(apiKey);
    const messages = config.buildPrompt(parsed.data as T);

    try {
      const response = await provider.chat(messages, config.chatOptions ?? {});
      const content = JSON.parse(response.content);
      const data = config.transformResponse ? config.transformResponse(content) : content;
      return c.json({ success: true, data, usage: response.usage });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return c.json({ error: 'AI request failed', message }, 500);
    }
  };
};
