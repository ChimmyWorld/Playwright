import pytest

def test_checkboxes(page):
    # 체크박스 페이지로 이동
    page.goto("https://the-internet.herokuapp.com/checkboxes")
    
    # 체크박스 요소 찾기 (체크박스들은 <input type="checkbox">로 되어 있음)
    checkboxes = page.locator("form#checkboxes input[type='checkbox']")
    
    # 첫 번째 체크박스는 선택, 두 번째 체크박스는 해제하도록 조작
    checkboxes.nth(0).check()    # 첫 번째 체크박스 선택
    checkboxes.nth(1).uncheck()  # 두 번째 체크박스 해제
    
    # 검증: 첫 번째는 선택되어 있고, 두 번째는 선택되어 있지 않아야 함
    assert checkboxes.nth(0).is_checked()
    assert not checkboxes.nth(1).is_checked()
