import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://api.github.com',
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    trace: 'retain-on-failure',
  },
});
