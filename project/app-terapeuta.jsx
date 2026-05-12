// OnlyPsi therapist app — routing + tweaks

const T_PALETTES = {
  Sereno:  ["#1F5D8C", "#163F60", "#E5EFF7", "#F2F7FB", "#0F2E48"],
  Salva:   ["#4F7A65", "#2F5347", "#E4EEEA", "#F1F6F3", "#1F3528"],
  Argila:  ["#A85B47", "#7A3F2F", "#F4E4DD", "#FAF1ED", "#48201A"],
  Bosque:  ["#1F6B6E", "#0F4549", "#E0EEEE", "#F0F7F7", "#0A2F32"],
  Lavanda: ["#6B4F7A", "#42304F", "#EAE2EF", "#F5F1F8", "#28162F"],
};

function tApplyPalette(p) {
  const root = document.documentElement;
  root.style.setProperty("--accent", p[0]);
  root.style.setProperty("--accent-deep", p[1]);
  root.style.setProperty("--accent-soft", p[2]);
  root.style.setProperty("--accent-softer", p[3]);
  root.style.setProperty("--accent-ink", p[4]);
}

const T_SCREEN_LABELS = {
  dashboard: "Painel",
  patients: "Pacientes",
  patient: "Detalhe do paciente",
  sessions: "Sessões",
  questionnaires: "Questionários",
};

function TApp() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState("dashboard");
  const [activePatient, setActivePatient] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => { tApplyPalette(t.palette); }, [t.palette]);

  const goTo = (s, p) => {
    setScreen(s);
    if (p) setActivePatient(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  let body = null;
  if (screen === "dashboard") body = <TherapistDashboard goTo={goTo} />;
  else if (screen === "patients") body = <Patients goTo={goTo} />;
  else if (screen === "patient") body = <PatientDetail goTo={goTo} patient={activePatient} />;
  else if (screen === "sessions") body = <TherapistSessions goTo={goTo} />;
  else if (screen === "questionnaires") body = <TherapistQuestionnaires goTo={goTo} />;

  const breadcrumb = screen === "patient" && activePatient ? activePatient.name : T_SCREEN_LABELS[screen];

  return (
    <div className={"app" + (collapsed ? " collapsed" : "")} data-screen-label={"00 " + T_SCREEN_LABELS[screen]}>
      <TSidebar
        screen={screen}
        setScreen={goTo}
        collapsed={collapsed}
        alertsCount={ALERTS.length}
      />
      <div className="main">
        <TTopbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          breadcrumb={breadcrumb}
        />
        <main className="canvas">{body}</main>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tema" />
        <TweakColor
          label="Paleta"
          value={t.palette}
          options={Object.values(T_PALETTES)}
          onChange={(v) => setTweak("palette", v)}
        />
        <div style={{ padding: "8px 14px", fontSize: 11, color: "rgba(0,0,0,0.55)", lineHeight: 1.45 }}>
          Cinco tons da paleta controlam o destaque, fundo de cards realçados e indicadores de estado.
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TApp />);
