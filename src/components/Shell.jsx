import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconHome, IconClipboard, IconCalendar, IconChart, IconUser,
  IconMessage, IconLifebuoy, IconLogout, IconCollapse, IconMoon, IconBell, IconChevronRight
} from './Icons';
import { PATIENT } from '../data/patient';
import './Shell.css';

function Brand({ collapsed }) {
  return (
    <div className="brand">
      <div className="brand-mark">P</div>
      {!collapsed && <div className="brand-name">Only<em>Psi</em></div>}
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button className={"nav-item" + (active ? " active" : "")} onClick={onClick} title={label}>
      <Icon className="nav-icon" />
      <span className="nav-label">{label}</span>
      {badge != null && <span className="nav-badge">{badge}</span>}
    </button>
  );
}

export function Sidebar({ screen, setScreen, collapsed, pendingCount }) {
  return (
    <aside className="sidebar">
      <Brand collapsed={collapsed} />
      <div className="nav-group">
        {!collapsed && <div className="nav-group-label">Geral</div>}
        <NavItem icon={IconHome} label="Painel" active={screen === "dashboard"} onClick={() => setScreen("dashboard")} />
        <NavItem icon={IconClipboard} label="Questionários" active={screen === "questionnaires" || screen === "fill"} onClick={() => setScreen("questionnaires")} badge={pendingCount} />
        <NavItem icon={IconCalendar} label="Sessões" active={screen === "sessions"} onClick={() => setScreen("sessions")} />
        <NavItem icon={IconChart} label="Progresso" active={screen === "progress"} onClick={() => setScreen("progress")} />
      </div>
      <div className="nav-group">
        {!collapsed && <div className="nav-group-label">Pessoal</div>}
        <NavItem icon={IconUser} label="Perfil" active={screen === "profile"} onClick={() => setScreen("profile")} />
        <NavItem icon={IconMessage} label="Mensagens" onClick={() => {}} />
      </div>
      <div className="sidebar-foot">
        <NavItem icon={IconLifebuoy} label="Ajuda" onClick={() => {}} />
        <NavItem icon={IconLogout} label="Sair" onClick={() => {}} />
      </div>
    </aside>
  );
}

export function Topbar({ collapsed, setCollapsed, breadcrumb }) {
  return (
    <header className="topbar">
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title="Recolher menu">
        <IconCollapse size={16} />
      </button>
      <nav className="breadcrumbs" aria-label="Localização">
        <span className="crumb">Área do Paciente</span>
        <span className="sep">/</span>
        <span className="crumb now">{breadcrumb}</span>
      </nav>
      <div className="lang-pill" role="group" aria-label="Idioma">
        <button className="on">PT</button>
        <button>EN</button>
      </div>
      <button className="icon-btn" title="Modo escuro"><IconMoon size={16} /></button>
      <button className="icon-btn" title="Notificações"><IconBell size={16} /><span className="dot" /></button>
      <div className="topbar-user">
        <div className="avatar">{PATIENT.initials}</div>
        <div className="topbar-user-info">
          <div className="topbar-user-name">{PATIENT.firstName}</div>
          <div className="topbar-user-role">Paciente</div>
        </div>
      </div>
    </header>
  );
}

export function PageHead({ eyebrow, title, sub, actions }) {
  return (
    <div className="page-head page-head-inner">
      <div className="page-head-content">
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {actions && <div className="page-head-actions">{actions}</div>}
    </div>
  );
}
