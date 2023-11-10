// PopUpModifStep.js
import React, { useState, useEffect } from 'react';
import './PopUpModifStep.css';

const PopUpModifStep = ({ step, onClose, selectedScenarioIndex, selectedStepIndex, modifyStep }) => {
  const [stepName, setStepName] = useState('');
  const nameStep = step ? step.stepName : '';
  const stepDescription = step ? step.stepDescription : '';
  const stepExpectedResult= step ? step.expectedResult : '';


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
    step.stepDescription = e.target.value;
  };

  const handleStepTailleChange = (e) => {
    step.expectedResult = e.target.value;
  };

  // Appeler openPopUp lors du rendu initial
  React.useEffect(() => {
    openPopUp();
  }, []);

  return (
    <div className="popup-step">
      <div className="popup-content-step">
        <h2> Modifier le nom de l'Étape </h2>
        <ul className='choices-step'>
          New Step Name:
          <input type="text" placeholder={nameStep} onChange={handleStepNameChange} />
          New Step Description : 
          <input type="text" placeholder={stepDescription} onChange={handleStepAgeChange} />
          New Expected Result : 
          <input type="text" placeholder={stepExpectedResult} onChange={handleStepTailleChange} />
        </ul>
        <button onClick={closePopUp}>Modifier</button>
      </div>
    </div>
  );
};

export default PopUpModifStep;
