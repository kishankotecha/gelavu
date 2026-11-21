import React from "react";
import { HostSidebar } from "@/components/layout/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-paper text-ink font-sans">
      <HostSidebar />
      <div className="flex-1 overflow-x-auto min-w-0">
        {children}
      </div>
    </div>
  );
}
