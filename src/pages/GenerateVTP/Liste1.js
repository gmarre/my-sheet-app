import React from 'react';

const Liste1 = () => {
  // Les options spécifiques pour Liste1
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
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

export default Liste1;
