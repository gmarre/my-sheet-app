// PopUpModifScenario.js
import React, { useState } from 'react';
import './PopUpModifScenario.css';

const PopUpModifScenario = ({ scenario, onClose, selectedScenarioIndex  }) => {
    
    const message = `Modifier le nom du Scénario d'index ${scenario.scenarioName} ? ${scenario.applicableVersion}`;
    
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

    const handleModifyRequirementsChange = (e,index) => {
      scenario.requirements[index] = e.target.value;
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
              <select name="applicableVersion" id="applicableVersion" onChange={handleModifyVersionChange}>
                <option disabled selected value="">Select a version</option>
                <option value="VAIT">VAIT</option>
                <option value="V0">V0</option>
                <option value="V1">V1</option>
                <option value="V2">V2</option>
              </select>
            </label>
            <label>
              Scenario Requirements
              <ul>
                {scenario.requirements.map((req, index) => (
                  <li key={index}><input type ="text" name="requirements" placeholder={req} onChange={(e) => handleModifyRequirementsChange(e, index)} /></li>
                ))}
              </ul>
              
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
