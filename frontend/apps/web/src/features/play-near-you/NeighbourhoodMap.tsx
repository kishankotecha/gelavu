"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Plus, Minus, RotateCcw, Compass } from "lucide-react";
import type { NearbyTournament } from "@/types/nearby";

// Real GPS coordinates for Bengaluru tournament venues
interface GeoArea {
  name: string;
  lat: number;
  lng: number;
}

const GEO_AREAS: Record<string, GeoArea> = {
  Indiranagar: {
    name: "Indiranagar",
    lat: 12.9784,
    lng: 77.6408,
  },
  Koramangala: {
    name: "Koramangala",
    lat: 12.9352,
    lng: 77.6245,
  },
  "HSR Layout": {
    name: "HSR Layout",
    lat: 12.9121,
    lng: 77.6446,
  },
  Sarjapur: {
    name: "Sarjapur",
    lat: 12.8988,
    lng: 77.6824,
  },
  Whitefield: {
    name: "Whitefield",
    lat: 12.9698,
    lng: 77.7499,
  },
};

const DEFAULT_CENTER = { lat: 12.942, lng: 77.672 };
const DEFAULT_ZOOM = 12;

// Standard Web Mercator projection
function projectMercator(lat: number, lng: number, zoom: number, centerLat: number, centerLng: number, w: number, h: number) {
  const scale = 256 * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * scale;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale;

  const centerX = ((centerLng + 180) / 360) * scale;
  const centerLatRad = (centerLat * Math.PI) / 180;
  const centerY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * scale;

  return {
    x: w / 2 + (x - centerX),
    y: h / 2 + (y - centerY),
  };
}

