/**
 * Translation script: uses DeepSeek API to translate en/common.json → zh-CN/common.json
 *
 * Usage: DEEPSEEK_API_KEY=sk-xxx node scripts/translate.mjs
 *
 * This splits the JSON into manageable chunks, translates each via DeepSeek,
 * and merges the results.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
  console.error('Error: DEEPSEEK_API_KEY environment variable is required.');
  console.error('Usage: DEEPSEEK_API_KEY=sk-xxx node scripts/translate.mjs');
  process.exit(1);
}

const ENGLISH_PATH = resolve(__dirname, '../src/i18n/locales/en/common.json');
const CHINESE_PATH = resolve(__dirname, '../src/i18n/locales/zh-CN/common.json');

const MODEL = 'deepseek-chat'; // DeepSeek V3 - cost-effective for translation

async function callDeepSeek(messages) {
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

/**
 * Translates a flat key-value object. Groups keys by prefix for context.
 */
async function translateObject(obj) {
  const entries = Object.entries(obj);
  const translated = {};

  // Batch in groups of 30 keys to stay within context limits
  const BATCH_SIZE = 30;
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = Object.fromEntries(entries.slice(i, i + BATCH_SIZE));

    const prompt = `Translate the following English JSON values to Simplified Chinese (zh-CN).
Rules:
- Preserve ALL JSON keys exactly (do NOT translate keys)
- Translate ONLY the values
- Keep {{variable}} placeholders unchanged
- Keep technical terms like "RPE", "1RM", "kg" as-is
- Use natural, idiomatic Chinese
- For workout/training terms, use common Chinese fitness terminology
- For food names, use standard Chinese food translations
- Return ONLY valid JSON, no explanation

Input:
${JSON.stringify(batch, null, 2)}

Output (JSON only):`;

    const systemMsg = 'You are a professional translator specializing in fitness/exercise app localization from English to Simplified Chinese. Return only valid JSON output.';

    try {
      const response = await callDeepSeek([
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt },
      ]);

      // Parse the response, handling possible markdown code blocks
      const jsonStr = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonStr);

      Object.assign(translated, parsed);
      console.log(`Translated batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(entries.length / BATCH_SIZE)} (${Object.keys(batch).length} keys)`);
    } catch (err) {
      console.error(`Failed batch starting at key "${entries[i][0]}":`, err.message);
      console.error('Raw response:', response?.slice(0, 500));
      throw err;
    }
  }

  return translated;
}

async function main() {
  console.log(`Reading English locale from: ${ENGLISH_PATH}`);
  const englishRaw = readFileSync(ENGLISH_PATH, 'utf-8');
  const english = JSON.parse(englishRaw);

  console.log(`Loaded ${Object.keys(english).length} top-level namespaces`);

  const chinese = {};

  for (const [namespace, values] of Object.entries(english)) {
    console.log(`\n--- Translating namespace: ${namespace} (${Object.keys(values).length} keys) ---`);
    chinese[namespace] = await translateObject(values);
  }

  console.log(`\nWriting Chinese locale to: ${CHINESE_PATH}`);
  writeFileSync(CHINESE_PATH, JSON.stringify(chinese, null, 2) + '\n', 'utf-8');

  console.log('✅ Translation complete! zh-CN/common.json created.');
}

main().catch((err) => {
  console.error('Translation failed:', err);
  process.exit(1);
});
