from bs4 import BeautifulSoup
from urllib.parse import quote_plus

from app.utils.browser import get_browser


async def scrape_indeed(title: str, location: str):

    jobs = []

    browser = None

    try:

        browser = await get_browser()

        page = await browser.new_page(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        )

        encoded_title = quote_plus(title)
        encoded_location = quote_plus(location)

        search_url = (
            f"https://in.indeed.com/jobs?"
            f"q={encoded_title}&l={encoded_location}"
        )

        print(f"\nOpening URL: {search_url}")

        await page.goto(
            search_url,
            timeout=60000
        )

        await page.wait_for_load_state("networkidle")

        print("\nPage loaded successfully")

        html = await page.content()

        # SAVE HTML FOR DEBUGGING
        with open(
            "indeed_debug.html",
            "w",
            encoding="utf-8"
        ) as f:
            f.write(html)

        print("\nSaved indeed_debug.html")

        soup = BeautifulSoup(html, "lxml")

        # TRY MULTIPLE SELECTORS
        cards = (
            soup.select("div.job_seen_beacon")
            or soup.select("div.slider_container")
            or soup.select("div.jobsearch-SerpJobCard")
        )

        print(f"\nFound {len(cards)} job cards")

        for card in cards[:10]:

            try:

                title_element = (
                    card.select_one("h2 a")
                    or card.select_one("a[data-jk]")
                    or card.select_one("h2")
                )

                if not title_element:
                    print("Skipping card: no title")
                    continue

                company_element = (
                    card.select_one(
                        '[data-testid="company-name"]'
                    )
                    or card.select_one(".companyName")
                )

                location_element = (
                    card.select_one(
                        '[data-testid="text-location"]'
                    )
                    or card.select_one(".companyLocation")
                )

                salary_element = (
                    card.select_one(
                        '[data-testid="attribute_snippet_testid"]'
                    )
                    or card.select_one(".salary-snippet")
                )

                href = title_element.get("href")

                if not href:
                    href = ""

                if href.startswith("/"):
                    job_url = "https://in.indeed.com" + href
                else:
                    job_url = href

                job = {
                    "title": title_element.text.strip(),

                    "company": (
                        company_element.text.strip()
                        if company_element
                        else "Not Available"
                    ),

                    "location": (
                        location_element.text.strip()
                        if location_element
                        else "Not Available"
                    ),

                    "salary": (
                        salary_element.text.strip()
                        if salary_element
                        else "Not Specified"
                    ),

                    "url": job_url,

                    "source": "Indeed"
                }

                jobs.append(job)

            except Exception as card_error:

                print(
                    "\nCard Parsing Error:",
                    str(card_error)
                )

                continue

    except Exception as e:

        print("\nSCRAPING FAILED")
        print(str(e))

    finally:

        if browser:
            await browser.close()

    return jobs