import React, { useState } from 'react';
import { PageHead } from '../components/Shell';
import { IconCheck, IconChevronRight } from '../components/Icons';
import { PROGRESS_MOOD, PROGRESS_ANXIETY, GOALS, INSIGHTS } from '../data/patient';
import './Progress.css';

function StatCard({ eyebrow, value, unit, delta, deltaTone, sub, tone }) {
  return (
    <div className={"stat-card" + (tone === "accent" ? " accent" : "")}>
      <div className="page-eyebrow">{eyebrow}</div>
      <div className="stat-row">
        <div className="stat-value">{value}<span className="stat-unit">{unit}</span></div>
        <span className={"pill stat-pill-size " + deltaTone}>{delta}</span>
      </div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

function BigChart({ data, trendUp }) {
  const w = 720, h = 240, padL = 36, padR = 16, padT = 16, padB = 36;
  const max = 5, min = 0;
  const pts = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * (w - padL - padR);
    const y = padT + (1 - (d.value - min) / (max - min)) * (h - padT - padB);
    return [x, y, d];
  });
  const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L${pts[pts.length - 1][0]} ${h - padB} L${pts[0][0]} ${h - padB} Z`;

  const ma = data.map((_, i) => {
    const start = Math.max(0, i - 3);
    const slice = data.slice(start, i + 1);
    return slice.reduce((s, x) => s + x.value, 0) / slice.length;
  });
  const maPts = ma.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * (w - padL - padR);
    const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
    return [x, y];
  });
  const maPath = maPts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const accent = trendUp ? "var(--accent)" : "var(--status-due)";

  return (
    <div className="big-chart-wrap">
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="big-chart-svg">
        <defs>
          <linearGradient id="bigchart-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[1,2,3,4,5].map(v => {
          const y = padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--line-soft)" strokeDasharray={v === 3 ? "" : "2 4"} />
              <text x={padL - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="var(--ink-4)" fontFamily="var(--font-sans)">{v}</text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#bigchart-grad)" />
        <path d={maPath} stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? accent : "white"} stroke={accent} strokeWidth="1.6" />
        ))}
        {pts.map((p, i) => (
          (i === 0 || i === pts.length - 1 || i % 3 === 2) && (
            <text key={i} x={p[0]} y={h - padB + 16} textAnchor="middle" fontSize="10.5" fill="var(--ink-4)" fontFamily="var(--font-sans)">{p[2].week}</text>
          )
        ))}
        <g transform={`translate(${pts[pts.length-1][0] - 64}, ${pts[pts.length-1][1] - 32})`}>
          <rect width="58" height="22" rx="6" fill={accent} />
          <text x="29" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="var(--font-sans)">
            {pts[pts.length-1][2].value.toFixed(1)} · {pts[pts.length-1][2].week}
          </text>
        </g>
      </svg>
      <div className="big-chart-legend">
        <span className="dotchip"><span className="d info" /> Pontuação semanal</span>
        <span className="dotchip"><span className="d" style={{ background: accent }} /> Tendência (4 semanas)</span>
      </div>
    </div>
  );
}

export default function Progress({ goTo }) {
  const [metric, setMetric] = React.useState("mood");
  const data = metric === "mood" ? PROGRESS_MOOD : PROGRESS_ANXIETY;
  const trendUp = metric === "mood";

  return (
    <>
      <PageHead
        eyebrow="As tuas medidas · últimas 12 semanas"
        title={<>O meu <em>progresso</em></>}
        sub="Estes números vêm dos questionários que tens respondido. Ajudam-nos a ti e à tua terapeuta a ver padrões."
      />
      <div className="progress-stats">
        <StatCard eyebrow="Bem-estar geral" value="3,7" unit="/ 5,0" delta="+43%" deltaTone="done" sub="média de 4 semanas · Core-OM" tone="accent" />
        <StatCard eyebrow="Ansiedade" value="2,2" unit="/ 5,0" delta="−42%" deltaTone="done" sub="Inventário de Estado Emocional" tone="plain" />
        <StatCard eyebrow="Sono" value="6,4" unit="h/noite" delta="+1.2h" deltaTone="done" sub="estimativa semanal" tone="plain" />
        <StatCard eyebrow="Sessões" value="13" unit="realizadas" delta="100%" deltaTone="info" sub="taxa de presença" tone="plain" />
      </div>
      <div className="progress-grid">
        <section className="card">
          <div className="big-chart-header">
            <div>
              <div className="page-eyebrow big-chart-eyebrow">Tendência semanal</div>
              <div className="big-chart-title">
                {metric === "mood" ? "Bem-estar geral" : "Ansiedade"} <em className="big-chart-title-em">· 12 semanas</em>
              </div>
            </div>
            <div className="seg">
              <button className={"seg-btn" + (metric === "mood" ? " on" : "")} onClick={() => setMetric("mood")}>Bem-estar</button>
              <button className={"seg-btn" + (metric === "anx" ? " on" : "")} onClick={() => setMetric("anx")}>Ansiedade</button>
            </div>
          </div>
          <BigChart data={data} trendUp={trendUp} />
        </section>
        <section className="card">
          <div className="progress-goals-header">
            <div>
              <div className="page-eyebrow">Objetivos terapêuticos</div>
              <div className="progress-goals-title">O que estamos a trabalhar</div>
            </div>
          </div>
          <div className="goals-list">
            {GOALS.map(g => (
              <article key={g.id} className="goal">
                <header className="goal-head">
                  <span className="pill outline goal-status-size">{g.status}</span>
                  <span className="goal-date">desde {g.started}</span>
                </header>
                <h4 className="goal-title">{g.title}</h4>
                <div className="goal-bar-wrap">
                  <div className="bar"><div className="bar-fill" style={{ width: (g.progress * 100) + "%" }} /></div>
                  <span className="goal-pct">{Math.round(g.progress * 100)}%</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <section className="card progress-insights-section">
        <div className="progress-insights-header">
          <div>
            <div className="page-eyebrow">O que a tua terapeuta tem notado</div>
            <div className="progress-insights-title">Insights recentes</div>
          </div>
          <button className="card-action">Ver todos <IconChevronRight size={12} /></button>
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
    </>
  );
}
