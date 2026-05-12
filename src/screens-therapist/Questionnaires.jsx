import { useState } from 'react';
import { TPageHead } from '../components/TherapistShell';
import { IconCheck, IconClock, IconAlert, IconClipboard, IconShield, IconExternal, IconPlus, IconChevronRight } from '../components/Icons';
import { QUESTIONNAIRE_LIBRARY, ACTIVITY } from '../data/therapist';
import './Questionnaires.css';

function UsageBar({ value, max }) {
  const pct = Math.min(100, (value / max) * 100);
  return <div className="bar q-lib-usage-bar"><div className="bar-fill" style={{ width: pct + "%" }} /></div>;
}

const RECENT_ASSIGNMENTS = [
  { name: "Perfil de Humor Pré-Sessão", to: "Beatriz Lopes Carvalho", when: "há 5h", status: "respondido", score: "3.0/5" },
  { name: "Termómetro Emocional", to: "Diogo André Sousa", when: "há 14h", status: "alert", score: "1.0/5" },
  { name: "Inventário de Desafios", to: "Beatriz Lopes Carvalho", when: "há 2 dias", status: "em_atraso" },
  { name: "Escala de Bem-Estar", to: "Sofia Alexandra Correia", when: "há 2 dias", status: "respondido", score: "3.4/5" },
  { name: "Core-OM", to: "Mariana Pinto Ribeiro", when: "há 3 dias", status: "pendente" },
];

export default function TherapistQuestionnaires() {
  const [category, setCategory] = useState("all");
  const categories = ["all", "Humor", "Triagem", "Avaliação geral", "Reflexão", "Aliança", "Objetivos"];
  const list = category === "all" ? QUESTIONNAIRE_LIBRARY : QUESTIONNAIRE_LIBRARY.filter(q => q.category === category);

  return (
    <>
      <TPageHead
        eyebrow="Biblioteca clínica"
        title={<>Questionários &amp; <em>instrumentos</em></>}
        sub={`${QUESTIONNAIRE_LIBRARY.length} instrumentos disponíveis · 87% taxa de resposta`}
        actions={[
          <button key="imp" className="btn btn-ghost"><IconExternal size={14} /> Importar</button>,
          <button key="add" className="btn btn-primary"><IconPlus size={14} /> Criar questionário</button>,
        ]}
      />

      <section className="card flush recent-assignments-section">
        <div className="card-head">
          <div className="card-title">Atribuições recentes <span className="count">12</span></div>
          <button className="card-action">Ver tudo →</button>
        </div>
        <div className="assignments-strip">
          {RECENT_ASSIGNMENTS.map((a, i) => (
            <article key={i} className="assignment-card">
              <div className={"assignment-status " + a.status}>
                {a.status === "respondido" ? <IconCheck size={12} /> : a.status === "alert" ? <IconAlert size={12} /> : <IconClock size={12} />}
              </div>
              <div className="assignment-card-info">
                <div className="assignment-name">{a.name}</div>
                <div className="assignment-meta">{a.to} · {a.when}</div>
              </div>
              {a.score && <span className="assignment-score">{a.score}</span>}
            </article>
          ))}
        </div>
      </section>

      <div className="filter-chips filter-chips-margin">
        {categories.map(c => (
          <button key={c} className={"chip" + (category === c ? " on" : "")} onClick={() => setCategory(c)}>
            {c === "all" ? "Todas as categorias" : c}
          </button>
        ))}
      </div>

      <div className="card flush">
        <div className="table-head q-lib-table-cols">
          <span>Questionário</span><span>Categoria</span><span>Cadência</span><span>Itens</span><span>Duração</span><span>Utilizações</span>
        </div>
        <div className="list">
          {list.map(q => (
            <div key={q.id} className="row q-lib-table-cols">
              <div className="patient-cell">
                <div className={"q-lib-icon " + (q.type === "Validado" ? "validated" : "")}>
                  {q.type === "Validado" ? <IconShield size={14} /> : <IconClipboard size={14} />}
                </div>
                <div className="q-lib-cell-info">
                  <div className="row-title">{q.name}</div>
                  <div className="row-sub">{q.type === "Validado" ? "Instrumento validado" : "Próprio"} · {q.category}</div>
                </div>
              </div>
              <span className="pill outline">{q.category}</span>
              <span className="pill outline">{q.cadence}</span>
              <span className="q-lib-items">{q.items}</span>
              <span className="q-lib-duration">~{q.duration} min</span>
              <div className="q-lib-usage">
                <UsageBar value={q.used} max={200} />
                <span className="q-lib-usage-count">{q.used}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
