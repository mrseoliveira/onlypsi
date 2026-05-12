import React, { useState } from 'react';
import { PageHead } from '../components/Shell';
import { IconClipboard, IconClock, IconArrowRight, IconExternal, IconChevronRight } from '../components/Icons';
import { PENDING_QUESTIONNAIRES, HISTORY_QUESTIONNAIRES, PATIENT } from '../data/patient';

function TrendIcon({ dir }) {
  if (dir === "up") return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--status-done)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10l4-4 3 3 4-5" /><path d="M9 4h4v4" /></svg>;
  if (dir === "down") return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--status-overdue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l4 4 3-3 4 5" /><path d="M9 10h4V6" /></svg>;
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10" /></svg>;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function QCard({ q, onOpen }) {
  return (
    <article className="qcard" onClick={onOpen}>
      <header className="qcard-head">
        <div className={"pq-marker " + q.status}><IconClipboard size={16} /></div>
        <span className={"pill " + (q.status === "overdue" ? "overdue" : q.status === "due" ? "due" : "info")}>
          {q.status === "overdue" ? "Em atraso" : q.status === "due" ? "Hoje" : "Disponível"}
        </span>
      </header>
      <h3 className="qcard-title">{q.name}</h3>
      <p className="qcard-sub">{q.urgency}</p>
      <footer className="qcard-foot">
        <div className="qcard-meta">
          <span><IconClipboard size={12} /> {q.items} perguntas</span>
          <span><IconClock size={12} /> ~{q.duration} min</span>
        </div>
        <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
          Começar <IconArrowRight size={12} />
        </button>
      </footer>
    </article>
  );
}

function Section({ title, sub, tone, children }) {
  return (
    <section>
      <header className="qsec-head">
        <span className={"qsec-dot " + tone} />
        <div>
          <h2 className="qsec-title">{title}</h2>
          <div className="qsec-sub">{sub}</div>
        </div>
      </header>
      {children}
    </section>
  );
}

function PendingList({ items, goTo }) {
  if (!items.length) return (
    <div style={{ padding: 60, textAlign: "center", color: "var(--ink-3)" }}>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--ink-2)", marginBottom: 6 }}>Tudo em dia</div>
      <p>Não tens questionários para responder neste momento.</p>
    </div>
  );

  const overdue = items.filter(q => q.status === "overdue");
  const due = items.filter(q => q.status === "due");
  const available = items.filter(q => q.status === "available");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {overdue.length > 0 && (
        <Section title="Em atraso" sub="Responder o mais cedo possível" tone="overdue">
          <div className="qgrid">{overdue.map(q => <QCard key={q.id} q={q} onOpen={() => goTo("fill", q)} />)}</div>
        </Section>
      )}
      {due.length > 0 && (
        <Section title="Para hoje" sub={"Antes da sessão das 16:00 com " + PATIENT.therapist.name} tone="due">
          <div className="qgrid">{due.map(q => <QCard key={q.id} q={q} onOpen={() => goTo("fill", q)} />)}</div>
        </Section>
      )}
      {available.length > 0 && (
        <Section title="Disponíveis" sub="Sem prazo definido" tone="info">
          <div className="qgrid">{available.map(q => <QCard key={q.id} q={q} onOpen={() => goTo("fill", q)} />)}</div>
        </Section>
      )}
    </div>
  );
}

function HistoryList({ items }) {
  return (
    <div className="card flush">
      <div className="table-head" style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1fr 0.5fr" }}>
        <span>Questionário</span><span>Tipo</span><span>Data</span><span>Resultado</span><span></span>
      </div>
      <div className="list">
        {items.map(h => (
          <div key={h.id} className="row" style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1fr 0.5fr" }}>
            <div>
              <div className="row-title">{h.name}</div>
              <div className="row-sub">Concluído · respostas guardadas</div>
            </div>
            <span className="pill outline">{h.type}</span>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink-2)" }}>{formatDate(h.date)}</span>
            <span className="dotchip">
              <TrendIcon dir={h.trend} />
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>{h.score}</span>
            </span>
            <button className="btn btn-ghost" style={{ padding: "6px 10px" }}><IconExternal size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Questionnaires({ goTo }) {
  const [tab, setTab] = React.useState("pending");
  const [filter, setFilter] = React.useState("all");

  const filters = ["all", "Pré-sessão", "Pós-sessão", "Semanal", "Mensal"];
  const filterLabels = { all: "Todos", "Pré-sessão": "Pré-sessão", "Pós-sessão": "Pós-sessão", "Semanal": "Semanal", "Mensal": "Mensal" };

  const filteredPending = filter === "all" ? PENDING_QUESTIONNAIRES : PENDING_QUESTIONNAIRES.filter(q => q.type === filter);
  const filteredHistory = filter === "all" ? HISTORY_QUESTIONNAIRES : HISTORY_QUESTIONNAIRES.filter(q => q.type === filter);

  return (
    <>
      <PageHead
        eyebrow="Avaliações terapêuticas"
        title={<>Os meus <em>questionários</em></>}
        sub="Estes instrumentos ajudam a tua terapeuta a acompanhar o teu progresso e a preparar cada sessão."
      />
      <div className="tabs">
        {[{ id: "pending", label: "A responder", count: PENDING_QUESTIONNAIRES.length }, { id: "history", label: "Histórico", count: HISTORY_QUESTIONNAIRES.length }].map(t => (
          <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
            {t.label} <span className="tab-count">{t.count}</span>
          </button>
        ))}
        <div className="tabs-spacer" />
        <div className="filter-chips">
          {filters.map(f => (
            <button key={f} className={"chip" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{filterLabels[f]}</button>
          ))}
        </div>
      </div>
      {tab === "pending" ? <PendingList items={filteredPending} goTo={goTo} /> : <HistoryList items={filteredHistory} />}
    </>
  );
}
