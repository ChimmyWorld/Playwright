import { test, expect } from '@playwright/test';

test.describe('the-internet.heroku.app.com 연습', () => {
 test('체크박스 테스트', async ({page}) => {
    // 1. 테스트 사이트 접속
    await page.goto('https://the-internet.herokuapp.com/');
    
    // 2. Add/Remove Element 메뉴 이동
    const AddRemoveElements = page.locator('a[href="/add_remove_elements/"]', { hasText: 'Add/Remove Elements' });
    await AddRemoveElements.click({timeout: 15000});

    // 3. Add Element 버튼 선택하여 Delete 버튼 생성
    const AddElementButton = page.locator('button[onclick="addElement()"]');
        //<button onclick="addElement()">Add Element</button>
    await AddElementButton.click({timeout: 15000});

    // 5. Delete 버튼 선택하여 Delete 버튼 삭제
    const CheckDeleteButton = page.locator('button[onclick="deleteElement()"]');
        //<button class="added-manually" onclick="deleteElement()">Delete</button>
    await CheckDeleteButton.click({timeout: 15000});

 });
});
