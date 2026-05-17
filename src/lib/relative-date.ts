/**
 * Relative date helpers for the Process timeline.
 * Computes German relative labels (HEUTE / MORGEN / IN 2 WOCHEN) and
 * actual calendar dates ("17. Mai 2026") from a day offset.
 *
 * Ported from /Projekte/BilderAds/framer_components/process_3steps_dynamic_dates.tsx
 */

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
] as const;

export function getRelativeLabel(days: number): string {
  if (days === 0) return "HEUTE";
  if (days === 1) return "MORGEN";
  if (days < 7) return `IN ${days} TAGEN`;
  if (days === 7) return "IN 1 WOCHE";
  if (days < 14) return `IN ${days} TAGEN`;
  if (days === 14) return "IN 2 WOCHEN";
  if (days < 21) return `IN ${days} TAGEN`;
  if (days === 21) return "IN 3 WOCHEN";
  if (days < 30) return `IN ${days} TAGEN`;
  const weeks = Math.round(days / 7);
  return `IN ${weeks} WOCHEN`;
}

export function getActualDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const d = date.getDate();
  const m = MONTHS[date.getMonth()];
  const y = date.getFullYear();
  return `${d}. ${m} ${y}`;
}
