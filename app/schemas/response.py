from pydantic import BaseModel
from typing import List


class Job(BaseModel):
    title: str
    company: str
    location: str
    salary: str
    url: str
    source: str


class JobSearchResponse(BaseModel):
    jobs: List[Job]