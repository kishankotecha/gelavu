const TZ = "Asia/Kolkata";
const ANCHOR_DATE = new Date("2026-03-01T09:00:00.000Z");

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const ymd = (d: Date | string) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });

export const dayDiff = (iso: string, now: Date = ANCHOR_DATE) =>
  Math.round((Date.parse(ymd(iso)) - Date.parse(ymd(now))) / 86_400_000);

export function dayLabel(iso: string, now: Date = ANCHOR_DATE) {
  const diff = dayDiff(iso, now);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: TZ });
}

export function formatDateRange(start: string, end?: string) {
  const s = new Date(start);
  const day = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", timeZone: TZ });
  const mon = (d: Date) => d.toLocaleDateString("en-IN", { month: "short", timeZone: TZ });
  if (!end || ymd(start) === ymd(end)) return `${day(s)} ${mon(s)}`;
  const e = new Date(end);
  return mon(s) === mon(e) ? `${day(s)}–${day(e)} ${mon(s)}` : `${day(s)} ${mon(s)} – ${day(e)} ${mon(e)}`;
}

export function isThisWeekend(iso: string, now: Date = ANCHOR_DATE) {
  const diff = dayDiff(iso, now);
  const weekday = new Date(iso).toLocaleDateString("en-US", { weekday: "short", timeZone: TZ });
  return diff >= 0 && diff <= 7 && (weekday === "Sat" || weekday === "Sun");
}

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function formatHour(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${hh < 12 || hh === 24 ? "AM" : "PM"}`;
}

