import { describe, expect, it } from '@jest/globals';

import generateUuid from '@/src/lib/uuid';

describe('uuid', () => {
  it('generates a uuid v4-like string', () => {
    const uuid = generateUuid();

    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});
