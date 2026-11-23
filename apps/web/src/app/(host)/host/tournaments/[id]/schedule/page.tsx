"use client";

import React, { useState } from "react";
import {
  Printer,
  Share2,
  RefreshCw,
  Ban,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";

export default function HostCourtQRAccessPage() {
  const { showToast } = useToast();
  const [activeCourt, setActiveCourt] = useState<number>(2);

  const courts = [
    {
      id: 1,
      name: "Court 1",
      status: "Scorer active",
      statusColor: "bg-[#E8EFEA] text-[#1D4A38] border-[#CAD7CE]",
      matches: "8 matches today",
      expires: "Expires 16 Mar, 10 PM",
      code: "CRT-101",
    },
    {
      id: 2,
      name: "Court 2",
      status: "Match live",
      statusColor: "bg-[#E8EFEA] text-[#1D4A38] border-[#CAD7CE]",
      matches: "9 matches today",
      expires: "Expires 16 Mar, 10 PM",
      code: "CRT-204",
    },
    {
      id: 3,
      name: "Court 3",
      status: "Not scanned yet",
      statusColor: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
      matches: "7 matches today",
      expires: "Expires 16 Mar, 10 PM",
      code: "CRT-309",
    },
  ];

  const handlePrintAll = () => {
    showToast("Generating printable court QR sheet PDF...", "info");
  };

  const handleAction = (action: string, courtName: string) => {
    if (action === "Print") {
      showToast(`Printing QR sheet for ${courtName}...`, "info");
    } else if (action === "Share") {
      navigator.clipboard?.writeText(
        `${window.location.origin}/umpire?court=${courtName.replace(" ", "")}`
      );
      showToast(`Umpire sign-in link copied for ${courtName}!`, "success");
    } else if (action === "Renew") {
      showToast(`Regenerated new security token for ${courtName}`, "success");
    } else if (action === "Revoke") {
      showToast(`Access revoked for ${courtName}`, "info");
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-[#1E293B]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/host/tournaments/tour-1"
            className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#1D4A38] transition-colors mb-2 cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" /> Back to Tournament Overview
          </Link>
          <span className="text-xs text-[#64748B] font-semibold block">Bengaluru Open 2026</span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight mt-0.5">
            Court Schedules & Umpire Access
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            One QR per court. Umpires scan to open scorekeeper terminal instantly with zero registration barrier.
          </p>
        </div>

        <button
          onClick={handlePrintAll}
          className="inline-flex items-center gap-2 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print all QR sheets</span>
        </button>
      </div>

      {/* 3 Step Guide Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 flex items-start gap-4 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#1D4A38] font-black flex items-center justify-center text-sm shrink-0 border border-[#CAD7CE]">
            1
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E293B]">Host shares court QR</h3>
            <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
              Print it at the court or send on WhatsApp.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 flex items-start gap-4 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#1D4A38] font-black flex items-center justify-center text-sm shrink-0 border border-[#CAD7CE]">
            2
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E293B]">Umpire scans</h3>
            <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
              Instantly signed in as scorekeeper for that court.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 flex items-start gap-4 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#1D4A38] font-black flex items-center justify-center text-sm shrink-0 border border-[#CAD7CE]">
            3
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E293B]">Scores live</h3>
            <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
              Only that court&apos;s matches. No payments or player data.
            </p>
          </div>
        </div>
      </div>

      {/* Courts QR Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courts.map((court) => {
          const isSelected = activeCourt === court.id;

          return (
            <div
              key={court.id}
              onClick={() => setActiveCourt(court.id)}
              className={`rounded-3xl bg-white p-6 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-2 border-[#1D4A38] shadow-md ring-1 ring-[#1D4A38]/10"
                  : "border border-[#E2E6DD] shadow-xs hover:border-[#CAD7CE]"
              }`}
            >
              <div>
                {/* Court Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-black text-[#1E293B]">{court.name}</h3>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${court.statusColor}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {court.status}
                  </span>
                </div>

                {/* QR Code SVG Graphic */}
                <div className="flex justify-center my-4">
                  <div className="p-3 bg-white border border-[#E2E6DD] rounded-2xl shadow-xs">
                    <svg
                      viewBox="0 0 140 140"
                      className="w-36 h-36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Outer Position Squares */}
                      <rect x="10" y="10" width="36" height="36" rx="4" fill="#1D4A38" />
                      <rect x="16" y="16" width="24" height="24" rx="2" fill="white" />
                      <rect x="22" y="22" width="12" height="12" rx="1" fill="#1D4A38" />

                      <rect x="94" y="10" width="36" height="36" rx="4" fill="#1D4A38" />
                      <rect x="100" y="16" width="24" height="24" rx="2" fill="white" />
                      <rect x="106" y="22" width="12" height="12" rx="1" fill="#1D4A38" />

                      <rect x="10" y="94" width="36" height="36" rx="4" fill="#1D4A38" />
                      <rect x="16" y="100" width="24" height="24" rx="2" fill="white" />
                      <rect x="22" y="106" width="12" height="12" rx="1" fill="#1D4A38" />

                      {/* QR Data Grid Matrix Patterns */}
                      <rect x="54" y="12" width="8" height="16" fill="#1D4A38" />
                      <rect x="68" y="16" width="16" height="8" fill="#1D4A38" />
                      <rect x="58" y="34" width="12" height="12" fill="#1D4A38" />
                      <rect x="76" y="32" width="8" height="14" fill="#1D4A38" />

                      <rect x="12" y="56" width="16" height="8" fill="#1D4A38" />
                      <rect x="34" y="54" width="8" height="18" fill="#1D4A38" />
                      <rect x="50" y="54" width="18" height="18" fill="#1D4A38" />
                      <rect x="76" y="52" width="14" height="14" fill="#1D4A38" />
                      <rect x="98" y="56" width="18" height="8" fill="#1D4A38" />
                      <rect x="120" y="52" width="10" height="20" fill="#1D4A38" />

                      <rect x="14" y="78" width="14" height="8" fill="#1D4A38" />
                      <rect x="36" y="78" width="8" height="12" fill="#1D4A38" />
                      <rect x="52" y="78" width="22" height="8" fill="#1D4A38" />
                      <rect x="80" y="74" width="12" height="14" fill="#1D4A38" />
                      <rect x="102" y="72" width="14" height="14" fill="#1D4A38" />
                      <rect x="120" y="80" width="10" height="12" fill="#1D4A38" />

                      <rect x="54" y="94" width="14" height="14" fill="#1D4A38" />
                      <rect x="74" y="98" width="14" height="10" fill="#1D4A38" />
                      <rect x="96" y="94" width="12" height="24" fill="#1D4A38" />
                      <rect x="116" y="100" width="14" height="10" fill="#1D4A38" />

                      <rect x="54" y="116" width="20" height="14" fill="#1D4A38" />
                      <rect x="80" y="118" width="10" height="12" fill="#1D4A38" />
                      <rect x="114" y="118" width="16" height="12" fill="#1D4A38" />
                    </svg>
                  </div>
                </div>

                {/* Subtitle Details */}
                <p className="text-center text-[11px] text-[#64748B] font-medium">
                  {court.matches} • {court.expires}
                </p>
              </div>

              {/* 4 Action Buttons Row */}
              <div className="grid grid-cols-4 gap-1.5 mt-5 pt-4 border-t border-[#E2E6DD]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("Print", court.name);
                  }}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] text-[#1E293B] transition-colors text-[10px] font-bold border border-[#E2E6DD] cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 mb-0.5 text-[#1D4A38]" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("Share", court.name);
                  }}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] text-[#1E293B] transition-colors text-[10px] font-bold border border-[#E2E6DD] cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 mb-0.5 text-[#1D4A38]" />
                  <span>Share</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("Renew", court.name);
                  }}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] text-[#1E293B] transition-colors text-[10px] font-bold border border-[#E2E6DD] cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 mb-0.5 text-[#1D4A38]" />
                  <span>Renew</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("Revoke", court.name);
                  }}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors text-[10px] font-bold border border-rose-200 cursor-pointer"
                >
                  <Ban className="w-3.5 h-3.5 mb-0.5" />
                  <span>Revoke</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Matrix British Racing Green Heritage Card */}
      <div className="rounded-3xl bg-[#1D4A38] p-7 text-white shadow-sm border border-[#16392B]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2D5A46]">
          {/* Left Column: What a scanned umpire can do */}
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E8EFEA]/80 block">
              WHAT A SCANNED UMPIRE CAN DO
            </span>
            <ul className="space-y-2.5 text-xs text-white font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#A7F3D0] shrink-0" />
                <span>See and score matches on their designated court</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#A7F3D0] shrink-0" />
                <span>Enter points, undo rallies, record walkovers, confirm results</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#A7F3D0] shrink-0" />
                <span>Work offline on court, auto-sync when Wi-Fi connects</span>
              </li>
            </ul>
          </div>

          {/* Right Column: What they cannot see */}
          <div className="pt-6 md:pt-0 md:pl-8 space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E8EFEA]/80 block">
              WHAT THEY CANNOT SEE OR TAMPER
            </span>
            <ul className="space-y-2.5 text-xs text-white font-medium">
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-[#FECDD3] shrink-0" />
                <span>Payments, bank payouts, or tournament finance records</span>
              </li>
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-[#FECDD3] shrink-0" />
                <span>Player private phone numbers and personal identity data</span>
              </li>
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-[#FECDD3] shrink-0" />
                <span>Other courts&apos; match brackets or host configuration settings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
