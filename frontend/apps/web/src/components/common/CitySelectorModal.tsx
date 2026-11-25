"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Search,
  Crosshair,
  Check,
  X,
  Loader2,
  Sparkles,
  Building2,
} from "lucide-react";
import { useCity } from "@/hooks/useCity";
import { useToast } from "@/components/ui/toast";

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CitySelectorModal({ isOpen, onClose }: CitySelectorModalProps) {
  const {
    city: activeCity,
    meta,
    isDetecting,
    detectionError,
    detectLocation,
    selectCity,
    popularCities,
    allCities,
  } = useCity();

  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Filtered cities based on search
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return allCities;
    const q = searchQuery.toLowerCase().trim();
    return allCities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [allCities, searchQuery]);

  if (!isOpen) return null;

  const handleSelect = (cityName: string) => {
    selectCity(cityName);
    showToast(`Location switched to ${cityName}`, "success");
    onClose();
  };

  const handleDetectClick = async () => {
    const detected = await detectLocation();
    if (detected) {
      showToast(`Detected location: ${detected}`, "success");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 id="city-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
              Select Your City
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Find tournaments and live matches happening in your area
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="p-2.5 -mr-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Close modal"
            title="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Search Bar & Auto-Detect Banner */}
        <div className="p-6 pb-2 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search city, e.g. Bengaluru, Hyderabad, Mumbai, Mysuru..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-9 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Auto-detect button */}
          <button
            type="button"
            onClick={handleDetectClick}
            disabled={isDetecting}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 transition-all cursor-pointer group disabled:opacity-60"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                {isDetecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Crosshair className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block text-emerald-950">
                  {isDetecting ? "Detecting your exact location..." : "Use current location"}
                </span>
                <span className="text-[11px] text-emerald-700/80 block">
                  {meta?.method === "gps"
                    ? `Currently auto-detected as ${meta.city}`
                    : "Using browser GPS & network"}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full group-hover:bg-emerald-200 transition-colors">
              Auto-detect
            </span>
          </button>

          {detectionError && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {detectionError}
            </p>
          )}
        </div>

        {/* Scrollable Content: Popular Cities & All Cities */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {!searchQuery && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                  Popular Sports Hubs
                </span>
                <span className="text-[11px] text-gray-400">12 major hubs</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {popularCities.map((c) => {
                  const isSelected = activeCity.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelect(c.name)}
                      className={`flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-black text-white shadow-sm font-bold ring-2 ring-black"
                          : "bg-gray-50/80 hover:bg-gray-100/80 text-gray-800 border border-gray-100"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-bold block truncate">{c.name}</span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected ? "text-gray-300" : "text-gray-400"
                          }`}
                        >
                          {c.state}
                        </span>
                      </div>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      ) : (
                        <MapPin className="w-3 h-3 text-gray-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Cities / Search Results */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              {searchQuery ? `Search Results (${filteredCities.length})` : "All Other Cities & Towns"}
            </span>

            {filteredCities.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-semibold text-gray-600">
                  No registered tournament city matches &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  You can still host a tournament in your town!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredCities.map((c) => {
                  const isSelected = activeCity.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelect(c.name)}
                      className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin
                          className={`w-3.5 h-3.5 ${
                            isSelected ? "text-emerald-600" : "text-gray-400 group-hover:text-black"
                          }`}
                        />
                        <div>
                          <span
                            className={`text-xs block ${
                              isSelected ? "font-black text-black" : "font-semibold text-gray-800"
                            }`}
                          >
                            {c.name}
                          </span>
                          <span className="text-[10px] text-gray-400 block">{c.state}</span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Tournaments, courts and live draws adapt to your chosen city</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="text-xs font-bold text-gray-700 hover:text-black px-3 py-1.5 rounded-lg hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
