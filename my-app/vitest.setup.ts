// vitest.setup.ts
import { vi } from 'vitest';

// Глобальные моки или настройки, если нужно
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
  })),
}));