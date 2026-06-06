from playwright.async_api import async_playwright


playwright_instance = None


async def get_browser():

    global playwright_instance

    if playwright_instance is None:
        playwright_instance = await async_playwright().start()

    browser = await playwright_instance.chromium.launch(
        headless=True
    )

    return browser