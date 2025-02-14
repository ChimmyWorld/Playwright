import { test, expect } from '@playwright/test';

test('로그인 테스트', async ({ page }) => {
  // 1. 로그인 페이지로 이동
  await page.goto('https://the-internet.herokuapp.com/login');

  // 2. 사용자 이름과 비밀번호 입력
  // 해당 페이지의 input 요소는 id로 선택할 수 있음
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');

  // 3. 로그인 버튼 클릭
  await page.click('button[type="submit"]');

  // 4. 로그인 성공 확인
  // 로그인 성공 시 URL에 '/secure'가 포함되며, 성공 메시지가 표시됨
  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
