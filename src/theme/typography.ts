import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  largeTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
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
} as const;
