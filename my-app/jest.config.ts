import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  
  // Расширяем список пакетов, которые НЕ трансформируем (все ESM-модули)
  transformIgnorePatterns: [
  '/node_modules/(?!next-auth|@auth/core|next|react|react-dom)/',
],

  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Полезно добавить для отладки
  verbose: true,
};

export default createJestConfig(config);