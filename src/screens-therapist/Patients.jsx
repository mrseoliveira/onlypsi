import { useState } from 'react';
import { TPageHead } from '../components/TherapistShell';
import { IconSearch, IconClose, IconAlert, IconChevronRight, IconDownload, IconPlus } from '../components/Icons';
import { PATIENTS } from '../data/therapist';

function PatientStatus({ status, label }) {
  return <span className={"status-tag " + status}>{label}</span>;
}

function RiskBadge({ risk }) {
  const labels = { baixo: "Baixo", moderado: "Moderado", elevado: "Elevado", indefinido: "Indef." };
  return <span className={"risk-badge " + risk}>{labels[risk]}</span>;
}

function Spark({ data }) {
  const w = 80, h = 24, pad = 2;
  const max = Math.max(...data, 5), min = Math.min(...data, 0), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const last = data[data.length - 1], first = data[0];
  const color = last > first ? "var(--status-done)" : last < first ? "var(--status-overdue)" : "var(--ink-3)";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <path d={path} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.2" fill={color} />
    </svg>
  );
}

const STATUS_LABELS = {
  em_progresso: "Em progresso",
  primeira_fase: "Fase inicial",
  primeira_consulta: "Primeira consulta",
  manutencao: "Manutenção",
  pausa: "Em pausa",
};

export default function Patients({ goTo }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("table");

  const filters = [
    { id: "all", label: "Todos", count: PATIENTS.length },
    { id: "em_progresso", label: "Em progresso", count: PATIENTS.filter(p => p.status === "em_progresso").length },
    { id: "primeira_consulta", label: "Primeira consulta", count: PATIENTS.filter(p => p.status === "primeira_consulta" || p.status === "primeira_fase").length },
    { id: "manutencao", label: "Manutenção", count: PATIENTS.filter(p => p.status === "manutencao").length },
    { id: "pausa", label: "Em pausa", count: PATIENTS.filter(p => p.status === "pausa").length },
  ];

  let list = PATIENTS;
  if (filter !== "all") {
    if (filter === "primeira_consulta") list = list.filter(p => p.status === "primeira_consulta" || p.status === "primeira_fase");
    else list = list.filter(p => p.status === filter);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.focus.toLowerCase().includes(q));
  }

  return (
    <>
      <TPageHead
        eyebrow={`${PATIENTS.length} pacientes ativos`}
        title={<>Os meus <em>pacientes</em></>}
        sub="Caseload completo. Os indicadores à direita refletem a última semana de atividade."
        actions={[
          <button key="export" className="btn btn-ghost"><IconDownload size={14} /> Exportar</button>,
          <button key="add" className="btn btn-primary"><IconPlus size={14} /> Novo paciente</button>,
        ]}
      />
      <div className="patient-toolbar">
        <div className="search-input">
          <IconSearch size={14} />
          <input placeholder="Procurar por nome ou foco terapêutico…" value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button className="search-clear" onClick={() => setSearch("")}><IconClose size={12} /></button>}
        </div>
        <div className="filter-chips" style={{ paddingBottom: 0 }}>
          {filters.map(f => (
            <button key={f.id} className={"chip" + (filter === f.id ? " on" : "")} onClick={() => setFilter(f.id)}>
              {f.label} <span className="chip-count">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="seg">
          <button className={"seg-btn" + (view === "table" ? " on" : "")} onClick={() => setView("table")}>Tabela</button>
          <button className={"seg-btn" + (view === "cards" ? " on" : "")} onClick={() => setView("cards")}>Cards</button>
        </div>
      </div>

      {list.length === 0 ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--ink-3)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--ink-2)", marginBottom: 6 }}>Sem resultados</div>
          <p>Ajusta a procura ou remove filtros.</p>
        </div>
      ) : view === "table" ? (
        <div className="card flush">
          <div className="table-head" style={{ gridTemplateColumns: "2fr 1.4fr 1.2fr 0.8fr 1fr 0.4fr" }}>
            <span>Paciente</span><span>Foco terapêutico</span><span>Próxima sessão</span><span>Risco</span><span>Tendência humor</span><span></span>
          </div>
          <div className="list">
            {list.map(p => (
              <div key={p.id} className="row" onClick={() => goTo("patient", p)} style={{ gridTemplateColumns: "2fr 1.4fr 1.2fr 0.8fr 1fr 0.4fr" }}>
                <div className="patient-cell">
                  <div className="avatar avatar-sm">{p.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="row-title">{p.name}{p.alert && <span className="alert-dot" title={p.alert} />}</div>
                    <div className="row-sub">{p.sessions} sessões · {p.since} · <PatientStatus status={p.status} label={STATUS_LABELS[p.status]} /></div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{p.focus}</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", fontVariantNumeric: "tabular-nums" }}>
                  {p.nextSession.startsWith("Hoje") ? <strong style={{ color: "var(--accent)" }}>{p.nextSession}</strong> : p.nextSession}
                </div>
                <RiskBadge risk={p.risk} />
                <div style={{ width: "100%" }}>
                  {p.moodTrend.length > 1 ? <Spark data={p.moodTrend} /> : <span style={{ color: "var(--ink-4)", fontSize: 12 }}>—</span>}
                </div>
                <button className="btn btn-ghost" style={{ padding: "6px 10px" }}><IconChevronRight size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="patient-cards">
          {list.map(p => (
            <article key={p.id} className="patient-card" onClick={() => goTo("patient", p)}>
              <header className="pc-head">
                <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>{p.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="pc-name">{p.name}</div>
                  <div className="pc-sub">{p.focus}</div>
                </div>
                <RiskBadge risk={p.risk} />
              </header>
              <div className="pc-meta">
                <div><span className="pc-meta-label">Sessões</span><span className="pc-meta-value">{p.sessions}</span></div>
                <div><span className="pc-meta-label">Estado</span><span className="pc-meta-value"><PatientStatus status={p.status} label={STATUS_LABELS[p.status]} /></span></div>
                <div><span className="pc-meta-label">Próxima</span><span className="pc-meta-value">{p.nextSession}</span></div>
              </div>
              {p.moodTrend.length > 1 && (
                <div className="pc-trend"><Spark data={p.moodTrend} /><span style={{ fontSize: 11, color: "var(--ink-3)" }}>últimas {p.moodTrend.length} semanas</span></div>
              )}
              {p.alert && <div className="pc-alert"><IconAlert size={12} /> {p.alert}</div>}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
