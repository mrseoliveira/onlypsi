import { useState } from 'react';
import { PageHead } from '../components/Shell';
import { IconCheck, IconShield, IconDownload, IconMessage, IconClose, IconChevronRight } from '../components/Icons';
import { PATIENT } from '../data/patient';

function ToggleRow({ title, sub, on: initialOn }) {
  const [on, setOn] = useState(initialOn);
  return (
    <div className="toggle-row">
      <div>
        <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{sub}</div>
      </div>
      <button className={"switch" + (on ? " on" : "")} onClick={() => setOn(!on)} aria-pressed={on}>
        <span className="switch-knob" />
      </button>
    </div>
  );
}

function ActionRow({ icon: Icon, title, sub, tone }) {
  return (
    <button className={"action-row" + (tone === "danger" ? " danger" : "")}>
      <Icon size={16} className="action-icon" />
      <div style={{ flex: 1, textAlign: "left" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{sub}</div>
      </div>
      <IconChevronRight size={14} />
    </button>
  );
}

export default function Profile() {
  return (
    <>
      <PageHead
        eyebrow="A minha conta"
        title={<>Perfil &amp; <em>preferências</em></>}
        sub="As tuas informações ficam seguras e só são partilhadas com a tua terapeuta e a clínica."
      />
      <div className="profile-grid">
        <section className="card profile-id">
          <div className="profile-id-head">
            <div className="avatar profile-avatar">{PATIENT.initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, lineHeight: 1.1, color: "var(--ink)" }}>{PATIENT.fullName}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 6 }}>
                Paciente desde {PATIENT.joined} · {PATIENT.clinic}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                <span className="pill done"><IconCheck size={10} /> Conta verificada</span>
                <span className="pill outline"><IconShield size={10} /> RGPD ativo</span>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ alignSelf: "flex-start", flexShrink: 0 }}>Editar foto</button>
          </div>
        </section>

        <section className="card">
          <div className="card-section-head">
            <div className="page-eyebrow">Dados pessoais</div>
            <button className="card-action">Editar</button>
          </div>
          <dl className="meta-list">
            <div><dt>Nome completo</dt><dd>{PATIENT.fullName}</dd></div>
            <div><dt>Data de nascimento</dt><dd>03 Janeiro {PATIENT.birthYear}</dd></div>
            <div><dt>Email</dt><dd>{PATIENT.email}</dd></div>
            <div><dt>Telemóvel</dt><dd>+351 91 ••• ••89 <span style={{ color: "var(--ink-4)", fontSize: 11 }}>· oculto</span></dd></div>
            <div><dt>Idioma preferido</dt><dd>Português (Portugal)</dd></div>
            <div><dt>Fuso horário</dt><dd>Europe/Lisbon</dd></div>
          </dl>
        </section>

        <section className="card">
          <div className="card-section-head">
            <div className="page-eyebrow">Terapeuta &amp; clínica</div>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <div className="avatar" style={{ width: 48, height: 48, fontSize: 14 }}>{PATIENT.therapist.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{PATIENT.therapist.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{PATIENT.therapist.role} · {PATIENT.clinic}</div>
            </div>
            <button className="btn btn-ghost"><IconMessage size={14} /> Mensagem</button>
          </div>
          <dl className="meta-list">
            <div><dt>Abordagem</dt><dd>Cognitivo-comportamental</dd></div>
            <div><dt>Sessões realizadas</dt><dd>13 desde {PATIENT.joined}</dd></div>
            <div><dt>Próxima sessão</dt><dd>Quinta, 14 Mai · 16:00</dd></div>
          </dl>
        </section>

        <section className="card">
          <div className="card-section-head">
            <div className="page-eyebrow">Notificações</div>
          </div>
          <ToggleRow title="Lembretes de questionários" sub="24h antes de cada sessão" on={true} />
          <ToggleRow title="Confirmação de sessão" sub="Notificação na véspera" on={true} />
          <ToggleRow title="Relatórios mensais" sub="Resumo das tuas medidas no fim do mês" on={false} />
          <ToggleRow title="Insights da terapeuta" sub="Notificar quando há novo insight" on={true} />
        </section>

        <section className="card">
          <div className="card-section-head">
            <div className="page-eyebrow">Privacidade &amp; dados</div>
          </div>
          <ActionRow icon={IconDownload} title="Exportar os meus dados" sub="Recebe um ficheiro com todos os teus questionários e notas" />
          <ActionRow icon={IconShield} title="Política de privacidade" sub="Como tratamos a tua informação · RGPD" />
          <ActionRow icon={IconClose} title="Encerrar conta" sub="Pedir eliminação permanente" tone="danger" />
        </section>
      </div>
    </>
  );
}
