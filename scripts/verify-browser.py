"""Exercise the portfolio's real browser behavior and capture its responsive layout."""

import argparse
import json
import logging
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "artifacts"
VIEWPORTS = [(320, 640), (390, 844), (768, 1024), (1024, 768), (1472, 1080), (1920, 1080)]
PROJECT_NAMES = ["Wardrobe · AI 衣橱", "数学建模 AI 工作流", "Quartus MCP", "Talk Kids", "ContractAI · 合同智审", "Coolearn 智能学习平台", "AI PPT Generator", "Study Monitor", "纹生万象—传统文化设计平台"]


def scroll_to(page: Page, position: float) -> None:
    page.evaluate("position => window.scrollTo({top:position,behavior:'instant'})", position)
    page.wait_for_timeout(350)


def element_top(page: Page, selector: str) -> float:
    return page.locator(selector).evaluate("element => element.getBoundingClientRect().top + scrollY")


def average_opacity(page: Page) -> float:
    return page.locator(".about-copy .absolute").evaluate_all(
        "elements => elements.reduce((total, element) => total + Number(getComputedStyle(element).opacity), 0) / elements.length"
    )


def verify(page: Page, url: str) -> dict:
    failures: list[str] = []
    page.on("pageerror", lambda error: failures.append(str(error)))
    page.on("console", lambda message: failures.append(message.text) if message.type == "error" else None)
    results: dict = {"viewports": [], "interactions": {}}
    for width, height in VIEWPORTS:
        page.set_viewport_size({"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        page.evaluate("() => document.fonts.ready")
        page.wait_for_timeout(1200)
        assert page.title() == "Shroud — AI 应用开发者"
        assert "Shroud" in page.locator("h1").text_content()
        assert page.locator(".service-row").count() == 4
        assert page.locator("main > section").count() == 5
        assert page.locator(".marquee-tile").count() == 63
        assert page.locator(".project-card").count() == 3
        expect(page.locator(".hero-portrait img")).to_have_attribute("src", "/images/portrait-smile.png")
        expect(page.get_by_role("navigation").get_by_role("link", name="所有作品", exact=True)).to_have_attribute("href", "/works/")
        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth"), f"Horizontal overflow at {width}px"
        heading_fits = page.locator("h1").evaluate("element => { const range=document.createRange(); range.selectNodeContents(element); return range.getBoundingClientRect().width <= element.clientWidth + 1; }")
        assert heading_fits, f"Clipped hero title at {width}px"
        assert page.locator(".about-copy").evaluate("element => element.scrollWidth <= element.clientWidth + 1"), f"Chinese paragraph overflow at {width}px"
        page.screenshot(path=str(OUTPUT / f"hero-{width}.png"))
        sections = []
        for selector in ["#showreel", "#about", "#services", "#projects"]:
            scroll_to(page, element_top(page, selector))
            page.wait_for_timeout(800)
            assert not page.evaluate("document.documentElement.scrollWidth > innerWidth")
            page.screenshot(path=str(OUTPUT / f"{selector[1:]}-{width}.png"))
            sections.append(selector)
        broken = page.locator("img").evaluate_all("images => images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.src)")
        assert not broken, f"Broken images at {width}px: {broken}"
        results["viewports"].append({"width": width, "height": height, "sections": sections, "horizontal_overflow": False, "broken_images": broken})
        logging.info("Homepage layout checked at %spx", width)

    page.set_viewport_size({"width": 1472, "height": 1080})
    page.goto(url, wait_until="networkidle")
    page.wait_for_timeout(1200)
    scroll_to(page, 1100)
    before = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => new DOMMatrix(getComputedStyle(element).transform).m41)")
    scroll_to(page, 1300)
    after = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => new DOMMatrix(getComputedStyle(element).transform).m41)")
    assert abs(after[0] - before[0] - 60) < 1
    assert abs(after[1] - before[1] + 60) < 1
    results["interactions"]["opposing_marquee"] = {"displacement": [after[index] - before[index] for index in range(2)]}

    paragraph_top = element_top(page, ".about-copy")
    scroll_to(page, paragraph_top - 1080 * 0.8)
    early = average_opacity(page)
    paragraph_height = page.locator(".about-copy").evaluate("element => element.offsetHeight")
    scroll_to(page, paragraph_top + paragraph_height - 1080 * 0.2)
    late = average_opacity(page)
    assert early < 0.3 and late > 0.99
    results["interactions"]["character_reveal"] = {"early_opacity": early, "late_opacity": late}

    scroll_to(page, element_top(page, ".project-stack") + 1500)
    cards = page.locator(".project-slot").evaluate_all("elements => elements.map(element => ({top:element.getBoundingClientRect().top,scale:new DOMMatrix(getComputedStyle(element.firstElementChild).transform).m11}))")
    assert abs(cards[0]["top"] - 128) < 1 and abs(cards[1]["top"] - 156) < 1
    assert cards[0]["scale"] < 0.99 and cards[1]["scale"] < 1
    results["interactions"]["sticky_stack"] = cards
    page.get_by_role("button", name="查看项目：Quartus MCP", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    assert page.locator(".project-dialog-gallery img").count() == 3
    expect(page.locator(".project-status")).to_have_text("Alpha")
    expect(page.locator(".repository-link")).to_have_attribute("href", "https://github.com/shroudpro/Quartus-MCP")
    page.screenshot(path=str(OUTPUT / "project-detail-personalized.png"))
    page.keyboard.press("Escape")
    expect(page.get_by_role("dialog")).not_to_be_visible()

    scroll_to(page, 0)
    portrait = page.locator(".hero-portrait").bounding_box()
    assert portrait is not None
    page.mouse.move(portrait["x"] + portrait["width"] * 0.75, portrait["y"] + portrait["height"] / 2)
    page.wait_for_timeout(400)
    magnet = page.locator(".magnet-content").evaluate("element => new DOMMatrix(getComputedStyle(element).transform).m41")
    assert magnet > 20
    results["interactions"]["portrait_magnet"] = {"displacement": magnet}

    page.locator(".hero-bottom").get_by_role("button", name="联系我", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    assert not page.locator("form").evaluate("form => form.checkValidity()")
    expect(page.locator(".contact-links a").first).to_have_attribute("href", "mailto:shroudmail233@Gmail.com")
    page.get_by_label("你的称呼", exact=True).fill("Alex Taylor")
    page.get_by_label("回复邮箱", exact=True).fill("alex@example.com")
    page.get_by_label("想聊的项目", exact=True).fill("希望交流一个新的 AI 应用开发项目与 Agent 工作流。")
    page.get_by_role("button", name="复制咨询", exact=True).click()
    expect(page.get_by_role("status")).to_contain_text("咨询内容已复制")
    draft = page.get_by_label("咨询草稿", exact=True).input_value()
    assert draft.startswith("你好，Shroud：")
    page.screenshot(path=str(OUTPUT / "contact-personalized.png"))
    clipboard = page.evaluate("() => navigator.clipboard.readText()")
    # Windows normalizes clipboard line endings to CRLF; compare the message itself.
    assert clipboard.replace("\r\n", "\n") == draft.replace("\r\n", "\n"), "Clipboard text differs from the inquiry draft."
    page.keyboard.press("Tab")
    assert page.locator("dialog").evaluate("element => element.contains(document.activeElement)")
    page.keyboard.press("Escape")
    assert page.evaluate("document.body.style.overflow") == ""
    results["interactions"]["contact_form"] = {"required_validation": True, "clipboard_matches_draft": True, "focus_contained": True, "escape_closes": True}
    assert not failures, f"Browser errors: {failures}"
    results["console_errors"] = failures
    return results


def verify_works(page: Page, url: str) -> dict:
    failures: list[str] = []
    page.on("pageerror", lambda error: failures.append(str(error)))
    page.on("console", lambda message: failures.append(message.text) if message.type == "error" else None)
    works_url = url.rstrip("/") + "/works/"
    results: dict = {"viewports": [], "details": [], "navigation": {}}
    for width, height in VIEWPORTS:
        page.set_viewport_size({"width": width, "height": height})
        response = page.goto(works_url, wait_until="networkidle")
        assert response is not None and response.status == 200
        page.evaluate("() => document.fonts.ready")
        page.wait_for_timeout(1000)
        assert page.title() == "所有作品 — Shroud"
        expect(page.locator("h1")).to_have_text("All Works")
        assert page.locator(".project-name h3").all_text_contents() == PROJECT_NAMES
        assert page.locator(".project-stack").count() == 3
        expect(page.locator("nav a[aria-current='page']")).to_have_text("所有作品")
        assert page.locator(".hero-nav").evaluate("nav => [...nav.children].every(item => {const b=item.getBoundingClientRect(); return b.left >= 0 && b.right <= innerWidth;})"), f"Navigation clipped at {width}px"
        page.screenshot(path=str(OUTPUT / f"works-start-{width}.png"))
        for index in range(9):
            stack = page.locator(".project-stack").nth(index // 3)
            assert stack.locator(".project-slot").count() == 3
            stack_top = stack.evaluate("element => element.getBoundingClientRect().top + scrollY")
            slot = page.locator(".project-slot").nth(index)
            slot_height = slot.evaluate("element => element.offsetHeight")
            sticky_top = 48 if width < 640 else (128 if width >= 768 else 96)
            scroll_to(page, stack_top + (index % 3) * slot_height - sticky_top)
            card = page.locator(".project-card").nth(index)
            assert card.evaluate("card => {const b=card.getBoundingClientRect(); return b.top >= -1 && b.bottom <= innerHeight + 1;}"), f"Card {index + 1} clipped at {width}x{height}"
            assert card.locator(".project-name").evaluate("element => element.scrollWidth <= element.clientWidth + 1"), f"Project name overflow at {width}px"
            button = card.get_by_role("button", name=f"查看项目：{PROJECT_NAMES[index]}", exact=True)
            assert button.evaluate("button => {const b=button.getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight;}"), f"Project button unreachable at {width}px"
            expect(card.locator("img").first).to_have_js_property("complete", True)
            assert not page.evaluate("document.documentElement.scrollWidth > innerWidth"), f"Works page overflow at {width}px"
            if index in (3, 6, 8):
                page.screenshot(path=str(OUTPUT / f"works-{index + 1:02}-{width}.png"))
        broken = page.locator("img").evaluate_all("images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)")
        assert not broken, f"Works images failed at {width}px: {broken}"
        results["viewports"].append({"width": width, "height": height, "project_count": 9, "stack_count": 3, "broken_images": broken})
        logging.info("All nine works checked at %spx", width)

    page.set_viewport_size({"width": 1472, "height": 1080})
    page.goto(works_url, wait_until="networkidle")
    for index, name in enumerate(PROJECT_NAMES):
        stack = page.locator(".project-stack").nth(index // 3)
        stack_top = stack.evaluate("element => element.getBoundingClientRect().top + scrollY")
        slot_height = page.locator(".project-slot").nth(index).evaluate("element => element.offsetHeight")
        scroll_to(page, stack_top + (index % 3) * slot_height - 128)
        opener = page.get_by_role("button", name=f"查看项目：{name}", exact=True)
        opener.click()
        expect(page.get_by_role("dialog")).to_be_visible()
        expect(page.locator("#dialog-title")).to_have_text(name)
        assert page.locator(".project-dialog-gallery img").count() == 3
        if index in (5, 6, 8):
            assert page.locator(".project-status").count() == 0
        if index in (6, 8):
            assert page.locator(".technology-list").count() == 0
        if index == 3:
            assert page.locator(".repository-link").count() == 0
        if index == 5:
            expect(page.locator(".repository-link")).to_have_attribute("href", "https://github.com/shroudpro/Coolearn")
        if index in (3, 8):
            page.screenshot(path=str(OUTPUT / f"works-detail-{index + 1:02}.png"))
        expect(page.get_by_role("button", name="关闭弹窗", exact=True)).to_be_focused()
        page.keyboard.press("Tab")
        # Native dialogs may tab into browser chrome when only the close button is focusable.
        assert page.evaluate("document.querySelector('dialog').contains(document.activeElement) || !document.hasFocus()")
        page.locator("nav a").first.evaluate("element => element.focus()")
        assert page.evaluate("document.activeElement.closest('nav') === null"), "Modal background received focus."
        page.keyboard.press("Escape")
        expect(page.get_by_role("dialog")).not_to_be_visible()
        expect(opener).to_be_focused()
        assert page.evaluate("document.body.style.overflow") == ""
        results["details"].append({"name": name, "opened": True, "closed": True})
        logging.info("Project detail and keyboard interaction checked: %s", name)

    scroll_to(page, 0)
    page.get_by_role("navigation").get_by_role("button", name="联系", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    expect(page.locator(".contact-links a").first).to_have_attribute("href", "mailto:shroudmail233@Gmail.com")
    page.keyboard.press("Escape")
    page.reload(wait_until="networkidle")
    assert page.locator(".project-card").count() == 9
    page.get_by_role("link", name="↖ 返回首页", exact=True).first.click()
    expect(page).to_have_url(url.rstrip("/") + "/")
    assert page.locator(".project-card").count() == 3
    page.get_by_role("navigation").get_by_role("link", name="所有作品", exact=True).click()
    expect(page).to_have_url(works_url)
    page.go_back(wait_until="networkidle")
    assert page.locator(".project-card").count() == 3
    page.go_forward(wait_until="networkidle")
    assert page.locator(".project-card").count() == 9
    page.get_by_role("navigation").get_by_role("link", name="精选作品", exact=True).click()
    expect(page).to_have_url(url.rstrip("/") + "/#projects")
    assert page.locator(".project-card").count() == 3
    results["navigation"] = {"direct_access": True, "refresh": True, "home_to_works": True, "return_home": True, "back_forward": True, "home_anchor": True, "contact": True}
    assert not failures, f"Works browser errors: {failures}"
    results["console_errors"] = failures
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:5174")
    parser.add_argument("--browser", default="msedge")
    args = parser.parse_args()
    OUTPUT.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel=args.browser, headless=True)
        context = browser.new_context(permissions=["clipboard-read", "clipboard-write"])
        try:
            results = verify(context.new_page(), args.url)
            results["all_works"] = verify_works(context.new_page(), args.url)
            reduced = browser.new_context(reduced_motion="reduce", viewport={"width": 1472, "height": 1080})
            try:
                page = reduced.new_page()
                page.goto(args.url, wait_until="networkidle")
                assert average_opacity(page) == 1
                assert page.locator(".marquee-tile").evaluate_all("images => images.every(image => image.src.endsWith('.svg'))")
                scroll_to(page, 1100)
                first = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => element.style.transform)")
                scroll_to(page, 1400)
                second = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => element.style.transform)")
                assert first == second
                results["interactions"]["reduced_motion"] = {"static_previews": True, "text_visible": True, "scroll_motion_disabled": True}
                page.goto(args.url.rstrip("/") + "/works/", wait_until="networkidle")
                assert page.locator(".project-card").count() == 9
                assert page.locator(".project-card").evaluate_all("cards => cards.every(card => new DOMMatrix(getComputedStyle(card).transform).m11 === 1)")
                results["all_works"]["reduced_motion"] = {"cards_visible": True, "scale_disabled": True}
            finally:
                reduced.close()
            (OUTPUT / "verification.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
            logging.info("All responsive and interaction checks passed; evidence saved to %s", OUTPUT)
        finally:
            context.close()
            browser.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    main()
