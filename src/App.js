import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [scenarios, setScenarios] = useState([]);
  const [newScenario, setNewScenario] = useState('');
  const [newStep, setNewStep] = useState({
    stepName: '',
    age: 0,
    taille: 0,
  });

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
  
    setScenarios((prevScenarios) => {
      const updatedScenarios = [...prevScenarios];
      const currentScenario = updatedScenarios[updatedScenarios.length - 1];
  
      if (!currentScenario.steps) {
        currentScenario.steps = [];
      }
  
      // Ajoutez la nouvelle étape au tableau `steps`
      currentScenario.steps = [...currentScenario.steps, newStepInstance];
  
      // Mettez à jour le tableau `scenarios`
      console.log('Updated Scenarios:', updatedScenarios);
  
      return updatedScenarios;
    });
  
    setNewStep({
      stepName: '',
      age: 0,
      taille: 0,
    });
  
    // Supprimez le dernier élément si nécessaire
    setScenarios((prevScenarios) => {
      const updatedScenarios = [...prevScenarios];
      const currentScenario = updatedScenarios[updatedScenarios.length - 1];
  
      if (currentScenario.steps.length === 2) {
        currentScenario.steps.pop();
      }
  
      return updatedScenarios;
    });
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
              <ul>
                {scenario.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    {step.stepName} - Âge: {step.age}, Taille: {step.taille}
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
