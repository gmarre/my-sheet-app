// PopUpModifScenario.js
import React, { useState } from 'react';
import './PopUpModifScenario.css';

const PopUpModifScenario = ({ scenario, onClose, selectedScenarioIndex  }) => {
    
    const message = `Modifier le nom du Scénario d'index ${selectedScenarioIndex} ? ${scenario.applicableVersion}`;
    const nameScenario = scenario ? scenario.scenarioName : '';
    
    const openPopUp = () => {
      console.log('Pop-up ouverte');
    };
  
    const closePopUp = () => {
      console.log('Pop-up fermée');
      onClose(); // Appeler la fonction onClose fournie par le parent (App.js)
    };

    const handleModifyNameChange = (e) => {
      scenario.scenarioName = e.target.value;
    };

    const handleModifyVersionChange = (e) => {
      scenario.applicableVersion = e.target.value;
    };

    const handleModifyRequirementsChange = (e) => {
      scenario.requirements = e.target.value;
    };

    const handleModifyDescriptionChange = (e) => {
      scenario.scenarioDescription = e.target.value;
    };

  
    // Appeler openPopUp lors du rendu initial
    React.useEffect(() => {
      openPopUp();
    }, []);
  
    return (
      <div className="popup">
        <div className="popup-content">
            <h2> {message} </h2>
            <label>
              Scenario Name ?
              <input type ="text" name="name" placeholder={scenario.scenarioName} onChange={handleModifyNameChange} />
            </label>
            <label>
              Applicable Version ?
              <input type ="text" name="applicableVersion" placeholder={scenario.applicableVersion} onChange={handleModifyVersionChange} />
            </label>
            <label>
              Scenario Requirements
              <input type ="text" name="requirements" placeholder={scenario.requirements} onChange={handleModifyRequirementsChange} />
            </label>
            <label>
              Scenario Description
              <input type ="text" name="description" placeholder={scenario.scenarioDescription} onChange={handleModifyDescriptionChange} />
            </label>
            <button onClick={closePopUp}>Modifier</button>
        </div>
      </div>
    );
  };
  
  export default PopUpModifScenario;
