import pickle
from .extractor import extract_features

with open("ml/phishing_model.pkl", "rb") as f:
    model = pickle.load(f)

def check_zero_day(url):
    features = extract_features(url)
    prediction = model.predict([features])
    return "Phishing" if prediction[0] == 1 else "Legitimate"
