// Mock data for the OnlyPsi patient prototype.
// Portuguese, drawn from the Figma file's content vocabulary.

const PATIENT = {
  firstName: "Beatriz",
  fullName: "Beatriz Lopes Carvalho",
  initials: "BL",
  email: "beatriz.carvalho@onlypsi.pt",
  birthYear: 1994,
  joined: "Outubro 2024",
  clinic: "Centro Psicológico Raízes",
  therapist: {
    name: "Dra. Ana Sofia Martins",
    role: "Psicóloga Clínica",
    initials: "AS",
    yearsExperience: 12,
  },
  nextSession: {
    date: "2026-05-14T16:00:00",
    pretty: "Quinta, 14 de Maio",
    time: "16:00",
    durationMin: 50,
    mode: "Presencial",
    location: "Av. da Liberdade 42, Lisboa",
    sessionNumber: 14,
  },
  streakWeeks: 8,
};

// Questionnaires — name, type, status, date, duration
const PENDING_QUESTIONNAIRES = [
  { id: "q1", name: "Perfil de Humor Pré-Sessão", type: "Pré-sessão", due: "2026-05-14", duration: 4, items: 12, status: "due", urgency: "Hoje, antes da consulta" },
  { id: "q2", name: "Inventário de Desafios Recentes", type: "Semanal", due: "2026-05-13", duration: 8, items: 22, status: "overdue", urgency: "Em atraso há 2 dias" },
  { id: "q3", name: "Escala de Bem-Estar Pré-Consulta", type: "Pré-sessão", due: "2026-05-14", duration: 3, items: 10, status: "due", urgency: "Hoje, antes da consulta" },
  { id: "q4", name: "Roteiro de Foco Terapêutico", type: "Mensal", due: "2026-05-20", duration: 6, items: 16, status: "available", urgency: "Disponível esta semana" },
  { id: "q5", name: "Termómetro Emocional de Entrada", type: "Pré-sessão", due: "2026-05-14", duration: 2, items: 5, status: "due", urgency: "Hoje, antes da consulta" },
];

const HISTORY_QUESTIONNAIRES = [
  { id: "h1", name: "Reflexão Pós-Sessão Guiada", type: "Pós-sessão", date: "2026-05-07", score: "Positiva", trend: "up" },
  { id: "h2", name: "Core-OM em Português", type: "Mensal", date: "2026-05-04", score: "1.8 / 4.0", trend: "down" },
  { id: "h3", name: "Questionário de Aliança Terapêutica", type: "Mensal", date: "2026-04-30", score: "Forte", trend: "up" },
  { id: "h4", name: "Perfil de Humor Pré-Sessão", type: "Pré-sessão", date: "2026-04-23", score: "Estável", trend: "flat" },
  { id: "h5", name: "Inventário de Insights Obtidos", type: "Pós-sessão", date: "2026-04-23", score: "5 insights", trend: "up" },
  { id: "h6", name: "Escala de Confiança no Processo", type: "Mensal", date: "2026-04-16", score: "4.2 / 5.0", trend: "up" },
  { id: "h7", name: "Termómetro Emocional de Saída", type: "Pós-sessão", date: "2026-04-09", score: "Calma", trend: "up" },
];

// Likert items for the active questionnaire
const ACTIVE_QUESTIONNAIRE = {
  id: "q1",
  name: "Perfil de Humor Pré-Sessão",
  subtitle: "Antes da sessão de hoje, 14 de Maio — Dra. Ana Sofia Martins",
  intro: "Estas afirmações ajudam a sua terapeuta a perceber como tem estado nos últimos dias. Não há respostas certas — escolha a opção que melhor descreve a sua semana.",
  scaleLabel: "Durante a última semana...",
  options: [
    { value: 0, label: "Nunca" },
    { value: 1, label: "Raramente" },
    { value: 2, label: "Às vezes" },
    { value: 3, label: "Muitas vezes" },
    { value: 4, label: "Quase sempre" },
  ],
  items: [
    { id: "i1", text: "Tenho-me sentido tensa, ansiosa ou nervosa." },
    { id: "i2", text: "Senti que tenho alguém a quem posso pedir ajuda, se precisar.", reverse: true },
    { id: "i3", text: "Tenho-me sentido bem comigo própria.", reverse: true },
    { id: "i4", text: "Senti-me totalmente sem energia ou entusiasmo." },
    { id: "i5", text: "Tive dificuldade em adormecer ou em manter o sono." },
    { id: "i6", text: "Consegui concentrar-me em tarefas do dia-a-dia.", reverse: true },
    { id: "i7", text: "Os meus pensamentos parecem ir mais devagar do que o habitual." },
    { id: "i8", text: "Senti-me capaz de gerir situações difíceis sem me sobrecarregar.", reverse: true },
    { id: "i9", text: "Tive dores físicas que penso estarem ligadas ao stress." },
    { id: "i10", text: "Senti-me ligada às pessoas importantes para mim.", reverse: true },
    { id: "i11", text: "Pensei em mim de forma crítica ou injusta." },
    { id: "i12", text: "Senti um sentido de esperança em relação à próxima semana.", reverse: true },
  ],
};

