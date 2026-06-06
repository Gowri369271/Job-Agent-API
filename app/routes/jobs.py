from fastapi import APIRouter, UploadFile, File, Form
import tempfile
import os

from app.services.aggregator import search_jobs
from app.ml.predict import predict_role


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/search")
async def search_jobs_route(
    resume: UploadFile = File(...),
    location: str = Form(...)
):

    # Save uploaded PDF temporarily
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        temp_file.write(await resume.read())
        temp_pdf_path = temp_file.name

    try:

        role = predict_role(temp_pdf_path)

        jobs = await search_jobs(
            title=role,
            location=location
        )

        return {
            "predicted_role": role,
            "count": len(jobs),
            "jobs": jobs
        }

    finally:

        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)