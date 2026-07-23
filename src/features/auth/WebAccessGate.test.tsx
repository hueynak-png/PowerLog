import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Platform, Text } from 'react-native';

let WebAccessGate: typeof import('./WebAccessGate').WebAccessGate;

const jsonResponse = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json' },
});

describe('WebAccessGate', () => {
  const originalFetch = global.fetch;
  const originalPlatformOS = Platform.OS;

  beforeAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, value: 'web' });
    WebAccessGate = require('./WebAccessGate').WebAccessGate;
  });

  afterAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, value: originalPlatformOS });
    global.fetch = originalFetch;
  });

  const renderLockedGate = async (loginResponse: Response) => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce(jsonResponse({ authenticated: false }))
      .mockResolvedValueOnce(loginResponse);
    global.fetch = fetchMock;

    const screen = render(
      <WebAccessGate>
        <Text>Unlocked application</Text>
      </WebAccessGate>,
    );

    await waitFor(() => expect(screen.getByLabelText('访问密码')).toBeTruthy());
    fireEvent.changeText(screen.getByLabelText('访问密码'), 'incorrect');
    fireEvent.press(screen.getByRole('button', { name: '解锁' }));

    return { fetchMock, screen };
  };

  it('restores the unlock button and shows a concise error after a 401', async () => {
    const { screen } = await renderLockedGate(jsonResponse({ error: 'Invalid password' }, 401));

    await waitFor(() => {
      expect(screen.getByText('密码不正确，请重试。')).toBeTruthy();
      expect(screen.getByRole('button', { name: '解锁' })).toBeTruthy();
    });
  });

  it('restores the unlock button and hides server failures after a 500', async () => {
    const { screen } = await renderLockedGate(jsonResponse({ error: 'internal details' }, 500));

    await waitFor(() => {
      expect(screen.getByText('暂时无法解锁，请稍后重试。')).toBeTruthy();
      expect(screen.getByRole('button', { name: '解锁' })).toBeTruthy();
    });
  });
});
