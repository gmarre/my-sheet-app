import React from 'react';
import Liste1 from './Liste1';

const AddStep = ({ newStep, handleStepChange, handleAddStep }) => {

  const handleSendTCChange = (e) => {
    const value = e.target.value;
    // Convert 'yes' and 'no' to boolean
    const sendTCValue = value === 'yes' ? true : false;
    handleStepChange({ target: { name: 'sendTC', value: sendTCValue } });
  };

  const handleServiceSubServiceChange = (e) => {
    const value = e.target.value;
    handleStepChange({ target: { name: 'serviceSubService', value } });
  };

  const handleListChange = (selectedList) => {
    // Assuming selectedList is a string value you want to update
    handleStepChange({ target: { name: 'listValue', value: selectedList } });
  };

  return (
    <div>
      <li>
        Step Name:
        <label>
          Send TC?
          <select value={newStep.sendTC ? 'yes' : 'no'} onChange={handleSendTCChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {newStep.sendTC ? (
          <div>
            <label>
              Service/Sub-Service:
              <input
                type="text"
                name="serviceSubService"
                value={newStep.serviceSubService}
                onChange={handleServiceSubServiceChange}
              />
            </label>
          </div>
        ) : (
          <div>
            <label>
              Keyword:
              <Liste1 onChange={handleListChange} />
            </label>
          </div>
        )}

        <label>
          Other Description:
          <input
            type="text"
            name="otherDescription"
            value={newStep.otherDescription}
            onChange={handleStepChange}
          />
        </label>
      </li>
      <li>
        Step Description:
        <input
          type="text"
          name="stepDescription"
          value={newStep.stepDescription}
          onChange={handleStepChange}
        />
      </li>
      <li>
        Expected Result:
        <input
          type="text"
          name="expectedResult"
          value={newStep.expectedResult}
          onChange={handleStepChange}
        />
      </li>
      <button onClick={handleAddStep}>Ajouter Étape</button>
    </div>
  );
};

export default AddStep;
