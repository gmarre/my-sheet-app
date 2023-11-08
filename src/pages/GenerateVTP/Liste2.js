import React from 'react';

const Liste2 = () => {
  // Les options spécifiques pour Liste2
  const options = [
    'Option A',
    'Option B',
    'Option C',
    // ... ajoutez d'autres options selon vos besoins
  ];

  return (
    <select>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Liste2;
