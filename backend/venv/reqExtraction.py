import PyPDF2
import spacy
from spacy.language import Language

@Language.component("custom_tokenizer")
def custom_tokenizer(doc):
    for token in doc:
        if token.text.startswith("E_YODA_SYS-") and token.text[-1].isdigit():
            token.tag_ = "REQ"
    return doc

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page_number in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_number].extract_text()
    return text


def extract_requirements_from_pdf(text):
    # Implémentation la logique d'extraction d'exigences
    nlp = spacy.load("en_core_web_sm")
    nlp.add_pipe("custom_tokenizer", before="ner")

    requirements = []
    current_requirement = {}

    for sentence in text.split("\n"):
        document = nlp(sentence)

        if len(document) >= 2 and document[0].text.strip() == "implementationVersion":
            # Vérifie s'il y a déjà une exigence en cours, sinon ignore
            if "name" in current_requirement:
                current_requirement["implementationVersion"] = document[1].text.strip()
                requirements.append(current_requirement)
                current_requirement = {}  # Réinitialise l'exigence en cours

        elif document[0].tag_ == "REQ":
            # Vérifie s'il y a déjà une exigence en cours, sinon ignore
            if "name" in current_requirement:
                requirements.append(current_requirement)
                current_requirement = {}  # Réinitialise l'exigence en cours

            current_requirement = {"name": document[0].text}

    # Ajoute la dernière exigence si elle existe
    if "name" in current_requirement:
        requirements.append(current_requirement)

    return requirements

def convert_requirements_to_json(requirements):
    # Implémentation la logique de conversion en JSON
    json_data = {"exigences": requirements}
    return json_data

