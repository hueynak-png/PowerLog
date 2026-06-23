import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useColorScheme } from '@/components/useColorScheme';
import { darkColors, lightColors } from '@/src/theme/colors';
import { GlassTabBar } from '@/src/components/ui/GlassTabBar';

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        sceneStyle: { backgroundColor: 'transparent' },
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerTitleStyle: {
          color: themeColors.textPrimary,
          fontWeight: '800',
        },
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.home'),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: t('nav.workout'),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t('nav.calendar'),
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: t('nav.program'),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t('nav.analytics'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('nav.settings'),
        }}
      />
    </Tabs>
  );
}
