// pages/GenerateVTP/GenerateVTP.js
import React, { useState, useEffect } from 'react';
import './GenerateVTP.css';

const GenerateVTP = () => {
  const [scenarios, setScenarios] = useState([]);
  const [newScenario, setNewScenario] = useState({
    scenarioName: '',
    applicableVersion: '',
    requirements: '',
    scenarioDescription: '',
    steps: [],
  });

  const [newStep, setNewStep] = useState({
    stepName: '',
    stepDescription: '',
    expectedResult: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleScenarioChange = (e) => {
    setNewScenario({
      ...newScenario,
      [e.target.name]: e.target.value,
    });
  };

  const handleStepChange = (e) => {
    setNewStep({
      ...newStep,
      [e.target.name]: e.target.value,
    });
  };

  const addScenario = () => {
    console.log('addScenario called');
    setScenarios([...scenarios, newScenario]);
    setNewScenario({
      scenarioName: '',
      applicableVersion: '',
      requirements: '',
      scenarioDescription: '',
      steps: [],
    });
  };

  const addStep = () => {
    console.log('addStep called');
    const newStepInstance = {
      stepName: newStep.stepName,
      stepDescription: newStep.stepDescription,
      expectedResult: newStep.expectedResult,
    };

    setNewScenario((prevScenario) => {
      const updatedScenario = { ...prevScenario, steps: [...prevScenario.steps, newStepInstance] };
      return updatedScenario;
    });

    setNewStep({
      stepName: '',
      stepDescription: '',
      expectedResult: '',
    });
  };

  const deleteScenario = (index) => {
    console.log("index scenario : " + index);
    const updatedScenarios = [...scenarios];
    updatedScenarios.splice(index, 1);
    setScenarios(updatedScenarios);
  };

  const deleteStep = (index, indexStep) => {
    console.log("index scenario : " + index + " index step : " + indexStep);
    console.log("deleteStep called");
    const updatedScenarios = [...scenarios];
    updatedScenarios[index].steps.splice(indexStep, 1);
    setScenarios(updatedScenarios);
  };

  const saveData = async () => {
    try {
      // ... (le reste du code inchangé)

    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <div className="generate-vtp">
      <h1>Generate VTP</h1>

      <div>
        <h2>Ajouter un Scénario</h2>
        <label>
          Nom du Scénario:
          <input type="text" name="scenarioName" value={newScenario.scenarioName} onChange={handleScenarioChange} />
        </label>
        {/* Ajouter les nouveaux champs pour le scénario */}
        <label>
          Version Applicable:
          <input type="text" name="applicableVersion" value={newScenario.applicableVersion} onChange={handleScenarioChange} />
        </label>
        <label>
          Exigences:
          <input type="text" name="requirements" value={newScenario.requirements} onChange={handleScenarioChange} />
        </label>
        <label>
          Description du Scénario:
          <input type="text" name="scenarioDescription" value={newScenario.scenarioDescription} onChange={handleScenarioChange} />
        </label>
        <button onClick={addScenario}>Ajouter Scénario</button>
      </div>

      <div>
        <h2>Ajouter une Étape</h2>
        <label>
          Nom de l'Étape:
          <input type="text" name="stepName" value={newStep.stepName} onChange={handleStepChange} />
        </label>
        <label>
          Description de l'Étape:
          <input type="text" name="stepDescription" value={newStep.stepDescription} onChange={handleStepChange} />
        </label>
        <label>
          Résultat Attendu:
          <input type="text" name="expectedResult" value={newStep.expectedResult} onChange={handleStepChange} />
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
                <img src={IconDustBin} className="delete-icon" alt="Delete" />
              </button>
              {/* ... (restant du code inchangé) */}
              <ul>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Nom de l'Etape</th>
                      <th>Description de l'Etape</th>
                      <th>Résultat Attendu</th>
                      <th>Version Applicable</th>
                      <th>Exigences</th>
                      <th>Description du Scénario</th>
                      <th>Actions</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenario.steps.map((step, stepIndex) => (
                      <tr key={stepIndex}>
                        <td>{step.stepName}</td>
                        <td>{step.stepDescription}</td>
                        <td>{step.expectedResult}</td>
                        <td>{scenario.applicableVersion}</td>
                        <td>{scenario.requirements}</td>
                        <td>{scenario.scenarioDescription}</td>
                        <td>
                          <button name="ModifyStep" value="Modify Step">
                            <img src={IconModify} className="modify-icon" alt="Modify" />
                          </button>
                        </td>
                        <td>
                          <button name="DeleteStep" value="Delete Step" onClick={() => deleteStep(index, stepIndex)}>
                            <img src={IconDustBin} className="delete-icon" alt="Delete" />
                          </button>
                        </td>
                        <td>
                          <button name="UpdateStep" value="Update Step">
                            <img src={IconUpdate} className="modify-icon" alt="Update" />
                          </button>
                        </td>
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

export default GenerateVTP;
