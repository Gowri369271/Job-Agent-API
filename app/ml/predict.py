import pickle
import pdfplumber


# Load once when application starts
with open("app/ml/tfidf.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("app/ml/model.pkl", "rb") as f:
    model = pickle.load(f)


def predict_role(pdf_path: str):

    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    X = vectorizer.transform([text])

    prediction = model.predict(X)

    return prediction[0]