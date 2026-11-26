"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (DropdownOption | string)[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  className = "",
  buttonClassName = "",
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to DropdownOption[]
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close on outside click
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full h-10 px-3.5 rounded-xl border bg-white text-xs font-semibold text-slate-900 flex items-center justify-between cursor-pointer transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen
            ? "border-amber-500 ring-2 ring-amber-500/20 shadow-xs"
            : "border-slate-200 hover:border-slate-300"
        } ${buttonClassName}`}
      >
        <span className={`truncate text-left ${selectedOption ? "text-slate-900" : "text-slate-400 font-normal"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-500" : "text-slate-400"
          }`}
        />
      </button>

      {/* Floating Popover Menu (NO OS Native select box) */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0B101B]/98 text-white border border-slate-700/80 rounded-2xl p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-0.5 max-h-60 overflow-y-auto no-scrollbar"
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-between select-none ${
                  isSelected
                    ? "bg-amber-400/15 text-amber-400 border border-amber-400/25"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="truncate">{opt.label}</span>
                  {opt.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-normal">
                      {opt.badge}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2 stroke-[2.5]" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
