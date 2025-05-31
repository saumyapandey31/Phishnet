from flask import Flask, request, jsonify

app = Flask(__name__)

# TODO: Load your ML model here, for example:
# model = load_model('your_model.pkl')

@app.route('/api/check-url', methods=['POST'])
def check_url():
    data = request.get_json()
    url = data.get('url')

    try:
        # Replace this with your actual ML model prediction
        # For example: prediction = model.predict([url])[0]
        prediction = 'phishing' if 'phish' in url else 'legitimate'  # Dummy example
        confidence = 91  # Example confidence score
        is_zero_day = True  # Example: not in known threat database
        
        return jsonify({
            "result": prediction,           # 'phishing' or 'legitimate'
            "usedMLModel": True,
            "isZeroDay": is_zero_day,
            "modelVersion": "v1.3-RF",
            "confidenceScore": confidence,
            "detectionSource": "ML Model"
        })
    except Exception as e:
        print("Error, falling back:", e)

        # Fallback logic
        return jsonify({
            "result": "phishing",
            "usedMLModel": False,
            "isZeroDay": False,
            "modelVersion": None,
            "confidenceScore": None,
            "detectionSource": "Heuristic Rules"
        })

if __name__ == '__main__':
    app.run(debug=True)
