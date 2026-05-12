import { useState } from 'react';
import { IconChevronLeft, IconChevronRight, IconHeart, IconAlert, IconMessage, IconCalendar, IconPlus, IconArrowRight, IconVideo, IconLocation, IconDownload, IconCheck, IconShield } from '../components/Icons';
import { PATIENT_DETAIL } from '../data/therapist';
import './PatientDetail.css';

function RiskBadge({ risk }) {
  const labels = { baixo: "Baixo", moderado: "Moderado", elevado: "Elevado", indefinido: "Indef." };
  return <span className={"risk-badge " + risk}>{labels[risk]}</span>;
}

function PatientChart({ data }) {
  const w = 600, h = 180, padL = 30, padR = 16, padT = 12, padB = 24;
  if (!data || data.length < 2) return <div className="pchart-insufficient">Dados insuficientes</div>;
  const max = 5, min = 0;
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * (w - padL - padR);
    const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
    return [x, y, v];
  });
  const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L${pts[pts.length - 1][0]} ${h - padB} L${pts[0][0]} ${h - padB} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="pchart-svg">
      <defs>
        <linearGradient id="pchart-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1,2,3,4,5].map(v => {
        const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
        return <g key={v}><line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--line-soft)" strokeDasharray={v === 3 ? "" : "2 4"} /><text x={padL - 6} y={y + 3.5} textAnchor="end" fontSize="9.5" fill="var(--ink-4)">{v}</text></g>;
      })}
      <path d={areaPath} fill="url(#pchart-grad)" />
      <path d={linePath} stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 3} fill={i === pts.length - 1 ? "var(--accent)" : "white"} stroke="var(--accent)" strokeWidth="1.4" />)}
      {pts.map((p, i) => <text key={i} x={p[0]} y={h - padB + 14} textAnchor="middle" fontSize="10" fill="var(--ink-4)">S{i + 1}</text>)}
    </svg>
  );
}

