import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';

/** 模糊半径 (px) - 模拟 iOS 液态玻璃 */
export const GLASS_BLUR = 16;

const webOnly = {
  backdropFilter: `blur(${GLASS_BLUR}px)`,
  WebkitBackdropFilter: `blur(${GLASS_BLUR}px)`,
};

interface GlassViewProps {
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * 平台感知液态玻璃容器。
 * iOS: UIVisualEffectView (GPU 加速，零性能损耗)
 * Web: CSS backdrop-filter 降级模糊
 */
export function GlassView({
  children,
  intensity = 60,
  tint = 'default',
  borderRadius = radius.xl,
  style,
}: GlassViewProps) {
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          {
            backgroundColor: colors.glassSurface,
            borderWidth: 1,
            borderColor: colors.glassBorder,
            borderRadius,
            overflow: 'hidden',
          },
          webOnly,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[{ borderRadius, overflow: 'hidden' }, style]}
    >
      {children}
    </BlurView>
  );
}
