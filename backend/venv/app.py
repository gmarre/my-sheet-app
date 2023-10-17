from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/save-data', methods=['POST'])
def save_data():
    data = request.get_json()
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({'message': 'Données enregistrées avec succès.'})

if __name__ == '__main__':
    app.run(debug=True)
