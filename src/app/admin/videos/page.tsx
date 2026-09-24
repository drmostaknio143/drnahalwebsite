"use client";

import { useEffect, useState } from "react";
import {
  Video as VideoIcon,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Play,
  Star,
} from "lucide-react";
import type { VideoItem } from "@/lib/supabase/types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<VideoItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/videos");
      const json = await res.json();
      if (json.success) {
        setVideos(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      video_code: `vid-${videos.length + 1}`,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtube_id: "dQw4w9WgXcQ",
      category: "Cataract",
      title_en: "",
      title_bn: "",
      tag_en: "Surgery",
      tag_bn: "সার্জারি",
      description_en: "",
      description_bn: "",
      is_featured: false,
      order_index: videos.length + 1,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (vid: VideoItem) => {
    setEditingItem({ ...vid });
    setEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setErrorMsg("");

    const isEdit = !!editingItem.id;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/videos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchVideos();
      } else {
        setErrorMsg(data.error || "Failed to save video");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, video_code?: string) => {
    try {
      const res = await fetch(`/api/admin/videos?id=${id}&video_code=${video_code || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id && v.video_code !== video_code));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const filtered = videos.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      v.title_en?.toLowerCase().includes(q) ||
      v.title_bn?.toLowerCase().includes(q) ||
      v.category?.toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || v.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Surgical & Educational Video Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage YouTube surgical clips, patient guidance videos, and educational demonstrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchVideos}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Video</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-[#090f1d] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos by title or category..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Video Categories</option>
            <option value="Cataract">Cataract</option>
            <option value="Vitreoretina">Vitreoretina</option>
            <option value="Refractive">Refractive</option>
            <option value="ROP">ROP</option>
            <option value="Oculoplasty">Oculoplasty</option>
            <option value="Patient Education">Patient Education</option>
          </select>
          <span className="text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
            {filtered.length} Videos
          </span>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-16 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading video records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 py-16 text-center text-slate-500 bg-[#090f1d] rounded-2xl border border-slate-800">
            No videos found matching your search.
          </div>
        ) : (
          filtered.map((vid) => (
            <div
              key={vid.id || vid.video_code}
              className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                {/* Video thumbnail preview */}
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center group overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtube_id || "dQw4w9WgXcQ"}/hqdefault.jpg`}
                    alt={vid.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/40">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white border border-white/20">
                    {vid.category}
                  </span>
                  {vid.is_featured && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-white text-sm line-clamp-2">
                    {vid.title_en}
                  </h3>
                  <div className="text-rose-400 text-xs font-bengali line-clamp-1">
                    {vid.title_bn}
                  </div>
                  {vid.description_en && (
                    <p className="text-xs text-slate-400 line-clamp-2 pt-1">
                      {vid.description_en}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {vid.video_code}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(vid)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="Edit Video"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {deleteConfirmId === (vid.id || vid.video_code) ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(vid.id || "", vid.video_code)}
                        className="p-1.5 rounded-lg bg-rose-500 text-white"
                        title="Confirm"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(vid.id || vid.video_code)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <VideoIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    {editingItem.id ? "Edit Video Clip" : "Add Surgical Video"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter YouTube video link, titles, and procedural category
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pt-3 pb-2 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "en"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇬🇧 English Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bn")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                  activeTab === "bn"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇧🇩 বাংলা কন্টেন্ট
              </button>
            </div>

            {errorMsg && (
              <div className="m-6 mb-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Video Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.video_code || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, video_code: e.target.value })
                    }
                    placeholder="vid-1"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Video ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.youtube_id || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      // extract if full url
                      const match = val.match(/(?:youtu\.be\/|v=)([\w-]+)/);
                      const id = match ? match[1] : val;
                      setEditingItem({
                        ...editingItem,
                        youtube_id: id,
                        url: `https://www.youtube.com/watch?v=${id}`,
                      });
                    }}
                    placeholder="dQw4w9WgXcQ"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category || "Cataract"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Cataract">Cataract</option>
                    <option value="Vitreoretina">Vitreoretina</option>
                    <option value="Refractive">Refractive</option>
                    <option value="ROP">ROP</option>
                    <option value="Oculoplasty">Oculoplasty</option>
                    <option value="Patient Education">Patient Education</option>
                  </select>
                </div>
              </div>

              {activeTab === "en" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Video Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, title_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tag / Badge (English)
                    </label>
                    <input
                      type="text"
                      value={editingItem.tag_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, tag_en: e.target.value })
                      }
                      placeholder="Phaco · MICS"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Clinical Description (English)
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description_en || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description_en: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ভিডিওর শিরোনাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, title_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ট্যাগ / ব্যাজ (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editingItem.tag_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, tag_bn: e.target.value })
                      }
                      placeholder="ফ্যাকো · MICS"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সার্জিক্যাল বিবরণ (বাংলা)
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description_bn || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description_bn: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredVideoToggle"
                  checked={editingItem.is_featured || false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_featured: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="featuredVideoToggle"
                  className="text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Featured Video (Highlighted on Homepage)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving Video..." : "Save Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
