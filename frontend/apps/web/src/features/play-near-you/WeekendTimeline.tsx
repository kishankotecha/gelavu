"use client";

import React from "react";
import type { NearbyTournament, WeekendInfo } from "@/types/nearby";
import { formatHour } from "@/utils/format";
import { Sparkles, Calendar } from "lucide-react";

const START = 6;
const END = 24;
const SPAN = END - START;
const TICKS = [6, 9, 12, 15, 18, 21];
const LANE_H = 38;
const pct = (h: number) => ((h - START) / SPAN) * 100;
const tick = (h: number) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;

function assignLanes(items: NearbyTournament[]) {
  const ends: number[] = [];
  const lane = new Map<string, number>();
  [...items]
    .sort((a, b) => a.startHour - b.startHour)
    .forEach((t) => {
      let i = ends.findIndex((e) => e <= t.startHour);
      if (i === -1) {
        i = ends.length;
        ends.push(0);
      }
      ends[i] = t.endHour;
      lane.set(t.id, i);
    });
  return { lane, count: Math.max(ends.length, 1) };
}

function hint(sel: NearbyTournament | undefined, all: NearbyTournament[]) {
  if (!sel) return "";
  const same = all.filter((t) => t.id !== sel.id && t.day === sel.day);
  const clash = same.find((t) => t.startHour < sel.endHour && t.endHour > sel.startHour);
  if (clash) return `This overlaps with ${clash.series}, so you would have to pick one.`;
  const after = same.find((t) => t.startHour >= sel.endHour);
  if (after) return `Finishes at ${formatHour(sel.endHour)}. You could also play ${after.series} at ${formatHour(after.startHour)}.`;
  const other = all.find((t) => t.day !== sel.day);
  return other ? `Also on ${other.day === "Sat" ? "Saturday" : "Sunday"}: ${other.series} in ${other.area}.` : "";
}

interface Props {
  tournaments: NearbyTournament[];
  selectedId: string;
  onSelect: (id: string) => void;
  weekend: WeekendInfo;
}

export function WeekendTimeline({ tournaments, selectedId, onSelect, weekend }: Props) {
  const days = [
    { key: "Sat" as const, name: "Saturday", label: weekend.satLabel },
    { key: "Sun" as const, name: "Sunday", label: weekend.sunLabel },
  ];
  const selected = tournaments.find((t) => t.id === selectedId);
  const tip = hint(selected, tournaments);

  return (
    <section
      aria-labelledby="plan-title"
      className="rounded-3xl border border-white/15 bg-[#0F1722] p-4 sm:p-5 shadow-xl text-white transition-all duration-200 hover:border-white/20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <h3 id="plan-title" className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-coral" />
            <span>Weekend Match Schedule Matrix</span>
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Timeline spans 6:00 AM to Midnight. Click any match block to view venue location above.
          </p>
        </div>
        <span className="self-start sm:self-center rounded-full bg-coral/15 border border-coral/30 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-coral">
          {weekend.rangeLabel}
        </span>
      </div>

      {/* Timeline Matrix */}
      <div className="mt-3.5 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Time scale ruler */}
          <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] gap-x-3">
            <span />
            <div className="relative h-5" aria-hidden="true">
              {TICKS.map((h) => (
                <span
                  key={h}
                  className="absolute -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                  style={{ left: `${pct(h)}%` }}
                >
                  {tick(h)}
                </span>
              ))}
            </div>
          </div>

          {/* Day Rows */}
          {days.map((day) => {
            const items = tournaments.filter((t) => t.day === day.key);
            const { lane, count } = assignLanes(items);
            return (
              <div
                key={day.key}
                className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] gap-x-3 border-t border-white/10 py-2.5 items-start"
              >
                <div className="space-y-0.5 pt-0.5">
                  <p className="text-xs sm:text-sm font-extrabold text-white">{day.name}</p>
                  <p className="text-[10px] font-semibold text-slate-300 bg-white/5 px-2 py-0.2 rounded border border-white/10 inline-block">
                    {day.label}
                  </p>
                </div>

                <div className="relative" style={{ height: count * LANE_H }}>
                  {/* Vertical hour guidelines */}
                  {TICKS.map((h) => (
                    <span
                      key={h}
                      aria-hidden="true"
                      className="absolute inset-y-0 w-px bg-white/10"
                      style={{ left: `${pct(h)}%` }}
                    />
                  ))}

                  {items.length === 0 && (
                    <p className="absolute inset-0 grid place-items-center text-xs text-slate-400">
                      No matches scheduled
                    </p>
                  )}

                  {items.map((t) => {
                    const on = t.id === selectedId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onSelect(t.id)}
                        style={{
                          left: `${pct(t.startHour)}%`,
                          width: `${((t.endHour - t.startHour) / SPAN) * 100}%`,
                          top: (lane.get(t.id) ?? 0) * LANE_H,
                          height: LANE_H - 4,
                        }}
                        className={`absolute flex flex-col justify-center overflow-hidden rounded-lg px-2.5 text-left transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral cursor-pointer shadow-sm ${
                          on
                            ? "bg-coral text-navy ring-1 ring-coral shadow-[0_0_15px_rgba(255,104,91,0.35)] scale-[1.01] z-10 font-bold"
                            : "border border-white/15 bg-white/5 text-slate-200 hover:border-coral/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate text-[11px] font-black flex items-center gap-1 leading-tight">
                          {on && <span className="h-1.5 w-1.5 rounded-full bg-navy shrink-0" />}
                          {t.series}
                        </span>
                        <span className={`truncate text-[9px] leading-tight ${on ? "text-navy/80 font-bold" : "text-slate-400"}`}>
                          {t.area} · {formatHour(t.startHour)} – {formatHour(t.endHour)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smart Concierge Insight */}
      {tip && (
        <div
          className="mt-3 rounded-xl bg-coral/10 border border-coral/30 p-2.5 sm:p-3 flex items-start gap-2.5 text-xs text-slate-300 shadow-sm"
          aria-live="polite"
        >
          <span className="p-1 rounded-lg bg-coral/20 text-coral shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div className="space-y-0.5">
            <strong className="block text-[10px] uppercase tracking-wider text-coral font-black">
              Weekend Match Tip
            </strong>
            <p className="text-slate-300 leading-snug">{tip}</p>
          </div>
        </div>
      )}
    </section>
  );
}
