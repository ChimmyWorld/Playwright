import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 테스트 파일들이 위치한 폴더
  testDir: './tests',

  // 각 테스트의 최대 실행 시간 (30초)
  timeout: 30 * 1000,

  // expect()의 기본 타임아웃 (5초)
  expect: { timeout: 5000 },

  // HTML 리포터 사용 (테스트 결과를 시각적으로 확인할 수 있음)
  reporter: 'html',

  use: {
    // 헤드리스 모드로 실행 (실제 브라우저 창을 보고 싶으면 false로 변경)
    headless: true,
    // 브라우저 뷰포트 크기 설정
    viewport: { width: 1280, height: 720 },
    // 액션 타임아웃 (0이면 무제한)
    actionTimeout: 0,
    // 첫 번째 재시도에서 트레이스 수집
    trace: 'on-first-retry',
    // 실패 시 비디오 기록 (디버깅에 유용)
    video: 'retain-on-failure',
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
