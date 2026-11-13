# Job Agent API

A FastAPI-based job search API that reads a candidate resume PDF, predicts the likely role using a trained ML model, and searches for matching job opportunities on Indeed.

This repository is designed as a lightweight backend for resume-to-job matching and job discovery workflows.

## Features

- Upload a resume PDF
- Predict the most likely job role using TF-IDF + ML model
- Search for jobs in a specified location
- Return structured JSON results with job metadata
- Built with FastAPI and async scraping

## Tech Stack

- Python
- FastAPI
- Playwright
- BeautifulSoup
- pdfplumber
- scikit-learn style serialized model artifacts

## Repository Structure

```text
Job-Agent-API/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── requirements.txt        # Python dependencies
│   ├── README.md              # App-level notes
│   ├── ml/
│   │   ├── model.pkl          # Trained prediction model
│   │   ├── tfidf.pkl          # TF-IDF vectorizer
│   │   └── predict.py         # Resume role prediction logic
│   ├── routes/
│   │   └── jobs.py            # API route for job search
│   ├── schemas/
│   │   ├── request.py         # Request models
│   │   └── response.py        # Response models
│   ├── services/
│   │   ├── aggregator.py      # Aggregation service
│   │   └── indeed.py          # Indeed scraping logic
│   └── utils/
│       └── browser.py         # Playwright browser setup
├── indeed_debug.html          # Debug HTML captured from Indeed
├── venv/                      # Local virtual environment
└── README.md                  # Project overview
```

## How It Works

1. The API accepts a resume PDF and a target city/location.
2. The resume text is extracted with `pdfplumber`.
3. The extracted text is transformed using a saved TF-IDF vectorizer.
4. A pre-trained model predicts the likely job title/role.
5. The API searches Indeed using that inferred role and location.
6. Matching job cards are parsed and returned as JSON.

## API Endpoint

### POST /jobs/search

Upload a resume in PDF format and provide the job search location.

Request format:

- `resume`: PDF file
- `location`: string such as `Bangalore`, `Hyderabad`, or `Remote`

Example using curl:

```bash
curl -X POST "http://localhost:8000/jobs/search" \
  -F "resume=@/path/to/resume.pdf" \
  -F "location=Bangalore"
```

Example response:

```json
{
  "predicted_role": "Software Engineer",
  "count": 10,
  "jobs": [
    {
      "title": "Python Developer",
      "company": "Example Company",
      "location": "Bengaluru, Karnataka",
      "salary": "₹12L - ₹18L",
      "url": "https://in.indeed.com/...",
      "source": "Indeed"
    }
  ]
}
```

## Local Setup

### Prerequisites

- Python 3.10+
- pip
- Playwright browser dependencies

### Installation

```bash
git clone https://github.com/Gowri369271/Job-Agent-API.git
cd Job-Agent-API
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r app/requirements.txt
python -m playwright install chromium
```

### Run the API

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

## Development Notes

- The scraper uses Playwright to load Indeed pages and parse job sections.
- The `app/ml` folder contains serialized model artifacts used for resume classification.
- The project is useful as a prototype or portfolio project, but production usage may require more robust scraping, rate limiting, handling of anti-bot protections, and deployment configuration.

## License

This project does not currently include a repository license file. If you plan to share or distribute it publicly, consider adding an appropriate open-source license.

## Contributing

Pull requests and improvements are welcome. If you modify the scraping logic, model pipeline, or response schema, please ensure the API contract remains consistent for clients.

## Disclaimer

This project scrapes public job listings from Indeed and is intended for learning, experimentation, and personal project use. Always respect platform terms of service and avoid abusive or high-volume automated scraping.
