import React, { useState } from 'react';
import { PageHead } from '../components/Shell';
import { IconClipboard, IconArrowRight, IconCheck, IconChevronRight } from '../components/Icons';
import { PATIENT, PENDING_QUESTIONNAIRES, PROGRESS_MOOD, GOALS, INSIGHTS } from '../data/patient';
import './Dashboard.css';

function NextSessionCard({ session, onView }) {
  return (
    <div className="next-session" onClick={onView}>
      <div className="next-session-left">
        <div className="ns-eyebrow">
          <span className="spinner-dot" />
          Próxima sessão · daqui a 5 horas
        </div>
        <div className="ns-title">{session.pretty}</div>
        <div className="ns-time-display">
          <span className="ns-time-hour">{session.time}</span>
          <span className="ns-time-sep" />
          <span>{session.durationMin} min</span>
          <span className="ns-time-sep" />
          <span>{session.mode === "Vídeo" ? "Videoconferência" : session.mode}</span>
        </div>
        <div className="ns-meta">
          com <strong>{PATIENT.therapist.name}</strong> · {session.mode === "Vídeo" ? "Link enviado por email" : session.location}
        </div>
      </div>
      <div className="next-session-right">
        <div className="ns-date">
          <div className="ns-month">Mai</div>
          <div className="ns-day">14</div>
          <div className="ns-weekday">Quinta</div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={(e) => { e.stopPropagation(); onView(); }}>
          Ver detalhes <IconArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function PendingQuestionnaireRow({ q, onOpen }) {
  const statusLabel = q.status === "overdue" ? "Em atraso" : q.status === "due" ? "Hoje" : "Disponível";
  return (
    <div className="row pq-row pq-row-grid" onClick={onOpen}>
      <div className={"pq-marker " + q.status} aria-hidden>
        <IconClipboard size={16} />
      </div>
      <div>
        <div className="row-title">{q.name}</div>
        <div className="row-sub">{q.type} · {q.items} perguntas · ~{q.duration} min</div>
      </div>
      <span className={"pill " + (q.status === "overdue" ? "overdue" : q.status === "due" ? "due" : "info")}>
        {statusLabel}
      </span>
      <button className="btn btn-soft" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
        Responder <IconArrowRight size={12} />
      </button>
    </div>
  );
}

function MoodFace({ level }) {
  const mouthPath = { 1: "M8 17 Q12 13 16 17", 2: "M8 16 Q12 14 16 16", 3: "M8 15 H16", 4: "M8 14 Q12 17 16 14", 5: "M8 14 Q12 18 16 14" }[level];
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="0.5" fill="currentColor" />
      <circle cx="15" cy="10" r="0.5" fill="currentColor" />
      <path d={mouthPath} />
    </svg>
  );
}

function MoodCheckIn() {
  const [picked, setPicked] = React.useState(null);
  const moods = [
    { v: 1, label: "Muito baixo", color: "var(--mood-1)" },
    { v: 2, label: "Baixo", color: "var(--mood-2)" },
    { v: 3, label: "Neutro", color: "var(--mood-3)" },
    { v: 4, label: "Bom", color: "var(--mood-4)" },
    { v: 5, label: "Ótimo", color: "var(--mood-5)" },
  ];
  return (
    <div className="card">
      <div className="mood-checkin-header">
        <div>
          <div className="page-eyebrow mood-checkin-eyebrow">Check-in rápido</div>
          <div className="mood-checkin-title">Como te sentes <em>agora</em>?</div>
        </div>
        <div className="mood-checkin-time">Demora 5s</div>
      </div>
      <div className="mood-row">
        {moods.map(m => (
          <button key={m.v} className={"mood-btn" + (picked === m.v ? " on" : "")} onClick={() => setPicked(m.v)} style={{ "--c": m.color }} aria-label={m.label}>
            <span className="mood-face" aria-hidden><MoodFace level={m.v} /></span>
            <span className="mood-label">{m.label}</span>
          </button>
        ))}
      </div>
      {picked != null && (
        <div className="mood-confirm">
          <IconCheck size={14} /> Registado. A tua terapeuta verá isto antes da sessão.
        </div>
      )}
    </div>
  );
}

function ProgressMiniChart({ data, color }) {
  const max = 5, min = 0, w = 280, h = 60, pad = 4;
  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.value - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const areaPath = path + ` L${points[points.length - 1][0]} ${h} L${points[0][0]} ${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mini-chart-block">
      <defs>
        <linearGradient id={"g-" + color.replace(/[^a-z]/gi, "")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#g-${color.replace(/[^a-z]/gi, "")})`} />
      <path d={path} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => i === points.length - 1 && (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export default function Dashboard({ goTo }) {
  const pending = PENDING_QUESTIONNAIRES.filter(q => q.status !== "available").slice(0, 3);

  return (
    <>
      <PageHead
        eyebrow="Quinta-feira, 14 de Maio · Semana 12"
        title={<>Olá, <em>{PATIENT.firstName}</em></>}
        sub="Tens a tua sessão hoje. Estão 3 questionários à tua espera — pode demorar menos de 10 minutos no total."
      />
      <NextSessionCard session={PATIENT.nextSession} onView={() => goTo("sessions")} />
      <div className="dash-grid">
        <div className="dash-main">
          <section className="card flush dash-card-mt-0">
            <div className="card-head">
              <div className="card-title">
                A responder antes da sessão <span className="count">{pending.length}</span>
              </div>
              <button className="card-action" onClick={() => goTo("questionnaires")}>
                Ver todos os questionários <IconChevronRight size={12} className="icon-middle" />
              </button>
            </div>
            <div className="list">
              {pending.map(q => (
                <PendingQuestionnaireRow key={q.id} q={q} onOpen={() => goTo("fill", q)} />
              ))}
            </div>
          </section>
          <section className="card dash-card-mt">
            <div className="dash-insights-header">
              <div>
                <div className="page-eyebrow dash-insights-eyebrow">Notas da tua terapeuta</div>
                <div className="dash-insights-title">Insights recentes</div>
              </div>
              <button className="card-action" onClick={() => goTo("progress")}>Ver progresso</button>
            </div>
            <div className="insight-list">
              {INSIGHTS.map(ins => (
                <article key={ins.id} className="insight">
                  <div className="insight-date">{ins.date}</div>
                  <div className="insight-body">
                    <p className="insight-text">"{ins.text}"</p>
                    <div className="insight-author">— {ins.from}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="dash-side">
          <MoodCheckIn />
          <section className="card dash-card-mt-18">
            <div className="dash-wellbeing-header">
              <div className="page-eyebrow">Bem-estar geral</div>
              <span className="pill done"><IconCheck size={10} /> +43% em 12 semanas</span>
            </div>
            <div className="dash-wellbeing-score">
              3,7<span className="dash-wellbeing-unit"> / 5,0</span>
            </div>
            <div className="dash-wellbeing-sub">Média móvel de 4 semanas</div>
            <ProgressMiniChart data={PROGRESS_MOOD} color="var(--accent)" />
            <button className="btn btn-ghost dash-wellbeing-btn" onClick={() => goTo("progress")}>
              Ver progresso completo <IconArrowRight size={12} />
            </button>
          </section>
          <section className="card dash-card-mt-18">
            <div className="page-eyebrow dash-goals-eyebrow">Objetivos terapêuticos</div>
            <div className="dash-goals-header">
              {GOALS.slice(0, 3).map(g => (
                <div key={g.id} className="dash-goal-row">
                  <div className="dash-goal-labels">
                    <span className="dash-goal-title">{g.title}</span>
                    <span className="dash-goal-pct">{Math.round(g.progress * 100)}%</span>
                  </div>
                  <div className="bar"><div className="bar-fill" style={{ width: (g.progress * 100) + "%" }} /></div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
