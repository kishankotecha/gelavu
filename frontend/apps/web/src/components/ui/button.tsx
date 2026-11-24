import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      primary: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-sm",
      secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700",
      outline: "border border-gray-700 text-gray-200 hover:bg-gray-800/60 hover:text-white",
      ghost: "text-gray-300 hover:bg-gray-800/50 hover:text-white",
      danger: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700",
      gold: "bg-amber-500 text-gray-950 font-bold hover:bg-amber-400 active:bg-amber-600 shadow-sm",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
