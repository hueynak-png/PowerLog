import type { ProgramInstantiationStrategy } from './types';

const strategies = new Map<string, ProgramInstantiationStrategy>();

export const registerStrategy = (strategy: ProgramInstantiationStrategy): void => {
  strategies.set(strategy.key, strategy);
};

export const resolveStrategy = (templateKey: string): ProgramInstantiationStrategy | null => {
  for (const strategy of strategies.values()) {
    if (strategy.supportedTemplateKeys.includes(templateKey)) {
      return strategy;
    }
  }
  return null;
};

export const getStrategy = (key: string): ProgramInstantiationStrategy | undefined => {
  return strategies.get(key);
};
