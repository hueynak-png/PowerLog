import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/components/useColorScheme';
import { darkColors, lightColors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme';

interface TabBarProps {
  state: { index: number; routes: ReadonlyArray<{ key: string; name: string }> };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: { emit: (...args: any[]) => any; navigate: (name: string) => void };
}

const iconMap: Record<string, string> = {
  index: '⌂',
  workout: '◆',
  calendar: '□',
  program: '▤',
  analytics: '⌁',
  settings: '⚙',
};

/**
 * Custom tab bar with expo-blur glass effect on iOS,
 * CSS backdrop-filter on web.
 */
export function GlassTabBar({ state, descriptors, navigation }: TabBarProps) {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <BlurView
      intensity={60}
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      style={styles.blurContainer}
    >
      {/* Semi-transparent overlay for tint/readability */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: colorScheme === 'dark'
              ? 'rgba(10, 15, 25, 0.55)'
              : 'rgba(240, 245, 250, 0.55)',
          },
        ]}
      />
      {/* Tab items */}
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const color = isFocused ? themeColors.primary : themeColors.textTertiary;
          const icon = iconMap[route.name] ?? '●';

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: isFocused ? themeColors.primarySoft : 'transparent',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.icon,
                    { color },
                    route.name === 'settings' && styles.smallIcon,
                  ]}
                >
                  {icon}
                </Text>
              </View>
              {options.title && (
                <Text
                  style={[
                    styles.label,
                    { color },
                  ]}
                  numberOfLines={1}
                >
                  {options.title}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius.xxl,
  },
  tabRow: {
    flexDirection: 'row',
    height: 88,
    paddingBottom: 12,
    paddingTop: 12,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xl,
  },
  iconWrapper: {
    width: 34,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  icon: {
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 24,
  },
  smallIcon: {
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
});
