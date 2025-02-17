import { test, expect } from '@playwright/test';

test.describe('Samsung Spain 웹사이트 테스트', () => {
  test('검색 기능 테스트', async ({ page }) => {
    // 1. 사이트 접속
    await page.goto('https://www.samsung.com/es');

    // 2. 쿠키(또는 개인정보 동의) 버튼이 보이면 클릭
    const acceptAllButton = page.locator('#truste-consent-button');
    if (await acceptAllButton.isVisible({ timeout: 5000 })) {
      await acceptAllButton.click({ timeout: 5000 });
    }

    // 3. 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('load');

    // 4. 검색 아이콘을 찾아 클릭
    const searchIcon = page.locator('button.gnb__search-btn-js[aria-haspopup="true"]');
    await searchIcon.click({ timeout: 5000 });

    // 5. 검색 입력창에 'galaxy' 입력 후 엔터 키로 검색 실행
    const searchInput = page.locator('input#gnb-search-keyword');
    await searchInput.fill('galaxy');
    await searchInput.press('Enter');

    // 6. 검색 결과 컨테이너가 표시되는지 확인
    const resultsContainer = page.locator('div.aisearch-tab__wrap');
    await expect(resultsContainer).toBeVisible({ timeout: 5000 });

    // 7. 검색 결과 제목이 'Resultados para'를 포함하는지 확인
    const searchResultsTitle = page.locator('h1.aisearch-tab__result-text');
    await expect(searchResultsTitle).toBeVisible({ timeout: 5000 });
    await expect(searchResultsTitle).toContainText('Resultados para');

    // 8. 검색 키워드가 'galaxy'로 표시되는지 확인
    const searchKeywordSpan = page.locator('span#js-input-search.aisearch-tab__result-item');
    await expect(searchKeywordSpan).toBeVisible({ timeout: 5000 });
    await expect(searchKeywordSpan).toContainText('galaxy');
  });
});
