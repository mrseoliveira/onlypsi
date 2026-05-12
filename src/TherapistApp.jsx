import { useState } from 'react';
import { TSidebar, TTopbar } from './components/TherapistShell';
import TherapistDashboard from './screens-therapist/Dashboard';
import Patients from './screens-therapist/Patients';
import PatientDetail from './screens-therapist/PatientDetail';
import TherapistSessions from './screens-therapist/Sessions';
import TherapistQuestionnaires from './screens-therapist/Questionnaires';
import { ALERTS } from './data/therapist';

const SCREEN_LABELS = {
  dashboard: "Painel",
  patients: "Pacientes",
  patient: "Detalhe do paciente",
  sessions: "Sessões",
  questionnaires: "Questionários",
};

export default function TherapistApp() {
  const [screen, setScreen] = useState("dashboard");
  const [activePatient, setActivePatient] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const goTo = (s, patient) => {
    setScreen(s);
    if (patient) setActivePatient(patient);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  let body = null;
  if (screen === "dashboard") body = <TherapistDashboard goTo={goTo} />;
  else if (screen === "patients") body = <Patients goTo={goTo} />;
  else if (screen === "patient") body = <PatientDetail goTo={goTo} patient={activePatient} />;
  else if (screen === "sessions") body = <TherapistSessions goTo={goTo} />;
  else if (screen === "questionnaires") body = <TherapistQuestionnaires goTo={goTo} />;

  return (
    <div className={"app" + (collapsed ? " collapsed" : "")}>
      <TSidebar screen={screen} setScreen={goTo} collapsed={collapsed} alertsCount={ALERTS.length} />
      <div className="main">
        <TTopbar collapsed={collapsed} setCollapsed={setCollapsed} breadcrumb={SCREEN_LABELS[screen]} />
        <main className="canvas">{body}</main>
      </div>
    </div>
  );
}
