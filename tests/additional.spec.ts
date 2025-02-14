import { test, expect } from '@playwright/test';

test.describe('The Internet - 추가 테스트', () => {

    test('체크박스 테스트', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        const checkboxes = page.locator('form#checkboxes input[type="checkbox"]');
      
        // 첫 번째 체크박스: 만약 체크되어 있지 않다면 클릭하여 체크
        if (!(await checkboxes.nth(0).isChecked())) {
          await checkboxes.nth(0).click({ force: true });
        }
        
        // 두 번째 체크박스: 만약 체크되어 있다면 클릭하여 언체크
        if (await checkboxes.nth(1).isChecked()) {
          await checkboxes.nth(1).click({ force: true });
        }
      
        // 검증: 첫 번째는 체크되어 있어야 하고, 두 번째는 체크되어 있지 않아야 함
        await expect(checkboxes.nth(0)).toBeChecked();
        await expect(checkboxes.nth(1)).not.toBeChecked();
      });

  test('드롭다운 테스트', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // 드롭다운 요소 선택
    const dropdown = page.locator('select#dropdown');
    
    // 'Option 2' 선택 (옵션의 value 값이 '2'임)
    await dropdown.selectOption('2');

    // 선택된 값 검증
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBe('2');
  });

  test('자바스크립트 알림 테스트', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // 두 번째 버튼(Confirm)을 클릭했을 때의 dialog 이벤트를 처리
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Confirm');
      await dialog.accept();
    });

    await page.click('button:has-text("Click for JS Confirm")');

    // 알림 처리 후 결과 메시지 검증
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

});
