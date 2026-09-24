"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import type { Condition } from "@/lib/supabase/types";

export default function AdminConditionsPage() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Condition> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchConditions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/conditions");
      const json = await res.json();
      if (json.success) {
        setConditions(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      slug: "",
      name_en: "",
      name_bn: "",
      tier: "Core",
      category_en: "Retina & Vitreous",
      category_bn: "রেটিনা ও ভিট্রিয়াস",
      image_url: "/images/2. Conditions_Images/1. Cataract.png",
      tags_en: ["Vision loss", "Eye care"],
      tags_bn: ["দৃষ্টি সমস্যা", "চক্ষু সেবা"],
      what_is_it_en: "",
      what_is_it_bn: "",
      why_it_happens_en: "",
      why_it_happens_bn: "",
      how_treated_en: "",
      how_treated_bn: "",
      emergency_note_en: "",
      emergency_note_bn: "",
      related_service_slug: "cataract-surgery",
      order_index: conditions.length + 1,
      is_published: true,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (cond: Condition) => {
    setEditingItem({ ...cond });
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
      const res = await fetch("/api/admin/conditions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchConditions();
      } else {
        setErrorMsg(data.error || "Failed to save condition");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug?: string) => {
    try {
      const res = await fetch(`/api/admin/conditions?id=${id}&slug=${slug || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setConditions((prev) => prev.filter((c) => c.id !== id && c.slug !== slug));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const categories = Array.from(new Set(conditions.map((c) => c.category_en).filter(Boolean)));

  const filtered = conditions.filter((c) => {
    const q = search.toLowerCase();
    const matchQuery =
      c.name_en?.toLowerCase().includes(q) ||
      c.name_bn?.toLowerCase().includes(q) ||
      c.slug?.toLowerCase().includes(q) ||
      c.category_en?.toLowerCase().includes(q);
    const matchCategory = categoryFilter === "all" || c.category_en === categoryFilter;
    return matchQuery && matchCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Conditions & Eye Diseases Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage comprehensive pathology guides, symptoms, underlying causes, and treatment options
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchConditions}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Condition</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-[#090f1d] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conditions by name, category, or slug..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
            {filtered.length} Conditions
          </span>
        </div>
      </div>

      {/* Conditions Table */}
      <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Condition (English / বাংলা)</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Emergency Flag</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading eye conditions...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No conditions found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id || item.slug} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 text-center font-mono text-slate-500 font-bold">
                      {item.order_index ?? idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">
                        {item.name_en}
                      </div>
                      <div className="text-blue-400/90 text-xs font-bengali">
                        {item.name_bn}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category_en}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.tier === "Core"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {item.tier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.emergency_note_en ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3" />
                          Emergency
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.is_published !== false
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-500 border border-slate-700"
                        }`}
                      >
                        {item.is_published !== false ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/en/conditions#${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on Live Website"
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit Condition"
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === (item.id || item.slug) ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(item.id || "", item.slug)}
                              title="Confirm Delete"
                              className="p-1.5 rounded-lg bg-rose-500 text-white"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              title="Cancel"
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id || item.slug)}
                            title="Delete"
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    {editingItem.id ? "Edit Condition Details" : "Add Eye Condition Guide"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define pathology explanation, underlying causes, and treatments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="px-6 pt-3 pb-2 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "en"
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
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
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
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

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, slug: e.target.value })
                    }
                    placeholder="retinal-detachment"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tier
                  </label>
                  <select
                    value={editingItem.tier || "Core"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tier: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Core">Core</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Related Surgery Slug
                  </label>
                  <input
                    type="text"
                    value={editingItem.related_service_slug || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        related_service_slug: e.target.value,
                      })
                    }
                    placeholder="vitreoretinal-surgery"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Condition Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.name_en || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name_en: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.category_en || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category_en: e.target.value })
                        }
                        placeholder="Retina & Vitreous"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      What is it? / Explanation (English) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.what_is_it_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, what_is_it_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Why does it happen? / Causes (English) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.why_it_happens_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, why_it_happens_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      How is it treated? (English) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.how_treated_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, how_treated_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Emergency Warning Note (English)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.emergency_note_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, emergency_note_en: e.target.value })
                      }
                      placeholder="Flashes of light or shadow curtain require immediate emergency attention."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        সমস্যার নাম (বাংলা) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.name_bn || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name_bn: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        ক্যাটাগরি (বাংলা) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.category_bn || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category_bn: e.target.value })
                        }
                        placeholder="রেটিনা ও ভিট্রিয়াস"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      এটি কী? / সহজ ব্যাখ্যা (বাংলা) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.what_is_it_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, what_is_it_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      কেন হয়? / মূল কারণসমূহ (বাংলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.why_it_happens_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, why_it_happens_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      চিকিৎসা কীভাবে হয়? (বাংলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.how_treated_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, how_treated_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      জরুরি সতর্কবার্তা (বাংলা)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.emergency_note_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, emergency_note_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="condPublishedToggle"
                  checked={editingItem.is_published !== false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="condPublishedToggle"
                  className="text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Publish on Website (Visible to patients)
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Condition Guide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
