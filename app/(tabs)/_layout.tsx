import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/src/theme';

const iconMap = {
  home: '⌂',
  workout: '◆',
  calendar: '□',
  program: '▤',
  analytics: '⌁',
  settings: '⚙',
} as const;

function DockIcon({ name, color, focused }: { name: keyof typeof iconMap; color: string; focused: boolean }) {
  return (
    <View style={{
      width: 34,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: focused ? colors.primarySoft : 'transparent',
    }}>
      <Text style={{ color, fontSize: name === 'settings' ? 18 : 21, fontWeight: '900', lineHeight: 24 }}>{iconMap[name]}</Text>
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          position: 'absolute',
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.lg,
          backgroundColor: colors.tabBar,
          borderColor: colors.tabBarBorder,
          borderWidth: 1,
          borderRadius: radius.xxl,
          height: 88,
          paddingBottom: 12,
          paddingTop: 12,
          paddingHorizontal: spacing.sm,
          shadowColor: colors.shadowMedium,
          shadowOffset: { width: 0, height: 14 },
          shadowOpacity: 0.9,
          shadowRadius: 24,
          elevation: 12,
        },
        tabBarItemStyle: {
          borderRadius: radius.xl,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '800',
          marginTop: 2,
          marginBottom: 0,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: '800',
        },
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.home'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: t('nav.workout'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="workout" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t('nav.calendar'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="calendar" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: t('nav.program'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="program" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t('nav.analytics'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="analytics" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('nav.settings'),
          tabBarIcon: ({ color, focused }) => <DockIcon name="settings" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
