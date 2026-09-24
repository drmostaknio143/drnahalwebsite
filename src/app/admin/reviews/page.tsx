"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { ReviewRecord } from "@/lib/supabase/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ReviewRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const json = await res.json();
      if (json.success) {
        setReviews(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      author_en: "",
      author_bn: "",
      city_en: "Dhaka",
      city_bn: "ঢাকা",
      treatment_en: "Cataract Phaco Surgery",
      treatment_bn: "ছানি অপারেশন",
      stars: 5,
      text_en: "",
      text_bn: "",
      is_featured: true,
      order_index: reviews.length + 1,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (rev: ReviewRecord) => {
    setEditingItem({ ...rev });
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
      const res = await fetch("/api/admin/reviews", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchReviews();
      } else {
        setErrorMsg(data.error || "Failed to save review");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Patient Reviews & Testimonials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Google patient feedback, surgical testimonials, and star ratings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchReviews}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-16 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading patient reviews...
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">
                    {rev.author_en}
                  </h3>
                  <div className="text-amber-400/90 text-xs font-bengali">
                    {rev.author_bn}
                  </div>
                  {rev.treatment_en && (
                    <span className="inline-block text-[11px] text-teal-400 font-medium">
                      Procedure: {rev.treatment_en}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-xs text-slate-300 leading-relaxed italic">
                  <p>&ldquo;{rev.text_en}&rdquo;</p>
                  <p className="text-slate-400 font-bengali mt-1.5 not-italic">
                    &ldquo;{rev.text_bn}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {rev.city_en || "Dhaka"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(rev)}
                    className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {deleteConfirmId === rev.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(rev.id!)}
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
                      onClick={() => setDeleteConfirmId(rev.id!)}
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
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <h3 className="font-bold text-white text-sm font-display">
                  {editingItem.id ? "Edit Patient Review" : "Add Patient Review"}
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
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇬🇧 English Review
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bn")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                  activeTab === "bn"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇧🇩 বাংলা রিভিউ
              </button>
            </div>

            {errorMsg && (
              <div className="m-6 mb-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.author_en || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, author_en: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    রোগীর নাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={editingItem.author_bn || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, author_bn: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Star Rating (1–5)
                  </label>
                  <select
                    value={editingItem.stars ?? 5}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        stars: parseInt(e.target.value) || 5,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Procedure Received
                  </label>
                  <input
                    type="text"
                    value={editingItem.treatment_en || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, treatment_en: e.target.value })
                    }
                    placeholder="Phaco Cataract Surgery"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {activeTab === "en" ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Testimonial Text (English) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.text_en || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, text_en: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    রোগীর মতামত / রিভিউ (বাংলা) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.text_bn || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, text_bn: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-bengali"
                  />
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
