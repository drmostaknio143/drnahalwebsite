"use client";

import { useEffect, useState } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { FAQRecord } from "@/lib/supabase/types";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<FAQRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const json = await res.json();
      if (json.success) {
        setFaqs(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      faq_code: `faq-${faqs.length + 1}`,
      category_en: "Appointments & Visits",
      category_bn: "অ্যাপয়েন্টমেন্ট ও ভিজিট",
      question_en: "",
      question_bn: "",
      answer_en: "",
      answer_bn: "",
      order_index: faqs.length + 1,
      is_published: true,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (faq: FAQRecord) => {
    setEditingItem({ ...faq });
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
      const res = await fetch("/api/admin/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchFaqs();
      } else {
        setErrorMsg(data.error || "Failed to save FAQ");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, faq_code?: string) => {
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}&faq_code=${faq_code || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id && f.faq_code !== faq_code));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const categories = Array.from(new Set(faqs.map((f) => f.category_en).filter(Boolean)));

  const filtered = faqs.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch =
      f.question_en?.toLowerCase().includes(q) ||
      f.question_bn?.toLowerCase().includes(q) ||
      f.answer_en?.toLowerCase().includes(q) ||
      f.answer_bn?.toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || f.category_en === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage patient questions and detailed clinical answers in English and Bengali
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchFaqs}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ</span>
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
            placeholder="Search FAQs by question or answer keyword..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All FAQ Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
            {filtered.length} FAQs
          </span>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading FAQs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-[#090f1d] rounded-2xl border border-slate-800">
            No FAQs found matching your search.
          </div>
        ) : (
          filtered.map((faq, idx) => (
            <div
              key={faq.id || faq.faq_code}
              className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {faq.category_en}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {faq.faq_code}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">
                    {faq.question_en}
                  </h3>
                  <div className="text-cyan-400/90 text-xs font-bengali mt-0.5">
                    {faq.question_bn}
                  </div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed pt-1">
                  <p>{faq.answer_en}</p>
                  <p className="text-slate-400 font-bengali mt-1">{faq.answer_bn}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-start">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {deleteConfirmId === (faq.id || faq.faq_code) ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(faq.id || "", faq.faq_code)}
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
                    onClick={() => setDeleteConfirmId(faq.id || faq.faq_code)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
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
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    {editingItem.id ? "Edit Patient FAQ" : "Add Patient FAQ"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bilingual question and answer for patient education
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
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
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
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    FAQ Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.faq_code || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, faq_code: e.target.value })
                    }
                    placeholder="faq-1"
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
                      placeholder="Cataract Surgery"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Question (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.question_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, question_en: e.target.value })
                      }
                      placeholder="How long does a cataract operation take?"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Answer (English) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.answer_en || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, answer_en: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
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
                      placeholder="ছানি অপারেশন"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      প্রশ্ন (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.question_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, question_bn: e.target.value })
                      }
                      placeholder="ছানি অপারেশনে কতক্ষণ সময় লাগে?"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      উত্তর (বাংলা) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.answer_bn || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, answer_bn: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="faqPublishedToggle"
                  checked={editingItem.is_published !== false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="faqPublishedToggle"
                  className="text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Publish on Website
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving FAQ..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
