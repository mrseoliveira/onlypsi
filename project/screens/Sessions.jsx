// Sessions — upcoming + past appointments

function Sessions({ goTo }) {
  const [tab, setTab] = React.useState("upcoming");
  const tabs = [
    { id: "upcoming", label: "Próximas", count: SESSIONS_UPCOMING.length },
    { id: "past", label: "Histórico", count: SESSIONS_PAST.length },
  ];

  return (
    <>
      <PageHead
        eyebrow="Calendário terapêutico"
        title={<>As minhas <em>sessões</em></>}
        sub={"Acompanhamento semanal com " + PATIENT.therapist.name + ". Para alterar uma marcação, contacta o " + PATIENT.clinic + "."}
        actions={[
          <button key="b" className="btn btn-ghost"><IconDownload size={14} /> Exportar calendário</button>,
          <button key="a" className="btn btn-primary"><IconPlus size={14} /> Pedir reagendamento</button>,
        ]}
      />

      <div className="tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={"tab" + (tab === t.id ? " active" : "")}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {tab === "upcoming" ? <UpcomingSessions goTo={goTo} /> : <PastSessions />}
    </>
  );
}

function UpcomingSessions({ goTo }) {
  return (
    <div className="sess-grid">
      <div className="sess-col">
        {SESSIONS_UPCOMING.map((s, i) => (
          <SessionCard key={s.id} s={s} highlighted={i === 0} goTo={goTo} />
        ))}
      </div>

      <aside className="sess-side">
        <div className="card">
          <div className="page-eyebrow" style={{ marginBottom: 8 }}>A tua terapeuta</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{PATIENT.therapist.initials}</div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, lineHeight: 1.1 }}>{PATIENT.therapist.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{PATIENT.therapist.role}</div>
            </div>
          </div>
          <hr className="hair" />
          <dl className="meta-list">
            <div><dt>Clínica</dt><dd>{PATIENT.clinic}</dd></div>
            <div><dt>Experiência</dt><dd>{PATIENT.therapist.yearsExperience} anos</dd></div>
            <div><dt>Abordagem</dt><dd>Cognitivo-comportamental</dd></div>
            <div><dt>Sessões realizadas</dt><dd>13</dd></div>
          </dl>
          <button className="btn btn-soft" style={{ width: "100%", justifyContent: "center", marginTop: 14 }}>
            <IconMessage size={14} /> Enviar mensagem
          </button>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="page-eyebrow" style={{ marginBottom: 10 }}>Antes da próxima sessão</div>
          <ul className="checklist">
            <li className="done">
              <span className="check"><IconCheck size={12} /></span>
              <div>
                <div className="check-title">Reflexão Pós-Sessão Guiada</div>
                <div className="check-sub">Concluído · 7 Mai</div>
              </div>
            </li>
            <li>
              <span className="check todo" />
              <div>
                <div className="check-title">Perfil de Humor Pré-Sessão</div>
                <div className="check-sub">Para hoje · 12 perguntas</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => goTo("fill", PENDING_QUESTIONNAIRES[0])}>
                Responder
              </button>
            </li>
            <li>
              <span className="check todo" />
              <div>
                <div className="check-title">Inventário de Desafios Recentes</div>
                <div className="check-sub" style={{ color: "var(--status-overdue)" }}>Em atraso · 2 dias</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => goTo("fill", PENDING_QUESTIONNAIRES[1])}>
                Responder
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function SessionCard({ s, highlighted, goTo }) {
  const d = new Date(s.date + "T00:00:00");
  const weekdays = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  return (
    <article className={"sess-card" + (highlighted ? " hi" : "")}>
      <div className="sess-date-block">
        <div className="sess-weekday">{weekdays[d.getDay()]}</div>
        <div className="sess-day">{d.getDate()}</div>
        <div className="sess-month">{months[d.getMonth()]}</div>
        {highlighted && <div className="sess-today">Hoje</div>}
      </div>

      <div className="sess-body">
        <div className="sess-meta">
          <span className="sess-time"><IconClock size={12} /> {s.time} · {s.duration}min</span>
          <span className="dotchip"><span className={"d " + (s.mode === "Vídeo" ? "info" : "done")} /></span>
          <span style={{ fontSize: 12.5, color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
            {s.mode === "Vídeo" ? <><IconVideo size={12} /> Videoconferência</> : <><IconLocation size={12} /> Presencial</>}
          </span>
          {s.status === "confirmed"
            ? <span className="pill done"><IconCheck size={10} /> Confirmada</span>
            : <span className="pill due"><IconClock size={10} /> A confirmar</span>}
        </div>
        <h3 className="sess-title">{s.topic}</h3>
        <p className="sess-focus">
          <span style={{ color: "var(--ink-4)" }}>Foco: </span>
          <span style={{ color: "var(--ink-2)" }}>{s.focus}</span>
        </p>
      </div>

      <div className="sess-actions">
        {highlighted ? (
          <>
            <button className="btn btn-primary">
              {s.mode === "Vídeo" ? <><IconVideo size={14} /> Entrar na sessão</> : <>Ver detalhes <IconArrowRight size={14} /></>}
            </button>
            <button className="btn btn-ghost" onClick={() => goTo("fill", PENDING_QUESTIONNAIRES[0])}>Preparar</button>
          </>
        ) : (
          <button className="btn btn-ghost">Detalhes <IconChevronRight size={12} /></button>
        )}
      </div>
    </article>
  );
}

function PastSessions() {
  return (
    <div className="card flush">
      <div className="table-head" style={{ gridTemplateColumns: "100px 1.6fr 1fr 0.6fr 0.6fr 0.4fr" }}>
        <span>Data</span>
        <span>Sessão</span>
        <span>Foco</span>
        <span>Notas</span>
        <span>Material</span>
        <span></span>
      </div>
      <div className="list">
        {SESSIONS_PAST.map(p => (
          <div key={p.id} className="row" style={{ gridTemplateColumns: "100px 1.6fr 1fr 0.6fr 0.6fr 0.4fr" }}>
            <div style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink-2)", fontSize: 13 }}>{formatDate(p.date)}</div>
            <div>
              <div className="row-title">{p.topic}</div>
              <div className="row-sub">
                {p.mode === "Vídeo" ? "Videoconferência" : "Presencial"} · {p.duration} min · {p.time}
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{p.focus}</div>
            <div>
              {p.notes > 0
                ? <span className="dotchip"><span className="d info" /> {p.notes} notas</span>
                : <span style={{ color: "var(--ink-4)", fontSize: 12 }}>—</span>}
            </div>
            <div>
              {p.materials > 0
                ? <span className="dotchip"><IconBookmark size={12} /> {p.materials}</span>
                : <span style={{ color: "var(--ink-4)", fontSize: 12 }}>—</span>}
            </div>
            <button className="btn btn-ghost" style={{ padding: "6px 10px" }}>
              <IconChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Sessions });
