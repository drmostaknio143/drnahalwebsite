"use client";

import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { GalleryItemRecord } from "@/lib/supabase/types";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItemRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      src: "/images/hero/seq-1.jpeg",
      category: "Chambers",
      caption_en: "",
      caption_bn: "",
      chamber_name_en: "An Nahar Specialized Eye Hospital",
      chamber_name_bn: "আন নাহার স্পেশালাইজড আই হসপিটাল",
      order_index: items.length + 1,
      is_published: true,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (item: GalleryItemRecord) => {
    setEditingItem({ ...item });
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
      const res = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchGallery();
      } else {
        setErrorMsg(data.error || "Failed to save photo");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setDeleteConfirmId(null);
      } else {
        alert(data.error || "Failed to delete photo");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Network error deleting photo");
    }
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Practice Photo Gallery Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage clinic facility photos, modern ophthalmic equipment, and surgical events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchGallery}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 py-16 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading gallery photos...
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
            >
              <div>
                <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.caption_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-emerald-400 border border-emerald-500/30">
                    {item.category}
                  </span>
                </div>

                <div className="p-3.5 space-y-1">
                  <p className="text-xs font-semibold text-white line-clamp-2">
                    {item.caption_en}
                  </p>
                  <p className="text-[11px] text-slate-400 font-bengali line-clamp-1">
                    {item.caption_bn}
                  </p>
                  {item.chamber_name_en && (
                    <span className="inline-block text-[10px] text-teal-400/90 pt-1">
                      📍 {item.chamber_name_en}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  #{item.order_index}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                    title="Edit Photo"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(item.id!)}
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
                      onClick={() => setDeleteConfirmId(item.id!)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="Delete"
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
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm font-display">
                  {editingItem.id ? "Edit Gallery Photo" : "Add Practice Photo"}
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="px-6 pt-3 pb-2 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "en"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇬🇧 English Caption
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bn")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                  activeTab === "bn"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇧🇩 বাংলা ক্যাপশন
              </button>
            </div>

            {errorMsg && (
              <div className="m-6 mb-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.src || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, src: e.target.value })
                  }
                  placeholder="/images/hero/seq-1.jpeg"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category || "Chambers"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Chambers">Chambers</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Events/Teaching">Events/Teaching</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index ?? 1}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        order_index: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {activeTab === "en" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Caption (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.caption_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, caption_en: e.target.value })
                      }
                      placeholder="Consultation chamber at An Nahar Eye Hospital"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Chamber Name (English)
                    </label>
                    <input
                      type="text"
                      value={editingItem.chamber_name_en || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          chamber_name_en: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ক্যাপশন (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.caption_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, caption_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      চেম্বারের নাম (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editingItem.chamber_name_bn || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          chamber_name_bn: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
