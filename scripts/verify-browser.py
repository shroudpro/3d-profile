"""Exercise the portfolio's real browser behavior and capture its responsive layout."""

import argparse
import json
import logging
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "artifacts"
VIEWPORTS = [(320, 640), (390, 844), (768, 1024), (1472, 1080), (1920, 1080)]


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
        assert page.title() == "Jack -- 3D Creator"
        assert page.locator("main > section").count() == 5
        assert page.locator(".marquee-tile").count() == 63
        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth"), f"Horizontal overflow at {width}px"
        heading_fits = page.locator("h1").evaluate("element => { const range=document.createRange(); range.selectNodeContents(element); return range.getBoundingClientRect().width <= element.clientWidth + 1; }")
        assert heading_fits, f"Clipped hero title at {width}px"
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
    page.get_by_role("button", name="Live Project: Solaris Digital", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    assert page.locator(".project-dialog-gallery img").count() == 3
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

    page.locator(".hero-bottom").get_by_role("button", name="Contact Me", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    assert not page.locator("form").evaluate("form => form.checkValidity()")
    page.get_by_label("Your name", exact=True).fill("Alex Taylor")
    page.get_by_label("Email address", exact=True).fill("alex@example.com")
    page.get_by_label("About your project", exact=True).fill("I would like a 3D motion design for a new product launch.")
    page.get_by_role("button", name="Copy inquiry", exact=True).click()
    expect(page.get_by_role("status")).to_contain_text("Inquiry copied")
    draft = page.get_by_label("Your inquiry", exact=True).input_value()
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
            reduced = browser.new_context(reduced_motion="reduce", viewport={"width": 1472, "height": 1080})
            try:
                page = reduced.new_page()
                page.goto(args.url, wait_until="networkidle")
                assert average_opacity(page) == 1
                assert page.locator(".marquee-tile").evaluate_all("images => images.every(image => image.src.endsWith('.webp'))")
                scroll_to(page, 1100)
                first = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => element.style.transform)")
                scroll_to(page, 1400)
                second = page.locator(".marquee-track").evaluate_all("elements => elements.map(element => element.style.transform)")
                assert first == second
                results["interactions"]["reduced_motion"] = {"static_previews": True, "text_visible": True, "scroll_motion_disabled": True}
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
