import { useEffect, useState, type PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type SessionResponse = { authenticated?: boolean };

const isWeb = Platform.OS === 'web';

const getSession = async (): Promise<boolean> => {
  const response = await fetch('/api/auth/session', { credentials: 'include' });
  if (!response.ok) return false;

  const body = await response.json() as SessionResponse;
  return body.authenticated === true;
};

export function WebAccessGate({ children }: PropsWithChildren) {
  const [checkingSession, setCheckingSession] = useState(isWeb);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isWeb) return;

    let mounted = true;
    void getSession()
      .then((isAuthenticated) => {
        if (mounted) setAuthenticated(isAuthenticated);
      })
      .catch(() => {
        if (mounted) setAuthenticated(false);
      })
      .finally(() => {
        if (mounted) setCheckingSession(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleUnlock = async () => {
    if (!password || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = await response.json().catch(() => ({})) as SessionResponse;

      if (response.ok && body.authenticated === true) {
        setPassword('');
        setAuthenticated(true);
        return;
      }

      setPassword('');
      setError(response.status === 401 ? '密码不正确，请重试。' : '暂时无法解锁，请稍后重试。');
    } catch {
      setError('暂时无法解锁，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isWeb) return <>{children}</>;
  if (authenticated) return <>{children}</>;

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>PRIVATE TRAINING LOG</Text>
        <Text style={styles.title}>IronBase</Text>
        <Text style={styles.subtitle}>
          {checkingSession ? '正在验证访问权限…' : '请输入访问密码以解锁。'}
        </Text>
        {checkingSession ? (
          <ActivityIndicator color="#f4b860" style={styles.spinner} />
        ) : (
          <>
            <TextInput
              accessibilityLabel="访问密码"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setPassword}
              onSubmitEditing={() => void handleUnlock()}
              placeholder="访问密码"
              placeholderTextColor="#8b8b8b"
              secureTextEntry
              style={styles.input}
              value={password}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable
              accessibilityRole="button"
              disabled={!password || submitting}
              onPress={() => void handleUnlock()}
              style={({ pressed }) => [
                styles.button,
                (!password || submitting) && styles.buttonDisabled,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>{submitting ? '正在解锁…' : '解锁'}</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    backgroundColor: '#101113',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1b1d20',
    borderColor: '#35383d',
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: 420,
    padding: 28,
    width: '100%',
  },
  eyebrow: {
    color: '#f4b860',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: '#f6f7f9',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#bec2c9',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    marginTop: 8,
  },
  spinner: {
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#101113',
    borderColor: '#464a51',
    borderRadius: 12,
    borderWidth: 1,
    color: '#f6f7f9',
    fontSize: 16,
    height: 48,
    paddingHorizontal: 14,
  },
  error: {
    color: '#ff8c8c',
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f4b860',
    borderRadius: 12,
    marginTop: 16,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: '#1c160d',
    fontSize: 16,
    fontWeight: '800',
  },
});
