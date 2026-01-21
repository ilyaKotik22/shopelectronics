// vitest.config.ts (в корне проекта)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts', '**/*.spec.ts'],

    // ← Вот эти строки решают 90% проблем с ESM в Next.js
    deps: {
      optimizer: {
        web: {
          include: ['next-auth', 'next/navigation', '@prisma/client'],
        },
      },
    },
    server: {
      deps: {
        inline: ['next-auth', 'next/navigation', '@prisma/client'],
      },
    },

    // Важно для Next.js
    css: false,
    setupFiles: ['./vitest.setup.ts'], // если есть setup
  },
});