export const THERAPIST = {
  firstName: "Ana Sofia",
  fullName: "Dra. Ana Sofia Martins",
  initials: "AM",
  role: "Psicóloga Clínica",
  clinic: "Centro Psicológico Raízes",
  approach: "Cognitivo-comportamental",
  yearsExperience: 12,
  totalPatients: 32,
  thisWeekSessions: 18,
  completedToday: 2,
  todayTotal: 6,
};

export const TODAY = "2026-05-14";

export const TODAYS_SESSIONS = [
  { id: "t1", time: "09:00", duration: 50, patient: "Tomás Manuel Ferreira", initials: "TF", mode: "Presencial", topic: "Sessão #8", status: "completed", note: "Notas preenchidas" },
  { id: "t2", time: "10:00", duration: 50, patient: "Inês Duarte Oliveira", initials: "IO", mode: "Vídeo", topic: "Sessão #21", status: "completed", note: "Notas preenchidas" },
  { id: "t3", time: "11:30", duration: 50, patient: "Pedro Henrique Santos", initials: "PS", mode: "Presencial", topic: "Primeira consulta", status: "current", note: "A decorrer", alert: "Primeira consulta" },
  { id: "t4", time: "14:00", duration: 50, patient: "Carolina Teixeira Pinto", initials: "CP", mode: "Vídeo", topic: "Sessão #4", status: "upcoming" },
  { id: "t5", time: "15:00", duration: 50, patient: "Diogo André Sousa", initials: "DS", mode: "Presencial", topic: "Sessão #11", status: "upcoming", alert: "Termómetro Emocional vermelho" },
  { id: "t6", time: "16:00", duration: 50, patient: "Beatriz Lopes Carvalho", initials: "BC", mode: "Presencial", topic: "Sessão #14", status: "upcoming", note: "Tem questionários por responder" },
];

export const PATIENTS = [
  { id: "p1", name: "Beatriz Lopes Carvalho", initials: "BC", age: 32, since: "Outubro 2024", sessions: 13, nextSession: "Hoje · 16:00", status: "em_progresso", focus: "Ansiedade ocupacional", moodTrend: [2.1, 2.3, 2.6, 2.8, 3.1, 3.4, 3.7], risk: "baixo", pendingForms: 3 },
  { id: "p2", name: "Diogo André Sousa", initials: "DS", age: 28, since: "Janeiro 2025", sessions: 10, nextSession: "Hoje · 15:00", status: "em_progresso", focus: "Regulação emocional", moodTrend: [2.8, 2.7, 2.5, 2.4, 2.0, 1.8, 1.6], risk: "elevado", alert: "Termómetro Emocional vermelho · ontem", pendingForms: 0 },
  { id: "p3", name: "Carolina Teixeira Pinto", initials: "CP", age: 41, since: "Março 2026", sessions: 3, nextSession: "Hoje · 14:00", status: "primeira_fase", focus: "Stress pós-trauma", moodTrend: [1.8, 1.9, 2.1, 2.0, 2.2], risk: "moderado", pendingForms: 1 },
  { id: "p4", name: "Pedro Henrique Santos", initials: "PS", age: 23, since: "Maio 2026", sessions: 0, nextSession: "Hoje · 11:30", status: "primeira_consulta", focus: "Triagem inicial", moodTrend: [], risk: "indefinido", alert: "Primeira consulta", pendingForms: 0 },
  { id: "p5", name: "Inês Duarte Oliveira", initials: "IO", age: 35, since: "Setembro 2024", sessions: 21, nextSession: "21 Mai · 10:00", status: "manutencao", focus: "Manutenção · ansiedade social", moodTrend: [3.2, 3.5, 3.7, 3.8, 4.0, 4.1, 4.2], risk: "baixo", pendingForms: 0 },
  { id: "p6", name: "Tomás Manuel Ferreira", initials: "TF", age: 19, since: "Fevereiro 2026", sessions: 8, nextSession: "21 Mai · 09:00", status: "em_progresso", focus: "Transição académica", moodTrend: [2.0, 2.2, 2.5, 2.6, 2.8, 2.9, 3.0], risk: "baixo", pendingForms: 1 },
  { id: "p7", name: "Sofia Alexandra Correia", initials: "SC", age: 47, since: "Agosto 2024", sessions: 24, nextSession: "16 Mai · 11:00", status: "manutencao", focus: "Luto · 2º ano", moodTrend: [3.0, 3.1, 3.0, 3.2, 3.3, 3.5, 3.4], risk: "baixo", pendingForms: 0 },
  { id: "p8", name: "Rafael Gomes Teixeira", initials: "RT", age: 38, since: "Novembro 2024", sessions: 11, nextSession: "17 Mai · 17:00", status: "em_progresso", focus: "Conflito relacional", moodTrend: [2.4, 2.5, 2.3, 2.6, 2.7, 2.9, 3.0], risk: "moderado", pendingForms: 2, alert: "Faltou à última sessão" },
  { id: "p9", name: "Joana Figueiredo Cardoso", initials: "JC", age: 29, since: "Janeiro 2026", sessions: 6, nextSession: "18 Mai · 14:00", status: "em_progresso", focus: "Burnout", moodTrend: [1.8, 2.0, 2.2, 2.4, 2.6], risk: "moderado", pendingForms: 1 },
  { id: "p10", name: "André Filipe Nunes", initials: "AN", age: 52, since: "Junho 2024", sessions: 28, nextSession: "20 Mai · 16:00", status: "manutencao", focus: "Manutenção · ansiedade generalizada", moodTrend: [3.5, 3.6, 3.8, 3.7, 3.9, 4.0, 3.9], risk: "baixo", pendingForms: 0 },
  { id: "p11", name: "Carolina Barros Fernandes", initials: "CF", age: 26, since: "Pausa desde Março", sessions: 14, nextSession: "—", status: "pausa", focus: "Em pausa terapêutica", moodTrend: [2.8, 3.0, 3.2], risk: "baixo", pendingForms: 0 },
  { id: "p12", name: "Mariana Pinto Ribeiro", initials: "MR", age: 34, since: "Outubro 2025", sessions: 16, nextSession: "19 Mai · 18:00", status: "em_progresso", focus: "Self-compaixão", moodTrend: [2.5, 2.6, 2.8, 3.0, 3.1, 3.2, 3.4], risk: "baixo", pendingForms: 0 },
];

