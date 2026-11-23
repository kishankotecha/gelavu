import React from "react";
import { HostSidebar } from "@/components/layout/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F5F6F0] text-[#1E293B] font-sans">
      <HostSidebar />
      <div className="flex-1 overflow-x-auto min-w-0">
        {children}
      </div>
    </div>
  );
}
