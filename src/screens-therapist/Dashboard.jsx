import { TPageHead } from '../components/TherapistShell';
import { IconCheck, IconClock, IconAlert, IconArrowRight, IconVideo, IconLocation, IconDownload, IconPlus } from '../components/Icons';
import { THERAPIST, TODAYS_SESSIONS, PATIENTS, ALERTS, ACTIVITY } from '../data/therapist';

function TimelineSlot({ s, goTo }) {
  return (
    <article
      className={"tl-slot " + s.status}
      onClick={() => s.status !== "completed" && goTo("patient", PATIENTS.find(p => p.initials === s.initials))}
    >
      <div className="tl-time">
        <div className="tl-time-hour">{s.time}</div>
        <div className="tl-time-dur">{s.duration}m</div>
      </div>
      <div className="tl-dot-col">
        <div className="tl-dot" />
        <div className="tl-line" />
      </div>
      <div className="tl-card">
        <header className="tl-head">
          <div className="avatar avatar-sm">{s.initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="tl-patient">{s.patient}</div>
            <div className="tl-topic">
              {s.topic} · {s.mode === "Vídeo" ? <><IconVideo size={11} /> Vídeo</> : <><IconLocation size={11} /> Presencial</>}
            </div>
          </div>
          <div className="tl-status">
            {s.status === "completed" && <span className="pill done"><IconCheck size={10} /> Concluída</span>}
            {s.status === "current" && <span className="pill" style={{ background: "var(--accent)", color: "white" }}><span className="spinner-dot" style={{ background: "white" }} /> A decorrer</span>}
            {s.status === "upcoming" && <span className="pill outline"><IconClock size={10} /> Próxima</span>}
          </div>
        </header>
        {(s.alert || s.note) && (
          <div className={"tl-meta " + (s.alert ? "alert" : "")}>
            {s.alert ? <IconAlert size={12} /> : <IconCheck size={12} />}
            <span>{s.alert || s.note}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function TodaySchedule({ goTo }) {
  return (
    <section className="today-schedule">
      <header className="today-head">
        <div>
          <div className="page-eyebrow" style={{ marginBottom: 4 }}>Agenda de hoje · 9h00 – 17h00</div>
          <h2 className="today-title">6 consultas marcadas <em style={{ color: "var(--ink-4)" }}>· {THERAPIST.completedToday} concluídas</em></h2>
        </div>
        <div className="today-progress">
          <div className="today-progress-bar">
            <div className="today-progress-fill" style={{ width: ((THERAPIST.completedToday / THERAPIST.todayTotal) * 100) + "%" }} />
          </div>
          <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{THERAPIST.completedToday}/{THERAPIST.todayTotal}</span>
        </div>
      </header>
      <div className="timeline">
        {TODAYS_SESSIONS.map(s => <TimelineSlot key={s.id} s={s} goTo={goTo} />)}
      </div>
    </section>
  );
}

function AlertsCard({ goTo }) {
  return (
    <section className="card flush">
      <div className="card-head">
        <div className="card-title">Alertas clínicos <span className="count">{ALERTS.length}</span></div>
        <button className="card-action">Ver todos</button>
      </div>
      <div className="list">
        {ALERTS.map(a => {
          const patient = PATIENTS.find(p => p.id === a.patientId);
          return (
            <article key={a.id} className={"alert-row " + a.level} onClick={() => goTo("patient", patient)}>
              <div className={"alert-bar " + a.level} />
              <div className={"alert-icon " + a.level}><IconAlert size={14} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="alert-title">{a.title}</div>
                <div className="alert-detail">{a.detail}</div>
                <div className="alert-time">{a.timeAgo}</div>
              </div>
              <button className="btn btn-ghost" style={{ alignSelf: "center", whiteSpace: "nowrap" }} onClick={(e) => { e.stopPropagation(); goTo("patient", patient); }}>
                {a.action} <IconArrowRight size={12} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ActivityFeed() {
  return (
    <section className="card">
      <div className="page-eyebrow" style={{ marginBottom: 12 }}>Atividade recente</div>
      <div className="activity">
        {ACTIVITY.map(a => (
          <article key={a.id} className={"activity-row " + (a.urgent ? "urgent" : "")}>
            <div className="avatar avatar-sm">{a.initials}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="activity-text">
                <strong>{a.patient.split(" ")[0]} {a.patient.split(" ")[1]}</strong>{" "}
                <span dangerouslySetInnerHTML={{ __html: a.text }} />
              </div>
              <div className="activity-meta">
                <span>{a.time}</span>
                {a.score && <><span>·</span><span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{a.score}</span></>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
        Ver toda a atividade <IconArrowRight size={12} />
      </button>
    </section>
  );
}

function WeekSnapshot() {
  const stats = [
    { label: "Pacientes ativos", value: 28, sub: "32 totais · 4 em pausa" },
    { label: "Sessões esta semana", value: 18, sub: "média 16/sem" },
    { label: "Taxa de presença", value: "94%", sub: "↑ 3% vs. mês passado" },
    { label: "Questionários respondidos", value: 47, sub: "esta semana" },
  ];
  return (
    <section className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div className="page-eyebrow">Esta semana</div>
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>12 – 16 Mai</span>
      </div>
      <div className="week-stats">
        {stats.map((s, i) => (
          <div key={i} className="week-stat">
            <div className="week-stat-label">{s.label}</div>
            <div className="week-stat-value">{s.value}</div>
            <div className="week-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TherapistDashboard({ goTo }) {
  return (
    <>
      <TPageHead
        eyebrow="Quinta-feira, 14 de Maio · Semana 20"
        title={<>Bom dia, <em>Ana Sofia</em></>}
        sub={`${THERAPIST.todayTotal} consultas hoje · ${ALERTS.filter(a => a.level === "high").length} alerta clínico para rever`}
        actions={[
          <button key="b" className="btn btn-ghost"><IconDownload size={14} /> Exportar agenda</button>,
          <button key="a" className="btn btn-primary"><IconPlus size={14} /> Nova sessão</button>,
        ]}
      />
      <TodaySchedule goTo={goTo} />
      <div className="t-dash-grid">
        <div className="t-dash-main">
          <AlertsCard goTo={goTo} />
          <WeekSnapshot />
        </div>
        <aside className="t-dash-side">
          <ActivityFeed />
        </aside>
      </div>
    </>
  );
}
