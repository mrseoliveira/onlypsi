import {
  IconHome, IconUser, IconCalendar, IconClipboard, IconChart,
  IconMessage, IconBell, IconLifebuoy, IconLogout, IconCollapse, IconMoon, IconSearch
} from './Icons';
import { THERAPIST } from '../data/therapist';

function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button className={"nav-item" + (active ? " active" : "")} onClick={onClick} title={label}>
      <Icon className="nav-icon" />
      <span className="nav-label">{label}</span>
      {badge != null && <span className="nav-badge">{badge}</span>}
    </button>
  );
}

export function TSidebar({ screen, setScreen, collapsed, alertsCount }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">P</div>
        {!collapsed && <div className="brand-name">Only<em>Psi</em></div>}
      </div>
      <div className="nav-group">
        {!collapsed && <div className="nav-group-label">Clínica</div>}
        <NavItem icon={IconHome} label="Painel" active={screen === "dashboard"} onClick={() => setScreen("dashboard")} />
        <NavItem icon={IconUser} label="Pacientes" active={screen === "patients" || screen === "patient"} onClick={() => setScreen("patients")} badge={32} />
        <NavItem icon={IconCalendar} label="Sessões" active={screen === "sessions"} onClick={() => setScreen("sessions")} />
        <NavItem icon={IconClipboard} label="Questionários" active={screen === "questionnaires"} onClick={() => setScreen("questionnaires")} />
        <NavItem icon={IconChart} label="Relatórios" onClick={() => {}} />
      </div>
      <div className="nav-group">
        {!collapsed && <div className="nav-group-label">Pessoal</div>}
        <NavItem icon={IconMessage} label="Mensagens" onClick={() => {}} badge={4} />
        <NavItem icon={IconBell} label="Alertas" onClick={() => setScreen("dashboard")} badge={alertsCount} />
      </div>
      <div className="sidebar-foot">
        <NavItem icon={IconLifebuoy} label="Ajuda" onClick={() => {}} />
        <NavItem icon={IconLogout} label="Sair" onClick={() => {}} />
      </div>
    </aside>
  );
}

export function TTopbar({ collapsed, setCollapsed, breadcrumb }) {
  return (
    <header className="topbar">
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title="Recolher menu">
        <IconCollapse size={16} />
      </button>
      <nav className="breadcrumbs" aria-label="Localização">
        <span className="crumb">Área Terapêutica</span>
        <span className="sep">/</span>
        <span className="crumb now">{breadcrumb}</span>
      </nav>
      <div className="topbar-search">
        <IconSearch size={14} />
        <input type="text" placeholder="Procurar paciente, nota, questionário…" />
        <span className="topbar-search-kbd">⌘K</span>
      </div>
      <div className="lang-pill" role="group" aria-label="Idioma">
        <button className="on">PT</button>
        <button>EN</button>
      </div>
      <button className="icon-btn" title="Modo escuro"><IconMoon size={16} /></button>
      <button className="icon-btn" title="Notificações"><IconBell size={16} /><span className="dot" /></button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 6, borderLeft: "1px solid var(--line)" }}>
        <div className="avatar">{THERAPIST.initials}</div>
        <div style={{ lineHeight: 1.2, marginRight: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Dra. {THERAPIST.firstName}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Terapeuta</div>
        </div>
      </div>
    </header>
  );
}

export function TPageHead({ eyebrow, title, sub, actions }) {
  return (
    <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
      <div style={{ minWidth: 0, flex: "1 1 320px" }}>
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{actions}</div>}
    </div>
  );
}
