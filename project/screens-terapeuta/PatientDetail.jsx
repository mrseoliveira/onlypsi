// Patient detail screen

function PatientDetail({ goTo, patient }) {
  const p = patient ? { ...PATIENT_DETAIL, ...patient } : PATIENT_DETAIL;
  const [tab, setTab] = React.useState("overview");

  const statusLabels = {
    em_progresso: "Em progresso",
    primeira_fase: "Fase inicial",
    primeira_consulta: "Primeira consulta",
    manutencao: "Manutenção",
    pausa: "Em pausa",
  };

  return (
    <>
      {/* Header */}
      <div className="patient-header">
        <button className="back-link" onClick={() => goTo("patients")}>
          <IconChevronLeft size={14} /> Pacientes
        </button>

        <div className="patient-header-main">
          <div className="avatar" style={{ width: 80, height: 80, fontSize: 26, fontFamily: "var(--font-serif)" }}>
            {p.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="patient-name">{p.name}</h1>
            <div className="patient-meta-row">
              <span className={"status-tag " + p.status}>{statusLabels[p.status]}</span>
              <span className="meta-pill"><IconHeart size={12} /> {p.focus}</span>
              <span className="meta-pill">{p.sessions} sessões</span>
              <span className="meta-pill">desde {p.since}</span>
              {p.age && <span className="meta-pill">{p.age} anos</span>}
            </div>
            {p.alert && (
              <div className="patient-alert-banner">
                <IconAlert size={14} /> <strong>Alerta:</strong> {p.alert}
              </div>
            )}
          </div>
          <div className="patient-header-actions">
            <button className="btn btn-ghost"><IconMessage size={14} /> Mensagem</button>
            <button className="btn btn-ghost"><IconPlus size={14} /> Atribuir questionário</button>
            <button className="btn btn-primary"><IconCalendar size={14} /> Nova sessão</button>
          </div>
        </div>

        <nav className="patient-tabs">
          {[
            { id: "overview", label: "Visão geral" },
            { id: "sessions", label: "Sessões", count: p.sessions },
            { id: "forms", label: "Questionários", count: (p.questionnairesAssigned || []).length },
            { id: "notes", label: "Notas clínicas", count: (p.notes || []).length },
            { id: "info", label: "Dados pessoais" },
          ].map(t => (
            <button
              key={t.id}
              className={"tab" + (tab === t.id ? " active" : "")}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.count != null && <span className="tab-count">{t.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      {tab === "overview" && <PatientOverview p={p} />}
      {tab === "sessions" && <PatientSessions p={p} />}
      {tab === "forms" && <PatientForms p={p} />}
      {tab === "notes" && <PatientNotes p={p} />}
      {tab === "info" && <PatientInfo p={p} />}
    </>
  );
}

function PatientOverview({ p }) {
  const trend = p.moodTrend || [];
  const latest = trend[trend.length - 1] || 0;
  const first = trend[0] || 0;
  const change = latest && first ? (((latest - first) / first) * 100).toFixed(0) : 0;

  return (
    <div className="patient-overview">
      <div className="po-main">
        {/* Next session highlight */}
        <section className="next-session" style={{ padding: "20px 24px" }}>
          <div className="next-session-left">
            <div className="ns-eyebrow">
              <span className="spinner-dot" />
              Próxima sessão
            </div>
            <div className="ns-title" style={{ fontSize: 26 }}>{p.nextSession}</div>
            <div className="ns-meta">Sessão #{p.sessions + 1} · Foco: {p.focus}</div>
          </div>
          <div className="next-session-right">
            <button className="btn btn-primary btn-lg">Preparar sessão <IconArrowRight size={14} /></button>
          </div>
        </section>

        {/* Progress overview */}
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div className="page-eyebrow" style={{ marginBottom: 4 }}>Bem-estar geral · 7 semanas</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 24 }}>
                Evolução do humor <em style={{ color: "var(--ink-4)" }}>· {change > 0 ? "+" : ""}{change}%</em>
              </div>
            </div>
            <div className="seg">
              <button className="seg-btn on">Humor</button>
              <button className="seg-btn">Ansiedade</button>
              <button className="seg-btn">Sono</button>
            </div>
          </div>
          <PatientChart data={trend} />
        </section>

        {/* Recent notes */}
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div>
              <div className="page-eyebrow">Notas das últimas sessões</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}>Histórico recente</div>
            </div>
            <button className="card-action">Ver todas →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(p.notes || []).slice(0, 3).map(n => (
              <article key={n.id} className="note-card">
                <header className="note-head">
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontSize: 13 }}>{n.session}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{n.date}</span>
                </header>
                <h4 className="note-title">{n.title}</h4>
                <p className="note-excerpt">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="po-side">
        {/* At a glance */}
        <section className="card">
          <div className="page-eyebrow" style={{ marginBottom: 12 }}>Numa relance</div>
          <dl className="meta-list">
            <div><dt>Pontuação atual</dt><dd style={{ fontWeight: 500 }}>{latest.toFixed(1)} <span style={{ color: "var(--ink-4)", fontSize: 11 }}>/ 5,0</span></dd></div>
            <div><dt>Tendência</dt><dd><span className={"risk-badge " + (change > 0 ? "baixo" : change < 0 ? "elevado" : "moderado")}>{change > 0 ? "↑" : change < 0 ? "↓" : "→"} {Math.abs(change)}%</span></dd></div>
            <div><dt>Sessões</dt><dd>{p.sessions} concluídas</dd></div>
            <div><dt>Presença</dt><dd>{Math.max(85, 100 - p.id.length).toFixed(0)}%</dd></div>
            <div><dt>Por responder</dt><dd>{p.pendingForms} questionários</dd></div>
            <div><dt>Risco clínico</dt><dd><RiskBadge risk={p.risk} /></dd></div>
          </dl>
        </section>

        {/* Pending forms */}
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <div className="page-eyebrow">Questionários por responder</div>
            <button className="card-action">+ Atribuir</button>
          </div>
          <div className="form-mini-list">
            {(p.questionnairesAssigned || []).filter(q => q.status !== "respondido").slice(0, 4).map(q => (
              <div key={q.id} className="form-mini">
                <div style={{ minWidth: 0 }}>
                  <div className="form-mini-name">{q.name}</div>
                  <div className="form-mini-sub">{q.cadence} · {q.due}</div>
                </div>
                <span className={"pill " + (q.status === "em_atraso" ? "overdue" : "due")} style={{ fontSize: 10.5 }}>
                  {q.status === "em_atraso" ? "Em atraso" : "Pendente"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Treatment plan */}
        <section className="card">
          <div className="page-eyebrow" style={{ marginBottom: 10 }}>Plano terapêutico</div>
          <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, lineHeight: 1.55 }}>
            {p.treatmentPlan || "Sem plano definido. Definir no próximo encontro."}
          </p>
          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 14, fontSize: 12 }}>
            Editar plano
          </button>
        </section>
      </aside>
    </div>
  );
}

function PatientChart({ data }) {
  const w = 600, h = 180, padL = 30, padR = 16, padT = 12, padB = 24;
  if (!data || data.length < 2) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--ink-4)" }}>Dados insuficientes</div>;
  }
  const max = 5, min = 0;
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * (w - padL - padR);
    const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
    return [x, y, v];
  });
  const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L${pts[pts.length - 1][0]} ${h - padB} L${pts[0][0]} ${h - padB} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block", height: 180 }}>
      <defs>
        <linearGradient id="pchart-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1, 2, 3, 4, 5].map(v => {
        const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--line-soft)" strokeDasharray={v === 3 ? "" : "2 4"} />
            <text x={padL - 6} y={y + 3.5} textAnchor="end" fontSize="9.5" fill="var(--ink-4)">{v}</text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#pchart-grad)" />
      <path d={linePath} stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 3} fill={i === pts.length - 1 ? "var(--accent)" : "white"} stroke="var(--accent)" strokeWidth="1.4" />
      ))}
      {pts.map((p, i) => (
        <text key={i} x={p[0]} y={h - padB + 14} textAnchor="middle" fontSize="10" fill="var(--ink-4)">S{i + 1}</text>
      ))}
    </svg>
  );
}

