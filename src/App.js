import React, { useState, useEffect } from 'react';
import './App.css';
import PopUpModifScenario from './PopUpModifScenario';
import PopUpModifStep from './PopUpModifStep';
import IconDustBin from './images/dustbin.png'
import IconModifyBin from './images/modify.png'

const App = () => {
  const [scenarios, setScenarios] = useState([]);
  const [newScenario, setNewScenario] = useState('');
  const [newStep, setNewStep] = useState({
    stepName: '',
    age: 0,
    taille: 0,
  });

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(null);

  const [isStepPopUpOpen, setStepPopUpOpen] = useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  

  const handleScenarioChange = (e) => {
    setNewScenario(e.target.value);
  };

  const handleStepChange = (e) => {
    setNewStep({
      ...newStep,
      [e.target.name]: e.target.value,
    });
  };

  const addScenario = () => {
    console.log('addScenario called');
    setScenarios([...scenarios, { scenarioName: newScenario, steps: [] }]);
    setNewScenario('');
  };

  const addStep = () => {
    console.log('addStep called');
  
    const newStepInstance = {
      stepName: newStep.stepName,
      age: newStep.age,
      taille: newStep.taille,
    };
  
    if (scenarios.length === 0) {
      scenarios.push({ scenarioName: 'Default', steps: [newStepInstance] });
    } else {
      const lastScenarios = scenarios[scenarios.length - 1]
      lastScenarios.steps.push(newStepInstance);
    }
  
  setNewStep({
    stepName: '',
    age: 0,
    taille: 0,
  });


  };

  const deleteScenario = (index) => {
    console.log("index scenario : " + index)
    const updatedScenarios = [...scenarios];
    updatedScenarios.splice(index, 1);
    setScenarios(updatedScenarios);
  }
  
  const deleteStep = (index,indexStep) => {
    console.log("index scenario : " + index + " index step : " + indexStep)
    console.log("deleteStep called");
    const updatedScenarios = [...scenarios];
    updatedScenarios[index].steps.splice(indexStep, 1);
    setScenarios(updatedScenarios);
  }

  const openModifyScenarioPopUp = (scenarioIndex) => {
    // Mettez à jour l'état pour indiquer que la pop-up doit être ouverte
    setPopUpOpen(true);
    // Stockez l'index du scénario sélectionné
    setSelectedScenarioIndex(scenarioIndex);
  };

  const closeModifyScenarioPopUp = () => {
    // Mettez à jour l'état pour indiquer que la pop-up doit être fermée
    setPopUpOpen(false);
    // Réinitialisez l'index du scénario sélectionné
    setSelectedScenarioIndex(null);
  };

  // Ajoutez la déclaration de modifyScenario
  const modifyScenario = (modifiedScenario) => {
    // Logique pour modifier le scénario
    console.log('modifyScenario called with:', modifiedScenario);

    // Vous devrez peut-être mettre à jour scenarios ici
    // avec le scénario modifié
  };

  const openModifyStepPopUp = (scenarioIndex, stepIndex) => {
    setStepPopUpOpen(true);
    setSelectedScenarioIndex(scenarioIndex);
    setSelectedStepIndex(stepIndex);
  };

  const closeModifyStepPopUp = () => {
    setStepPopUpOpen(false);
    setSelectedStepIndex(null);
  };

  // Ajouter la déclaration de modifyStep
  const modifyStep = (modifiedStep) => {
    // Logique pour modifier l'étape
    console.log('modifyStep called with:', modifiedStep);
    // Vous devrez peut-être mettre à jour scenarios ici
    // avec l'étape modifiée
  };

  const saveData = async () => {
    try {
      const response = await fetch('http://localhost:5000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenarios }),
      });
  
      if (response.ok) {
        setSuccessMessage('Données enregistrées avec succès.');
  
        // Vous pouvez également réinitialiser le message après un certain délai
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000); // 3000 millisecondes (3 secondes) par exemple
      } else {
        console.error('Erreur lors de l\'enregistrement des données.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Mon Application React</h1>

      <div>
        <h2>Ajouter un Scénario</h2>
        <input type="text" value={newScenario} onChange={handleScenarioChange} />
        <button onClick={addScenario}>Ajouter Scénario</button>
      </div>

      <div>
        <h2>Ajouter une Étape</h2>
        <label>
          Nom de l'Étape:
          <input type="text" name="stepName" value={newStep.stepName} onChange={handleStepChange} />
        </label>
        <label>
          Âge:
          <input type="number" name="age" value={newStep.age} onChange={handleStepChange} />
        </label>
        <label>
          Taille:
          <input type="number" name="taille" value={newStep.taille} onChange={handleStepChange} />
        </label>
        <button onClick={addStep}>Ajouter Étape</button>
      </div>

      <div>
        <h2>Scénarios</h2>
        <ul>
          {scenarios.map((scenario, index) => (
            <li key={index}>
              {scenario.scenarioName}
              <button name="DeleteScenario" value="Delete Scenario" onClick={() => deleteScenario(index)}>
                <img src={IconDustBin} className="delete-icon" />
              </button>
              <button onClick={() => openModifyScenarioPopUp(index)}>
                <img src={IconModifyBin} className="modify_icon" />
              </button>
              {/* Condition pour afficher la pop-up de modification */}
              {isPopUpOpen && selectedScenarioIndex === index && (
                <PopUpModifScenario
                  scenario={scenarios[selectedScenarioIndex]}
                  modifyScenario={modifyScenario}
                  onClose={closeModifyScenarioPopUp}
                  selectedScenarioIndex={selectedScenarioIndex}
                />
              )}
              <ul>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Nom de l'Etape</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenario.steps.map((step, stepIndex) => (
                    <tr key={stepIndex}>
                      <td>{step.stepName}</td>
                      <td>{step.age}</td>
                      <td>{step.taille}</td>
                      <button name="DeleteStep" value="Delete Step" onClick={() => deleteStep(index, stepIndex)}> 
                        <img src={IconDustBin} className="delete-icon" />
                      </button>
                      <button name="ModifyStep" value="Modify Step" onClick={() => openModifyStepPopUp(index, stepIndex)}>
                        <img src={IconModifyBin} className="modify_icon" />
                      </button>
                      {/* Condition pour afficher la pop-up de modification d'étape */}
                      {isStepPopUpOpen && selectedScenarioIndex !== null && selectedStepIndex !== null && (
                        <PopUpModifStep
                          step={scenarios[selectedScenarioIndex].steps[selectedStepIndex]}
                          onClose={closeModifyStepPopUp}
                          selectedScenarioIndex={selectedScenarioIndex}
                          selectedStepIndex={selectedStepIndex}
                          modifyStep={modifyStep}
                        />
                      )}
                    </tr>
                    ))}
                  </tbody>
                </table>              
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={saveData}>Enregistrer les Données</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default App;
