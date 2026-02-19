import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', '**/*.test.ts'],
  },
});