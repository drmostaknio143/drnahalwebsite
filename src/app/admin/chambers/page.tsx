"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  PhoneCall,
  Clock,
  MapPin,
} from "lucide-react";
import type { Chamber } from "@/lib/supabase/types";

export default function AdminChambersPage() {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Chamber> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchChambers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/chambers");
      const json = await res.json();
      if (json.success) {
        setChambers(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChambers();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      slug: "",
      name_en: "",
      name_bn: "",
      location_en: "",
      location_bn: "",
      hours_en: "",
      hours_bn: "",
      badge_en: "Evening Chamber",
      badge_bn: "সান্ধ্যকালীন চেম্বার",
      phone: "01344-890335",
      is_active: true,
      order_index: chambers.length + 1,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (chamber: Chamber) => {
    setEditingItem({ ...chamber });
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
      const res = await fetch("/api/admin/chambers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchChambers();
      } else {
        setErrorMsg(data.error || "Failed to save chamber");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug?: string) => {
    try {
      const res = await fetch(`/api/admin/chambers?id=${id}&slug=${slug || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setChambers((prev) => prev.filter((c) => c.id !== id && c.slug !== slug));
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
            Chambers & Visiting Schedules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage practice locations, consulting hours, hotline numbers, and badges in English & Bengali
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchChambers}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Chamber</span>
          </button>
        </div>
      </div>

      {/* Chambers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-16 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading chamber schedules...
          </div>
        ) : (
          chambers.map((chamber) => (
            <div
              key={chamber.id || chamber.slug}
              className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {chamber.badge_en || "Chamber"}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      chamber.is_active !== false
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {chamber.is_active !== false ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base font-display">
                  {chamber.name_en}
                </h3>
                <p className="text-purple-400 text-xs font-bengali mt-0.5">
                  {chamber.name_bn}
                </p>

                <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <div>{chamber.location_en}</div>
                      <div className="text-slate-400 font-bengali text-[11px]">
                        {chamber.location_bn}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">{chamber.hours_en}</div>
                      <div className="text-teal-400/90 font-bengali text-[11px]">
                        {chamber.hours_bn}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono text-emerald-400 font-bold">
                      {chamber.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  slug: {chamber.slug}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(chamber)}
                    className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                    title="Edit Chamber"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {deleteConfirmId === (chamber.id || chamber.slug) ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(chamber.id || "", chamber.slug)}
                        className="p-1.5 rounded-lg bg-rose-500 text-white"
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(chamber.id || chamber.slug)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete Chamber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    {editingItem.id ? "Edit Chamber Schedule" : "Add Practice Chamber"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Set visiting hours, address, and serial phone numbers
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

            <div className="px-6 pt-3 pb-2 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "en"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
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
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
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
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, slug: e.target.value })
                    }
                    placeholder="an-nahar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Serial Hotline Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.phone || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, phone: e.target.value })
                    }
                    placeholder="01344-890335"
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
                        Chamber Name (English) *
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
                        Badge Label (English)
                      </label>
                      <input
                        type="text"
                        value={editingItem.badge_en || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, badge_en: e.target.value })
                        }
                        placeholder="Evening Chamber"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Location / Address (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.location_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, location_en: e.target.value })
                      }
                      placeholder="Dhanmondi, Dhaka"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Visiting Days & Hours (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.hours_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, hours_en: e.target.value })
                      }
                      placeholder="Saturday, Sunday, Tuesday & Wednesday · 6:00 PM – 9:00 PM"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        চেম্বারের নাম (বাংলা) *
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
                        ব্যাজ লেবেল (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={editingItem.badge_bn || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, badge_bn: e.target.value })
                        }
                        placeholder="সান্ধ্যকালীন চেম্বার"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ঠিকানা ও অবস্থান (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.location_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, location_bn: e.target.value })
                      }
                      placeholder="ধানমন্ডি, ঢাকা"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      রোগী দেখার দিন ও সময় (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.hours_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, hours_bn: e.target.value })
                      }
                      placeholder="শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="activeChamberToggle"
                  checked={editingItem.is_active !== false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_active: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="activeChamberToggle"
                  className="text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Active Chamber (Visible on website booking form)
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving Schedule..." : "Save Chamber"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
