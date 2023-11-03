from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from docx import Document
from docx.shared import Pt, RGBColor
import json
import spacy
import PyPDF2
from reqExtraction import extract_requirements_from_pdf, convert_requirements_to_json, extract_text_from_pdf

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
        table = doc.add_table(rows=1, cols=4)
        table.autofit = False

        # Ajoute les en-têtes du tableau et définit les bordures
        for i, header in enumerate(['Index de l\'etape', 'Nom de l\'etape', 'Description de l\'étape', 'Résultat Attendu']):
            cell = table.cell(0, i)
            cell.text = header
            cell.paragraphs[0].runs[0].font.size = Pt(12)
            cell.paragraphs[0].runs[0].bold = True
            cell.paragraphs[0].runs[0].underline = True
            cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 0, 0)

        # Ajoute les étapes dans le tableau
        for step_index, step in enumerate(scenario['steps']):
            row_cells = table.add_row().cells
            for i, content in enumerate([str(step_index + 1), step['stepName'], step['stepDescription'], step['expectedResult']]):
                cell = row_cells[i]
                cell.text = content
                cell.paragraphs[0].runs[0].font.size = Pt(12)
                cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0, 0, 0)  # Couleur noire

    # Sauvegarde le document Word avec le bon nom de fichier
    doc.save('VTP_TEST.docx')

    # Envoie le fichier Word généré avec le bon nom de fichier
    return send_file('VTP_TEST.docx', as_attachment=True, download_name='VTP_TEST.docx')


@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        # Enregistre le fichier PDF sur le serveur
        uploaded_file.save('input.pdf')

        pdf_text = extract_text_from_pdf('input.pdf')

        # Appelle la fonction d'extraction d'exigences ici
        extracted_requirements = extract_requirements_from_pdf(pdf_text)

        # Convertit les exigences en fichier JSON
        json_requirements = convert_requirements_to_json(extracted_requirements)

        # Sauvegarde le fichier JSON sur le serveur
        with open('output.json', 'w') as json_file:
            json.dump(json_requirements, json_file, indent=2)

        return jsonify({'message': 'Fichier PDF téléchargé et JSON généré avec succès.'})
    else:
        return jsonify({'error': 'Aucun fichier sélectionné.'})

@app.route('/get-json')
def get_json():
    try:
        # Ajoute ici la logique pour générer le fichier JSON (si ce n'est pas déjà fait)
        # Assure-toi que le fichier JSON est généré dans le même dossier que ton serveur Flask
        json_file_path = 'output.json'

        # Envoie le fichier JSON en tant que réponse
        return send_from_directory('.', json_file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
