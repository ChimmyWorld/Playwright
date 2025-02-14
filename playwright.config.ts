import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // 테스트 파일들이 들어있는 폴더 경로
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: 'html',
  use: {
    headless: true, // 브라우저를 헤드리스 모드로 실행
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