export const ALERTS = [
  { id: "a1", level: "high", patientId: "p2", title: "Termómetro Emocional em vermelho", detail: "Diogo André Sousa marcou 1/5 no termómetro de entrada ontem à noite.", timeAgo: "há 14h", action: "Rever antes das 15:00" },
  { id: "a2", level: "medium", patientId: "p8", title: "Falta consecutiva", detail: "Rafael Gomes Teixeira não compareceu na última sessão (7 Mai) e não respondeu ao pedido de remarcação.", timeAgo: "há 3 dias", action: "Contactar" },
  { id: "a3", level: "medium", patientId: "p1", title: "Questionários por responder", detail: "Beatriz Lopes Carvalho tem 3 questionários pré-sessão pendentes para hoje às 16:00.", timeAgo: "há 5h", action: "Notificar" },
  { id: "a4", level: "low", patientId: "p9", title: "Core-OM em descida", detail: "Joana Figueiredo Cardoso desceu de 2.6 → 2.0 nas últimas duas semanas.", timeAgo: "há 1 dia", action: "Acompanhar" },
];

export const ACTIVITY = [
  { id: "ac1", type: "form_done", patient: "Inês Duarte Oliveira", initials: "IO", text: "respondeu ao <em>Perfil de Humor Pré-Sessão</em>", time: "há 1h", score: "4.2 / 5" },
  { id: "ac2", type: "session_done", patient: "Tomás Manuel Ferreira", initials: "TF", text: "concluiu a <em>Sessão #8</em>", time: "há 4h" },
  { id: "ac3", type: "form_done", patient: "Beatriz Lopes Carvalho", initials: "BC", text: "respondeu ao <em>Termómetro Emocional de Entrada</em>", time: "há 5h", score: "3.0 / 5" },
  { id: "ac4", type: "alert", patient: "Diogo André Sousa", initials: "DS", text: "marcou <em>1/5</em> no termómetro emocional", time: "há 14h", urgent: true },
  { id: "ac5", type: "form_assigned", patient: "Carolina Teixeira Pinto", initials: "CP", text: "tem novo <em>Inventário de Estado Emocional</em> atribuído", time: "ontem" },
  { id: "ac6", type: "message", patient: "Joana Figueiredo Cardoso", initials: "JC", text: "enviou uma mensagem", time: "ontem" },
  { id: "ac7", type: "form_done", patient: "Sofia Alexandra Correia", initials: "SC", text: "respondeu à <em>Escala de Bem-Estar</em>", time: "há 2 dias", score: "3.4 / 5" },
];