function PatientOverview({ p }) {
  const trend = p.moodTrend || [];
  const latest = trend[trend.length - 1] || 0, first = trend[0] || 0;
  const change = latest && first ? (((latest - first) / first) * 100).toFixed(0) : 0;

  return (
    <div className="patient-overview">
      <div className="po-main">
        <section className="next-session next-session-compact">
          <div className="next-session-left">
            <div className="ns-eyebrow"><span className="spinner-dot" /> Próxima sessão</div>
            <div className="ns-title ns-title-lg">{p.nextSession}</div>
            <div className="ns-meta">Sessão #{p.sessions + 1} · Foco: {p.focus}</div>
          </div>
          <div className="next-session-right">
            <button className="btn btn-primary btn-lg">Preparar sessão <IconArrowRight size={14} /></button>
          </div>
        </section>

        <section className="card">
          <div className="po-chart-header">
            <div>
              <div className="page-eyebrow po-chart-eyebrow">Bem-estar geral · 7 semanas</div>
              <div className="po-chart-title">Evolução do humor <em className="po-chart-title-em">· {change > 0 ? "+" : ""}{change}%</em></div>
            </div>
            <div className="seg">
              <button className="seg-btn on">Humor</button>
              <button className="seg-btn">Ansiedade</button>
              <button className="seg-btn">Sono</button>
            </div>
          </div>
          <PatientChart data={trend} />
        </section>

        <section className="card">
          <div className="po-notes-header">
            <div>
              <div className="page-eyebrow">Notas das últimas sessões</div>
              <div className="po-notes-title">Histórico recente</div>
            </div>
            <button className="card-action">Ver todas →</button>
          </div>
          <div className="po-notes-list">
            {(p.notes || []).slice(0, 3).map(n => (
              <article key={n.id} className="note-card">
                <header className="note-head">
                  <span className="note-session-label">{n.session}</span>
                  <span className="note-date-label">{n.date}</span>
                </header>
                <h4 className="note-title">{n.title}</h4>
                <p className="note-excerpt">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="po-side">
        <section className="card">
          <div className="page-eyebrow po-side-eyebrow">Numa relance</div>
          <dl className="meta-list">
            <div><dt>Pontuação atual</dt><dd className="meta-score">{latest.toFixed(1)} <span className="meta-score-unit">/ 5,0</span></dd></div>
            <div><dt>Tendência</dt><dd><span className={"risk-badge " + (change > 0 ? "baixo" : change < 0 ? "elevado" : "moderado")}>{change > 0 ? "↑" : change < 0 ? "↓" : "→"} {Math.abs(change)}%</span></dd></div>
            <div><dt>Sessões</dt><dd>{p.sessions} concluídas</dd></div>
            <div><dt>Por responder</dt><dd>{p.pendingForms} questionários</dd></div>
            <div><dt>Risco clínico</dt><dd><RiskBadge risk={p.risk} /></dd></div>
          </dl>
        </section>

        <section className="card">
          <div className="po-forms-header">
            <div className="page-eyebrow po-forms-eyebrow">Questionários por responder</div>
            <button className="card-action">+ Atribuir</button>
          </div>
          <div className="form-mini-list">
            {(p.questionnairesAssigned || []).filter(q => q.status !== "respondido").slice(0, 4).map(q => (
              <div key={q.id} className="form-mini">
                <div className="form-mini-info">
                  <div className="form-mini-name">{q.name}</div>
                  <div className="form-mini-sub">{q.cadence} · {q.due}</div>
                </div>
                <span className={"pill form-mini-pill " + (q.status === "em_atraso" ? "overdue" : "due")}>
                  {q.status === "em_atraso" ? "Em atraso" : "Pendente"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="page-eyebrow po-plan-eyebrow">Plano terapêutico</div>
          <p className="po-plan-text">{p.treatmentPlan}</p>
          <button className="btn btn-ghost po-plan-btn">Editar plano</button>
        </section>
      </aside>
    </div>
  );
}

function PatientNotes({ p }) {
  return (
    <div className="pnotes-grid">
      <div className="pnotes-list">
        {(p.notes || []).map(n => (
          <article key={n.id} className="card">
            <header className="pnote-card-header">
              <span className="pnote-session-label">{n.session}</span>
              <span className="pnote-date-label">{n.date}</span>
            </header>
            <h3 className="pnote-title">{n.title}</h3>
            <p className="pnote-excerpt">{n.excerpt}</p>
            <div className="pnote-actions">
              <button className="btn btn-ghost">Abrir nota completa</button>
              <button className="btn btn-ghost pnote-download-btn"><IconDownload size={12} /></button>
            </div>
          </article>
        ))}
      </div>
      <aside className="card pnotes-aside">
        <div className="page-eyebrow pnotes-aside-eyebrow">Nova nota rápida</div>
        <textarea className="quick-note" placeholder="Reflexões da última sessão…" rows="6" />
        <div className="pnotes-aside-footer">
          <span className="pnotes-autosave">Guarda-se automaticamente</span>
          <button className="btn btn-primary">Guardar nota</button>
        </div>
      </aside>
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
      <div className="table-head pforms-table-cols">
        <span>Questionário</span><span>Cadência</span><span>Estado</span><span>Resultado</span><span></span>
      </div>
      <div className="list">
        {(p.questionnairesAssigned || []).map(q => (
          <div key={q.id} className="row pforms-table-cols">
            <div><div className="row-title">{q.name}</div><div className="row-sub">{q.date || q.due}</div></div>
            <span className="pill outline">{q.cadence}</span>
            <span className={"pill " + (q.status === "respondido" ? "done" : q.status === "em_atraso" ? "overdue" : "due")}>
              {q.status === "respondido" ? "Respondido" : q.status === "em_atraso" ? "Em atraso" : "Pendente"}
            </span>
            <span className="pform-score">{q.score || "—"}</span>
            <button className="btn btn-ghost pform-action-btn"><IconChevronRight size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientInfo({ p }) {
  return (
    <div className="pinfo-grid">
      <section className="card">
        <div className="card-section-head"><div className="page-eyebrow">Dados pessoais</div><button className="card-action">Editar</button></div>
        <dl className="meta-list">
          <div><dt>Nome completo</dt><dd>{p.name}</dd></div>
          <div><dt>Idade</dt><dd>{p.age} anos</dd></div>
          <div><dt>Email</dt><dd>{p.email}</dd></div>
          <div><dt>Telemóvel</dt><dd>{p.phone}</dd></div>
          <div><dt>Profissão</dt><dd>{p.occupation}</dd></div>
          <div><dt>Contacto emergência</dt><dd>{p.emergencyContact}</dd></div>
        </dl>
      </section>
      <section className="card">
        <div className="card-section-head"><div className="page-eyebrow">Histórico clínico</div></div>
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

const STATUS_LABELS = {
  em_progresso: "Em progresso", primeira_fase: "Fase inicial",
  primeira_consulta: "Primeira consulta", manutencao: "Manutenção", pausa: "Em pausa",
};

export default function PatientDetail({ goTo, patient }) {
  const p = patient ? { ...PATIENT_DETAIL, ...patient } : PATIENT_DETAIL;
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Visão geral" },
    { id: "sessions", label: "Sessões", count: p.sessions },
    { id: "forms", label: "Questionários", count: (p.questionnairesAssigned || []).length },
    { id: "notes", label: "Notas clínicas", count: (p.notes || []).length },
    { id: "info", label: "Dados pessoais" },
  ];

  return (
    <>
      <div className="patient-header">
        <button className="back-link" onClick={() => goTo("patients")}>
          <IconChevronLeft size={14} /> Pacientes
        </button>
        <div className="patient-header-main">
          <div className="avatar patient-detail-avatar">{p.initials}</div>
          <div className="patient-header-info">
            <h1 className="patient-name">{p.name}</h1>
            <div className="patient-meta-row">
              <span className={"status-tag " + p.status}>{STATUS_LABELS[p.status]}</span>
              <span className="meta-pill"><IconHeart size={12} /> {p.focus}</span>
              <span className="meta-pill">{p.sessions} sessões</span>
              <span className="meta-pill">desde {p.since}</span>
              {p.age && <span className="meta-pill">{p.age} anos</span>}
            </div>
            {p.alert && (
              <div className="patient-alert-banner"><IconAlert size={14} /> <strong>Alerta:</strong> {p.alert}</div>
            )}
          </div>
          <div className="patient-header-actions">
            <button className="btn btn-ghost"><IconMessage size={14} /> Mensagem</button>
            <button className="btn btn-ghost"><IconPlus size={14} /> Atribuir questionário</button>
            <button className="btn btn-primary"><IconCalendar size={14} /> Nova sessão</button>
          </div>
        </div>
        <nav className="patient-tabs">
          {tabs.map(t => (
            <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
              {t.label}{t.count != null && <span className="tab-count">{t.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      {tab === "overview" && <PatientOverview p={p} />}
      {tab === "notes" && <PatientNotes p={p} />}
      {tab === "forms" && <PatientForms p={p} />}
      {tab === "info" && <PatientInfo p={p} />}
      {tab === "sessions" && (
        <div className="card flush">
          <div className="card-head"><div className="card-title">Sessões realizadas <span className="count">{p.sessions}</span></div></div>
          {(p.notes || []).map(n => (
            <div key={n.id} className="row psess-table-cols">
              <div className="psess-cell-info"><div className="psess-session-label">{n.session}</div><div className="psess-date-label">{n.date}</div></div>
              <div><div className="row-title">{n.title}</div><div className="row-sub">{n.excerpt}</div></div>
              <button className="btn btn-ghost">Abrir <IconChevronRight size={12} /></button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