interface Props {
  tournaments: NearbyTournament[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function NeighbourhoodMap({ tournaments, selectedId, onSelect }: Props) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 520, h: 430 });

  // Dynamically track container size for responsive pin alignment
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setDimensions({ w: clientWidth, h: clientHeight });
        }
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Smooth mouse wheel zoom in and zoom out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelDelta = 0;
    let timer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelDelta += e.deltaY;

      if (!timer) {
        timer = setTimeout(() => {
          const stepThreshold = 45;
          if (Math.abs(wheelDelta) >= stepThreshold) {
            const steps = Math.sign(wheelDelta) * Math.min(Math.floor(Math.abs(wheelDelta) / stepThreshold), 2);
            if (steps < 0) {
              // Scroll UP -> Zoom IN
              setZoom((z) => Math.min(z + Math.abs(steps), 15));
            } else if (steps > 0) {
              // Scroll DOWN -> Zoom OUT
              setZoom((z) => Math.max(z - steps, 10));
            }
          }
          wheelDelta = 0;
          timer = null;
        }, 40);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Group tournaments by area
  const groups = useMemo(() => {
    const map = new Map<string, NearbyTournament[]>();
    tournaments.forEach((t) => map.set(t.area, [...(map.get(t.area) ?? []), t]));
    return [...map.entries()].filter(([area]) => GEO_AREAS[area]);
  }, [tournaments]);

  const selectedArea = tournaments.find((t) => t.id === selectedId)?.area;

  // Center smoothly on selected area
  const activeCenter = useMemo(() => {
    if (selectedArea && GEO_AREAS[selectedArea]) {
      const g = GEO_AREAS[selectedArea];
      return {
        lat: DEFAULT_CENTER.lat * 0.4 + g.lat * 0.6,
        lng: DEFAULT_CENTER.lng * 0.4 + g.lng * 0.6,
      };
    }
    return DEFAULT_CENTER;
  }, [selectedArea]);

  // Drag handlers for smooth map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Compute visible OpenStreetMap tiles at current zoom and viewport
  const tiles = useMemo(() => {
    const scale = Math.pow(2, zoom);
    const tileCenterX = ((activeCenter.lng + 180) / 360) * scale - panOffset.x / 256;
    const centerLatRad = (activeCenter.lat * Math.PI) / 180;
    const tileCenterY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * scale - panOffset.y / 256;

    const minX = Math.floor(tileCenterX - (dimensions.w / 2) / 256) - 1;
    const maxX = Math.ceil(tileCenterX + (dimensions.w / 2) / 256) + 1;
    const minY = Math.floor(tileCenterY - (dimensions.h / 2) / 256) - 1;
    const maxY = Math.ceil(tileCenterY + (dimensions.h / 2) / 256) + 1;

    const result = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        result.push({
          key: `${zoom}-${x}-${y}`,
          url: `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
          left: (dimensions.w / 2) + (x - tileCenterX) * 256,
          top: (dimensions.h / 2) + (y - tileCenterY) * 256,
        });
      }
    }
    return result;
  }, [zoom, activeCenter, panOffset, dimensions]);

  const handleReset = () => {
    setZoom(DEFAULT_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={() => setZoom((z) => Math.min(z + 1, 15))}
      className={`relative h-full min-h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121622] shadow-2xl select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* ============================================================ */}
      {/* REAL STREET MAP TILES (Dark Cartography Mode - No Watermark) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {tiles.map((tile) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={tile.key}
            src={tile.url}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            className="absolute pointer-events-none transition-opacity duration-300 filter invert-[100%] hue-rotate-180 brightness-[0.84] contrast-[1.15] saturate-[0.75]"
            style={{
              left: `${tile.left}px`,
              top: `${tile.top}px`,
              width: "256px",
              height: "256px",
            }}
          />
        ))}
        {/* Deep dark tint overlay matching stadium palette */}
        <div className="absolute inset-0 bg-[#080E1B]/30 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* REAL GPS ARENA TOURNAMENT PINS                              */}
      {/* ============================================================ */}
      {groups.map(([area, items]) => {
        const geo = GEO_AREAS[area];
        if (!geo) return null;

        const pt = projectMercator(geo.lat, geo.lng, zoom, activeCenter.lat, activeCenter.lng, dimensions.w, dimensions.h);
        const pinX = pt.x + panOffset.x;
        const pinY = pt.y + panOffset.y;
        const on = area === selectedArea;

        return (
          <button
            key={area}
            type="button"
            aria-pressed={on}
            aria-label={`${area}: ${items.length} ${items.length === 1 ? "tournament" : "tournaments"}`}
            onClick={(e) => {
              e.stopPropagation();
              const i = items.findIndex((t) => t.id === selectedId);
              onSelect(items[(i + 1) % items.length].id);
            }}
            style={{
              left: `${pinX}px`,
              top: `${pinY}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="group absolute flex flex-col items-center gap-1 focus-visible:outline-none z-20 cursor-pointer transition-transform duration-200"
          >
            <span className="relative grid h-10 w-10 place-items-center">
              {on && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#DE9D35]/80 motion-safe:animate-ping"
                />
              )}
              <span
                className={`relative grid h-10 w-10 place-items-center rounded-full text-xs font-black transition duration-200 shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-[#DE9D35] ${
                  on
                    ? "scale-115 bg-[#DE9D35] text-white ring-2 ring-[#DE9D35] shadow-[0_0_24px_rgba(255,87,34,0.6)]"
                    : "border-2 border-white/20 bg-[#121929] text-white hover:bg-[#1C263D] group-hover:-translate-y-0.5 group-hover:scale-105"
                }`}
              >
                {items.length}
              </span>
            </span>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-md whitespace-nowrap transition-colors ${
                on
                  ? "bg-[#DE9D35] text-white ring-1 ring-white/20"
                  : "bg-[#121622]/95 text-slate-200 border border-white/15 backdrop-blur-md"
              }`}
            >
              {area}
            </span>
          </button>
        );
      })}

      {/* ============================================================ */}
      {/* MAP CONTROLS & ATTRIBUTION                                   */}
      {/* ============================================================ */}
      {/* Top Left Status Badge */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2 rounded-full bg-[#121622]/90 px-3 py-1.5 border border-white/15 shadow-md backdrop-blur-md text-xs font-bold text-white">
        <span className="h-2 w-2 rounded-full bg-[#F3D15A] motion-safe:animate-pulse" />
        <span>Bengaluru Arenas</span>
      </div>

      {/* Top Right Zoom & Recenter Controls */}
      <div className="absolute right-3 top-3 z-30 flex flex-col items-center gap-1 rounded-xl bg-[#121622]/90 p-1 border border-white/15 shadow-md backdrop-blur-md">
        <button
          type="button"
          title="Zoom In (or scroll wheel up)"
          onClick={() => setZoom((z) => Math.min(z + 1, 15))}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <div className="w-4 h-px bg-white/15" />
        <button
          type="button"
          title="Zoom Out (or scroll wheel down)"
          onClick={() => setZoom((z) => Math.max(z - 1, 10))}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="w-4 h-px bg-white/15" />
        <button
          type="button"
          title="Recenter Map"
          onClick={handleReset}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Left Footnote */}
      <div className="absolute bottom-2.5 left-3.5 z-20 flex items-center gap-2 text-[10px] text-slate-400 bg-[#121622]/85 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
        <Compass className="w-3 h-3 text-[#F3D15A]" />
        <span>Scroll to Zoom · Drag to Pan · © OpenStreetMap</span>
      </div>
    </div>
  );
}
