import asyncio
import sys

from fastapi import FastAPI
from app.routes.jobs import router


# FIX FOR WINDOWS + PLAYWRIGHT
if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(
        asyncio.WindowsProactorEventLoopPolicy()
    )


app = FastAPI(
    title="Job Search API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
async def root():
    return {
        "message": "Job Search API Running"
    }
asyncio.set_event_loop_policy(
    asyncio.WindowsProactorEventLoopPolicy()
)