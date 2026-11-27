"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "info";
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, "id">) => void;
  showToast: (
    title: string,
    variant?: "default" | "success" | "error" | "info",
    description?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

// Event-based global trigger for standalone calls
type ToastListener = (msg: Omit<ToastMessage, "id">) => void;
const listeners = new Set<ToastListener>();

export const toast = {
  success: (title: string, description?: string) => {
    listeners.forEach((l) => l({ title, description, variant: "success" }));
  },
  error: (title: string, description?: string) => {
    listeners.forEach((l) => l({ title, description, variant: "error" }));
  },
  info: (title: string, description?: string) => {
    listeners.forEach((l) => l({ title, description, variant: "info" }));
  },
  show: (title: string, description?: string) => {
    listeners.forEach((l) => l({ title, description, variant: "default" }));
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...msg, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  React.useEffect(() => {
    listeners.add(addToast);
    return () => {
      listeners.delete(addToast);
    };
  }, [addToast]);

  const showToast = React.useCallback(
    (
      title: string,
      variant: "default" | "success" | "error" | "info" = "default",
      description?: string,
      actionLabel?: string,
      onAction?: () => void
    ) => {
      addToast({ title, variant, description, actionLabel, onAction });
    },
    [addToast]
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast, showToast }}>
      {children}

      {/* Floating Hot-Toaster Container (Top-Right / Mobile Responsive Floating Pill) */}
      <div
        className="fixed top-4 sm:top-5 right-4 sm:right-5 left-4 sm:left-auto z-[9999] flex flex-col space-y-2.5 sm:max-w-sm pointer-events-none select-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto bg-navy/95 text-white border border-slate-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md rounded-2xl p-3.5 flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-top-3 fade-in zoom-in-95"
          >
            {/* Visual Icon Badge */}
            <div className="shrink-0 mt-0.5">
              {t.variant === "success" && (
                <div className="w-7 h-7 rounded-full bg-hotpink/10 border border-hotpink/30 text-hotpink flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
              {t.variant === "error" && (
                <div className="w-7 h-7 rounded-full bg-rose-500/15 border border-hotpink/30 text-hotpink flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
              {t.variant === "info" && (
                <div className="w-7 h-7 rounded-full bg-hotpink/100/15 border border-hotpink/30 text-hotpink flex items-center justify-center">
                  <Info className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
              {(!t.variant || t.variant === "default") && (
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center">
                  <Info className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
            </div>

            {/* Content Text */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-bold text-white tracking-tight leading-snug">
                {t.title}
              </p>
              {t.description && (
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  {t.description}
                </p>
              )}
              {t.actionLabel && t.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    t.onAction?.();
                    removeToast(t.id);
                  }}
                  className="mt-2 text-[10px] font-black uppercase tracking-wider text-hotpink hover:text-hotpink bg-hotpink/10 border border-hotpink/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  {t.actionLabel}
                </button>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext);
  if (!context) {
    return {
      toast: (msg: Omit<ToastMessage, "id">) => {
        if (typeof window !== "undefined") {
          listeners.forEach((l) => l(msg));
        }
      },
      showToast: (
        title: string,
        variant: "default" | "success" | "error" | "info" = "default",
        description?: string,
        actionLabel?: string,
        onAction?: () => void
      ) => {
        if (typeof window !== "undefined") {
          listeners.forEach((l) => l({ title, variant, description, actionLabel, onAction }));
        }
      },
    };
  }
  return context;
}
