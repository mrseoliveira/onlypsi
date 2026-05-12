import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './styles.css';
import PatientApp from './PatientApp';
import TherapistApp from './TherapistApp';

function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-sans)",
      background: "var(--bg)",
    }}>
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: "var(--accent)", color: "white",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-serif)", fontSize: 34, lineHeight: 1,
          margin: "0 auto 20px", paddingBottom: 4,
        }}>P</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 400, margin: "0 0 8px" }}>
          Only<em style={{ color: "var(--accent)" }}>Psi</em>
        </h1>
        <p style={{ color: "var(--ink-3)", margin: "0 0 32px" }}>Plataforma de psicologia clínica</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/paciente" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 22px", borderRadius: 10,
            background: "var(--accent)", color: "white",
            textDecoration: "none", fontWeight: 500, fontSize: 14,
          }}>
            Área do Paciente
          </Link>
          <Link to="/terapeuta" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 22px", borderRadius: 10,
            border: "1px solid var(--line)", color: "var(--ink-2)",
            textDecoration: "none", fontWeight: 500, fontSize: 14,
            background: "var(--surface)",
          }}>
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