export const PATIENT_DETAIL = {
  id: "p1", name: "Beatriz Lopes Carvalho", initials: "BC", age: 32,
  since: "Outubro 2024", sessions: 13, nextSession: "Hoje · 16:00",
  status: "em_progresso", focus: "Ansiedade ocupacional",
  moodTrend: [2.1, 2.3, 2.6, 2.8, 3.1, 3.4, 3.7],
  risk: "baixo", pendingForms: 3,
  email: "beatriz.carvalho@onlypsi.pt",
  phone: "+351 91 555 ••89",
  birth: "03 Janeiro 1994",
  occupation: "Engenheira de software",
  emergencyContact: "Carla Carvalho (mãe) · +351 91 ••• ••67",
  treatmentPlan: "12 sessões semanais inicialmente. Atualmente em fase de consolidação — sessões quinzenais a partir de junho.",
  notes: [
    { id: "n1", date: "07 Mai 2026", session: "Sessão #13", title: "Revisão de objetivos do trimestre", excerpt: "Revisitámos os objetivos definidos em fevereiro. Boa evolução em sono e regulação. Identificámos resistência a definir limites no trabalho — próximo foco." },
    { id: "n2", date: "30 Abr 2026", session: "Sessão #12", title: "Comunicação com a equipa", excerpt: "Exploração de um conflito recente com gestora. Trabalhámos role-play assertivo. Considerar abordagem cognitiva sobre auto-crítica antecipatória." },
    { id: "n3", date: "23 Abr 2026", session: "Sessão #11", title: "Estratégias de regulação emocional", excerpt: "Apresentação de respiração diafragmática e grounding 5-4-3-2-1. Beatriz mostrou boa receção. Pratica diariamente desde então." },
  ],
  questionnairesAssigned: [
    { id: "qa1", name: "Perfil de Humor Pré-Sessão", status: "pendente", due: "Hoje 16:00", cadence: "Pré-sessão" },
    { id: "qa2", name: "Inventário de Desafios Recentes", status: "em_atraso", due: "12 Mai", cadence: "Semanal" },
    { id: "qa3", name: "Escala de Bem-Estar Pré-Consulta", status: "pendente", due: "Hoje 16:00", cadence: "Pré-sessão" },
    { id: "qa4", name: "Termómetro Emocional de Entrada", status: "respondido", date: "Hoje 11:14", score: "3.0 / 5", cadence: "Pré-sessão" },
    { id: "qa5", name: "Reflexão Pós-Sessão Guiada", status: "respondido", date: "7 Mai", score: "Positiva", cadence: "Pós-sessão" },
    { id: "qa6", name: "Core-OM em Português", status: "respondido", date: "4 Mai", score: "1.8 / 4.0", cadence: "Mensal" },
  ],
};

export const QUESTIONNAIRE_LIBRARY = [
  { id: "ql1", name: "Core-OM em Português", type: "Validado", items: 34, duration: 10, used: 28, cadence: "Mensal", category: "Avaliação geral" },
  { id: "ql2", name: "Perfil de Humor Pré-Sessão", type: "Próprio", items: 12, duration: 4, used: 142, cadence: "Pré-sessão", category: "Humor" },
  { id: "ql3", name: "Inventário de Desafios Recentes", type: "Próprio", items: 22, duration: 8, used: 89, cadence: "Semanal", category: "Triagem" },
  { id: "ql4", name: "Termómetro Emocional de Entrada", type: "Próprio", items: 5, duration: 2, used: 198, cadence: "Pré-sessão", category: "Triagem" },
  { id: "ql5", name: "Termómetro Emocional de Saída", type: "Próprio", items: 5, duration: 2, used: 194, cadence: "Pós-sessão", category: "Triagem" },
  { id: "ql6", name: "Reflexão Pós-Sessão Guiada", type: "Próprio", items: 8, duration: 6, used: 156, cadence: "Pós-sessão", category: "Reflexão" },
  { id: "ql7", name: "Questionário de Aliança Terapêutica", type: "Validado", items: 12, duration: 5, used: 24, cadence: "Mensal", category: "Aliança" },
  { id: "ql8", name: "Escala de Bem-Estar Pré-Consulta", type: "Validado", items: 10, duration: 3, used: 132, cadence: "Pré-sessão", category: "Humor" },
  { id: "ql9", name: "Mapa de Objetivos Terapêuticos", type: "Próprio", items: 6, duration: 10, used: 28, cadence: "Trimestral", category: "Objetivos" },
  { id: "ql10", name: "Inventário de Insights Obtidos", type: "Próprio", items: 8, duration: 5, used: 87, cadence: "Pós-sessão", category: "Reflexão" },
  { id: "ql11", name: "Roteiro de Foco Terapêutico", type: "Próprio", items: 16, duration: 6, used: 42, cadence: "Mensal", category: "Objetivos" },
  { id: "ql12", name: "Escala de Confiança no Processo", type: "Validado", items: 14, duration: 5, used: 38, cadence: "Mensal", category: "Aliança" },
];

