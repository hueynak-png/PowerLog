import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getLatestSnapshotMeta } from './syncService.web';

const jsonResponse = (body: unknown, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json' },
});

describe('web snapshot metadata compatibility', () => {
  const originalFetch = global.fetch;
  let fetchMock: { mockResolvedValue: (value: Response) => void };

  beforeEach(() => {
    const mock = jest.fn();
    global.fetch = mock as unknown as typeof global.fetch;
    fetchMock = mock as unknown as typeof fetchMock;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('converts the explicit no-snapshot 404 from the metadata endpoint into null', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: 'No snapshot found' }, 404));

    await expect(getLatestSnapshotMeta()).resolves.toBeNull();
  });

  it.each([401, 403, 500, 502, 503, 504])('does not convert HTTP %i into an empty cloud backup', async (status) => {
    fetchMock.mockResolvedValue(jsonResponse({ error: `HTTP ${status}` }, status));

    await expect(getLatestSnapshotMeta()).rejects.toThrow(`HTTP ${status}`);
  });
});
