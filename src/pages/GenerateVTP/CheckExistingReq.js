import React, { useState, useEffect } from 'react';
import requirementsData from '../../results/requirements.json'; // Assurez-vous d'ajuster le chemin du fichier JSON

const CheckExistingReq = ({ scenarios }) => {
  const [highlightedRequirements, setHighlightedRequirements] = useState([]);

  useEffect(() => {
    // Logique pour déterminer les exigences déjà présentes dans les scénarios
    const existingRequirements = scenarios.reduce((acc, scenario) => {
      return acc.concat(scenario.requirements);
    }, []);

    setHighlightedRequirements(existingRequirements);
  }, [scenarios]);

  return (
    <div className="check-existing-req">
      <ul>
        <h2>List of Reqs in Spec</h2>
        {requirementsData.exigences.map((req) => (
          <li
            key={req.name}
            className={highlightedRequirements.includes(req.name) ? 'present' : 'absent'}
          >
            {`${req.name} - ${req.implementationVersion}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckExistingReq;
