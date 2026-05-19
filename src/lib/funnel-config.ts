/**
 * Funnel-Config: 7 Service-Avatar-Fragen + Kontaktschritt
 * Reihenfolge + Optionen exakt nach Live-Funnel auf bilderads.de.
 * Field-IDs aus Airtable LEADS — robust gegen Field-Renames.
 * `typecast: true` im API-Call legt fehlende Single-Select-Choices automatisch an.
 */

export type FunnelOption = {
  value: string;
};

export type FunnelLayout = "stack" | "grid2";

export type FunnelStep = {
  id: keyof FunnelAnswers;
  fieldId: string;
  question: string;
  layout?: FunnelLayout;
  multiple?: boolean;
  options: FunnelOption[];
};

export type FunnelAnswers = {
  hilfe: string;
  umsatz: string;
  plattform: string;
  kundenproMonat: string;
  kundenherkunft: string;
  problem: string;
  ziel: string;
};

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "hilfe",
    fieldId: "fldIGqDO73kVOl9Vs",
    question: "Wobei können wir dir helfen?",
    options: [
      { value: "Kostenlose Website + Mehr zahlende Kunden" },
      { value: "Mehr zahlende Kunden" },
    ],
  },
  {
    id: "umsatz",
    fieldId: "fldljdWqid0DFstXg",
    question: "Wie viel Umsatz machst du aktuell pro Monat?",
    options: [
      { value: "Unter 10.000€" },
      { value: "10.000€ bis 30.000€" },
      { value: "30.000€ bis 100.000€" },
      { value: "100.000€ +" },
    ],
  },
  {
    id: "plattform",
    fieldId: "fldIJ3IF6pgxywlGl",
    question: "Auf welcher Plattform schaltest du aktuell Werbung?",
    layout: "grid2",
    multiple: true,
    options: [
      { value: "Meta" },
      { value: "Google" },
      { value: "TikTok" },
      { value: "Keine Ads" },
    ],
  },
  {
    id: "kundenproMonat",
    fieldId: "fldc0nRP3CXmhjCO3",
    question: "Wie viele neue Kunden gewinnst du aktuell pro Monat?",
    options: [
      { value: "0-5 Kunden" },
      { value: "5-15 Kunden" },
      { value: "15-30 Kunden" },
      { value: "30+ Kunden" },
    ],
  },
  {
    id: "kundenherkunft",
    fieldId: "fldwZx4VuxXTzIdDl",
    question: "Wie kommen deine Kunden aktuell zu dir?",
    options: [
      { value: "Empfehlungen" },
      { value: "Google Ads / Meta Ads" },
      { value: "Social Media" },
      { value: "Kaltakquise" },
    ],
  },
  {
    id: "problem",
    fieldId: "fldbZRuCA8a5LhNhA",
    question: "Was ist aktuell dein größtes Problem?",
    options: [
      { value: "Zu wenig Anfragen und Neukunden" },
      { value: "Unsicher wie man Werbung schaltet" },
      { value: "Meine Ads bringen kaum Ergebnisse" },
      { value: "Ich verliere Kunden an günstigere Konkurrenten" },
    ],
  },
  {
    id: "ziel",
    fieldId: "fldSEdY9deAmN4SIj",
    question: "Was ist aktuell dein wichtigstes Ziel?",
    options: [
      { value: "Mehr zahlende Kunden gewinnen" },
      { value: "Endlich planbar und profitabel wachsen" },
      { value: "Nicht mehr auf Empfehlungen angewiesen sein" },
      { value: "Meine Konkurrenz hinter mir lassen" },
    ],
  },
];

export type ContactFields = {
  name: string;
  email: string;
  website: string;
};

export const CONTACT_FIELD_IDS = {
  fullName: "fldzvojjWqsiBWkSR",
  firstname: "fldWteYzlkIHBHX1e",
  lastname: "fldkHfEkBMmkyJrhq",
  email: "fldnpuRJ8wjpNrbi4",
  website: "fldIVQbgOC30og7Hf",
} as const;

export const AIRTABLE_BASE_ID = "appeBBY4exPo8Dipm";
export const AIRTABLE_LEADS_TABLE_ID = "tbl2nNXgkTx3CYnIC";
