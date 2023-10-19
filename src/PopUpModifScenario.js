// PopUpModifScenario.js
import React, { useState } from 'react';
import './PopUpModifScenario.css';

const PopUpModifScenario = ({ scenario, onClose, selectedScenarioIndex  }) => {
    
    const message = `Modifier le Scénario ayant l'index : ${selectedScenarioIndex}`;
    const nameScenario = scenario ? scenario.scenarioName : '';
    
    const openPopUp = () => {
      console.log('Pop-up ouverte');
    };
  
    const closePopUp = () => {
      console.log('Pop-up fermée');
      onClose(); // Appeler la fonction onClose fournie par le parent (App.js)
    };
  
    // Appeler openPopUp lors du rendu initial
    React.useEffect(() => {
      openPopUp();
    }, []);
  
    return (
      <div className="popup">
        <div className="popup-content">
            <h2> {message} </h2>
            <p>Nom du Scénario : {nameScenario}</p>
            <button onClick={closePopUp}>Fermer</button>
        </div>
      </div>
    );
  };
  
  export default PopUpModifScenario;
