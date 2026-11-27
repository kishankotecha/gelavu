import React from "react";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon: Icon = Trophy,
  className,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-white/10 bg-gray-900/30",
        className
      )}
    >
      <div className="rounded-2xl bg-navy/60 p-4 text-hotpink mb-4 border border-white/10/50">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-white/70 max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
