"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Gelavu App Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-hotpink/10 p-4 text-rose-500 mb-4 border border-hotpink/30">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-black text-white">Something went wrong</h2>
      <p className="mt-2 text-sm text-white/70 max-w-md">
        An error occurred while loading this court view or tournament data.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} variant="primary">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
