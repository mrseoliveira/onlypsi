import { useState, useEffect } from 'react';
import { Sidebar, Topbar } from './components/Shell';
import Dashboard from './screens/Dashboard';
import Questionnaires from './screens/Questionnaires';
import FillQuestionnaire from './screens/FillQuestionnaire';
import Sessions from './screens/Sessions';
import Progress from './screens/Progress';
import Profile from './screens/Profile';
import { PENDING_QUESTIONNAIRES } from './data/patient';

const PALETTES = {
  Sereno:  ["#1F5D8C", "#163F60", "#E5EFF7", "#F2F7FB", "#0F2E48"],
  Salva:   ["#4F7A65", "#2F5347", "#E4EEEA", "#F1F6F3", "#1F3528"],
  Argila:  ["#A85B47", "#7A3F2F", "#F4E4DD", "#FAF1ED", "#48201A"],
  Bosque:  ["#1F6B6E", "#0F4549", "#E0EEEE", "#F0F7F7", "#0A2F32"],
  Lavanda: ["#6B4F7A", "#42304F", "#EAE2EF", "#F5F1F8", "#28162F"],
};

function applyPalette(p) {
  const root = document.documentElement;
  root.style.setProperty("--accent", p[0]);
  root.style.setProperty("--accent-deep", p[1]);
  root.style.setProperty("--accent-soft", p[2]);
  root.style.setProperty("--accent-softer", p[3]);
  root.style.setProperty("--accent-ink", p[4]);
}

const SCREEN_LABELS = {
  dashboard: "Painel",
  questionnaires: "Questionários",
  fill: "Responder questionário",
  sessions: "Sessões",
  progress: "Progresso",
  profile: "Perfil",
};

export default function PatientApp() {
  const [screen, setScreen] = useState("dashboard");
  const [activeQ, setActiveQ] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => { applyPalette(PALETTES.Sereno); }, []);

  const goTo = (s, q) => {
    setScreen(s);
    if (q) setActiveQ(q);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const pendingCount = PENDING_QUESTIONNAIRES.filter(q => q.status !== "available").length;

  let body = null;
  if (screen === "dashboard") body = <Dashboard goTo={goTo} />;
  else if (screen === "questionnaires") body = <Questionnaires goTo={goTo} />;
  else if (screen === "fill") body = <FillQuestionnaire goTo={goTo} questionnaire={activeQ} />;
  else if (screen === "sessions") body = <Sessions goTo={goTo} />;
  else if (screen === "progress") body = <Progress goTo={goTo} />;
  else if (screen === "profile") body = <Profile goTo={goTo} />;

  return (
    <div className={"app" + (collapsed ? " collapsed" : "")}>
      <Sidebar screen={screen} setScreen={goTo} collapsed={collapsed} pendingCount={pendingCount} />
      <div className="main">
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} breadcrumb={SCREEN_LABELS[screen]} />
        <main className="canvas">{body}</main>
      </div>
    </div>
  );
}
