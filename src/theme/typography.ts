import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  largeTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: -0.6,
  },
  title1: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.4,
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600',
  },
  headline: {
    fontSize: 17,
    fontWeight: '600',
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
  },
  callout: {
    fontSize: 16,
    fontWeight: '400',
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400',
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
  },
  overline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  metric: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
} as const;
