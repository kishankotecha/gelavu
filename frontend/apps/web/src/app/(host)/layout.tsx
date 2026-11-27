import React from "react";
import { HostSidebar } from "@/components/layout/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F4F6F8] text-navy font-sans antialiased selection:bg-hotpink/40">
      <HostSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
