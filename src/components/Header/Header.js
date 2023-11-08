// components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to="/generate-vtp">Generate VTP</Link>
      <Link to="/generate-tcl">Generate TCL code</Link>
      <Link to="/spec-system">Spec System</Link>
      <Link to="/spec-fsw">Spec FSW</Link>
      <Link to="/bds">BDS</Link>
    </div>
  );
};

export default Header;
