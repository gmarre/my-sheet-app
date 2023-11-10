import PyPDF2
import spacy
import json
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
    nlp = spacy.load("en_core_web_md")
    nlp.add_pipe("custom_tokenizer", before="ner")

    requirements = []
    current_requirement = {}

    for sentence in text.split("\n"):
        document = nlp(sentence)

        if document[0].tag_ == "REQ":
            if "name" in current_requirement:
                #requirements.append(current_requirement)
                current_requirement = {}  # Réinitialise l'exigence en cours

            current_requirement = {"name": document[0].text}
            
        elif len(document) >= 2 and document[0].text.strip() == "implementationVersion":
            if "name" in current_requirement:
                current_requirement["implementationVersion"] = document[1].text.strip()
                
                # Vérifie s'il y a une implementationVersion avant d'ajouter l'exigence
                if "implementationVersion" in current_requirement:
                    requirements.append(current_requirement)
                    
                current_requirement = {}  # Réinitialise l'exigence en cours

        

    # Ajoute la dernière exigence si elle existe et a une implementationVersion
    if "name" in current_requirement and "implementationVersion" in current_requirement:
        requirements.append(current_requirement)

    return requirements

def convert_requirements_to_json(requirements):
    json_data = {"exigences": requirements}
    return json_data
