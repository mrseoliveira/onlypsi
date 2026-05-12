import React, { useState } from 'react';
import { PageHead } from '../components/Shell';
import { IconClock, IconCheck, IconDownload, IconPlus, IconMessage, IconVideo, IconLocation, IconChevronRight, IconBookmark, IconArrowRight } from '../components/Icons';
import { PATIENT, SESSIONS_UPCOMING, SESSIONS_PAST, PENDING_QUESTIONNAIRES } from '../data/patient';
import './Sessions.css';

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
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
          <span className="sess-mode-label">
            {s.mode === "Vídeo" ? <><IconVideo size={12} /> Videoconferência</> : <><IconLocation size={12} /> Presencial</>}
          </span>
          {s.status === "confirmed"
            ? <span className="pill done"><IconCheck size={10} /> Confirmada</span>
            : <span className="pill due"><IconClock size={10} /> A confirmar</span>}
        </div>
        <h3 className="sess-title">{s.topic}</h3>
        <p className="sess-focus">
          <span className="sess-focus-label">Foco: </span>
          <span className="sess-focus-value">{s.focus}</span>
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

function UpcomingSessions({ goTo }) {
  return (
    <div className="sess-grid">
      <div className="sess-col">
        {SESSIONS_UPCOMING.map((s, i) => <SessionCard key={s.id} s={s} highlighted={i === 0} goTo={goTo} />)}
      </div>
      <aside className="sess-side">
        <div className="card">
          <div className="page-eyebrow sess-therapist-eyebrow">A tua terapeuta</div>
          <div className="sess-therapist-info">
            <div className="avatar sess-therapist-avatar">{PATIENT.therapist.initials}</div>
            <div>
              <div className="sess-therapist-name">{PATIENT.therapist.name}</div>
              <div className="sess-therapist-role">{PATIENT.therapist.role}</div>
            </div>
          </div>
          <hr className="hair" />
          <dl className="meta-list">
            <div><dt>Clínica</dt><dd>{PATIENT.clinic}</dd></div>
            <div><dt>Experiência</dt><dd>{PATIENT.therapist.yearsExperience} anos</dd></div>
            <div><dt>Abordagem</dt><dd>Cognitivo-comportamental</dd></div>
            <div><dt>Sessões realizadas</dt><dd>13</dd></div>
          </dl>
          <button className="btn btn-soft sess-message-btn">
            <IconMessage size={14} /> Enviar mensagem
          </button>
        </div>
        <div className="card sess-checklist-card">
          <div className="page-eyebrow sess-checklist-eyebrow">Antes da próxima sessão</div>
          <ul className="checklist">
            <li className="done">
              <span className="check"><IconCheck size={12} /></span>
              <div><div className="check-title">Reflexão Pós-Sessão Guiada</div><div className="check-sub">Concluído · 7 Mai</div></div>
            </li>
            <li>
              <span className="check todo" />
              <div><div className="check-title">Perfil de Humor Pré-Sessão</div><div className="check-sub">Para hoje · 12 perguntas</div></div>
              <button className="btn btn-ghost sess-check-btn" onClick={() => goTo("fill", PENDING_QUESTIONNAIRES[0])}>Responder</button>
            </li>
            <li>
              <span className="check todo" />
              <div><div className="check-title">Inventário de Desafios Recentes</div><div className="check-sub sess-checklist-overdue">Em atraso · 2 dias</div></div>
              <button className="btn btn-ghost sess-check-btn" onClick={() => goTo("fill", PENDING_QUESTIONNAIRES[1])}>Responder</button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function PastSessions() {
  return (
    <div className="card flush">
      <div className="table-head sess-past-table-cols">
        <span>Data</span><span>Sessão</span><span>Foco</span><span>Notas</span><span>Material</span><span></span>
      </div>
      <div className="list">
        {SESSIONS_PAST.map(p => (
          <div key={p.id} className="row sess-past-table-cols">
            <div className="sess-past-date">{formatDate(p.date)}</div>
            <div>
              <div className="row-title">{p.topic}</div>
              <div className="row-sub">{p.mode === "Vídeo" ? "Videoconferência" : "Presencial"} · {p.duration} min · {p.time}</div>
            </div>
            <div className="sess-past-focus">{p.focus}</div>
            <div>
              {p.notes > 0 ? <span className="dotchip"><span className="d info" /> {p.notes} notas</span> : <span className="sess-past-none">—</span>}
            </div>
            <div>
              {p.materials > 0 ? <span className="dotchip"><IconBookmark size={12} /> {p.materials}</span> : <span className="sess-past-none">—</span>}
            </div>
            <button className="btn btn-ghost sess-past-action-btn"><IconChevronRight size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sessions({ goTo }) {
  const [tab, setTab] = React.useState("upcoming");
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
        {[{ id: "upcoming", label: "Próximas", count: SESSIONS_UPCOMING.length }, { id: "past", label: "Histórico", count: SESSIONS_PAST.length }].map(t => (
          <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
            {t.label} <span className="tab-count">{t.count}</span>
          </button>
        ))}
      </div>
      {tab === "upcoming" ? <UpcomingSessions goTo={goTo} /> : <PastSessions />}
    </>
  );
}
