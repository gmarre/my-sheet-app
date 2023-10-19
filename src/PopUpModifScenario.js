// PopUpModifScenario.js
import React, { useState } from 'react';
import './PopUpModifScenario.css';

const PopUpModifScenario = ({ onClose }) => {
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
          <h2>Modifier le Scénario</h2>
          {/* Contenu de la pop-up (à compléter) */}
          <button onClick={closePopUp}>Fermer</button>
        </div>
      </div>
    );
  };
  
  export default PopUpModifScenario;