function PatientSessions({ p }) {
  // Build a synthetic past sessions list from notes
  const sessions = (p.notes || []).map((n, i) => ({
    id: n.id,
    date: n.date,
    session: n.session,
    title: n.title,
    excerpt: n.excerpt,
    mode: i % 2 === 0 ? "Presencial" : "Vídeo",
    duration: 50,
  }));
  return (
    <div className="card flush">
      <div className="card-head">
        <div className="card-title">Sessões realizadas <span className="count">{p.sessions}</span></div>
        <button className="btn btn-ghost">Exportar histórico</button>
      </div>
      <div className="list">
        {sessions.map(s => (
          <div key={s.id} className="row" style={{ gridTemplateColumns: "100px 1.5fr 1fr 0.6fr" }}>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", fontVariantNumeric: "tabular-nums" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink)" }}>{s.session}</div>
              <div>{s.date}</div>
            </div>
            <div>
              <div className="row-title">{s.title}</div>
              <div className="row-sub">{s.excerpt}</div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                {s.mode === "Vídeo" ? <IconVideo size={12} /> : <IconLocation size={12} />} {s.mode}
              </span>
              <span style={{ color: "var(--ink-3)" }}>{s.duration} min</span>
            </div>
            <button className="btn btn-ghost" style={{ padding: "6px 10px", alignSelf: "center" }}>Abrir <IconChevronRight size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientForms({ p }) {
  return (
    <div className="card flush">
      <div className="card-head">
        <div className="card-title">Questionários atribuídos <span className="count">{(p.questionnairesAssigned || []).length}</span></div>
        <button className="btn btn-primary"><IconPlus size={14} /> Atribuir</button>
      </div>
      <div className="table-head" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 0.5fr" }}>
        <span>Questionário</span>
        <span>Cadência</span>
        <span>Estado</span>
        <span>Resultado</span>
        <span></span>
      </div>
      <div className="list">
        {(p.questionnairesAssigned || []).map(q => (
          <div key={q.id} className="row" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 0.5fr" }}>
            <div>
              <div className="row-title">{q.name}</div>
              <div className="row-sub">{q.date || q.due}</div>
            </div>
            <span className="pill outline">{q.cadence}</span>
            <span className={
              "pill " +
              (q.status === "respondido" ? "done" : q.status === "em_atraso" ? "overdue" : "due")
            }>
              {q.status === "respondido" ? "Respondido" : q.status === "em_atraso" ? "Em atraso" : "Pendente"}
            </span>
            <span style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 500 }}>{q.score || "—"}</span>
            <button className="btn btn-ghost" style={{ padding: "6px 10px" }}>
              <IconChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientNotes({ p }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(p.notes || []).map(n => (
          <article key={n.id} className="card">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontSize: 14 }}>{n.session}</span>
              <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{n.date}</span>
            </header>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 400, margin: "0 0 10px", color: "var(--ink)" }}>{n.title}</h3>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{n.excerpt}</p>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <button className="btn btn-ghost">Abrir nota completa</button>
              <button className="btn btn-ghost" style={{ padding: "8px 10px" }}><IconDownload size={12} /></button>
            </div>
          </article>
        ))}
      </div>
      <aside className="card" style={{ position: "sticky", top: 76 }}>
        <div className="page-eyebrow" style={{ marginBottom: 10 }}>Nova nota rápida</div>
        <textarea className="quick-note" placeholder="Reflexões da última sessão, observações, próximos focos…" rows="6" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Guarda-se automaticamente</span>
          <button className="btn btn-primary">Guardar nota</button>
        </div>
      </aside>
    </div>
  );
}