export const WEEK_DAYS = [
  { date: "12", weekday: "Seg", short: "12 Mai", isToday: false, sessions: 4 },
  { date: "13", weekday: "Ter", short: "13 Mai", isToday: false, sessions: 5 },
  { date: "14", weekday: "Qua", short: "14 Mai", isToday: true, sessions: 6 },
  { date: "15", weekday: "Qui", short: "15 Mai", isToday: false, sessions: 3 },
  { date: "16", weekday: "Sex", short: "16 Mai", isToday: false, sessions: 4 },
];

export const WEEK_SESSIONS = {
  "12": [
    { time: "09:00", patient: "André Filipe Nunes", initials: "AN", topic: "#27", mode: "Vídeo" },
    { time: "11:00", patient: "Mariana Pinto Ribeiro", initials: "MR", topic: "#15", mode: "Presencial" },
    { time: "14:00", patient: "Rafael Gomes Teixeira", initials: "RT", topic: "#11 (faltou)", mode: "Presencial", missed: true },
    { time: "16:30", patient: "Sofia Alexandra Correia", initials: "SC", topic: "#23", mode: "Presencial" },
  ],
  "13": [
    { time: "09:00", patient: "Inês Duarte Oliveira", initials: "IO", topic: "#20", mode: "Vídeo" },
    { time: "10:30", patient: "Joana Figueiredo Cardoso", initials: "JC", topic: "#5", mode: "Presencial" },
    { time: "14:00", patient: "Carolina Teixeira Pinto", initials: "CP", topic: "#3", mode: "Vídeo" },
    { time: "15:30", patient: "Tomás Manuel Ferreira", initials: "TF", topic: "#7", mode: "Presencial" },
    { time: "17:00", patient: "Diogo André Sousa", initials: "DS", topic: "#10", mode: "Presencial" },
  ],
  "14": [
    { time: "09:00", patient: "Tomás Manuel Ferreira", initials: "TF", topic: "Sessão #8", mode: "Presencial", status: "completed" },
    { time: "10:00", patient: "Inês Duarte Oliveira", initials: "IO", topic: "Sessão #21", mode: "Vídeo", status: "completed" },
    { time: "11:30", patient: "Pedro Henrique Santos", initials: "PS", topic: "Primeira consulta", mode: "Presencial", status: "current", alert: "Primeira consulta" },
    { time: "14:00", patient: "Carolina Teixeira Pinto", initials: "CP", topic: "Sessão #4", mode: "Vídeo", status: "upcoming" },
    { time: "15:00", patient: "Diogo André Sousa", initials: "DS", topic: "Sessão #11", mode: "Presencial", status: "upcoming", alert: "Termómetro Emocional vermelho" },
    { time: "16:00", patient: "Beatriz Lopes Carvalho", initials: "BC", topic: "Sessão #14", mode: "Presencial", status: "upcoming" },
  ],
  "15": [
    { time: "10:00", patient: "Mariana Pinto Ribeiro", initials: "MR", topic: "#16", mode: "Vídeo" },
    { time: "14:00", patient: "Pedro Henrique Santos", initials: "PS", topic: "#2", mode: "Presencial" },
    { time: "16:00", patient: "Beatriz Lopes Carvalho", initials: "BC", topic: "Reagendada de 7 Mai", mode: "Presencial" },
  ],
  "16": [
    { time: "09:00", patient: "Joana Figueiredo Cardoso", initials: "JC", topic: "#6", mode: "Presencial" },
    { time: "11:00", patient: "Sofia Alexandra Correia", initials: "SC", topic: "#24", mode: "Presencial" },
    { time: "14:00", patient: "Tomás Manuel Ferreira", initials: "TF", topic: "#9", mode: "Vídeo" },
    { time: "16:00", patient: "Rafael Gomes Teixeira", initials: "RT", topic: "Reagendada", mode: "Presencial" },
  ],
};
