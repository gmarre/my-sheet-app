from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from docx import Document
import json

app = Flask(__name__)
CORS(app)

# Données initiales
scenarios = []

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/save-data', methods=['POST'])
def save_data():
    data = request.get_json()
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({'message': 'Données enregistrées avec succès.'})

@app.route('/generate-docx', methods=['POST'])
def generate_docx():
    data = request.json

    # Crée un document Word
    doc = Document()
    print('Document .docx créé avec succès.')

    # Ajoute le titre du fichier Word
    doc.add_heading('VTP de Test', level=1)

    # Parcours les scénarios
    for scenario in data['scenarios']:
        # Ajoute le nom du scénario comme titre de section
        doc.add_heading(scenario['scenarioName'], level=2)

        # Crée un tableau pour les étapes
        table = doc.add_table(rows=1, cols=3)
        table.autofit = False

        # Ajoute les en-têtes du tableau
        for i, header in enumerate(['Étape', 'Âge', 'Taille']):
            table.cell(0, i).text = header

        # Ajoute les étapes dans le tableau
        for step in scenario['steps']:
            row_cells = table.add_row().cells
            row_cells[0].text = step['stepName']
            row_cells[1].text = str(step['age'])  # Convertit en chaîne pour éviter les problèmes avec les nombres
            row_cells[2].text = str(step['taille'])

    # Sauvegarde le document Word
    doc.save('output.docx')

    # Envoie le fichier Word généré
    return send_file('output.docx')

if __name__ == '__main__':
    app.run(debug=True)
