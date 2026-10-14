import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });
declare const process: NodeJS.Process;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  timeout: 60000,
  expect: { timeout: 10000 },
  reporter: [['html', { outputFile: 'playwright-report/index.html' }]],
  use: {
    trace: 'on-first-retry',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
