import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image, ImageBackground, Platform, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import '@/src/i18n';
import { useAppStore } from '@/src/stores/useAppStore';

const lightBg = require('../assets/power-log-light.png');
const darkBg = require('../assets/power-log-dark.png');

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const initialize = useAppStore((state) => state.initialize);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const bgSource = Platform.OS === 'web'
    ? { uri: colorScheme === 'dark' ? '/bg-dark.png' : '/bg-light.png' }
    : (colorScheme === 'dark' ? darkBg : lightBg);

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <Image source={bgSource} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="cover" />
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerShadowVisible: false,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="workout/[sessionId]" options={{ headerShown: false }} />
          <Stack.Screen name="workout/[sessionId]/summary" options={{ headerShown: false }} />
          <Stack.Screen name="review" options={{ headerShown: false }} />
        </Stack>
      </View>
    );
  }

  return (
    <ImageBackground source={bgSource} style={{ flex: 1 }} resizeMode="cover">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="workout/[sessionId]" options={{ headerShown: false }} />
        <Stack.Screen name="workout/[sessionId]/summary" options={{ headerShown: false }} />
        <Stack.Screen name="review" options={{ headerShown: false }} />
      </Stack>
    </ImageBackground>
  );
}
