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

// --- JSON Repair / Robust Parsing ---

const stripMarkdownFences = (raw: string): string => {
  const fenced = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (fenced?.[1]) return fenced[1].trim();
  return raw.trim();
};

/**
 * Extract the first complete JSON object from potentially noisy text.
 * Finds the first '{' and its matching '}', handling nested braces.
 */
const extractJSONObject = (text: string): string | null => {
  const start = text.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === '\\' && inString) {
      escape = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }

  return null;
};

/**
 * Attempt to salvage a truncated JSON object by closing open strings,
 * arrays, and braces.
 */
const salvageTruncatedJSON = (text: string): string | null => {
  let salvaged = text;

  let inString = false;
  let escape = false;
  for (let i = 0; i < salvaged.length; i++) {
    const ch = salvaged[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') inString = !inString;
  }
  if (inString) salvaged += '"';

  const braceStack: string[] = [];
  inString = false;
  escape = false;
  for (const ch of salvaged) {
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') braceStack.push('}');
    else if (ch === '[') braceStack.push(']');
    else if (ch === '}' || ch === ']') {
      if (braceStack.length > 0 && braceStack[braceStack.length - 1] === ch) braceStack.pop();
    }
  }
  salvaged += braceStack.reverse().join('');

  salvaged = salvaged.replace(/,(\s*[}\]])/g, '$1');

  try {
    return JSON.parse(salvaged);
  } catch {
    return null;
  }
};

const parseAIResponse = (content: string): unknown => {
  try {
    return JSON.parse(content);
  } catch { /* fall through */ }

  const stripped = stripMarkdownFences(content);
  try {
    return JSON.parse(stripped);
  } catch { /* fall through */ }

  const extracted = extractJSONObject(stripped);
  if (extracted) {
    try {
      return JSON.parse(extracted);
    } catch { /* fall through */ }

    const salvaged = salvageTruncatedJSON(extracted);
    if (salvaged !== null) return salvaged;
  }

  const directSalvaged = salvageTruncatedJSON(stripped);
  if (directSalvaged !== null) return directSalvaged;

  throw new SyntaxError(`Failed to parse AI response as JSON. Raw content (first 500 chars): ${content.slice(0, 500)}`);
};

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
      const content = parseAIResponse(response.content);
      const data = config.transformResponse ? config.transformResponse(content) : content;
      return c.json({ success: true, data, usage: response.usage });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return c.json({ error: 'AI request failed', message }, 500);
    }
  };
};
