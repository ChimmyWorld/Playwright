import { test, expect } from '@playwright/test';

test('첫 번째 테스트', async ({ page }) => {
  await page.goto('https://example.com');  // 사이트 방문
  await expect(page).toHaveTitle(/Example Domain/);  // 타이틀 확인
});
