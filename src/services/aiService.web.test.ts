jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAIConfig,
  initAI,
  isAIConfigured,
  requestPlanParse,
} from './aiService';

describe('Web AI service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the same-origin proxy without persisted configuration or an authorization header', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ success: true, data: { name: 'Two weeks', weeks: [] } }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ));

    await initAI();
    const result = await requestPlanParse({ planText: 'Week 1 Day 1: Squat 3x5' });

    expect(AsyncStorage.getItem).not.toHaveBeenCalled();
    expect(getAIConfig()).toEqual({ baseUrl: '/api/ai', authToken: '' });
    expect(isAIConfigured()).toBe(true);
    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/ai/parse-plan',
      expect.objectContaining({
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });
});
