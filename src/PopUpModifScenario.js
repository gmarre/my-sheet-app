// PopUpModifScenario.js
import React, { useState } from 'react';
import './PopUpModifScenario.css';

const PopUpModifScenario = ({ scenario, onClose, selectedScenarioIndex  }) => {
    
    const message = `Modifier le nom du Scénario d'index ${selectedScenarioIndex} ?`;
    const nameScenario = scenario ? scenario.scenarioName : '';
    
    const openPopUp = () => {
      console.log('Pop-up ouverte');
    };
  
    const closePopUp = () => {
      console.log('Pop-up fermée');
      onClose(); // Appeler la fonction onClose fournie par le parent (App.js)
    };

    const handleModifyChange = (e) => {
      scenario.scenarioName = e.target.value;
    };

  
    // Appeler openPopUp lors du rendu initial
    React.useEffect(() => {
      openPopUp();
    }, []);
  
    return (
      <div className="popup">
        <div className="popup-content">
            <h2> {message} </h2>
            <input type ="text" name="name" placeholder={nameScenario} onChange={handleModifyChange} />
            <button onClick={closePopUp}>Modifier</button>
        </div>
      </div>
    );
  };
  
  export default PopUpModifScenario;
