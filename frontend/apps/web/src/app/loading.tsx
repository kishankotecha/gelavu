import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-hotpink/10" />
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
      <p className="mt-4 text-sm font-medium text-white/70">Loading Gelavu Arena...</p>
    </div>
  );
}
