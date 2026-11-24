"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "info";
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, "id">) => void;
  showToast: (title: string, variant?: "default" | "success" | "error" | "info", description?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = (msg: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...msg, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const showToast = (title: string, variant: "default" | "success" | "error" | "info" = "default", description?: string) => {
    toast({ title, variant, description });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border shadow-lg bg-gray-900 backdrop-blur-md transition-all",
              t.variant === "success" && "border-emerald-500/40 text-emerald-300",
              t.variant === "error" && "border-rose-500/40 text-rose-300",
              (!t.variant || t.variant === "default") && "border-gray-700 text-gray-200"
            )}
          >
            {t.variant === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />}
            {t.variant === "error" && <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />}
            {(!t.variant || t.variant === "default") && <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />}
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>}
            </div>
            <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
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
        if (typeof window !== "undefined") console.log(`${msg.title}: ${msg.description || ""}`);
      },
      showToast: (title: string, _variant?: "default" | "success" | "error" | "info", description?: string) => {
        if (typeof window !== "undefined") console.log(`${title}: ${description || ""}`);
      },
    };
  }
  return context;
}
