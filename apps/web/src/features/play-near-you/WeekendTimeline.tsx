"use client";

import React from "react";
import type { NearbyTournament, WeekendInfo } from "@/types/nearby";
import { formatHour } from "@/utils/format";
import { Sparkles, Calendar } from "lucide-react";

const START = 6;
const END = 24;
const SPAN = END - START;
const TICKS = [6, 9, 12, 15, 18, 21];
const LANE_H = 48;
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
      className="rounded-3xl border border-white/10 bg-[#0E1524] p-5 sm:p-7 shadow-2xl text-white transition-all duration-200 hover:border-white/20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h3 id="plan-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>Weekend Match Schedule Matrix</span>
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Timeline spans 6:00 AM to Midnight. Click any match block to view venue location and match ticket above.
          </p>
        </div>
        <span className="self-start sm:self-center rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-300">
          {weekend.rangeLabel}
        </span>
      </div>

      {/* Timeline Matrix */}
      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Time scale ruler */}
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-4">
            <span />
            <div className="relative h-6" aria-hidden="true">
              {TICKS.map((h) => (
                <span
                  key={h}
                  className="absolute -translate-x-1/2 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider"
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
                className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-4 border-t border-white/10 py-3.5 items-start"
              >
                <div className="space-y-0.5 pt-1">
                  <p className="text-sm font-extrabold text-white">{day.name}</p>
                  <p className="text-[11px] font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10 inline-block">
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
                          height: LANE_H - 6,
                        }}
                        className={`absolute flex flex-col justify-center overflow-hidden rounded-xl px-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] cursor-pointer shadow-md ${
                          on
                            ? "bg-[#FF5722] text-white ring-2 ring-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.4)] scale-[1.01] z-10"
                            : "border border-white/15 bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate text-xs font-black flex items-center gap-1.5">
                          {on && <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />}
                          {t.series}
                        </span>
                        <span className={`truncate text-[10px] ${on ? "text-white/80 font-bold" : "text-slate-400"}`}>
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
          className="mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3.5 sm:p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-300 shadow-md"
          aria-live="polite"
        >
          <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </span>
          <div className="space-y-0.5">
            <strong className="block text-xs uppercase tracking-wider text-amber-400 font-black">
              Weekend Match Tip
            </strong>
            <p className="text-slate-300 leading-relaxed">{tip}</p>
          </div>
        </div>
      )}
    </section>
  );
}
