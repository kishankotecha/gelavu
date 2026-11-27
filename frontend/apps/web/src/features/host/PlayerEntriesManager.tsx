"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  UserPlus,
  FileSpreadsheet,
  Camera,
  Calendar,
  Search,
  SlidersHorizontal,
  Check,
  CheckCircle2,
  Clock,
  User,
  Zap,
  Trash2,
  Upload,
  Download,
  Copy,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { getTournamentEntries, saveTournamentEntries } from "@/lib/tournamentStore";
import { PlayoSkillBadge } from "@/components/common/PlayoSkillBadge";
import {
  DashboardEyebrow,
  DashboardTitle,
  DashboardLead,
  DashboardSectionTitle,
} from "@/components/layout/DashboardTypography";

export type PlayoSkillLevel = "Beginner" | "Amateur" | "Intermediate" | "Advanced" | "Professional";

export interface TournamentEntry {
  id: string;
  name: string;
  phone: string;
  category: string;
  partnerName?: string;
  skillLevel?: PlayoSkillLevel;
  badges?: string[];
  status: "CONFIRMED" | "PENDING_PAYMENT" | "WAITLIST";
  fee: string;
  method: "Online UPI" | "Razorpay" | "Cash (Manual)" | "Excel Bulk Import" | "AI OCR Scan";
  sourceBadge: "PUBLIC" | "HOST_MANUAL" | "EXCEL_IMPORT" | "AI_OCR";
}

interface Props {
  tournamentId: string;
  tournamentTitle?: string;
}

