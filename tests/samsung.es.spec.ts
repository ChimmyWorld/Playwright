import { test, expect } from '@playwright/test';

test.describe('Samsung Spain 웹사이트 테스트', () => {
  test('Galaxy A16 구매 후 장바구니 -> 게스트 주문 진행 테스트', async ({ page }) => {
    // 1. 삼성 스페인 웹사이트 접속
    await page.goto('https://www.samsung.com/es');

    // 2. 쿠키 동의 버튼 클릭 (팝업 확인 후 클릭)
    const acceptAllButton = page.locator('#truste-consent-button');
    if (await acceptAllButton.isVisible({ timeout: 15000 })) { 
      await acceptAllButton.click({ timeout: 15000 }); 
    }

    // 3. 페이지 로드 완료 대기 (removed - using waitForSelector instead)
    // await page.waitForLoadState('load');

    // 4. 검색 아이콘 클릭하여 검색 입력 활성화
    const searchIcon = page.locator('button.gnb__search-btn-js[aria-haspopup="true"]');
    await searchIcon.click({ timeout: 15000 }); 

    // 5. 검색창에 'Galaxy A16' 입력 및 검색 실행
    const searchInput = page.locator('input#gnb-search-keyword');
    await searchInput.fill('Galaxy A16');
    await searchInput.press('Enter');

    // 6. 검색 결과 컨테이너 로딩 확인 (waitForSelector for result title)
    const searchResultsTitleLocator = page.locator('h1.aisearch-tab__result-text'); // Locator for result title
    await page.waitForSelector('h1.aisearch-tab__result-text', { timeout: 15000 }); // Wait for result title - Increased timeout
    await expect(searchResultsTitleLocator).toBeVisible({ timeout: 15000 });
    await expect(searchResultsTitleLocator).toContainText('Resultados para');

    // 7. 'Comprar' 버튼 클릭 (Galaxy A16 구매 페이지로 이동)
    const buyButton = page.locator('a.cta.cta--black.cta--contained.aisearch__cta--purchase[aria-label="Galaxy A16:Comprar"]');
    await buyButton.click({ timeout: 15000 }); 

    // 8. 'Añadir al carrito' 버튼 클릭 (장바구니에 추가) - force: true added
    const addToCartButton = page.locator('a.cta.cta--contained.cta--emphasis.cta--2line.add-special-tagging.js-buy-now.tg-add-to-cart[aria-label="Añadir al carrito:Galaxy A16"]');
    await addToCartButton.click({ timeout: 15000, force: true });

    // 9. 'Tramitar pedido' 버튼 클릭 (주문 Checkout 페이지로 이동)
    const checkoutButton = page.locator('button.pill-btn.pill-btn--blue.pill-btn--full-width.order-summary__btn.sticky-cta-enabled[data-an-la="proceed to checkout"]');
    await checkoutButton.click({ timeout: 30000 }); 

    // 10. 게스트 이메일 입력 필드에 'test1@teml.net' 입력
    const guestEmailInput = page.locator('input[formcontrolname="guestEmail"][placeholder="Enter your email to process your order"]');
    await guestEmailInput.fill('test1@teml.net');

    // 11. 'Continue as a guest' 버튼 클릭 (게스트 주문 계속)
    const continueAsGuestButton = page.locator('button.button.pill-btn.pill-btn--blue.reset[data-an-la="guest"]');
    await continueAsGuestButton.click({ timeout: 15000 }); 

    // 12. 최종 Checkout Contact Info 페이지 URL 검증
    await expect(page).toHaveURL('https://shop.samsung.com/es/checkout/one?step=CHECKOUT_STEP_CONTACT_INFO');
  });
});