// pages/GenerateVTP/AddScenario.js
import React from 'react';

const AddScenario = ({ newScenario, handleScenarioChange, handleScenarioReqChange, addRequirement, addScenario }) => {
  return (
    <div>
      <h2>Ajouter un Scénario</h2>
      <label>
        Scenario Name :
        <input type="text" name="scenarioName" value={newScenario.scenarioName} onChange={handleScenarioChange} />
      </label>
      <label>
        Version Applicable:
        <select name="applicableVersion" id="applicableVersion" value={newScenario.applicableVersion} onChange={handleScenarioChange}>
          <option disabled selected value="">Select a version</option>
          <option value="VAIT">VAIT</option>
          <option value="V0">V0</option>
          <option value="V1">V1</option>
          <option value="V2">V2</option>
        </select>
      </label>
      <label>
        Exigences:
        <input type="text" name="requirements" onChange={handleScenarioReqChange} placeholder='Write Requirement Name'/>
        <button onClick={addRequirement}>Add Requirement</button>
        <ul>
          {newScenario.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </label>
      <label>
        Description du Scénario:
        <input type="text" name="scenarioDescription" value={newScenario.scenarioDescription} onChange={handleScenarioChange} />
      </label>
      <button onClick={addScenario}>Ajouter Scénario</button>
    </div>
  );
};

export default AddScenario;


