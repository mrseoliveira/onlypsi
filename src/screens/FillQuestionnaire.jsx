import React, { useState } from 'react';
import { IconChevronLeft, IconAlert, IconCheck, IconArrowRight } from '../components/Icons';
import { ACTIVE_QUESTIONNAIRE, PATIENT } from '../data/patient';

function QItem({ item, index, options, value, onChange }) {
  return (
    <div className={"qitem" + (value != null ? " answered" : "")} data-q={item.id}>
      <div className="qitem-num">{String(index).padStart(2, "0")}</div>
      <div className="qitem-body">
        <p className="qitem-text">{item.text}</p>
        <div className="likert">
          {options.map(opt => (
            <button key={opt.value} className={"likert-btn" + (value === opt.value ? " on" : "")} onClick={() => onChange(opt.value)}>
              <span className="likert-dot" />
              <span className="likert-label">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubmittedScreen({ goTo, name, answered }) {
  return (
    <div className="fill-done">
      <div className="fill-done-card">
        <div className="fill-done-icon"><IconCheck size={36} /></div>
        <div className="page-eyebrow" style={{ marginBottom: 6 }}>Respostas guardadas</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 42, fontWeight: 400, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Obrigada, <em style={{ color: "var(--accent)" }}>{PATIENT.firstName}</em>.
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 480, margin: "0 auto 28px" }}>
          As tuas {answered} respostas ao <strong>{name}</strong> foram enviadas para a Dra. Ana Sofia Martins.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn btn-ghost btn-lg" onClick={() => goTo("dashboard")}>Voltar ao painel</button>
          <button className="btn btn-primary btn-lg" onClick={() => goTo("questionnaires")}>
            Ver outros questionários <IconArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FillQuestionnaire({ goTo, questionnaire }) {
  const q = questionnaire || ACTIVE_QUESTIONNAIRE;
  const items = q.items && Array.isArray(q.items) ? q.items : ACTIVE_QUESTIONNAIRE.items;
  const options = q.options || ACTIVE_QUESTIONNAIRE.options;
  const name = q.name || ACTIVE_QUESTIONNAIRE.name;
  const subtitle = q.subtitle || ACTIVE_QUESTIONNAIRE.subtitle;
  const intro = q.intro || ACTIVE_QUESTIONNAIRE.intro;
  const scaleLabel = q.scaleLabel || ACTIVE_QUESTIONNAIRE.scaleLabel;

  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const answered = Object.keys(answers).length;
  const total = items.length;
  const pct = (answered / total) * 100;

  const setAnswer = (id, v) => {
    setAnswers(a => ({ ...a, [id]: v }));
    setTimeout(() => {
      const idx = items.findIndex(it => it.id === id);
      const after = items.slice(idx + 1).find(it => !(answers[it.id] != null));
      if (after) {
        const el = document.querySelector(`[data-q="${after.id}"]`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }, 220);
  };

  if (submitted) return <SubmittedScreen goTo={goTo} name={name} answered={answered} />;

  return (
    <div className="fill-wrap">
      <div className="fill-progress">
        <button className="btn btn-ghost" onClick={() => goTo("questionnaires")} style={{ padding: "6px 12px" }}>
          <IconChevronLeft size={14} /> Sair
        </button>
        <div className="fill-progress-meta">
          <span className="fill-progress-name">{name}</span>
          <span className="fill-progress-count" style={{ fontVariantNumeric: "tabular-nums" }}>
            {answered} <span style={{ color: "var(--ink-4)" }}>/ {total}</span>
          </span>
        </div>
        <div className="fill-progress-bar">
          <div className="fill-progress-fill" style={{ width: pct + "%" }} />
        </div>
        <button className="btn btn-primary" disabled={answered < total} onClick={() => setSubmitted(true)}>
          {answered < total ? `Faltam ${total - answered}` : "Submeter"}
          {answered === total && <IconCheck size={14} />}
        </button>
      </div>

      <div className="fill-canvas">
        <header className="fill-head">
          <div className="page-eyebrow">Pré-sessão · Quinta, 14 Mai · 16:00</div>
          <h1 className="fill-title">{name}</h1>
          <p className="fill-subtitle">{subtitle}</p>
          <div className="fill-intro">
            <div className="fill-intro-mark"><IconAlert size={16} /></div>
            <p>{intro}</p>
          </div>
        </header>

        <div className="fill-scale-legend">
          <div className="fill-scale-label">{scaleLabel}</div>
          <div className="scale-labels">
            {options.map(opt => (
              <div key={opt.value} className="scale-label-item">
                <div className="scale-label-num">{opt.value}</div>
                <div className="scale-label-text">{opt.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fill-items">
          {items.map((it, i) => (
            <QItem key={it.id} item={it} index={i + 1} options={options} value={answers[it.id]} onChange={(v) => setAnswer(it.id, v)} />
          ))}
        </div>

        <div className="fill-submit">
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}>
              {answered === total ? "Tudo respondido ✓" : `Faltam ${total - answered} perguntas`}
            </div>
            <p style={{ color: "var(--ink-3)", margin: "4px 0 0" }}>As tuas respostas são enviadas à tua terapeuta antes da sessão.</p>
          </div>
          <button className="btn btn-primary btn-lg" disabled={answered < total} onClick={() => setSubmitted(true)}>
            Submeter respostas <IconCheck size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