// Upcoming + past sessions
const SESSIONS_UPCOMING = [
  { id: "s1", date: "2026-05-14", time: "16:00", duration: 50, mode: "Presencial", topic: "Sessão regular #14", focus: "Padrões de ansiedade no trabalho", status: "confirmed", canJoin: false },
  { id: "s2", date: "2026-05-21", time: "16:00", duration: 50, mode: "Vídeo", topic: "Sessão regular #15", focus: "Continuação — limites profissionais", status: "confirmed", canJoin: false },
  { id: "s3", date: "2026-05-28", time: "16:30", duration: 50, mode: "Presencial", topic: "Sessão regular #16", focus: "A definir", status: "pending", canJoin: false },
];

const SESSIONS_PAST = [
  { id: "p1", date: "2026-05-07", time: "16:00", duration: 50, mode: "Presencial", topic: "Sessão regular #13", focus: "Revisão de objetivos do trimestre", notes: 2, materials: 1 },
  { id: "p2", date: "2026-04-30", time: "16:00", duration: 50, mode: "Vídeo", topic: "Sessão regular #12", focus: "Comunicação com a equipa", notes: 3, materials: 0 },
  { id: "p3", date: "2026-04-23", time: "16:00", duration: 50, mode: "Presencial", topic: "Sessão regular #11", focus: "Estratégias de regulação emocional", notes: 4, materials: 2 },
  { id: "p4", date: "2026-04-16", time: "16:00", duration: 50, mode: "Presencial", topic: "Sessão regular #10", focus: "Trabalho de exposição gradual", notes: 2, materials: 1 },
  { id: "p5", date: "2026-04-09", time: "16:00", duration: 50, mode: "Vídeo", topic: "Sessão regular #9", focus: "Padrões familiares — semana 2", notes: 3, materials: 0 },
];

// Progress points — mood (1-5) over 12 weeks
const PROGRESS_MOOD = [
  { week: "S1", value: 2.1 },
  { week: "S2", value: 2.0 },
  { week: "S3", value: 2.3 },
  { week: "S4", value: 2.6 },
  { week: "S5", value: 2.4 },
  { week: "S6", value: 2.8 },
  { week: "S7", value: 3.1 },
  { week: "S8", value: 3.0 },
  { week: "S9", value: 3.4 },
  { week: "S10", value: 3.5 },
  { week: "S11", value: 3.3 },
  { week: "S12", value: 3.7 },
];

const PROGRESS_ANXIETY = [
  { week: "S1", value: 3.8 },
  { week: "S2", value: 3.7 },
  { week: "S3", value: 3.5 },
  { week: "S4", value: 3.3 },
  { week: "S5", value: 3.4 },
  { week: "S6", value: 3.1 },
  { week: "S7", value: 2.9 },
  { week: "S8", value: 2.8 },
  { week: "S9", value: 2.6 },
  { week: "S10", value: 2.4 },
  { week: "S11", value: 2.5 },
  { week: "S12", value: 2.2 },
];

// Therapy goals
const GOALS = [
  { id: "g1", title: "Reduzir a ansiedade antecipatória antes de reuniões", progress: 0.65, status: "Em progresso", started: "Janeiro 2026" },
  { id: "g2", title: "Estabelecer limites com prazos de trabalho", progress: 0.40, status: "Em progresso", started: "Fevereiro 2026" },
  { id: "g3", title: "Praticar rotina de sono consistente", progress: 0.80, status: "Quase concluído", started: "Dezembro 2025" },
  { id: "g4", title: "Reativar contacto com 2 amizades próximas", progress: 0.25, status: "A iniciar", started: "Maio 2026" },
];

// Insights highlighted by therapist
const INSIGHTS = [
  { id: "in1", date: "07 Mai", text: "Reconheceste o teu padrão de auto-crítica antes de apresentações — primeiro passo essencial.", from: "Dra. Ana Sofia Martins" },
  { id: "in2", date: "30 Abr", text: "A respiração diafragmática tem-te ajudado em momentos de pico de ansiedade.", from: "Dra. Ana Sofia Martins" },
  { id: "in3", date: "23 Abr", text: "Identificámos juntas que o teu sono melhora quando reservas 30min sem ecrãs antes de deitar.", from: "Dra. Ana Sofia Martins" },
];

Object.assign(window, {
  PATIENT, PENDING_QUESTIONNAIRES, HISTORY_QUESTIONNAIRES, ACTIVE_QUESTIONNAIRE,
  SESSIONS_UPCOMING, SESSIONS_PAST, PROGRESS_MOOD, PROGRESS_ANXIETY, GOALS, INSIGHTS,
});
