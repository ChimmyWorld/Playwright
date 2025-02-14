import { test, expect } from '@playwright/test';

test('Wikipedia 검색 및 기사 검증 (Java)', async ({ page }) => {
  // 1. 영어 위키피디아 홈페이지로 이동
  await page.goto('https://en.wikipedia.org');

  // 2. 검색 입력창이 보이는지 확인
  const searchInput = page.locator('input[name="search"]');
  await expect(searchInput).toBeVisible();

  // 3. "Java (programming language)"라는 검색어 입력
  await searchInput.fill('Java (programming language)');

  // 4. Enter 키를 눌러 검색 시작
  await page.keyboard.press('Enter');

  // 5. 결과 페이지로 이동할 때까지 기다림 (네트워크 안정화)
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // 6. 첫 번째 제목(기사 제목)이 "Java"를 포함하는지 검증
  const heading = page.locator('#firstHeading');
  await expect(heading).toContainText('Java');

  // 7. 목차(ToC)가 반드시 존재함을 검증 (타임아웃 15초)
  const toc = page.locator('#toc');
  await expect(toc).toBeVisible({ timeout: 15000 });
});
