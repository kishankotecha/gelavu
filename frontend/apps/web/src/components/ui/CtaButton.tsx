import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-hotpink text-white font-bold transition-all hover:bg-hotpink/90 active:bg-hotpink/80 shadow-md shadow-hotpink/25 disabled:opacity-50 disabled:pointer-events-none";

type CtaButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

type CtaLinkProps = React.ComponentProps<typeof Link> & {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export function CtaButton({ className, size = "md", ...props }: CtaButtonProps) {
  return (
    <button type="button" className={cn(ctaClass, sizes[size], className)} {...props} />
  );
}

export function CtaLink({ className, size = "md", ...props }: CtaLinkProps) {
  return <Link className={cn(ctaClass, sizes[size], className)} {...props} />;
}