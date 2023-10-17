import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [valeurFormulaire, setValeurFormulaire] = useState('');

  const handleChange = (e) => {
    setValeurFormulaire(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valeur soumise :', valeurFormulaire);
    // Ajoutez ici la logique pour traiter la valeur du formulaire comme nécessaire.
  };

  return (
    <div>
      <h1>Mon Application React</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input type="text" value={valeurFormulaire} onChange={handleChange} />
        </label>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default App;
