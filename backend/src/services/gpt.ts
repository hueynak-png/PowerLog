import type { AIProvider, ChatMessage, AIResponse } from './deepseek';

/**
 * GPT provider (via relay API) - for advanced coaching tasks:
 * cycle plan generation, weekly reviews, main lift adjustments, deload decisions
 */
export const createGPTProvider = (apiKey: string): AIProvider => ({
  async chat(messages: ChatMessage[], options = {}): Promise<AIResponse> {
    const response = await fetch('https://api.kaopuapi.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.5',
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GPT API error (${response.status}): ${error}`);
    }

    const data = await response.json() as {
      choices: Array<{ message: { content: string } }>;
      model: string;
      usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    };

    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      },
    };
  },
});
