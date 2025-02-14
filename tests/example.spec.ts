import { test, expect } from '@playwright/test';

test('첫 번째 테스트', async ({ page }) => {
    // waitUntil: 'load' 또는 'networkidle' 옵션으로 페이지 로드를 명시적으로 기다림
    await page.goto('https://example.com', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Example Domain/);
  });
  