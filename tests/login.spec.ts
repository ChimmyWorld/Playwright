import { test, expect } from '@playwright/test';

test('로그인 테스트', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');

  // 버튼이 보이고 활성화될 때까지 명시적으로 기다림
  await page.waitForSelector('button[type="submit"]', { state: 'visible', timeout: 10000 });
  // 강제 클릭 옵션 사용
  await page.click('button[type="submit"]', { force: true });

  // 로그인 성공 확인: URL과 성공 메시지 검증
  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
