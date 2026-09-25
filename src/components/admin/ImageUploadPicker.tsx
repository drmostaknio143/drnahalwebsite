"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  X,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  FolderOpen,
} from "lucide-react";

interface MediaItem {
  src: string;
  name: string;
  source: "supabase" | "upload" | "system";
  category?: string;
}

interface ImageUploadPickerProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
}

export default function ImageUploadPicker({
  value,
  onChange,
  folder = "gallery",
  label = "Practice Photo / Image",
  required = true,
}: ImageUploadPickerProps) {
  const [mode, setMode] = useState<"upload" | "library" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Library state
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch available library media
  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/admin/upload");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMediaList(json.data);
      }
    } catch (err) {
      console.error("Failed to load media library:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (mode === "library" && mediaList.length === 0) {
      fetchMedia();
    }
  }, [mode]);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10MB");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        onChange(data.url);
        setUploadSuccess(
          data.storage === "supabase"
            ? "Uploaded to Supabase Cloud Storage!"
            : "Uploaded to server storage successfully!"
        );
        // Refresh library in background
        fetchMedia();
      } else {
        setUploadError(data.error || "Failed to upload image");
      }
    } catch (err: any) {
      setUploadError(err.message || "Network error during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Filter media items
  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.src.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Uploaded" && (item.source === "upload" || item.source === "supabase")) ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-3">
      {/* Top Header & Tab Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-semibold text-slate-300">
          {label} {required && <span className="text-emerald-400">*</span>}
        </label>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              mode === "upload"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from PC</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("library");
              if (mediaList.length === 0) fetchMedia();
            }}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              mode === "library"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Existing Photos</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              mode === "url"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>URL / Path</span>
          </button>
        </div>
      </div>

      {/* Current Selection Preview Box (If image selected) */}
      {value && (
        <div className="flex items-center gap-3 p-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
          <div className="relative w-16 h-14 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800">
            <img
              src={value}
              alt="Selected"
              className="w-full h-full object-cover"
              onError={(e) => {
                // In case of broken image link
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              Photo Selected
            </p>
            <p className="text-[11px] text-slate-300 truncate font-mono mt-0.5" title={value}>
              {value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Remove selection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mode 1: Upload from PC */}
      {mode === "upload" && (
        <div className="space-y-2">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
                : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <div className="flex flex-col items-center justify-center gap-2">
              <div
                className={`p-3 rounded-2xl ${
                  dragActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-900 text-slate-300"
                } border border-slate-800`}
              >
                {uploading ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  {uploading ? (
                    <span className="text-emerald-400">Uploading image to storage...</span>
                  ) : (
                    <>
                      <span className="text-emerald-400 font-bold hover:underline">
                        Click to upload from PC
                      </span>{" "}
                      or drag & drop here
                    </>
                  )}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Supports JPG, PNG, WebP, AVIF (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {uploadError && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{uploadError}</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{uploadSuccess}</span>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Choose from Existing Gallery / Media Library */}
      {mode === "library" && (
        <div className="space-y-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
          {/* Search & Filter Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search existing clinic photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["All", "Chambers", "Equipment", "Events/Teaching", "Uploaded"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                type="button"
                onClick={fetchMedia}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 shrink-0"
                title="Refresh library"
              >
                <RefreshCw className={`w-3 h-3 ${loadingMedia ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="max-h-60 overflow-y-auto pr-1">
            {loadingMedia ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                Loading media library photos...
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs">
                <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                No matching photos found
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {filteredMedia.map((item, idx) => {
                  const isSelected = value === item.src;
                  return (
                    <div
                      key={idx}
                      onClick={() => onChange(item.src)}
                      className={`group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                        isSelected
                          ? "border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg scale-[1.02]"
                          : "border-slate-800/80 hover:border-slate-700 bg-slate-900"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Category Tag */}
                      {item.category && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-emerald-400 border border-emerald-500/20 backdrop-blur-xs">
                          {item.category}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: Manual URL / Path Input */}
      {mode === "url" && (
        <div className="space-y-1">
          <input
            type="text"
            required={required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /images/hero/seq-1.jpeg or https://..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-[10px] text-slate-500">
            Enter an existing local path (/images/...) or external direct image link.
          </p>
        </div>
      )}
    </div>
  );
}
