from app.services.indeed import scrape_indeed


async def search_jobs(title: str, location: str):

    indeed_jobs = await scrape_indeed(
        title=title,
        location=location
    )

    return indeed_jobs