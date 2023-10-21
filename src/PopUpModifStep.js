import React, { useState } from 'react';
import './PopUpModifStep.css';

const PopUpModifStep = ({ scenario, onClose, selectedScenarioIndex }) => {
  const nameScenario = scenario ? scenario.name : '';
  const message = `Modifier le Step du Scenario ${nameScenario}`;
  
  {/*const [stepName, setStepName] = useState(scenario ? scenario.step.stepName : '');
    const [stepAge, setStepAge] = useState(scenario ? scenario.step.age : '');
    const [stepTaille, setStepTaille] = useState(scenario ? scenario.step.taille : ''); */}

  const openPopUp = () => {
    console.log('Pop-up ouverte');
  };

  const closePopUp = () => {
    console.log('Pop-up fermée');
    onClose();
  };

  {/*const handleModifyChangeName = (e) => {
    setStepName(e.target.value);
  };

  const handleModifyChangeAge = (e) => {
    setStepAge(e.target.value);
  };

  const handleModifyChangeTaille = (e) => {
    setStepTaille(e.target.value);
  };*/}

  React.useEffect(() => {
    openPopUp();
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{message}</h2>
        {/*<input type="text" name="StepName" placeholder={stepName} onChange={handleModifyChangeName} />
        <input type="text" name="StepAge" placeholder={stepAge} onChange={handleModifyChangeAge} />
        <input type="text" name="StepTaille" placeholder={stepTaille} onChange={handleModifyChangeTaille} />*/}
        <button onClick={closePopUp}>Fermer</button>
      </div>
    </div>
  );
};

export default PopUpModifStep;
