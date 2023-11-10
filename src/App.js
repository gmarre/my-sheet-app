// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import GenerateVTP from './pages/GenerateVTP/GenerateVTP';
import GenerateTCL from './pages/GenerateTCL/GenerateTCL';
import SpecSystem from './pages/SpecSystem/SpecSystem';
import SpecFSW from './pages/SpecFSW/SpecFSW';
import BDS from './pages/BDS/BDS';

import PopUpModifScenario from './components/PopUps/PopUpModifScenario';
import PopUpModifStep from './components/PopUps/PopUpModifStep';

import './App.css'; // Assurez-vous de créer ce fichier CSS

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />

        <Routes>
          <Route path="/generate-vtp" element={<GenerateVTP />} />
          <Route path="/generate-tcl" element={<GenerateTCL />} />
          <Route path="/spec-system" element={<SpecSystem />} />
          <Route path="/spec-fsw" element={<SpecFSW />} />
          <Route path="/bds" element={<BDS />} />
        </Routes>

        {/* Ajoutez ici les routes pour les pop-ups si nécessaire */}
        <Routes>
          <Route path="/pop-up-modif-scenario" element={<PopUpModifScenario />} />
          <Route path="/pop-up-modif-step" element={<PopUpModifStep />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
