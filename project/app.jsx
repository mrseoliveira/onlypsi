// OnlyPsi patient app — routing + tweaks

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

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState("dashboard");
  const [activeQ, setActiveQ] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

  // Apply palette on every change
  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);

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
    <div className={"app" + (collapsed ? " collapsed" : "")} data-screen-label={"00 " + SCREEN_LABELS[screen]}>
      <Sidebar
        screen={screen}
        setScreen={goTo}
        collapsed={collapsed}
        pendingCount={pendingCount}
      />
      <div className="main">
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          screen={screen}
          breadcrumb={SCREEN_LABELS[screen]}
        />
        <main className="canvas">{body}</main>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tema" />
        <TweakColor
          label="Paleta"
          value={t.palette}
          options={Object.values(PALETTES)}
          onChange={(v) => setTweak("palette", v)}
        />
        <div style={{ padding: "8px 14px", fontSize: 11, color: "rgba(0,0,0,0.55)", lineHeight: 1.45 }}>
          Os cinco tons da paleta — em ordem do mais escuro ao mais claro — controlam o destaque, o fundo dos cards realçados e os indicadores de estado.
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
