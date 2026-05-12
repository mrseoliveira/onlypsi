import { useState } from 'react';
import { TPageHead } from '../components/TherapistShell';
import { IconCheck, IconClock, IconAlert, IconVideo, IconLocation, IconDownload, IconPlus } from '../components/Icons';
import { THERAPIST, WEEK_DAYS, WEEK_SESSIONS, PATIENTS } from '../data/therapist';
import './Sessions.css';

function DayTimeline({ sessions, goTo }) {
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const byHour = {};
  sessions.forEach(s => {
    const h = s.time.split(":")[0] + ":00";
    if (!byHour[h]) byHour[h] = [];
    byHour[h].push(s);
  });

  return (
    <div className="day-grid">
      {hours.map(h => {
        const slot = byHour[h] || [];
        const isLunch = h === "13:00";
        return (
          <div key={h} className={"hour-row" + (isLunch ? " lunch" : "")}>
            <div className="hour-label">{h}</div>
            <div className="hour-slot">
              {isLunch && !slot.length && <div className="lunch-block"><IconClock size={12} /> Pausa para almoço</div>}
              {slot.map((s, i) => (
                <button
                  key={i}
                  className={"session-block" + (s.missed ? " missed" : s.status === "completed" ? " completed" : s.status === "current" ? " current" : "")}
                  onClick={() => { const p = PATIENTS.find(p => p.initials === s.initials); if (p) goTo("patient", p); }}
                >
                  <div className="sb-time">{s.time} <span className="sb-dur">· {s.duration || 50} min</span></div>
                  <div className="sb-row">
                    <div className="avatar avatar-sm">{s.initials}</div>
                    <div className="sb-name">{s.patient}</div>
                  </div>
                  <div className="sb-meta">
                    {s.topic} · {s.mode === "Vídeo" ? <><IconVideo size={11} /> Vídeo</> : <><IconLocation size={11} /> Presencial</>}
                  </div>
                  {s.status === "current" && <span className="sb-tag current">A decorrer</span>}
                  {s.status === "completed" && <span className="sb-tag done"><IconCheck size={10} /> Concluída</span>}
                  {s.missed && <span className="sb-tag overdue">Falta</span>}
                  {s.alert && <span className="sb-tag overdue"><IconAlert size={10} /> {s.alert}</span>}
                </button>
              ))}
              {!slot.length && !isLunch && (
                <div className="hour-empty"><button className="hour-empty-btn">+ Marcar sessão</button></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TherapistSessions({ goTo }) {
  const [activeDay, setActiveDay] = useState("14");
  const sessions = WEEK_SESSIONS[activeDay] || [];
  const currentDay = WEEK_DAYS.find(d => d.date === activeDay);

  return (
    <>
      <TPageHead
        eyebrow="Agenda · Semana 20 · 12–16 Maio"
        title={<>Sessões da <em>semana</em></>}
        sub={`${THERAPIST.thisWeekSessions} sessões marcadas esta semana · ${THERAPIST.completedToday} concluídas hoje`}
        actions={[
          <button key="exp" className="btn btn-ghost"><IconDownload size={14} /> Exportar (.ics)</button>,
          <button key="new" className="btn btn-primary"><IconPlus size={14} /> Nova sessão</button>,
        ]}
      />
      <div className="week-strip">
        {WEEK_DAYS.map(d => (
          <button
            key={d.date}
            className={"week-day" + (activeDay === d.date ? " active" : "") + (d.isToday ? " today" : "")}
            onClick={() => setActiveDay(d.date)}
          >
            <span className="wd-weekday">{d.weekday}</span>
            <span className="wd-date">{d.date}</span>
            <span className="wd-count">{d.sessions} {d.sessions === 1 ? "sessão" : "sessões"}</span>
          </button>
        ))}
      </div>
      <div className="day-view">
        <header className="day-header">
          <h2 className="day-title">{currentDay?.weekday}, {currentDay?.short}</h2>
          <div className="day-header-actions">
            <button className="btn btn-ghost">Imprimir dia</button>
            <button className="btn btn-soft">Bloquear horário</button>
          </div>
        </header>
        <DayTimeline sessions={sessions} goTo={goTo} />
      </div>
    </>
  );
}
