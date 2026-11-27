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
      primary: "bg-hotpink text-white hover:bg-hotpink/90 active:bg-hotpink/80 shadow-sm",
      secondary: "bg-navy text-white hover:bg-navy/90 border border-navy",
      outline: "border border-navy text-navy hover:bg-navy/10 hover:text-white",
      ghost: "text-navy hover:bg-navy/10 hover:text-white",
      danger: "bg-hotpink text-white hover:bg-rose-500 active:bg-rose-700",
      gold: "bg-hotpink text-white font-bold hover:bg-hotpink/80 active:bg-hotpink/70 shadow-sm",
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
