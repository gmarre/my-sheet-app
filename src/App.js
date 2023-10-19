import React, { useState, useEffect } from 'react';
import './App.css';
import PopUpModifScenario from './PopUpModifScenario';

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

  const openModifyPopUp = (scenarioIndex) => {
    // Mettez à jour l'état pour indiquer que la pop-up doit être ouverte
    setPopUpOpen(true);
    // Stockez l'index du scénario sélectionné
    setSelectedScenarioIndex(scenarioIndex);
  };

  const closePopUp = () => {
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
        console.log('Données enregistrées avec succès.');
      } else {
        console.error('Erreur lors de l\'enregistrement des données.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  useEffect(() => {
    console.log('Component updated:', scenarios);
  }, [scenarios]);

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
                <svg
                  className="delete-icon"
                  viewBox="0 0 408.483 408.483"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <g>
                      <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z" />
                      <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305H164.285c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z" />
                    </g>
                  </g>
                </svg>
                {/*<img src="\Users\MARRE\my-sheet-app\images\rubbish.svg" alt="Delete Scenario" className="delete-icon" />*/}
              </button>
              <button onClick={() => openModifyPopUp(index)}>Modify Scenario</button>
              {/* Condition pour afficher la pop-up de modification */}
              {isPopUpOpen && selectedScenarioIndex === index && (
                <PopUpModifScenario
                  scenario={scenarios[selectedScenarioIndex]}
                  modifyScenario={modifyScenario}
                  onClose={closePopUp}
                  selectedScenarioIndex={selectedScenarioIndex}
                />
              )}
              <ul>
                {scenario.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    {step.stepName} - Âge: {step.age}, Taille: {step.taille} 
                    <button name="DeleteStep" value="Delete Step" onClick={() => deleteStep(index, stepIndex)}> 
                      <svg
                        className="delete-icon"
                        viewBox="0 0 408.483 408.483"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <g>
                            <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z" />
                            <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305H164.285c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z" />
                          </g>
                        </g>
                      </svg> 
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={saveData}>Enregistrer les Données</button>
    </div>
  );
};

export default App;
