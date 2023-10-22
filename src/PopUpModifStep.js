// PopUpModifStep.js
import React, { useState, useEffect } from 'react';
import './PopUpModifStep.css';

const PopUpModifStep = ({ step, onClose, selectedScenarioIndex, selectedStepIndex, modifyStep }) => {
  const [stepName, setStepName] = useState('');
  const nameStep = step ? step.stepName : '';
  const ageStep = step ? step.age : '';
  const tailleStep= step ? step.taille : '';


  const openPopUp = () => {
    console.log('Pop-up ouverte');
  };

  const closePopUp = () => {
    console.log('Pop-up fermée');
    onClose(); // Appeler la fonction onClose fournie par le parent (App.js)
  };

  const handleStepNameChange = (e) => {
    step.stepName = e.target.value;
  };

  const handleStepAgeChange = (e) => {
    step.age = e.target.value;
  };

  const handleStepTailleChange = (e) => {
    step.taille = e.target.value;
  };

  // Appeler openPopUp lors du rendu initial
  React.useEffect(() => {
    openPopUp();
  }, []);

  return (
    <div className="popup-step">
      <div className="popup-content-step">
        <h2>Modifier le nom de l'Étape - {nameStep} </h2>
        <label>
          Nouveau Nom de l'Étape:
          <input type="text" placeholder={nameStep} onChange={handleStepNameChange} />
          Nouvel Age : 
          <input type="text" placeholder={ageStep} onChange={handleStepAgeChange} />
          Nouvel Taille : 
          <input type="text" placeholder={tailleStep} onChange={handleStepTailleChange} />
        </label>
        <button onClick={closePopUp}>Modifier</button>
      </div>
    </div>
  );
};

export default PopUpModifStep;
