// pages/GenerateVTP/GenerateVTP.js
import React, { useState, useEffect } from 'react';
import AddScenario from './AddScenario';
import AddStep from './AddStep';
import PopUpModifScenario from '../../components/PopUps/PopUpModifScenario';
import PopUpModifStep from '../../components/PopUps/PopUpModifStep';
import './GenerateVTP.css'; // Assurez-vous de créer ce fichier CSS
import IconDustBin from '../../images/dustbin.png';
import IconModifyBin from '../../images/modify.png';



const GenerateVTP = () => {
  const [scenarios, setScenarios] = useState([]);
  const [newScenario, setNewScenario] = useState({
    scenarioName: '',
    applicableVersion: '',
    requirements: [],
    scenarioDescription: '',
    steps: [],
  });
  const [newStep, setNewStep] = useState({
    stepName: '',
    stepDescription: '',
    expectedResult: '',
  });
  const [newRequirement, setNewRequirement] = useState('');

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(null);

  const [isStepPopUpOpen, setStepPopUpOpen] = useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const handleScenarioChange = (e) => {
    setNewScenario({
      ...newScenario,
      [e.target.name]: e.target.value,
    });
  };

  const handleScenarioReqChange = (e) => {
    setNewRequirement(e.target.value);
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
      requirements: [],
      scenarioDescription: '',
      steps: [],
    });
  };

  const addRequirement = () => {
    console.log('addRequirement called');
    if (newRequirement.trim() !== '') {
      setNewScenario((prevScenario) => ({
        ...prevScenario,
        requirements: [...prevScenario.requirements, newRequirement],
      }));
      setNewRequirement(''); // Réinitialise la nouvelle exigence après l'ajout
    }
  };


  const deleteScenario = (index) => {
    console.log('index scenario : ' + index);
    const updatedScenarios = [...scenarios];
    updatedScenarios.splice(index, 1);
    setScenarios(updatedScenarios);
  };

  const deleteStep = (index, indexStep) => {
    console.log('index scenario : ' + index + ' index step : ' + indexStep);
    console.log('deleteStep called');
    const updatedScenarios = [...scenarios];
    updatedScenarios[index].steps.splice(indexStep, 1);
    setScenarios(updatedScenarios);
  };

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
      // Première requête pour enregistrer les données au format JSON
      const saveDataResponse = await fetch('http://localhost:5000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenarios }),
      });

      if (saveDataResponse.ok) {
        console.log('Données enregistrées avec succès.');

        // Deuxième requête pour générer le fichier .docx
        const generateDocxResponse = await fetch('http://localhost:5000/generate-docx', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scenarios }),
        });

        if (generateDocxResponse.ok) {
          console.log('Fichier .docx généré avec succès.');
          setSuccessMessage('Données enregistrées avec succès.');

          // Réinitialise le message après un certain délai
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000); // 3000 millisecondes (3 secondes) par exemple
        } else {
          console.error('Erreur lors de la génération du fichier .docx.');
        }
      } else {
        console.error("Erreur lors de l'enregistrement des données.");
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  const handleAddStep = () => {
    console.log('handleAddStep called');
    const newStepInstance = {
      stepName: newStep.stepName,
      stepDescription: newStep.stepDescription,
      expectedResult: newStep.expectedResult,
    };

    if (scenarios.length === 0) {
      scenarios.push({
        scenarioName: 'Default',
        applicableVersion: '',
        requirements: [],
        scenarioDescription: '',
        steps: [newStepInstance],
      });
    } else {
      const lastScenarios = scenarios[scenarios.length - 1];
      lastScenarios.steps.push(newStepInstance);
    }

    setNewStep({
      stepName: '',
      stepDescription: '',
      expectedResult: '',
    });
  };

  

  return (
    <div className="generate-vtp">
      <h1>Generate VTP</h1>
      <AddScenario
        newScenario={newScenario}
        handleScenarioChange={handleScenarioChange}
        handleScenarioReqChange={handleScenarioReqChange}
        addScenario={addScenario}
        addRequirement={addRequirement}
      />
      <AddStep
        handleAddStep={handleAddStep}
        newStep={newStep}
        handleStepChange={handleStepChange}
      />






      <div>
        <h2>Scénarios</h2>
        <ul>
          {scenarios.map((scenario, index) => (
            <li key={index}>
              <ul>
                <table border="1" cellpadding="5" cellspacing="2">
                  <caption>Scenario {index}</caption>
                  <tr>
                    <th> Scenario Name </th>
                    <td> {scenario.scenarioName} </td>
                  </tr>
                  <tr>
                    <th> Applicable Version </th>
                    <td> {scenario.applicableVersion} </td>
                  </tr>
                  <tr>
                    <th> Requirements </th>
                    <td>
                      <ul>
                        {scenario.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th> Scenario Description </th>
                    <td> {scenario.scenarioDescription} </td>
                  </tr>
                  <tr>
                    <th> Update </th>
                    <td>
                      <button onClick={() => openModifyScenarioPopUp(index)} className="modify-icon modify">
                        <img src={IconModifyBin} className="modify_icon" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th> Delete </th>
                    <td>
                      <button
                        name="DeleteScenario"
                        value="Delete Scenario"
                        onClick={() => deleteScenario(index)}
                        className="delete-icon delete"
                      >
                        <img src={IconDustBin} className="delete-icon" />
                      </button>
                    </td>
                  </tr>
                </table>
              </ul>

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
                  <caption>Steps of the Scenario {index} </caption>
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Step Name</th>
                      <th>Step Description</th>
                      <th>Expected Result</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenario.steps.map((step, stepIndex) => (
                      <tr key={stepIndex}>
                        <td>{stepIndex}</td>
                        <td>{step.stepName}</td>
                        <td>{step.stepDescription}</td>
                        <td>{step.expectedResult}</td>
                        <td>
                          <button
                            name="DeleteStep"
                            value="Delete Step"
                            onClick={() => deleteStep(index, stepIndex)}
                            className="delete-icon delete"
                          >
                            <img src={IconDustBin} className="delete-icon" />
                          </button>
                        </td>
                        <td>
                          <button
                            name="ModifyStep"
                            value="Modify Step"
                            onClick={() => openModifyStepPopUp(index, stepIndex)}
                            className="modify-icon modify"
                          >
                            <img src={IconModifyBin} className="modify_icon" />
                          </button>
                        </td>
                        {/* Condition pour afficher la pop-up de modification d'étape */}
                        {isStepPopUpOpen &&
                          selectedScenarioIndex !== null &&
                          selectedStepIndex !== null && (
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

export default GenerateVTP;
