// pages/SpecSystem/SpecSystem.js
import React, { useState } from 'react';
import axios from 'axios';
import './SpecSystem.css';

const SpecSystem = () => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Envoie le fichier au backend Flask
      const response = await axios.post('http://localhost:5000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Affiche la réponse du backend (peut être modifié selon les besoins)
      setSuccessMessage('Données enregistrées avec succès.');
      // Réinitialise le message après un certain délai
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // 3000 millisecondes (3 secondes) par exemple

      // Si tu veux récupérer le fichier JSON généré
      const jsonResponse = await axios.get('http://localhost:5000/get-json');
      setJsonContent(jsonResponse.data); // Stocke le contenu JSON dans l'état
      console.log(jsonResponse.data); // Affiche le fichier JSON généré
      setJsonContent(jsonResponse.data); // Stocke le contenu JSON dans l'état
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="spec-system">
      <h1>Bienvenue sur Spec System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Charger et générer JSON</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {jsonContent && (
        <div>
          <h2>Contenu JSON généré :</h2>
          <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SpecSystem;