function PatientInfo({ p }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
      <section className="card">
        <div className="card-section-head">
          <div className="page-eyebrow">Dados pessoais</div>
          <button className="card-action">Editar</button>
        </div>
        <dl className="meta-list">
          <div><dt>Nome completo</dt><dd>{p.name}</dd></div>
          <div><dt>Idade</dt><dd>{p.age} anos · nascida em {p.birth}</dd></div>
          <div><dt>Email</dt><dd>{p.email}</dd></div>
          <div><dt>Telemóvel</dt><dd>{p.phone}</dd></div>
          <div><dt>Profissão</dt><dd>{p.occupation}</dd></div>
          <div><dt>Contacto emergência</dt><dd>{p.emergencyContact}</dd></div>
        </dl>
      </section>

      <section className="card">
        <div className="card-section-head">
          <div className="page-eyebrow">Histórico clínico</div>
        </div>
        <dl className="meta-list">
          <div><dt>Em acompanhamento desde</dt><dd>{p.since}</dd></div>
          <div><dt>Total de sessões</dt><dd>{p.sessions}</dd></div>
          <div><dt>Foco terapêutico</dt><dd>{p.focus}</dd></div>
          <div><dt>Abordagem</dt><dd>Cognitivo-comportamental</dd></div>
          <div><dt>Risco atual</dt><dd><RiskBadge risk={p.risk} /></dd></div>
        </dl>
      </section>
    </div>
  );
}

Object.assign(window, { PatientDetail });
