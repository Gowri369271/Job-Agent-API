from pydantic import BaseModel

class JobSearchRequest(BaseModel):
    location: str