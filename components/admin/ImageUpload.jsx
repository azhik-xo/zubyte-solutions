"use client";

import React, { useState, useRef } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Cloudinary Image Upload Component with Drag & Drop and Preview
 */
export default function ImageUpload({
  value = "",
  onChange,
  folder = "zubyte_asset",
  label = "Cover Image (Cloudinary)",
  helperText = "Upload high-res PNG, JPG, WEBP (Max 10MB)",
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, JPEG, WEBP, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const res = await api.upload.uploadImage(file, folder);
      if (res.data?.url) {
        onChange(res.data.url);
      } else {
        throw new Error(res.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message || "Failed to upload image to Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const copyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayUrl = value
    ? value.startsWith("http") || value.startsWith("/")
      ? value
      : `https://images.unsplash.com/${value}?w=800&auto=format`
    : "";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-bold text-white/80 tracking-wide uppercase">
          {label}
        </label>
      )}

      {displayUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 group">
          <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            <img
              src={displayUrl}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-white text-[#1b1b1b] text-xs font-bold hover:bg-white/90 transition-all cursor-pointer shadow-lg"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-4 py-2 rounded-xl bg-red-500/90 text-white text-xs font-bold hover:bg-red-600 transition-all cursor-pointer shadow-lg"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#171717] border-t border-white/10 flex items-center justify-between gap-2">
            <p className="text-[11px] text-white/60 font-mono truncate max-w-xs sm:max-w-sm">
              {value}
            </p>
            <button
              type="button"
              onClick={copyUrl}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-colors shrink-0 cursor-pointer"
            >
              {copied ? "Copied! ✓" : "Copy URL"}
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "h-40 sm:h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer",
            isDragging
              ? "border-[#F1681D] bg-[#F1681D]/10"
              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/[0.07]",
            isUploading && "opacity-50 pointer-events-none"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#F1681D] border-t-transparent animate-spin" />
              <p className="text-xs font-bold text-white">Uploading to Cloudinary...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/70 mb-3 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-xs font-bold text-white mb-1">
                Click to upload or drag & drop
              </p>
              <p className="text-[11px] text-white/40">{helperText}</p>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input fallback */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[11px] text-white/40">Or paste URL:</span>
        <input
          type="text"
          placeholder="https://res.cloudinary.com/... or Unsplash ID"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#F1681D]"
        />
      </div>

      {error && <p className="text-xs text-red-400 font-semibold">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