export function PlayerEntriesManager({
  tournamentId,
  tournamentTitle = "Bengaluru Morning Doubles Clash",
}: Props) {
  const { showToast } = useToast();

  // Entrants list from tournament store
  const [entries, setEntries] = useState<TournamentEntry[]>(() =>
    getTournamentEntries(tournamentId)
  );

  useEffect(() => {
    const handleStorageSync = () => {
      setEntries(getTournamentEntries(tournamentId));
    };
    window.addEventListener("gelavu_entries_updated", handleStorageSync);
    return () => window.removeEventListener("gelavu_entries_updated", handleStorageSync);
  }, [tournamentId]);

  const updateEntries = (updater: (prev: TournamentEntry[]) => TournamentEntry[]) => {
    setEntries((prev) => {
      const next = updater(prev);
      saveTournamentEntries(tournamentId, next);
      return next;
    });
  };

  // Search & Filtering State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"ALL" | "DOUBLES" | "SINGLES">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isAiOcrModalOpen, setIsAiOcrModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  // Manual Form State
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualCategory, setManualCategory] = useState("Men's Doubles");
  const [manualPartner, setManualPartner] = useState("");
  const [manualSkillLevel, setManualSkillLevel] = useState<PlayoSkillLevel>("Intermediate");

  // Excel Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedExcelRows, setParsedExcelRows] = useState<Array<{
    name: string;
    phone: string;
    category: string;
    partnerName: string;
    partnerPhone?: string;
    skillLevel: PlayoSkillLevel;
    paymentStatus?: string;
  }>>([]);
  const [excelFileName, setExcelFileName] = useState("");

  // AI OCR State
  const [, setOcrImagePreview] = useState<string | null>(null);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanStep, setOcrScanStep] = useState("");
  const [ocrResults, setOcrResults] = useState<Array<{
    id: string;
    name: string;
    phone: string;
    category: string;
    partnerName: string;
    paymentStatus: string;
    confidence: number;
  }>>([]);
  const [ocrRawText, setOcrRawText] = useState("");
  const [showRawOcrText, setShowRawOcrText] = useState(false);

  // Filtered entries
  const filteredEntries = entries.filter((e) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(term) ||
      (e.partnerName && e.partnerName.toLowerCase().includes(term)) ||
      e.phone.includes(term);

    const matchesCategory =
      activeCategoryTab === "ALL"
        ? true
        : activeCategoryTab === "DOUBLES"
        ? e.category.toLowerCase().includes("doubles")
        : e.category.toLowerCase().includes("singles");

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage) || 1;
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary Metrics
  const totalEntries = entries.length;
  const totalPublic = entries.filter((e) => e.sourceBadge === "PUBLIC").length;
  const totalHostImported = entries.filter((e) => e.sourceBadge !== "PUBLIC").length;
  const totalCollections = totalEntries * 1200;

  // Reset to original seeded entries
  const handleResetToDefaultRoster = () => {
    setIsResetConfirmOpen(true);
  };

  const handleConfirmResetRoster = () => {
    localStorage.removeItem(`gelavu_tournament_entries_v4_${tournamentId}`);
    const fresh = getTournamentEntries(tournamentId);
    setEntries(fresh);
    setIsResetConfirmOpen(false);
    showToast("Reset roster to original 32 entries.", "info", "Tournament entries restored to seeded defaults");
  };

  // Manual Add Form Submission
  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const newEntry: TournamentEntry = {
      id: `e-manual-${Date.now()}`,
      name: manualName.trim(),
      phone: manualPhone.trim() || "+91 98000 00000",
      category: manualCategory,
      partnerName: manualPartner.trim() || undefined,
      skillLevel: manualSkillLevel,
      badges: ["Direct Host Pass"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    };

    updateEntries((prev) => [newEntry, ...prev]);
    setManualName("");
    setManualPhone("");
    setManualPartner("");
    setManualSkillLevel("Intermediate");
    setIsManualModalOpen(false);
    showToast(`Added ${newEntry.name} to tournament roster!`, "success");
  };

  // Handle delete single entrant
  const handleDeleteEntry = (id: string) => {
    updateEntries((prev) => prev.filter((e) => e.id !== id));
    showToast("Entrant removed from roster.", "info");
  };

  // Download Genuine Excel (.xlsx) Template
  const handleDownloadXlsxTemplate = async () => {
    try {
      const XLSX = await import("xlsx");
      const wsData = [
        ["Player_Name", "Phone", "Category", "Partner_Name", "Payment_Status"],
        ["Aditya Joshi", "+91 98765 43210", "Men's Doubles", "Tarun Verma", "PAID"],
        ["Manish Rao", "+91 98123 45678", "Men's Doubles", "Gaurav Sen", "PAID"],
        ["Sanjay Hegde", "+91 98450 12345", "Random Wheel Doubles", "", "CASH"],
        ["Praveen Kumar", "+91 98334 45566", "Men's Singles", "", "PAID"],
        ["Sneha Kulkarni", "+91 97400 11223", "Women's Singles", "", "PAID"],
        ["Kiran Shah", "+91 99000 88776", "Mixed Doubles", "Pooja Hegde", "PENDING"],
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!cols"] = [{ wch: 20 }, { wch: 18 }, { wch: 22 }, { wch: 20 }, { wch: 16 }];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Entries");
      XLSX.writeFile(wb, "gelavu_tournament_entries_template.xlsx");
      showToast("Downloaded .XLSX Excel template!", "success");
    } catch {
      handleDownloadTemplate();
    }
  };

  // Standard CSV Downloader
  const handleDownloadTemplate = () => {
    const csvContent =
      "Player_Name,Phone,Category,Partner_Name,Payment_Status\n" +
      "Aditya Joshi,+91 98765 43210,Men's Doubles,Tarun Verma,PAID\n" +
      "Manish Rao,+91 98123 45678,Men's Doubles,Gaurav Sen,PAID\n" +
      "Sanjay Hegde,+91 98450 12345,Random Wheel Doubles,,CASH\n" +
      "Praveen Kumar,+91 98334 45566,Men's Singles,,PAID\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "gelavu_tournament_entries_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded .CSV template!", "success");
  };

  // Copy standard header row
  const handleCopyHeaderRow = () => {
    navigator.clipboard?.writeText("Player_Name,Phone,Category,Partner_Name,Payment_Status");
    setCopiedHeaders(true);
    showToast("Header row copied to clipboard!", "success");
    setTimeout(() => setCopiedHeaders(false), 2500);
  };

  // Excel / CSV File Upload Parser
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const XLSX = await import("xlsx");
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        showToast("Workbook contains no sheets.", "error");
        return;
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rawMatrix = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });

      const matrix = rawMatrix.filter(
        (row) =>
          Array.isArray(row) &&
          row.some((c) => c !== null && c !== undefined && String(c).trim().length > 0)
      );

      if (matrix.length === 0) {
        showToast("No data rows found.", "error");
        return;
      }

      const firstRow = (matrix[0] as unknown[]).map((c) => String(c ?? "").trim().toLowerCase());
      const hasHeader = firstRow.some((c) => c.includes("name") || c.includes("player") || c.includes("phone"));

      let nameIdx = 0;
      let phoneIdx = 1;
      let catIdx = 2;
      let partnerIdx = 3;
      let payIdx = 4;

      if (hasHeader) {
        firstRow.forEach((h, idx) => {
          if (h.includes("partner")) partnerIdx = idx;
          else if (h.includes("name") || h.includes("player")) nameIdx = idx;
          else if (h.includes("phone") || h.includes("mobile")) phoneIdx = idx;
          else if (h.includes("cat") || h.includes("event")) catIdx = idx;
          else if (h.includes("pay") || h.includes("status")) payIdx = idx;
        });
      }

      const rows: Array<{
        name: string;
        phone: string;
        category: string;
        partnerName: string;
        partnerPhone?: string;
        skillLevel: PlayoSkillLevel;
        paymentStatus?: string;
      }> = [];

      const start = hasHeader ? 1 : 0;
      for (let i = start; i < matrix.length; i++) {
        const row = matrix[i];
        if (!row || !Array.isArray(row)) continue;
        const name = String(row[nameIdx] ?? "").trim();
        if (!name) continue;

        const phone = String(row[phoneIdx] ?? "").trim() || "+91 98000 00000";
        const category = String(row[catIdx] ?? "").trim() || "Men's Doubles";
        const partnerName = String(row[partnerIdx] ?? "").trim();
        const pay = String(row[payIdx] ?? "").trim();

        rows.push({
          name,
          phone,
          category,
          partnerName,
          skillLevel: "Intermediate",
          paymentStatus: pay.toUpperCase().includes("CASH")
            ? "CASH"
            : pay.toUpperCase().includes("PEND")
            ? "PENDING"
            : "PAID",
        });
      }

      if (rows.length === 0) {
        showToast("No valid player rows found.", "error");
        return;
      }

      setParsedExcelRows(rows);
      showToast(`Parsed ${rows.length} valid entrants! Click 'Commit to Roster' to import.`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error parsing file. Ensure standard column headers.", "error");
    }
  };

  const handleConfirmExcelImport = () => {
    const newItems: TournamentEntry[] = parsedExcelRows.map((r, idx) => ({
      id: `e-xl-${Date.now()}-${idx}`,
      name: r.name,
      phone: r.phone,
      category: r.category,
      partnerName: r.partnerName || undefined,
      skillLevel: r.skillLevel,
      badges: ["Imported Entrant"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Excel Bulk Import",
      sourceBadge: "EXCEL_IMPORT",
    }));

    updateEntries((prev) => [...newItems, ...prev]);
    setParsedExcelRows([]);
    setExcelFileName("");
    setIsExcelModalOpen(false);
    showToast(`Successfully added ${newItems.length} players to the roster!`, "success");
  };

  // AI OCR Scanning Simulation
  const runOcrScanningSimulation = useCallback((previewUrl: string) => {
    setOcrImagePreview(previewUrl);
    setIsOcrScanning(true);
    setOcrScanStep("Scanning document zones and detecting handwriting...");

    setTimeout(() => {
      setOcrScanStep("Extracting player names, phone numbers, and doubles pairs...");
    }, 700);

    setTimeout(() => {
      setIsOcrScanning(false);
      setOcrScanStep("Scan Completed");
      setOcrRawText(
        "Tournament Registration Paper Sheet:\n" +
        "1. Rohan Kumar (+91 98451 98765) + Deepak Nayak - Men's Doubles - Paid UPI\n" +
        "2. Aman Varma (+91 97312 45678) + Yash Kulkarni - Men's Doubles - Paid UPI\n" +
        "3. Praveen Rao (+91 98220 33445) + Harish S - Men's Doubles - Pending\n" +
        "4. Aditya Joshi (+91 99001 22334) - Men's Singles - Paid UPI\n" +
        "5. Gaurav Sen (+91 97400 55667) - Men's Singles - Waitlisted"
      );
      setOcrResults([
        { id: "ocr-1", name: "Rohan Kumar", phone: "+91 98451 98765", category: "Men's Doubles", partnerName: "Deepak Nayak", paymentStatus: "PAID", confidence: 99 },
        { id: "ocr-2", name: "Aman Varma", phone: "+91 97312 45678", category: "Men's Doubles", partnerName: "Yash Kulkarni", paymentStatus: "PAID", confidence: 97 },
        { id: "ocr-3", name: "Praveen Rao", phone: "+91 98220 33445", category: "Men's Doubles", partnerName: "Harish S", paymentStatus: "PENDING", confidence: 95 },
        { id: "ocr-4", name: "Aditya Joshi", phone: "+91 99001 22334", category: "Men's Singles", partnerName: "", paymentStatus: "PAID", confidence: 98 },
        { id: "ocr-5", name: "Gaurav Sen", phone: "+91 97400 55667", category: "Men's Singles", partnerName: "", paymentStatus: "WAITLIST", confidence: 94 },
      ]);
      showToast("Vision AI scan complete! Review extracted entries.", "success");
    }, 1500);
  }, [showToast]);

  const handleConfirmAiOcrImport = () => {
    const newItems: TournamentEntry[] = ocrResults.map((r, idx) => ({
      id: `e-ocr-${Date.now()}-${idx}`,
      name: r.name,
      phone: r.phone,
      category: r.category,
      partnerName: r.partnerName || undefined,
      skillLevel: "Intermediate",
      badges: ["AI Scanned"],
      status: r.paymentStatus === "WAITLIST" ? "WAITLIST" : r.paymentStatus === "PENDING" ? "PENDING_PAYMENT" : "CONFIRMED",
      fee: r.category.includes("Singles") ? "₹699" : "₹1,200",
      method: "AI OCR Scan",
      sourceBadge: "AI_OCR",
    }));

    updateEntries((prev) => [...newItems, ...prev]);
    setOcrResults([]);
    setOcrImagePreview(null);
    setIsAiOcrModalOpen(false);
    showToast(`Imported ${newItems.length} players from AI scan!`, "success");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24">
      {/* ============================================================ */}
      {/* 1. TOP STICKY HEADER & BREADCRUMB (Fluid Width & Mobile-Ready) */}
      {/* ============================================================ */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link
              href="/host"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs shrink-0 cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium truncate">
                <span className="truncate max-w-[140px] sm:max-w-[260px]">{tournamentTitle}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="shrink-0">Entries</span>
              </div>
              <DashboardTitle as="h1" className="text-lg sm:text-2xl whitespace-nowrap truncate">
                Player entries
              </DashboardTitle>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href={`/host/tournaments/${tournamentId}/schedule`}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] sm:text-xs font-semibold text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Courts &amp; schedule</span>
              <span className="sm:hidden">Schedule</span>
            </Link>

            <Link
              href={`/host/tournaments/${tournamentId}/fixtures`}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-semibold transition-colors flex items-center gap-1 sm:gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">Go to fixtures</span>
              <span className="sm:hidden">Fixtures</span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-hotpink text-slate-950 text-[10px] font-bold">
                {totalEntries} ready
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN CONTAINER (Fluid Workspace Width, Zero Awkward Gutters) */}
      {/* ============================================================ */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">

        {/* ============================================================ */}
        {/* HERO CARD: REGISTRATIONS (1:1 Reference Match)               */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-2xs space-y-3">
          <div>
            <DashboardEyebrow>Tournament roster</DashboardEyebrow>
            <DashboardSectionTitle className="mt-1">Registrations</DashboardSectionTitle>
            <DashboardLead className="text-xs sm:text-sm mt-1">
              Collect entries from public sign-ups, spreadsheets, or a camera scan of a paper sheet.
            </DashboardLead>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            <button
              type="button"
              onClick={handleResetToDefaultRoster}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-slate-500" />
              <span>Add player</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExcelModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-hotpink" />
              <span>Upload Excel / CSV</span>
            </button>

            {/* AI Photo Scan: Championship Amber-Gold Accent (No Neon Green) */}
            <button
              type="button"
              onClick={() => setIsAiOcrModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-hotpink hover:bg-hotpink text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-950" />
              <span>AI photo scan</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAT METRICS ROW: 4 CARDS (Responsive 2x2 on Mobile)          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Total Confirmed */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium block truncate">
              Total confirmed
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalEntries}
              </span>
              <span className="text-xs text-slate-400 font-normal">
                teams
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-950 mt-2 sm:mt-3" />
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block mt-1 truncate">
              {totalEntries} of 32 slots · full
            </span>
          </div>

          {/* Card 2: Online Public Entries */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium block truncate">
              Online public entries
            </span>
            <div className="mt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalPublic}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-hotpink mt-2 sm:mt-3 truncate">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-hotpink shrink-0" />
              <span className="truncate">Paid via UPI / card</span>
            </div>
          </div>

          {/* Card 3: Host Imported */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium block truncate">
              Host imported
            </span>
            <div className="mt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalHostImported}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-purple-600 mt-2 sm:mt-3 truncate">
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Added by host</span>
            </div>
          </div>

          {/* Card 4: Collections Total (Exact Dark Obsidian Match) */}
          <div className="bg-navy text-white rounded-2xl p-3.5 sm:p-5 border border-slate-800 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium block truncate">
              Collections total
            </span>
            <div className="mt-1">
              <span className="text-2xl sm:text-3xl font-black text-hotpink font-mono tracking-tight">
                ₹{totalCollections.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono block mt-2 sm:mt-3 truncate">
              ₹1,200 / team fee
            </span>
          </div>

        </div>

        {/* ============================================================ */}
        {/* TABLE CONTAINER: SEARCH & FILTER + ENTRANTS TABLE            */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          
          {/* Top Filter & Search Controls */}
          <div className="p-3.5 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative w-full md:w-80 lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search player, partner or phone"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 pl-9 pr-4 rounded-full border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:border-hotpink/30 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryTab("ALL");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategoryTab === "ALL"
                    ? "bg-slate-950 text-white font-bold shadow-2xs"
                    : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                }`}
              >
                All {entries.length}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCategoryTab("DOUBLES");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategoryTab === "DOUBLES"
                    ? "bg-slate-950 text-white font-bold shadow-2xs"
                    : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                }`}
              >
                Doubles
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCategoryTab("SINGLES");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategoryTab === "SINGLES"
                    ? "bg-slate-950 text-white font-bold shadow-2xs"
                    : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                }`}
              >
                Singles
              </button>

              <button
                type="button"
                onClick={() => showToast("Filters active.", "info")}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Table Header & Rows (Horizontal Scroll on Mobile) */}
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400 bg-white">
                  <th className="py-3 px-3 sm:px-4 w-12 text-center font-mono">#</th>
                  <th className="py-3 px-3 sm:px-4">PLAYER / TEAM</th>
                  <th className="py-3 px-3 sm:px-4">CATEGORY &amp; LEVEL</th>
                  <th className="py-3 px-3 sm:px-4">STATUS</th>
                  <th className="py-3 px-3 sm:px-4 text-right">METHOD</th>
                  <th className="py-3 px-3 sm:px-4 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedEntries.map((e, idx) => {
                  const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* # Number */}
                      <td className="py-4 px-4 text-center font-mono text-slate-400 text-xs">
                        {globalIdx}
                      </td>

                      {/* Player / Team */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {e.name}
                          {e.partnerName && (
                            <span className="text-slate-900 font-bold"> &amp; {e.partnerName}</span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                          {e.phone}
                        </span>
                      </td>

                      {/* Category & Level */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-900 block text-xs">
                          {e.category}
                        </span>
                        <div className="mt-1">
                          <PlayoSkillBadge
                            level={e.skillLevel || "Beginner"}
                            progress={
                              e.skillLevel === "Amateur"
                                ? 45 // exact half-fill matching Playo reference screenshot
                                : e.skillLevel === "Intermediate"
                                ? 65
                                : e.skillLevel === "Advanced"
                                ? 82
                                : e.skillLevel === "Professional"
                                ? 95
                                : 30
                            }
                          />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {e.status === "CONFIRMED" && e.sourceBadge === "HOST_MANUAL" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-purple-800 bg-purple-50 border border-purple-200/80">
                            <User className="w-3 h-3 text-purple-600" />
                            <span>Added by host</span>
                          </span>
                        ) : e.status === "CONFIRMED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80">
                            <CheckCircle2 className="w-3 h-3 text-hotpink" />
                            <span>Confirmed</span>
                          </span>
                        ) : e.status === "PENDING_PAYMENT" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-navy bg-hotpink/10 border border-hotpink/40/80">
                            <Clock className="w-3 h-3 text-hotpink" />
                            <span>Pending · 06:42</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                            <span>Waitlisted</span>
                          </span>
                        )}
                      </td>

                      {/* Method & Fee */}
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-slate-900 font-mono text-xs block">
                          {e.fee}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {e.status === "WAITLIST"
                            ? "Auto-promote"
                            : e.status === "PENDING_PAYMENT"
                            ? "Slot held"
                            : e.method}
                        </span>
                      </td>

                      {/* Delete Action */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteEntry(e.id)}
                          title="Remove entry"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Showing Count & Pagination */}
          <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              Showing {paginatedEntries.length} of {filteredEntries.length} entries
            </span>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-6 h-6 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    currentPage === p
                      ? "bg-slate-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* ============================================================ */}
      {/* MODAL 1: ADD SINGLE PLAYER MANUALLY                           */}
      {/* ============================================================ */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-slate-700" />
                <span>Add player manually</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManual} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  PLAYER NAME *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Varun Shenoy"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  required
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-hotpink/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  PHONE (WHATSAPP)
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-hotpink/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  CATEGORY
                </label>
                <CustomDropdown
                  value={manualCategory}
                  onChange={setManualCategory}
                  options={[
                    { value: "Men's Doubles", label: "Men's Doubles", badge: "Pairs" },
                    { value: "Mixed Doubles", label: "Mixed Doubles", badge: "Combo" },
                    { value: "Men's Singles", label: "Men's Singles", badge: "1v1" },
                    { value: "Women's Singles", label: "Women's Singles", badge: "1v1" },
                  ]}
                />
              </div>

              {manualCategory.includes("Doubles") && (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                    PARTNER NAME
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karthik Prabhu"
                    value={manualPartner}
                    onChange={(e) => setManualPartner(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-hotpink/30 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  SKILL LEVEL
                </label>
                <CustomDropdown
                  value={manualSkillLevel}
                  onChange={(v) => setManualSkillLevel(v as PlayoSkillLevel)}
                  options={[
                    { value: "Intermediate", label: "Intermediate", badge: "Level 4" },
                    { value: "Amateur", label: "Amateur", badge: "Level 3" },
                    { value: "Advanced", label: "Advanced", badge: "Level 5" },
                    { value: "Professional", label: "Professional", badge: "Pro" },
                    { value: "Beginner", label: "Beginner", badge: "Level 2" },
                  ]}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Add player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: UPLOAD EXCEL / CSV                                   */}
      {/* ============================================================ */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-hotpink" />
                <span>Upload Excel / CSV Entries</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsExcelModalOpen(false);
                  setParsedExcelRows([]);
                }}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* File Dropzone */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-hotpink/30 hover:bg-hotpink/10/20 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">
                  Click to select spreadsheet (.xlsx, .csv)
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports player names, phone, category, partner, and payment status
                </p>
                {excelFileName && (
                  <span className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    ✓ {excelFileName}
                  </span>
                )}
              </div>

              {/* Template Buttons */}
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-600 font-medium">Templates:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadXlsxTemplate}
                    className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>.XLSX</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>.CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyHeaderRow}
                    className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHeaders ? <Check className="w-3 h-3 text-hotpink" /> : <Copy className="w-3 h-3 text-slate-500" />}
                    <span>Copy Headers</span>
                  </button>
                </div>
              </div>

              {/* Preview Parsed Rows */}
              {parsedExcelRows.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    Parsed {parsedExcelRows.length} Entrants:
                  </span>
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
                    {parsedExcelRows.slice(0, 10).map((r, i) => (
                      <div key={i} className="p-2.5 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-900 font-bold">{r.name}</strong>
                          {r.partnerName && <span className="text-slate-600"> &amp; {r.partnerName}</span>}
                          <span className="text-slate-400 block text-[11px]">{r.phone} · {r.category}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {r.paymentStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsExcelModalOpen(false);
                    setParsedExcelRows([]);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExcelImport}
                  disabled={parsedExcelRows.length === 0}
                  className="px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer disabled:opacity-40"
                >
                  Commit {parsedExcelRows.length} to Roster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: AI PHOTO SCAN                                        */}
      {/* ============================================================ */}
      {isAiOcrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-hotpink" />
                <span>AI Photo Scan (Paper &amp; WhatsApp)</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAiOcrModalOpen(false);
                  setOcrResults([]);
                }}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Take or upload a photo of handwritten entries or WhatsApp registration lists.
              </p>

              {/* Test Scan Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => runOcrScanningSimulation("test-paper-url")}
                  className="flex-1 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Scan Paper Sheet Sample</span>
                </button>
              </div>

              {isOcrScanning && (
                <div className="p-4 rounded-xl bg-hotpink/10 border border-hotpink/40 text-center space-y-2">
                  <div className="w-6 h-6 border-2 border-hotpink/30 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-navy">{ocrScanStep}</p>
                </div>
              )}

              {ocrResults.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Extracted {ocrResults.length} Entrants:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRawOcrText(!showRawOcrText)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                    >
                      {showRawOcrText ? "Hide text" : "View raw text"}
                    </button>
                  </div>

                  {showRawOcrText && (
                    <pre className="p-2.5 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                      {ocrRawText}
                    </pre>
                  )}

                  <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
                    {ocrResults.map((r) => (
                      <div key={r.id} className="p-2.5 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-900 font-bold">{r.name}</strong>
                          {r.partnerName && <span className="text-slate-600"> &amp; {r.partnerName}</span>}
                          <span className="text-slate-400 block text-[11px]">{r.phone} · {r.category}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {r.confidence}% confidence
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAiOcrModalOpen(false);
                    setOcrResults([]);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAiOcrImport}
                  disabled={ocrResults.length === 0}
                  className="px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer disabled:opacity-40"
                >
                  Import {ocrResults.length} to Roster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. RESET CONFIRMATION DIALOG (No Native confirm())           */}
      {/* ============================================================ */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-hotpink/100/10 border border-hotpink/30 text-hotpink flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Reset Tournament Roster?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This will restore the original 32 seeded tournament entries. Any custom players added via spreadsheet or camera scan will be removed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmResetRoster}
                className="px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
