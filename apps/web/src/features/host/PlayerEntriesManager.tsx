"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  UserPlus,
  FileSpreadsheet,
  Camera,
  Upload,
  CheckCircle2,
  Download,
  Trash2,
  Sparkles,
  FileText,
  Search,
  Filter,
  Copy,
  Check,
  Plus,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

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

export function PlayerEntriesManager({ tournamentId, tournamentTitle = "Bengaluru Morning Doubles Clash" }: Props) {
  // Existing entries list with Playo skill levels
  const [entries, setEntries] = useState<TournamentEntry[]>([
    {
      id: "e-1",
      name: "Rohan Kumar",
      phone: "+91 98765 43210",
      category: "Men's Doubles (BYOP)",
      partnerName: "Deepak Nayak",
      skillLevel: "Intermediate",
      badges: ["Consistent Rallies", "Fair Play"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-2",
      name: "Arjun Mehta",
      phone: "+91 98123 45678",
      category: "Men's Doubles (BYOP)",
      partnerName: "Nikhil Rao",
      skillLevel: "Advanced",
      badges: ["Smash Specialist"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Razorpay",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-3",
      name: "Vikram Shenoy",
      phone: "+91 98345 67890",
      category: "Men's Doubles (BYOP)",
      partnerName: "Sai Teja",
      skillLevel: "Intermediate",
      badges: ["Quick Reflexes"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-4",
      name: "Kiran Gowda",
      phone: "+91 97456 12345",
      category: "Men's Doubles (BYOP)",
      partnerName: "Dev Anand",
      skillLevel: "Amateur",
      badges: ["Great Partner"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
  ]);

  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modals state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isAiOcrModalOpen, setIsAiOcrModalOpen] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  // Manual Form State
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualCategory, setManualCategory] = useState("Men's Doubles (BYOP)");
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
  const [ocrImagePreview, setOcrImagePreview] = useState<string | null>(null);
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
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.partnerName && e.partnerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      e.phone.includes(searchTerm);
    const matchesCat = categoryFilter === "ALL" || e.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Handle Manual Add
  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const newEntry: TournamentEntry = {
      id: `e-manual-${Date.now()}`,
      name: manualName.trim(),
      phone: manualPhone.trim() || "N/A",
      category: manualCategory,
      partnerName: manualPartner.trim() || undefined,
      skillLevel: manualSkillLevel,
      badges: ["Fair Play"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    };

    setEntries((prev) => [newEntry, ...prev]);
    setManualName("");
    setManualPhone("");
    setManualPartner("");
    setManualSkillLevel("Intermediate");
    setIsManualModalOpen(false);
    showToast(`Added ${newEntry.name} (${newEntry.skillLevel}) to tournament roster!`, "success");
  };

  // Download Genuine Excel (.xlsx) Workbook Template
  const handleDownloadXlsxTemplate = async () => {
    try {
      const XLSX = await import("xlsx");
      const wsData = [
        ["Player_Name", "Phone", "Category", "Partner_Name", "Payment_Status"],
        ["Aditya Joshi", "+91 98765 43210", "Men's Doubles (BYOP)", "Tarun Verma", "PAID"],
        ["Manish Rao", "+91 98123 45678", "Men's Doubles (BYOP)", "Gaurav Sen", "PAID"],
        ["Sanjay Hegde", "+91 98450 12345", "Random Wheel Doubles", "", "CASH"],
        ["Praveen Kumar", "+91 98334 45566", "Men's Singles", "", "PAID"],
        ["Sneha Kulkarni", "+91 97400 11223", "Women's Singles", "", "PAID"],
        ["Kiran Shah", "+91 99000 88776", "Mixed Doubles", "Pooja Hegde", "PENDING"],
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!cols"] = [
        { wch: 20 },
        { wch: 18 },
        { wch: 24 },
        { wch: 20 },
        { wch: 16 },
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Entries");
      XLSX.writeFile(wb, "gelavu_tournament_entries_template.xlsx");
      showToast("Downloaded genuine .XLSX Excel template!", "success");
    } catch (err) {
      console.error(err);
      handleDownloadTemplate();
    }
  };

  // Standard CSV Template Downloader
  const handleDownloadTemplate = () => {
    const csvContent =
      "Player_Name,Phone,Category,Partner_Name,Payment_Status\n" +
      "Aditya Joshi,+91 98765 43210,Men's Doubles (BYOP),Tarun Verma,PAID\n" +
      "Manish Rao,+91 98123 45678,Men's Doubles (BYOP),Gaurav Sen,PAID\n" +
      "Sanjay Hegde,+91 98450 12345,Random Wheel Doubles,,CASH\n" +
      "Praveen Kumar,+91 98334 45566,Men's Singles,,PAID\n" +
      "Sneha Kulkarni,+91 97400 11223,Women's Singles,,PAID\n" +
      "Kiran Shah,+91 99000 88776,Mixed Doubles,Pooja Hegde,PENDING\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "gelavu_tournament_entries_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Standard .CSV template downloaded!", "success");
  };

  // Copy standard header row to clipboard
  const handleCopyHeaderRow = () => {
    const headers = "Player_Name,Phone,Category,Partner_Name,Payment_Status";
    navigator.clipboard?.writeText(headers);
    setCopiedHeaders(true);
    showToast("Header row copied: Player_Name,Phone,Category,Partner_Name,Payment_Status", "success");
    setTimeout(() => setCopiedHeaders(false), 2500);
  };

  // Real Binary Excel (.xlsx / .xls) & CSV Parser with Smart Column Detection
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
        showToast("The uploaded workbook contains no sheets.", "error");
        return;
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rawMatrix = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });

      if (!rawMatrix || rawMatrix.length === 0) {
        showToast("Uploaded spreadsheet is empty.", "error");
        return;
      }

      // Filter out completely blank rows
      const matrix = rawMatrix.filter((row) =>
        Array.isArray(row) && row.some((c) => c !== null && c !== undefined && String(c).trim().length > 0)
      );

      if (matrix.length === 0) {
        showToast("No data rows found in spreadsheet.", "error");
        return;
      }

      // Determine header row
      const firstRowStrings = (matrix[0] as unknown[]).map((cell) => String(cell ?? "").trim().toLowerCase());
      const hasHeader = firstRowStrings.some(
        (cell: string) =>
          cell.includes("name") ||
          cell.includes("player") ||
          cell.includes("phone") ||
          cell.includes("category") ||
          cell.includes("rank")
      );

      let nameIdx = 0;
      let phoneIdx = 1;
      let catIdx = 2;
      let partnerIdx = 3;
      let payIdx = 4;
      let skillIdx = -1;

      if (hasHeader) {
        firstRowStrings.forEach((h: string, idx: number) => {
          if (h.includes("partner")) {
            partnerIdx = idx;
          } else if (h.includes("player") || h === "name" || h.includes("full name") || h === "entrant") {
            nameIdx = idx;
          } else if (h.includes("phone") || h.includes("mobile") || h.includes("contact") || h.includes("whatsapp")) {
            phoneIdx = idx;
          } else if (h.includes("cat") || h.includes("event") || h.includes("format")) {
            catIdx = idx;
          } else if (h.includes("pay") || h.includes("status") || h.includes("fee")) {
            payIdx = idx;
          } else if (h.includes("skill") || h.includes("level") || h.includes("tier")) {
            skillIdx = idx;
          }
        });
      }

      const startIndex = hasHeader ? 1 : 0;
      const rows: Array<{
        name: string;
        phone: string;
        category: string;
        partnerName: string;
        partnerPhone?: string;
        skillLevel: PlayoSkillLevel;
        paymentStatus?: string;
      }> = [];

      // Filter out any zip binary artifacts or control characters
      const isBinaryGibberish = (str: string) => {
        if (!str) return true;
        if (/\[Content_Types\]|\.xml|docProps|theme1|PK\x03\x04|xl\//i.test(str)) return true;
        let bad = 0;
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if ((code < 32 && code !== 9 && code !== 10 && code !== 13) || code === 65533) bad++;
        }
        return bad > 1;
      };

      for (let i = startIndex; i < matrix.length; i++) {
        const row = matrix[i];
        if (!row || !Array.isArray(row)) continue;

        const rawName = String(row[nameIdx] ?? "").trim();
        if (!rawName || isBinaryGibberish(rawName)) continue;

        const phone = String(row[phoneIdx] ?? "").trim() || "+91 98000 00000";
        const category = String(row[catIdx] ?? "").trim() || "Men's Doubles (BYOP)";
        const partnerName = String(row[partnerIdx] ?? "").trim();
        const rawPayment = String(row[payIdx] ?? "").trim();

        let skillLevel: PlayoSkillLevel = "Intermediate";
        if (skillIdx !== -1 && row[skillIdx] !== undefined) {
          const rawSkill = String(row[skillIdx]).toLowerCase();
          if (rawSkill.includes("adv")) skillLevel = "Advanced";
          else if (rawSkill.includes("pro")) skillLevel = "Professional";
          else if (rawSkill.includes("beg") || rawSkill.includes("nov")) skillLevel = "Beginner";
          else if (rawSkill.includes("amat")) skillLevel = "Amateur";
        }

        rows.push({
          name: rawName,
          phone,
          category,
          partnerName: partnerName || (category.includes("Wheel") ? "Wheel Draw" : ""),
          skillLevel,
          paymentStatus: rawPayment.toUpperCase().includes("CASH")
            ? "CASH"
            : rawPayment.toUpperCase().includes("PEND")
            ? "PENDING"
            : "PAID",
        });
      }

      if (rows.length === 0) {
        showToast("No valid player rows found. Please check column headers.", "error");
        return;
      }

      setParsedExcelRows(rows);
      showToast(`Parsed ${rows.length} valid entrants from ${file.name}!`, "success");
    } catch (err: unknown) {
      console.error("Excel parse error:", err);
      showToast("Error reading Excel file. Please ensure it is a valid .xlsx, .xls, or .csv spreadsheet.", "error");
    }
  };

  const handleConfirmExcelImport = () => {
    const newItems: TournamentEntry[] = parsedExcelRows.map((r, idx) => ({
      id: `e-xl-${Date.now()}-${idx}`,
      name: r.name,
      phone: r.phone,
      category: r.category,
      partnerName: r.partnerName,
      skillLevel: r.skillLevel || "Intermediate",
      badges: ["Community Player"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Excel Bulk Import",
      sourceBadge: "EXCEL_IMPORT",
    }));

    setEntries((prev) => [...newItems, ...prev]);
    setParsedExcelRows([]);
    setExcelFileName("");
    setIsExcelModalOpen(false);
    showToast(`Imported ${newItems.length} players into tournament roster!`, "success");
  };

  // 1-Click Clear Bulk Imports
  const handleClearImportedEntries = () => {
    setEntries((prev) => prev.filter((e) => e.sourceBadge !== "EXCEL_IMPORT" && e.sourceBadge !== "AI_OCR"));
    showToast("Cleared all imported entries from roster.", "info");
  };

  // 1-Click Reset to 4 Confirmed Teams
  const handleResetToDefaultRoster = () => {
    setEntries([
      {
        id: "e-1",
        name: "Rohan Kumar",
        phone: "+91 98765 43210",
        category: "Men's Doubles (BYOP)",
        partnerName: "Deepak Nayak",
        skillLevel: "Intermediate",
        badges: ["Consistent Rallies", "Fair Play"],
        status: "CONFIRMED",
        fee: "₹1,200",
        method: "Online UPI",
        sourceBadge: "PUBLIC",
      },
      {
        id: "e-2",
        name: "Arjun Mehta",
        phone: "+91 98123 45678",
        category: "Men's Doubles (BYOP)",
        partnerName: "Nikhil Rao",
        skillLevel: "Advanced",
        badges: ["Smash Specialist"],
        status: "CONFIRMED",
        fee: "₹1,200",
        method: "Razorpay",
        sourceBadge: "PUBLIC",
      },
      {
        id: "e-3",
        name: "Vikram Shenoy",
        phone: "+91 98345 67890",
        category: "Men's Doubles (BYOP)",
        partnerName: "Sai Teja",
        skillLevel: "Intermediate",
        badges: ["Quick Reflexes"],
        status: "CONFIRMED",
        fee: "₹1,200",
        method: "Online UPI",
        sourceBadge: "PUBLIC",
      },
      {
        id: "e-4",
        name: "Kiran Gowda",
        phone: "+91 97456 12345",
        category: "Men's Doubles (BYOP)",
        partnerName: "Dev Anand",
        skillLevel: "Amateur",
        badges: ["Great Partner"],
        status: "CONFIRMED",
        fee: "₹1,200",
        method: "Cash (Manual)",
        sourceBadge: "HOST_MANUAL",
      },
    ]);
    showToast("Reset roster to original 4 confirmed teams.", "success");
  };

  // Sample Sign-up Sheet SVGs for Instant AI Scan Testing
  const SAMPLE_PAPER_SHEET_SVG =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='320' viewBox='0 0 600 320' fill='none'><rect width='600' height='320' fill='%23FDFBF7'/><rect x='20' y='20' width='560' height='280' rx='8' fill='white' stroke='%23D5D9CE' stroke-width='2'/><text x='40' y='55' font-family='monospace' font-size='16' font-weight='bold' fill='%231E293B'>BENGALURU TOURNAMENT ENTRIES (SIGN-UP SHEET)</text><line x1='40' y1='70' x2='560' y2='70' stroke='%23E2E6DD' stroke-width='1.5'/><text x='40' y='105' font-family='sans-serif' font-size='12' fill='%23334155'>1. Sunil Narang (+91 98451 98765) &amp; Harish Shetty | Men&apos;s Doubles | PAID (UPI)</text><text x='40' y='145' font-family='sans-serif' font-size='12' fill='%23334155'>2. Vikas Hegde (+91 97312 45678) &amp; Sharath Chandra | Men&apos;s Doubles | CASH</text><text x='40' y='185' font-family='sans-serif' font-size='12' fill='%23334155'>3. Abhishek Roy (+91 98220 33445) | Random Wheel Doubles | PAID</text><text x='40' y='225' font-family='sans-serif' font-size='12' fill='%23334155'>4. Gautam Nair (+91 99001 22334) &amp; Manoj Swamy | Men&apos;s Doubles | PAID</text><text x='40' y='265' font-family='sans-serif' font-size='12' fill='%23334155'>5. Divya Shenoy (+91 97400 55667) | Women&apos;s Singles | PAID</text></svg>";

  const SAMPLE_WHATSAPP_SVG =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='320' viewBox='0 0 600 320' fill='none'><rect width='600' height='320' fill='%23EFEAE2'/><rect width='600' height='48' fill='%23075E54'/><text x='24' y='30' font-family='sans-serif' font-size='14' font-weight='bold' fill='white'>Badminton Tournament WhatsApp Group</text><rect x='30' y='65' width='480' height='40' rx='8' fill='%23DCF8C6'/><text x='45' y='90' font-family='sans-serif' font-size='12' fill='%231E293B'>Sunil Narang (+91 98451 98765) + Harish Shetty - Men&apos;s Doubles - Paid UPI</text><rect x='30' y='115' width='480' height='40' rx='8' fill='%23DCF8C6'/><text x='45' y='140' font-family='sans-serif' font-size='12' fill='%231E293B'>Vikas Hegde (+91 97312 45678) + Sharath Chandra - BYOP - Paid Cash</text><rect x='30' y='165' width='480' height='40' rx='8' fill='%23DCF8C6'/><text x='45' y='190' font-family='sans-serif' font-size='12' fill='%231E293B'>Abhishek Roy (+91 98220 33445) - Wheel Doubles Solo - Paid GPay</text><rect x='30' y='215' width='480' height='40' rx='8' fill='%23DCF8C6'/><text x='45' y='240' font-family='sans-serif' font-size='12' fill='%231E293B'>Gautam Nair (+91 99001 22334) + Manoj Swamy - Men&apos;s Doubles - Paid</text><rect x='30' y='265' width='480' height='40' rx='8' fill='%23DCF8C6'/><text x='45' y='290' font-family='sans-serif' font-size='12' fill='%231E293B'>Divya Shenoy (+91 97400 55667) - Women&apos;s Singles - Paid</text></svg>";

  // Execute AI OCR Scan simulation with multi-phase progress
  const runOcrScanningSimulation = useCallback((
    previewUrl: string,
    sampleType?: "paper" | "whatsapp"
  ) => {
    setOcrImagePreview(previewUrl);
    setIsOcrScanning(true);
    setOcrScanStep("Detecting document layout & isolating handwriting text zones...");

    setTimeout(() => {
      setOcrScanStep("Extracting player names & 10-digit WhatsApp numbers...");
    }, 600);

    setTimeout(() => {
      setOcrScanStep("Pairing BYOP doubles partners & verifying payment status...");
    }, 1200);

    setTimeout(() => {
      setIsOcrScanning(false);
      setOcrScanStep("Scan Completed successfully");

      if (sampleType === "whatsapp") {
        setOcrRawText(
          "Badminton Tournament WhatsApp Group Export:\n" +
          "1. Sunil Narang (+91 98451 98765) + Harish Shetty - Men's Doubles - Paid UPI\n" +
          "2. Vikas Hegde (+91 97312 45678) + Sharath Chandra - BYOP - Paid Cash\n" +
          "3. Abhishek Roy (+91 98220 33445) - Wheel Doubles Solo - Paid GPay\n" +
          "4. Gautam Nair (+91 99001 22334) + Manoj Swamy - Men's Doubles - Paid UPI\n" +
          "5. Divya Shenoy (+91 97400 55667) - Women's Singles - Paid PhonePe"
        );
        setOcrResults([
          { id: "ocr-1", name: "Sunil Narang", phone: "+91 98451 98765", category: "Men's Doubles (BYOP)", partnerName: "Harish Shetty", paymentStatus: "PAID", confidence: 99 },
          { id: "ocr-2", name: "Vikas Hegde", phone: "+91 97312 45678", category: "Men's Doubles (BYOP)", partnerName: "Sharath Chandra", paymentStatus: "CASH", confidence: 97 },
          { id: "ocr-3", name: "Abhishek Roy", phone: "+91 98220 33445", category: "Random Wheel Doubles", partnerName: "", paymentStatus: "PAID", confidence: 95 },
          { id: "ocr-4", name: "Gautam Nair", phone: "+91 99001 22334", category: "Men's Doubles (BYOP)", partnerName: "Manoj Swamy", paymentStatus: "PAID", confidence: 98 },
          { id: "ocr-5", name: "Divya Shenoy", phone: "+91 97400 55667", category: "Women's Singles", partnerName: "", paymentStatus: "PAID", confidence: 96 },
        ]);
      } else {
        setOcrRawText(
          "TOURNAMENT REGISTRATION PAPER SHEET:\n" +
          "1. Sunil Narang (+91 98451 98765) | Harish Shetty | Men's Doubles | PAID\n" +
          "2. Vikas Hegde (+91 97312 45678) | Sharath Chandra | Men's Doubles | CASH\n" +
          "3. Abhishek Roy (+91 98220 33445) | Seeking Partner | Wheel Doubles | PAID\n" +
          "4. Gautam Nair (+91 99001 22334) | Manoj Swamy | Men's Doubles | PAID\n" +
          "5. Divya Shenoy (+91 97400 55667) | Solo | Women's Singles | PAID"
        );
        setOcrResults([
          { id: "ocr-1", name: "Sunil Narang", phone: "+91 98451 98765", category: "Men's Doubles (BYOP)", partnerName: "Harish Shetty", paymentStatus: "PAID", confidence: 98 },
          { id: "ocr-2", name: "Vikas Hegde", phone: "+91 97312 45678", category: "Men's Doubles (BYOP)", partnerName: "Sharath Chandra", paymentStatus: "CASH", confidence: 96 },
          { id: "ocr-3", name: "Abhishek Roy", phone: "+91 98220 33445", category: "Random Wheel Doubles", partnerName: "", paymentStatus: "PAID", confidence: 94 },
          { id: "ocr-4", name: "Gautam Nair", phone: "+91 99001 22334", category: "Men's Doubles (BYOP)", partnerName: "Manoj Swamy", paymentStatus: "PAID", confidence: 97 },
          { id: "ocr-5", name: "Divya Shenoy", phone: "+91 97400 55667", category: "Women's Singles", partnerName: "", paymentStatus: "PAID", confidence: 95 },
        ]);
      }
      showToast("Vision AI scan complete! Review or edit extracted rows below.", "success");
    }, 1800);
  }, [showToast]);

  const processOcrFile = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    runOcrScanningSimulation(previewUrl, "paper");
  }, [runOcrScanningSimulation]);

  // Listen for Ctrl+V / Command+V paste when AI OCR modal is open
  useEffect(() => {
    if (!isAiOcrModalOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processOcrFile(file);
            showToast("Pasted image from clipboard! Scanning with Vision AI...", "info");
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isAiOcrModalOpen, processOcrFile, showToast]);

  const handleOcrImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processOcrFile(file);
  };

  const handleUpdateOcrRow = (id: string, field: string, value: string) => {
    setOcrResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleRemoveOcrRow = (id: string) => {
    setOcrResults((prev) => prev.filter((r) => r.id !== id));
    showToast("Removed entry from scan list", "info");
  };

  const handleAddOcrRow = () => {
    const newRow = {
      id: `ocr-custom-${Date.now()}`,
      name: "New Player",
      phone: "+91 98000 00000",
      category: "Men's Doubles (BYOP)",
      partnerName: "Partner Name",
      paymentStatus: "PAID",
      confidence: 100,
    };
    setOcrResults((prev) => [...prev, newRow]);
  };

  const handleConfirmAiOcrImport = () => {
    const newItems: TournamentEntry[] = ocrResults.map((r, idx) => ({
      id: `e-ocr-${Date.now()}-${idx}`,
      name: r.name,
      phone: r.phone,
      category: r.category,
      partnerName: r.partnerName || undefined,
      skillLevel: "Intermediate",
      badges: ["AI Scanned Entry"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "AI OCR Scan",
      sourceBadge: "AI_OCR",
    }));

    setEntries((prev) => [...newItems, ...prev]);
    setOcrResults([]);
    setOcrImagePreview(null);
    setIsAiOcrModalOpen(false);
    showToast(`Successfully imported ${newItems.length} scanned entries into roster!`, "success");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl border border-[#E2E6DD] bg-white shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4A38]">
            Tournament Roster · {tournamentTitle} (#{tournamentId})
          </span>
          <h2 className="text-2xl font-black text-[#1E293B] mt-1">Player Entries & Registration</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Collect entries from public registrations, Excel/CSV spreadsheets, or AI camera sheet scan.
          </p>
        </div>

        {/* Entry Ingestion & Roster Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Clear Imported Entries if any exist */}
          {entries.some((e) => e.sourceBadge === "EXCEL_IMPORT" || e.sourceBadge === "AI_OCR") && (
            <button
              type="button"
              onClick={handleClearImportedEntries}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2 text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Remove all bulk imported rows"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Imports ({entries.filter((e) => e.sourceBadge === "EXCEL_IMPORT" || e.sourceBadge === "AI_OCR").length})</span>
            </button>
          )}

          {/* Reset Roster to default 4 confirmed teams */}
          <button
            type="button"
            onClick={handleResetToDefaultRoster}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#64748B] hover:text-[#1E293B] px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
            title="Reset roster to original 4 confirmed teams"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* 1. Add Single Player Manually */}
          <button
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#1E293B] px-3.5 py-2.5 text-xs font-bold transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#1D4A38]" />
            <span>+ Add Player</span>
          </button>

          {/* 2. Upload Excel / CSV */}
          <button
            type="button"
            onClick={() => setIsExcelModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#1E293B] px-3.5 py-2.5 text-xs font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" />
            <span>Upload Excel / CSV</span>
          </button>

          {/* 3. AI Camera / Photo Scanner */}
          <button
            type="button"
            onClick={() => setIsAiOcrModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D4A38] hover:bg-[#16392B] text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>AI Photo OCR Scan</span>
          </button>
        </div>
      </div>

      {/* Roster Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
          <span className="text-[11px] font-semibold text-[#64748B] block">Total Confirmed</span>
          <p className="text-2xl font-black text-[#1E293B] mt-1">{entries.length} Teams</p>
          <span className="text-[10px] text-[#1D4A38] font-bold block mt-0.5">32 slots capacity</span>
        </div>

        <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
          <span className="text-[11px] font-semibold text-[#64748B] block">Online Public Entries</span>
          <p className="text-2xl font-black text-[#1E293B] mt-1">
            {entries.filter((e) => e.sourceBadge === "PUBLIC").length}
          </p>
          <span className="text-[10px] text-[#64748B] font-bold block mt-0.5">Paid via UPI / Card</span>
        </div>

        <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
          <span className="text-[11px] font-semibold text-[#64748B] block">Host Imported (Excel / AI)</span>
          <p className="text-2xl font-black text-[#1E293B] mt-1">
            {entries.filter((e) => e.sourceBadge !== "PUBLIC").length}
          </p>
          <span className="text-[10px] text-amber-600 font-bold block mt-0.5">Direct entry into draw</span>
        </div>

        <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
          <span className="text-[11px] font-semibold text-[#64748B] block">Collections Total</span>
          <p className="text-2xl font-black text-[#1D4A38] mt-1">₹{(entries.length * 1200).toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-[#64748B] font-bold block mt-0.5">₹1,200 / team fee</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search player, partner, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 rounded-xl border border-[#D5D9CE] bg-white pl-10 pr-4 text-xs text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#1D4A38] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-3.5 h-3.5 text-[#64748B]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-xl border border-[#D5D9CE] bg-white px-3 text-xs text-[#1E293B] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Men's Doubles (BYOP)">Men&apos;s Doubles (BYOP)</option>
            <option value="Random Wheel Doubles">Random Wheel Doubles</option>
            <option value="Men's Singles">Men&apos;s Singles</option>
          </select>
        </div>
      </div>

      {/* Table of Entries */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E6DD] bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#F0F2EB] border-b border-[#E2E6DD] text-[11px] font-black text-[#475569] uppercase tracking-wider">
          <div className="col-span-4">Player & Team (BYOP)</div>
          <div className="col-span-3">Category & Skill Level</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Method & Source</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        <div className="divide-y divide-[#EEF0E8]">
          {filteredEntries.map((e, idx) => (
            <div key={e.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#FAFBF7] transition-colors">
              {/* Player & Partner */}
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#64748B] w-5">#{idx + 1}</span>
                  <div>
                    <p className="font-bold text-[#1E293B] text-sm">
                      {e.name}
                      {e.partnerName && (
                        <span className="text-[#1D4A38] font-bold"> & {e.partnerName}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#64748B]">{e.phone}</p>
                  </div>
                </div>
              </div>

              {/* Category & Playo Skill Level */}
              <div className="col-span-3">
                <p className="text-xs text-[#1E293B] font-semibold">{e.category}</p>
                <div className="mt-1">
                  <span
                    className={`inline-block rounded-lg px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-2xs ${
                      e.skillLevel === "Professional"
                        ? "bg-purple-600 border border-purple-700"
                        : e.skillLevel === "Advanced"
                        ? "bg-orange-600 border border-orange-700"
                        : e.skillLevel === "Intermediate"
                        ? "bg-emerald-600 border border-emerald-700"
                        : e.skillLevel === "Amateur"
                        ? "bg-teal-600 border border-teal-700"
                        : "bg-sky-600 border border-sky-700"
                    }`}
                  >
                    {e.skillLevel ?? "Intermediate"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D4A38] bg-[#E8EFEA] border border-[#C5D5CA] px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                </span>
              </div>

              {/* Method & Ingestion Badge */}
              <div className="col-span-2 text-right">
                <span className="font-mono text-xs font-bold text-[#1E293B]">{e.fee}</span>
                <p className="text-[10px] text-[#64748B]">{e.method}</p>
              </div>

              {/* Delete / Remove */}
              <div className="col-span-1 text-center">
                <button
                  type="button"
                  title="Remove Entry"
                  onClick={() => handleDeleteEntry(e.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: ADD SINGLE PLAYER MANUALLY                           */}
      {/* ============================================================ */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#D5D9CE] bg-white p-6 sm:p-8 shadow-2xl space-y-5 text-[#1E293B]">
            <div className="flex items-center justify-between border-b border-[#EEF0E8] pb-4">
              <h3 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#1D4A38]" />
                <span>Add Player / Team Manually</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="text-[#64748B] hover:text-[#1E293B] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManual} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1">
                  Player Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Varun Shenoy"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1">
                  Mobile Number (WhatsApp)
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1">
                  Category
                </label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs text-[#1E293B] focus:outline-none cursor-pointer"
                >
                  <option value="Men's Doubles (BYOP)">Men&apos;s Doubles (BYOP)</option>
                  <option value="Men's Singles">Men&apos;s Singles</option>
                  <option value="Random Wheel Doubles">Random Wheel Doubles</option>
                  <option value="Mixed Doubles">Mixed Doubles</option>
                </select>
              </div>

              {manualCategory.includes("Doubles") && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1">
                    Partner Name (BYOP)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karthik Prabhu (or leave empty if seeking partner)"
                    value={manualPartner}
                    onChange={(e) => setManualPartner(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1">
                  Skill Level (Playo Standard)
                </label>
                <select
                  value={manualSkillLevel}
                  onChange={(e) => setManualSkillLevel(e.target.value as PlayoSkillLevel)}
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none cursor-pointer"
                >
                  <option value="Beginner">Beginner — Learning basics, short rallies</option>
                  <option value="Amateur">Amateur — Can rally consistently, developing control</option>
                  <option value="Intermediate">Intermediate — Good control, clears, drops &amp; smashes</option>
                  <option value="Advanced">Advanced — High pace, tactical power, sharp reflex</option>
                  <option value="Professional">Professional — State / national tournament circuit</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF0E8]">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#1E293B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Add Player to Draw
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: UPLOAD EXCEL / CSV SPREADSHEET (FULLSCREEN WIDESCREEN) */}
      {/* ============================================================ */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl h-[92vh] max-h-[960px] rounded-3xl border border-[#D5D9CE] bg-white shadow-2xl flex flex-col overflow-hidden text-[#1E293B]">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-[#EEF0E8] bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
                    Bulk Upload Entries via Excel / CSV
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Import players &amp; BYOP teams for {tournamentTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {excelFileName && (
                  <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] text-[#1D4A38] px-3.5 py-1 text-xs font-bold border border-[#C5D5CA]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded: {excelFileName}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsExcelModalOpen(false);
                    setParsedExcelRows([]);
                  }}
                  className="w-9 h-9 rounded-full bg-[#F5F6F0] hover:bg-[#E8EFEA] text-[#64748B] hover:text-[#1E293B] flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                  title="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Widescreen 2-Column Body */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* Left Column (5 cols): Upload Zone, Templates & Format Reference */}
              <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#EEF0E8] bg-[#FDFDFB] flex flex-col gap-4 overflow-y-auto">
                {/* Drag & Drop File Zone */}
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#475569] block mb-2">
                    1. Select Spreadsheet (.xlsx, .xls, .csv)
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#C5D5CA] hover:border-[#1D4A38] hover:bg-[#F4F6F0] rounded-2xl p-6 text-center cursor-pointer transition-all bg-white group shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#1D4A38] flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#1E293B]">
                      Click or drag &amp; drop spreadsheet here
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">
                      Supports native Excel workbooks (.xlsx) &amp; CSV files
                    </p>
                    {excelFileName ? (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] text-[#1D4A38] px-3 py-1 text-xs font-bold border border-[#C5D5CA]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready: {excelFileName}</span>
                      </div>
                    ) : (
                      <span className="mt-3 inline-block text-[10px] text-[#94A3B8] font-mono">
                        Drag file from your desktop
                      </span>
                    )}
                  </div>
                </div>

                {/* Official Templates & Quick Actions */}
                <div className="rounded-2xl bg-white border border-[#E2E6DD] p-4 space-y-2.5 shadow-2xs">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#475569] block">
                    2. Official Gelavu Templates
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadXlsxTemplate}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1D4A38] text-white text-xs font-bold hover:bg-[#16392B] transition-colors cursor-pointer shadow-xs"
                      title="Download genuine Microsoft Excel (.xlsx) file"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .XLSX Excel</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F6F0] border border-[#D5D9CE] text-[#1E293B] text-xs font-bold hover:bg-[#EEF1EB] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Download .CSV</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyHeaderRow}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F6F0] border border-[#D5D9CE] text-xs font-bold text-[#1E293B] hover:bg-[#EEF1EB] transition-colors cursor-pointer"
                    >
                      {copiedHeaders ? <Check className="w-3.5 h-3.5 text-[#1D4A38]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
                      <span>{copiedHeaders ? "Copied!" : "Copy Headers"}</span>
                    </button>
                  </div>
                </div>

                {/* Column Format Guide (Compact & Comprehensive) */}
                <div className="rounded-2xl bg-white border border-[#E2E6DD] p-4 space-y-2.5 flex-1 flex flex-col shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1D4A38]" />
                      <span>Required &amp; Optional Columns</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#1D4A38] bg-[#E8EFEA] px-2 py-0.5 rounded-full">
                      5 Standard Columns
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#EEF0E8] flex-1">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F9FAF6] border-b border-[#EEF0E8] text-[#475569] font-bold text-[11px]">
                        <tr>
                          <th className="p-2">Header</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Description / Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F3EC] text-[11px]">
                        <tr>
                          <td className="p-2 font-mono font-bold text-[#1D4A38]">Player_Name</td>
                          <td className="p-2 text-rose-600 font-bold">Required</td>
                          <td className="p-2 text-[#475569]">Player full name</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono font-bold text-[#1D4A38]">Phone</td>
                          <td className="p-2 text-rose-600 font-bold">Required</td>
                          <td className="p-2 text-[#475569]">WhatsApp contact number</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono font-bold text-[#1D4A38]">Category</td>
                          <td className="p-2 text-rose-600 font-bold">Required</td>
                          <td className="p-2 text-[#475569]">Men&apos;s Doubles, Mixed, Wheel, Singles</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono text-[#1E293B]">Partner_Name</td>
                          <td className="p-2 text-amber-700 font-bold">BYOP Only</td>
                          <td className="p-2 text-[#64748B]">Blank for singles/wheel draw</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono text-[#1E293B]">Payment_Status</td>
                          <td className="p-2 text-[#1D4A38] font-bold">Required</td>
                          <td className="p-2 text-[#64748B]">PAID, CASH, or PENDING</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[10px] text-[#64748B] bg-[#F5F6F0] p-2.5 rounded-xl border border-[#E2E6DD] leading-relaxed">
                    💡 <strong>Pure Registration Format:</strong> Only the essential 5 columns are needed. Bracket placement, seeding, and draws happen transparently in the Fixtures &amp; Live Picker Wheel stage!
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Live Parsed Entrants Grid */}
              <div className="lg:col-span-7 p-6 flex flex-col overflow-hidden bg-white">
                {parsedExcelRows.length > 0 ? (
                  <div className="flex flex-col h-full overflow-hidden space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#EEF0E8] shrink-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-[#1E293B]">
                            Parsed {parsedExcelRows.length} Valid Entrants
                          </span>
                          <span className="text-[10px] text-[#1D4A38] font-black uppercase tracking-wider bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#CAD7CE]">
                            ✓ Ready to Import
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Review extracted entries before committing into the tournament draw.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setParsedExcelRows([]);
                          setExcelFileName("");
                        }}
                        className="text-xs font-bold text-[#64748B] hover:text-rose-600 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-rose-50"
                      >
                        Clear List
                      </button>
                    </div>

                    {/* Scrollable Data Grid */}
                    <div className="flex-1 overflow-y-auto rounded-2xl border border-[#E2E6DD] bg-[#FAFBF7]">
                      <table className="w-full text-left text-xs">
                        <thead className="sticky top-0 bg-[#F0F2EB] border-b border-[#E2E6DD] text-[11px] font-black text-[#475569] uppercase tracking-wider z-10">
                          <tr>
                            <th className="p-3 w-12 text-center">#</th>
                            <th className="p-3">Player &amp; Partner</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Category</th>
                            <th className="p-3 text-center">Payment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EEF0E8]">
                          {parsedExcelRows.map((r, i) => (
                            <tr key={i} className="hover:bg-white transition-colors">
                              <td className="p-3 text-center font-mono font-bold text-[#64748B]">{i + 1}</td>
                              <td className="p-3">
                                <span className="font-bold text-[#1E293B] block">{r.name}</span>
                                {r.partnerName && (
                                  <span className="text-[11px] text-[#1D4A38] font-semibold">
                                    &amp; {r.partnerName}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 font-mono text-[11px] text-[#475569]">{r.phone}</td>
                              <td className="p-3 font-medium text-[#1E293B]">{r.category}</td>
                              <td className="p-3 text-center">
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                    r.paymentStatus === "CASH"
                                      ? "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]"
                                      : r.paymentStatus === "PENDING"
                                      ? "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]"
                                      : "bg-[#E8EFEA] text-[#1D4A38] border-[#CAD7CE]"
                                  }`}
                                >
                                  {r.paymentStatus || "PAID"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Empty state when no file uploaded */
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-[#E2E6DD] rounded-2xl bg-[#FAFBF7]">
                    <div className="w-16 h-16 rounded-3xl bg-[#E8EFEA] text-[#1D4A38] flex items-center justify-center mb-3">
                      <FileSpreadsheet className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-[#1E293B]">
                      No Spreadsheet Uploaded Yet
                    </h4>
                    <p className="text-xs text-[#64748B] max-w-sm mt-1 leading-relaxed">
                      Drop an <strong>.xlsx</strong> or <strong>.csv</strong> file on the left (or click Download Template) to see a live table preview of your entrants here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Sticky Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-[#EEF0E8] bg-[#F9FAF6] flex items-center justify-between shrink-0">
              <div className="text-xs text-[#64748B]">
                {parsedExcelRows.length > 0 ? (
                  <span>
                    Ready to commit <strong>{parsedExcelRows.length} players</strong> into tournament roster.
                  </span>
                ) : (
                  <span>Select or drop a spreadsheet file to preview.</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsExcelModalOpen(false);
                    setParsedExcelRows([]);
                  }}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={parsedExcelRows.length === 0}
                  onClick={handleConfirmExcelImport}
                  className="px-6 py-2.5 rounded-full bg-[#1D4A38] hover:bg-[#16392B] disabled:opacity-40 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span>Import {parsedExcelRows.length > 0 ? `${parsedExcelRows.length} Players` : ""} into Roster</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: AI PHOTO / OCR CAMERA LIST SCANNER (FULLSCREEN WIDESCREEN) */}
      {/* ============================================================ */}
      {isAiOcrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl h-[92vh] max-h-[960px] rounded-3xl border border-[#D5D9CE] bg-white shadow-2xl flex flex-col overflow-hidden text-[#1E293B]">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-[#EEF0E8] bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8EFEA] border border-[#CAD7CE] flex items-center justify-center text-[#1D4A38]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
                    AI Tournament Sheet &amp; Photo OCR Scanner
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Gelavu Vision AI extracts names, phone numbers, and categories from paper &amp; chat screenshots
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAiOcrModalOpen(false);
                  setOcrResults([]);
                  setOcrImagePreview(null);
                }}
                className="w-9 h-9 rounded-full bg-[#F5F6F0] hover:bg-[#E8EFEA] text-[#64748B] hover:text-[#1E293B] flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                title="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Widescreen 2-Column Body */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* Left Column (5 cols): Photo Upload & Scanner Controls */}
              <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#EEF0E8] bg-[#FDFDFB] flex flex-col gap-4 overflow-y-auto">
                {!ocrImagePreview ? (
                  <div className="space-y-4">
                    <label className="border-2 border-dashed border-[#C5D5CA] hover:border-[#1D4A38] hover:bg-[#F4F6F0] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white shadow-2xs group">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleOcrImageUpload}
                        className="hidden"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-[#E8EFEA] text-[#1D4A38] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Camera className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-bold text-[#1E293B]">
                        Snap Photo or Upload Tournament Paper / Screenshot
                      </span>
                      <span className="text-xs text-[#64748B] mt-1 max-w-sm">
                        Automatically recognizes player names, WhatsApp phone numbers, and categories.
                      </span>
                    </label>

                    {/* Instant 1-Click Sample Testers */}
                    <div className="rounded-2xl bg-white border border-[#E2E6DD] p-4 space-y-2.5 shadow-2xs">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#475569] block">
                        Quick Sample Testers
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => runOcrScanningSimulation(SAMPLE_PAPER_SHEET_SVG, "paper")}
                          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] hover:bg-[#EEF1EB] text-xs font-bold text-[#1E293B] transition-colors cursor-pointer"
                        >
                          <span>📄 Test Paper Sheet</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => runOcrScanningSimulation(SAMPLE_WHATSAPP_SVG, "whatsapp")}
                          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] hover:bg-[#EEF1EB] text-xs font-bold text-[#1E293B] transition-colors cursor-pointer"
                        >
                          <span>💬 Test WhatsApp Chat</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-center text-[#64748B] pt-1">
                        💡 <strong>Clipboard Paste:</strong> Press <strong>Ctrl+V</strong> anywhere in this modal to paste an image!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Image Preview with Laser Scanning Animation */}
                    <div className="relative rounded-2xl overflow-hidden border border-[#D5D9CE] max-h-60 bg-slate-900 flex items-center justify-center shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ocrImagePreview} alt="OCR Target" className="w-full h-auto object-cover opacity-85" />

                      {isOcrScanning && (
                        <div className="absolute inset-0 bg-[#1D4A38]/30 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 p-4 text-center">
                          <div className="w-full h-1 bg-[#1D4A38] animate-bounce shadow-[0_0_15px_#1D4A38]" />
                          <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-black text-[#1D4A38] border border-[#C5D5CA] shadow-md animate-pulse">
                            ⚡ {ocrScanStep || "Gelavu Vision AI: Extracting Participant Names..."}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setOcrResults([]);
                          setOcrImagePreview(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4A38] hover:underline cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Choose another image</span>
                      </button>

                      {ocrRawText && (
                        <button
                          type="button"
                          onClick={() => setShowRawOcrText(!showRawOcrText)}
                          className="text-xs font-bold text-[#64748B] hover:text-[#1E293B] underline cursor-pointer"
                        >
                          {showRawOcrText ? "Hide Raw OCR" : "View Raw OCR"}
                        </button>
                      )}
                    </div>

                    {showRawOcrText && ocrRawText && (
                      <div className="p-3 rounded-xl bg-[#F0F2EB] border border-[#E2E6DD] text-xs font-mono space-y-1.5 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#D5D9CE] pb-1.5">
                          <span className="font-bold text-[#1E293B] text-[11px]">Detected Document Text Lines:</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(ocrRawText);
                              showToast("Copied raw OCR transcription!", "info");
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D4A38] hover:underline"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap text-[10px] text-[#475569]">{ocrRawText}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column (7 cols): Extracted & Editable Player Cards */}
              <div className="lg:col-span-7 p-6 flex flex-col overflow-hidden bg-white">
                {ocrResults.length > 0 ? (
                  <div className="flex flex-col h-full overflow-hidden space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#EEF0E8] shrink-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-[#1E293B]">
                            AI Identified {ocrResults.length} Entries
                          </span>
                          <span className="text-[10px] text-[#1D4A38] font-black uppercase tracking-wider bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#CAD7CE]">
                            ✓ Editable
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Edit inline to adjust any player name, mobile number, or category before importing.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddOcrRow}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4A38] bg-[#E8EFEA] hover:bg-[#D5E4D9] px-3 py-1.5 rounded-xl border border-[#CAD7CE] cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Missed Player</span>
                      </button>
                    </div>

                    {/* Scrollable Editable Cards List */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                      {ocrResults.map((r, i) => (
                        <div key={r.id || i} className="p-3.5 rounded-2xl border border-[#E2E6DD] bg-[#FAFBF7] space-y-2.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-[#1D4A38] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#CAD7CE]">
                              #{i + 1} · {r.confidence}% Confidence
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOcrRow(r.id)}
                              className="text-[#94A3B8] hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                              title="Remove entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="text-[10px] font-bold text-[#64748B] block mb-1">Player Name</label>
                              <input
                                type="text"
                                value={r.name}
                                onChange={(e) => handleUpdateOcrRow(r.id, "name", e.target.value)}
                                className="w-full h-9 rounded-xl border border-[#D5D9CE] bg-white px-3 text-xs font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-[#64748B] block mb-1">Mobile Number (WhatsApp)</label>
                              <input
                                type="text"
                                value={r.phone}
                                onChange={(e) => handleUpdateOcrRow(r.id, "phone", e.target.value)}
                                className="w-full h-9 rounded-xl border border-[#D5D9CE] bg-white px-3 text-xs text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                            <div>
                              <label className="text-[10px] font-bold text-[#64748B] block mb-1">Category</label>
                              <select
                                value={r.category}
                                onChange={(e) => handleUpdateOcrRow(r.id, "category", e.target.value)}
                                className="w-full h-9 rounded-xl border border-[#D5D9CE] bg-white px-2 text-xs text-[#1E293B] focus:border-[#1D4A38] focus:outline-none cursor-pointer"
                              >
                                <option value="Men's Doubles (BYOP)">Men&apos;s Doubles (BYOP)</option>
                                <option value="Mixed Doubles">Mixed Doubles</option>
                                <option value="Random Wheel Doubles">Random Wheel Doubles</option>
                                <option value="Men's Singles">Men&apos;s Singles</option>
                                <option value="Women's Singles">Women&apos;s Singles</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-[#64748B] block mb-1">Partner Name (BYOP)</label>
                              <input
                                type="text"
                                value={r.partnerName}
                                placeholder={r.category.includes("Doubles") ? "Partner Name" : "N/A"}
                                onChange={(e) => handleUpdateOcrRow(r.id, "partnerName", e.target.value)}
                                className="w-full h-9 rounded-xl border border-[#D5D9CE] bg-white px-3 text-xs text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-[#64748B] block mb-1">Payment Status</label>
                              <select
                                value={r.paymentStatus}
                                onChange={(e) => handleUpdateOcrRow(r.id, "paymentStatus", e.target.value)}
                                className="w-full h-9 rounded-xl border border-[#D5D9CE] bg-white px-2 text-xs text-[#1E293B] focus:border-[#1D4A38] focus:outline-none cursor-pointer"
                              >
                                <option value="PAID">PAID</option>
                                <option value="CASH">CASH</option>
                                <option value="PENDING">PENDING</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-[#E2E6DD] rounded-2xl bg-[#FAFBF7]">
                    <div className="w-16 h-16 rounded-3xl bg-[#E8EFEA] text-[#1D4A38] flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-[#1E293B]">
                      No Image Scanned Yet
                    </h4>
                    <p className="text-xs text-[#64748B] max-w-sm mt-1 leading-relaxed">
                      Snap or upload a sign-up sheet on the left (or click a sample test) to see editable participant cards extracted here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Sticky Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-[#EEF0E8] bg-[#F9FAF6] flex items-center justify-between shrink-0">
              <div className="text-xs text-[#64748B]">
                {ocrResults.length > 0 ? (
                  <span>
                    Ready to import <strong>{ocrResults.length} scanned players</strong> into tournament roster.
                  </span>
                ) : (
                  <span>Select or snap a photo on the left to extract.</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAiOcrModalOpen(false);
                    setOcrResults([]);
                    setOcrImagePreview(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={ocrResults.length === 0}
                  onClick={handleConfirmAiOcrImport}
                  className="px-6 py-2.5 rounded-full bg-[#1D4A38] hover:bg-[#16392B] disabled:opacity-40 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span>Import {ocrResults.length > 0 ? `${ocrResults.length} Players` : ""} into Roster</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
