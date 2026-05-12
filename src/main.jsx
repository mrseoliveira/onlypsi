import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './styles.css';
import './Home.css';
import PatientApp from './PatientApp';
import TherapistApp from './TherapistApp';

function Home() {
  return (
    <div className="home-root">
      <div className="home-center">
        <div className="home-logo">P</div>
        <h1 className="home-title">
          Only<em className="home-title-accent">Psi</em>
        </h1>
        <p className="home-sub">Plataforma de psicologia clínica</p>
        <div className="home-actions">
          <Link to="/paciente" className="home-btn-primary">
            Área do Paciente
          </Link>
          <Link to="/terapeuta" className="home-btn-secondary">
            Área Terapêutica
          </Link>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paciente/*" element={<PatientApp />} />
        <Route path="/terapeuta/*" element={<TherapistApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
