import pytest

def test_checkboxes(page):
    # 체크박스 페이지로 이동
    page.goto("https://the-internet.herokuapp.com/checkboxes")
    
    # 체크박스 요소 찾기 (체크박스들은 <input type="checkbox">로 되어 있음)
    checkboxes = page.locator("form#checkboxes input[type='checkbox']")
    
    # 첫 번째 체크박스: 만약 체크되어 있지 않다면 강제로 체크
    if not checkboxes.nth(0).is_checked():
        checkboxes.nth(0).check(force=True)
    
    # 두 번째 체크박스: 만약 체크되어 있다면 강제로 언체크
    if checkboxes.nth(1).is_checked():
        checkboxes.nth(1).uncheck(force=True)
    
    # 검증: 첫 번째는 체크되어 있고, 두 번째는 체크되어 있지 않아야 함
    assert checkboxes.nth(0).is_checked(), "첫 번째 체크박스는 체크되어 있어야 합니다."
    assert not checkboxes.nth(1).is_checked(), "두 번째 체크박스는 체크되어 있지 않아야 합니다."
