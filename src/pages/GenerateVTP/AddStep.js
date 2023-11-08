import React, { useState, useEffect } from 'react';

const AddStep = ({ newStep, handleStepChange, handleAddStep }) => {
  const [sendTC, setSendTC] = useState(false);
  const [selectedList, setSelectedList] = useState('Switch MAIT');
  const [serviceSubService, setServiceSubService] = useState('');
  const [otherDescription, setOtherDescription] = useState('');

  const updateStepName = () => {
    if (sendTC) {
      newStep.stepName = `Send TC : ${serviceSubService}, ${otherDescription}`;
    } else {
      newStep.stepName = `${selectedList} ${otherDescription}`;
    }
    console.log(selectedList);
    console.log(newStep.stepName);
  };

  useEffect(() => {
    updateStepName();
  }, [sendTC, selectedList, serviceSubService, otherDescription]);

  const handleSendTCChange = (e) => {
    const value = e.target.value;
    // Convert 'yes' and 'no' to boolean
    const sendTCValue = value === 'yes';
    setSendTC(sendTCValue);
  };

  const handleServiceSubServiceChange = (e) => {
    const value = e.target.value;
    setServiceSubService(value);
  };

  const handleListChange = (e) => {
    const selectedList = e.target.value;
    setSelectedList(selectedList);
  };

  const handleOtherDescriptionChange = (e) => {
    const value = e.target.value;
    setOtherDescription(value);
  };

  return (
    <div>
      <li>
        Step Name:
        <label>
          Send TC?
          <select value={sendTC ? 'yes' : 'no'} onChange={handleSendTCChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {sendTC ? (
          <div>
            <label>
              Service/Sub-Service:
              <input
                type="text"
                name="serviceSubService"
                value={serviceSubService}
                onChange={handleServiceSubServiceChange}
              />
            </label>
          </div>
        ) : (
          <div>
            <select
              name="selectedList"
              id="selectedList"
              value={selectedList}
              onChange={handleListChange}
            >
              <option value="SwitchMAIT">Switch MAIT</option>
              <option value="SwitchMAUTO">Switch MAUTO</option>
              <option value="SwitchMSAFE">Switch MSAFE</option>
              <option value="CHECK">CHECK</option>              
            </select>
          </div>
        )}

        <label>
          Other Description:
          <input
            type="text"
            name="otherDescription"
            value={otherDescription}
            onChange={handleOtherDescriptionChange}
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
