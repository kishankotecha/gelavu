"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  Smile,
  X,
  Check,
  RefreshCw,
  AlertCircle,
  Dices,
  Trash2,
} from "lucide-react";
import { STICKER_AVATARS, getRandomSticker } from "@/data/stickers";

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  userName?: string;
  onSelectAvatar: (avatarUrl: string) => void;
}

export function AvatarPickerModal({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
}: AvatarPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"stickers" | "upload" | "camera">("stickers");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar || "sticker:smash-beast");

  // Camera states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // File upload states
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Roll animation
  const [isRolling, setIsRolling] = useState(false);

  // Safe camera lifecycle management
  useEffect(() => {
    let isCancelled = false;
    let localStream: MediaStream | null = null;

    if (isOpen && activeTab === "camera" && !capturedPhoto) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        window.setTimeout(() => {
          if (!isCancelled) {
            setCameraError("Camera is not supported on this browser or connection.");
          }
        }, 0);
        return;
      }

      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 640 },
          },
          audio: false,
        })
        .then((stream) => {
          if (isCancelled) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          localStream = stream;
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setCameraError(null);
        })
        .catch((err: unknown) => {
          if (!isCancelled) {
            const msg = err instanceof Error ? err.message : "Unable to access camera";
            setCameraError(msg + ". Please grant camera permissions or upload an image file instead.");
          }
        });
    }

    return () => {
      isCancelled = true;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, activeTab, capturedPhoto]);

  // Handle countdown snap
  const triggerCountdown = () => {
    if (countdown !== null) return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          clearInterval(interval);
          snapPhoto();
          return null;
        }
        return c - 1;
      });
    }, 1000);
  };

  // Snap photo from video element
  const snapPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const size = Math.min(video.videoWidth || 480, video.videoHeight || 480);
    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Mirror front camera
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      const sx = ((video.videoWidth || 480) - size) / 2;
      const sy = ((video.videoHeight || 480) - size) / 2;
      ctx.drawImage(video, sx, sy, size, size, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
      setCapturedPhoto(dataUrl);
      setSelectedAvatar(dataUrl);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  // Process uploaded image file
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = Math.min(img.width, img.height);
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;
          ctx.drawImage(img, sx, sy, size, size, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL("image/jpeg", 0.88);
          setSelectedAvatar(compressed);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Roll random sticker
  const handleRollSticker = () => {
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const rand = getRandomSticker();
      setSelectedAvatar(`sticker:${rand.id}`);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 120);
  };

  if (!isOpen) return null;

  const currentStickerObj = selectedAvatar.startsWith("sticker:")
    ? STICKER_AVATARS.find((s) => `sticker:${s.id}` === selectedAvatar)
    : null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-[#121622] border border-[#313747] text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#313747] bg-[#182030]/60 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#F3D15A] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F3D15A]">
                Athlete Identity
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Choose Profile Avatar
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Mode Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-[#0A0D14]/80 border-b border-[#313747] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("stickers")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "stickers"
                ? "bg-[#F3D15A] text-[#0A0D14] shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Crazy Stickers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-[#F3D15A] text-[#0A0D14] shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("camera")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "camera"
                ? "bg-[#F3D15A] text-[#0A0D14] shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Take Selfie</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ======================================================== */}
          {/* TAB 1: CRAZY STICKER CREATOR / SELECTOR                   */}
          {/* ======================================================== */}
          {activeTab === "stickers" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-300">
                    Express your game with a crazy cartoon sports sticker.
                  </p>
                  <p className="text-[11px] text-gray-500">
                    No photo? Stand out on the leaderboard with pure humor &amp; energy.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRollSticker}
                  disabled={isRolling}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#DE9D35]/20 border border-[#DE9D35]/40 text-[#F3D15A] text-xs font-black hover:bg-[#DE9D35]/30 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Dices className={`w-4 h-4 ${isRolling ? "animate-spin" : ""}`} />
                  <span>{isRolling ? "Rolling..." : "Roll Random 🎲"}</span>
                </button>
              </div>

              {/* Active Selection Highlight Bar */}
              {currentStickerObj && (
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#182030] to-[#121622] border border-[#313747] shadow-inner">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F3D15A] shrink-0 shadow-lg">
                    {React.createElement(currentStickerObj.SvgComponent, { className: "w-full h-full" })}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">{currentStickerObj.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#F3D15A]/20 text-[#F3D15A] font-bold">
                        {currentStickerObj.trait}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 italic mt-0.5 truncate">
                      &ldquo;{currentStickerObj.tagline}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* 12 Stickers Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {STICKER_AVATARS.map((sticker) => {
                  const isSelected = selectedAvatar === `sticker:${sticker.id}`;
                  const Svg = sticker.SvgComponent;

                  return (
                    <button
                      key={sticker.id}
                      type="button"
                      onClick={() => setSelectedAvatar(`sticker:${sticker.id}`)}
                      className={`group relative flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-[#1f293d] border-[#F3D15A] ring-2 ring-[#F3D15A]/50 shadow-lg scale-[1.03]"
                          : "bg-[#0E1526]/70 border-[#313747] hover:border-gray-500 hover:bg-[#161D2E]"
                      }`}
                    >
                      {/* Selection Check Badge */}
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F3D15A] text-[#0A0D14] shadow-sm">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      )}

                      {/* Sticker Avatar */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-white/20 shadow-md group-hover:scale-105 transition-transform">
                        <Svg className="w-full h-full" />
                      </div>

                      <span className="text-xs font-bold text-white mt-2 truncate w-full">
                        {sticker.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium truncate w-full">
                        {sticker.trait}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: STORAGE FILE UPLOAD                                */}
          {/* ======================================================== */}
          {activeTab === "upload" && (
            <div className="space-y-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileProcess(file);
                }}
              />

              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileProcess(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  isDragging
                    ? "border-[#F3D15A] bg-[#F3D15A]/10 scale-[1.01]"
                    : "border-[#313747] bg-[#0E1526]/60 hover:border-gray-500 hover:bg-[#161D2E]"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#F3D15A] shadow-inner mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white">Upload from this device</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Drag and drop a photo here, or click to browse files (JPEG, PNG, WebP up to 10MB)
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                  Browse Device Storage
                </span>
              </div>

              {/* Uploaded Preview */}
              {selectedAvatar.startsWith("data:image") && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161D2E] border border-emerald-500/30">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-emerald-400 shadow-lg shrink-0"
                      style={{ backgroundImage: `url(${selectedAvatar})` }}
                    />
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" /> Photo Uploaded
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        High-resolution photo ready to apply to your athlete profile.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(currentAvatar || "sticker:smash-beast");
                    }}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: LIVE SELFIE CAMERA                                 */}
          {/* ======================================================== */}
          {activeTab === "camera" && (
            <div className="space-y-4">
              {cameraError ? (
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" /> Camera Unavailable
                  </div>
                  <p>{cameraError}</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("upload")}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 text-white font-bold hover:bg-rose-500/30 cursor-pointer"
                  >
                    Switch to File Upload
                  </button>
                </div>
              ) : capturedPhoto ? (
                /* Selfie Review Mode */
                <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#0E1526] border border-[#313747] space-y-4 text-center">
                  <div className="relative">
                    <div
                      className="w-44 h-44 rounded-full bg-cover bg-center border-4 border-[#F3D15A] shadow-2xl"
                      style={{ backgroundImage: `url(${capturedPhoto})` }}
                    />
                    <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Selfie Ready!</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Looking sharp for the city tournament circuit.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCapturedPhoto(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Retake Selfie</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Live Viewfinder Mode */
                <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-[#0E1526] border border-[#313747] space-y-4">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-[#DE9D35]/60 bg-black shadow-2xl flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />

                    {/* Circular Guide Ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-dashed border-white/40" />

                    {/* Countdown Overlay */}
                    {countdown !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                        <span className="text-6xl font-black text-[#F3D15A] animate-ping">
                          {countdown}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 text-center">
                    Center your face inside the circle and smile!
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={triggerCountdown}
                      disabled={countdown !== null}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F3D15A] text-[#0A0D14] text-sm font-black hover:bg-[#DE9D35] transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{countdown !== null ? `Snapping in ${countdown}...` : "Snap Selfie"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Confirmation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#313747] bg-[#182030]/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectAvatar(selectedAvatar);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DE9D35] to-[#F3D15A] text-[#0A0D14] text-xs font-black hover:opacity-95 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Apply Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
