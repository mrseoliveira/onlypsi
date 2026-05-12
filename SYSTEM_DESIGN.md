# OnlyPsi — System Design

## Visão geral

OnlyPsi é uma plataforma SaaS de psicologia clínica com duas áreas distintas: o portal do paciente e o portal do terapeuta. A aplicação é um protótipo funcional em React com dados mock, estruturado para uma futura integração com backend.

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│  ┌─────────────┐        ┌─────────────────────┐ │
│  │ /paciente   │        │ /terapeuta           │ │
│  │ PatientApp  │        │ TherapistApp         │ │
│  └──────┬──────┘        └──────────┬──────────┘ │
│         │                          │             │
│    ┌────▼────────────────────────▼────┐          │
│    │           React Router DOM        │          │
│    │    BrowserRouter + Routes         │          │
│    └───────────────────────────────────┘          │
└─────────────────────────────────────────────────┘
```

### Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18 |
| Bundler | Vite 6 |
| Routing | React Router DOM 6 |
| Estilos | CSS puro com custom properties |
| Dados | Mock estático (JS modules) |
| Ícones | SVG inline (sem dependências externas) |
| Fontes | Instrument Serif + Geist (Google Fonts) |

---

## Estrutura de ficheiros

```
src/
├── main.jsx                  # Entry point + React Router
├── styles.css                # Design system completo
│
├── PatientApp.jsx            # Shell do paciente (routing interno)
├── TherapistApp.jsx          # Shell do terapeuta (routing interno)
│
├── components/
│   ├── Icons.jsx             # 30+ ícones SVG como componentes
│   ├── Shell.jsx             # Sidebar, Topbar, PageHead (paciente)
│   └── TherapistShell.jsx    # TSidebar, TTopbar, TPageHead (terapeuta)
│
├── data/
│   ├── patient.js            # Dados mock do paciente
│   └── therapist.js          # Dados mock do terapeuta
│
├── screens/                  # Ecrãs da área do paciente
│   ├── Dashboard.jsx
│   ├── Questionnaires.jsx
│   ├── FillQuestionnaire.jsx
│   ├── Sessions.jsx
│   ├── Progress.jsx
│   └── Profile.jsx
│
└── screens-therapist/        # Ecrãs da área do terapeuta
    ├── Dashboard.jsx
    ├── Patients.jsx
    ├── PatientDetail.jsx
    ├── Sessions.jsx
    └── Questionnaires.jsx
```

---

## Routing

O routing usa dois níveis:

**Nível 1 — React Router (URL)**
```
/           → Home (escolha de área)
/paciente   → PatientApp
/terapeuta  → TherapistApp
```

**Nível 2 — useState interno (sem URL)**

Dentro de cada App, a navegação entre ecrãs é gerida por `useState`, sem alterar a URL. Isto simplifica o protótipo e preserva o estado ao navegar.

```js
const [screen, setScreen] = useState("dashboard");
const goTo = (screenName, payload) => { setScreen(screenName); ... };
```

---

## Design system

### Paletas de cor (paciente)

| Nome | Accent | Uso |
|------|--------|-----|
| Sereno | `#1F5D8C` | Padrão (azul) |
| Salva | `#4F7A65` | Verde sálvia |
| Argila | `#A85B47` | Terracota |
| Bosque | `#1F6B6E` | Verde azulado |
| Lavanda | `#6B4F7A` | Roxo |

As paletas são aplicadas dinamicamente via CSS custom properties no `document.documentElement`.

### Tokens principais

```css
--accent          /* cor principal */
--bg              /* fundo da app */
--surface         /* fundo de cards */
--ink             /* texto principal */
--ink-2 / --ink-3 / --ink-4  /* hierarquia de texto */
--line            /* bordas */
--font-serif      /* Instrument Serif */
--font-sans       /* Geist */
```

---

## Módulos de dados (mock)

### patient.js
| Export | Descrição |
|--------|-----------|
| `PATIENT` | Perfil da paciente (Beatriz) |
| `PENDING_QUESTIONNAIRES` | Questionários por responder |
| `HISTORY_QUESTIONNAIRES` | Histórico de respostas |
| `ACTIVE_QUESTIONNAIRE` | Questionário ativo com itens Likert |
| `SESSIONS_UPCOMING` | Próximas sessões |
| `SESSIONS_PAST` | Sessões passadas |
| `PROGRESS_MOOD` | Série temporal de bem-estar (12 semanas) |
| `PROGRESS_ANXIETY` | Série temporal de ansiedade (12 semanas) |
| `GOALS` | Objetivos terapêuticos com progresso |
| `INSIGHTS` | Notas da terapeuta |

