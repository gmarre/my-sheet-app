// pages/SpecSystem/SpecSystem.js
import React, { useState } from 'react';
import axios from 'axios';
import './SpecSystem.css';


const SpecSystem = () => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
        // Envoie le fichier au backend Flask
        const response = await axios.post('http://localhost:5000/upload-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
        setSuccessMessage('Données enregistrées avec succès.');
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);

        const jsonResponse = await axios.get('http://localhost:5000/get-json');
        setJsonContent(jsonResponse.data);
        console.log(jsonResponse.data);
        setJsonContent(jsonResponse.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false); // Désactive le chargement, que l'appel réussisse ou échoue
    }
};


  return (
    <div className="spec-system">
      <h1>Bienvenue sur Spec System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Chargement...' : 'Charger et générer JSON'}
      </button>
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


