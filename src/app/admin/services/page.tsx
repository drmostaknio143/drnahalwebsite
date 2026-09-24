"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Eye,
  RefreshCw,
} from "lucide-react";
import type { Service, ServiceStepItem } from "@/lib/supabase/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (json.success) {
        setServices(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      slug: "",
      name_en: "",
      name_bn: "",
      short_en: "",
      short_bn: "",
      image_url: "/images/services/cataract-surgery.jpg",
      stat_label_en: "Procedure",
      stat_label_bn: "যেভাবে হয়",
      stat_val_en: "Day-Care Surgery",
      stat_val_bn: "ডে-কেয়ার সার্জারি",
      tags_en: ["Blurry vision", "Eye care"],
      tags_bn: ["দৃষ্টি ঝাপসা", "চক্ষু সেবা"],
      intro_en: "",
      intro_bn: "",
      who_label_en: "Who needs it",
      who_label_bn: "কার প্রয়োজন হতে পারে",
      who_en: "",
      who_bn: "",
      how_label_en: "How it works",
      how_label_bn: "কীভাবে হয়",
      how_en: "",
      how_bn: "",
      steps: [
        { en: "Anesthetic drops administered.", bn: "অ্যানেস্থেসিয়ার ড্রপ দেওয়া হয়।" },
      ],
      note_label_en: "Recovery",
      note_label_bn: "সুস্থ হওয়ার সময়",
      note_en: "",
      note_bn: "",
      cta_en: "Book an Appointment",
      cta_bn: "অ্যাপয়েন্টমেন্ট নিন",
      order_index: services.length + 1,
      is_published: true,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingItem({ ...service });
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
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchServices();
      } else {
        setErrorMsg(data.error || "Failed to save service");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug?: string) => {
    try {
      const res = await fetch(`/api/admin/services?id=${id}&slug=${slug || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== slug));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const filtered = services.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name_en?.toLowerCase().includes(q) ||
      s.name_bn?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Services & Surgeries Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage surgical procedures, steps, indications, and recovery notes in English & Bengali
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Surgery</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-[#090f1d] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search procedures by name, slug or condition..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium px-2">
          {filtered.length} Procedures
        </span>
      </div>

      {/* Services Table */}
      <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Procedure (English / বাংলা)</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Stat / Badge</th>
                <th className="py-3.5 px-4">Steps</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading clinical procedures...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No services found matching your search.
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
                      <div className="text-teal-400/90 text-xs font-bengali">
                        {item.name_bn}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {item.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {item.stat_val_en || "Surgery"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {item.steps?.length || 0} steps
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
                          href={`/en/services#${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on Live Website"
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit Procedure"
                          className="p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-colors"
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
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    {editingItem.id ? "Edit Procedure" : "Add New Surgical Procedure"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Update all clinical information, surgical steps & patient instructions
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

            {/* Language Switcher Tabs */}
            <div className="px-6 pt-3 pb-2 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "en"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
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
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
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

            {/* Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Universal Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Slug (URL Key) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, slug: e.target.value })
                    }
                    placeholder="cataract-surgery"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingItem.image_url || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, image_url: e.target.value })
                    }
                    placeholder="/images/services/cataract-surgery.jpg"
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

              {/* Language Specific Fields */}
              {activeTab === "en" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Name (English) *
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
                        Procedure Badge Value (English)
                      </label>
                      <input
                        type="text"
                        value={editingItem.stat_val_en || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, stat_val_en: e.target.value })
                        }
                        placeholder="Day-Care Surgery"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Short Overview (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.short_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, short_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Introduction (English) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.intro_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, intro_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Who Needs It / Symptoms (English) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.who_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, who_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Recovery Note (English)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.note_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, note_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        সার্ভিসের নাম (বাংলা) *
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
                        পদ্ধতির ধরন (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={editingItem.stat_val_bn || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, stat_val_bn: e.target.value })
                        }
                        placeholder="ডে-কেয়ার সার্জারি"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সংক্ষিপ্ত বিবরণ (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.short_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, short_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সম্পূর্ণ ভূমিকা (বাংলা) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.intro_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, intro_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      কার প্রয়োজন হতে পারে (বাংলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.who_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, who_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সুস্থ হওয়ার সময় ও সতর্কতা (বাংলা)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.note_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, note_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Publication Status Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={editingItem.is_published !== false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="publishedToggle"
                  className="text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Publish on Website (Visible to patients)
                </label>
              </div>

              {/* Modal Footer */}
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Clinical Procedure"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