### therapist.js
| Export | Descrição |
|--------|-----------|
| `THERAPIST` | Perfil da terapeuta (Dra. Ana Sofia) |
| `TODAYS_SESSIONS` | Agenda do dia |
| `PATIENTS` | Lista de 12 pacientes com indicadores |
| `ALERTS` | Alertas clínicos ativos |
| `ACTIVITY` | Feed de atividade recente |
| `PATIENT_DETAIL` | Detalhe completo de um paciente |
| `QUESTIONNAIRE_LIBRARY` | Biblioteca de instrumentos |
| `WEEK_DAYS` | Dias da semana para agenda |
| `WEEK_SESSIONS` | Sessões por dia da semana |

---

## Ecrãs — Área do Paciente

### Dashboard
- Card da próxima sessão com data, hora, modo e terapeuta
- Lista de questionários pendentes (max 3)
- Check-in de humor rápido (escala 1-5 com SVG faces)
- Mini-gráfico de bem-estar (sparkline SVG)
- Objetivos terapêuticos com barras de progresso
- Insights recentes da terapeuta

### Questionnaires
- Tabs: A responder / Histórico
- Filter chips por tipo (Pré-sessão, Pós-sessão, Semanal, Mensal)
- Cards agrupados por urgência (Em atraso / Hoje / Disponível)

### FillQuestionnaire
- Barra de progresso sticky no topo
- Escala Likert com auto-scroll para próxima pergunta
- Ecrã de confirmação após submissão

### Sessions
- Próximas sessões com estado (confirmada/pendente)
- Card da terapeuta com meta-dados
- Checklist de preparação pré-sessão
- Histórico em tabela com notas e materiais

### Progress
- 4 stat cards (bem-estar, ansiedade, sono, sessões)
- Gráfico SVG grande com média móvel de 4 semanas
- Toggle entre bem-estar e ansiedade
- Objetivos com barras de progresso
- Insights da terapeuta

### Profile
- Dados pessoais e da terapeuta
- Toggles de notificações
- Ações de privacidade e dados (RGPD)

---

## Ecrãs — Área do Terapeuta

### Dashboard
- Timeline do dia com slots por estado (concluída / a decorrer / próxima)
- Alertas clínicos com níveis de severidade
- Snapshot semanal (estatísticas)
- Feed de atividade recente dos pacientes

### Patients
- Barra de pesquisa + filter chips por estado
- Toggle tabela / cards
- Sparklines de tendência de humor por paciente
- Badges de risco clínico (baixo / moderado / elevado)

### PatientDetail
- Header com avatar, meta-dados e alertas
- 5 tabs: Visão geral / Sessões / Questionários / Notas / Dados pessoais
- Gráfico de evolução do humor
- Notas clínicas com editor rápido
- Plano terapêutico

### Sessions (terapeuta)
- Week strip com seletor de dia
- Vista hora-a-hora com blocos de sessão clicáveis
- Estado por sessão (concluída / a decorrer / próxima / falta)

### Questionnaires (terapeuta)
- Atribuições recentes em strip horizontal
- Biblioteca de instrumentos com filtro por categoria
- Barras de utilização por questionário

---

## Integração futura com backend

Para converter este protótipo numa aplicação real, os pontos de substituição são:

| Mock atual | Substituir por |
|-----------|----------------|
| `src/data/patient.js` | REST API ou GraphQL |
| `src/data/therapist.js` | REST API ou GraphQL |
| `useState` para routing | React Router com URL params |
| Submissão de questionários | POST para API |
| Check-in de humor | WebSocket ou POST |
| Autenticação | Supabase Auth / Auth0 / NextAuth |

### Endpoints sugeridos
```
GET  /api/patient/me
GET  /api/questionnaires/pending
POST /api/questionnaires/:id/responses
GET  /api/sessions
GET  /api/progress
GET  /api/therapist/patients
GET  /api/therapist/patients/:id
POST /api/therapist/patients/:id/notes
```
