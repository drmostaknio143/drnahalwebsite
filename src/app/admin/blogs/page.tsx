"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Calendar,
  Clock,
} from "lucide-react";
import type { BlogPostRecord, BlogSectionItem } from "@/lib/supabase/types";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<BlogPostRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      slug: "",
      title_en: "",
      title_bn: "",
      meta_description_en: "",
      meta_description_bn: "",
      category_en: "Cataract Care",
      category_bn: "ছানি চিকিৎসা",
      read_time_en: "5 min read",
      read_time_bn: "৫ মিনিট পাঠ",
      publish_date: new Date().toISOString().split("T")[0],
      image_url: "/images/services/cataract-surgery.jpg",
      sections: [
        {
          heading: { en: "Introduction", bn: "ভূমিকা" },
          content: { en: "First paragraph here...", bn: "এখানে বিবরণ লিখুন..." },
        },
      ],
      emergency_callout_en: "",
      emergency_callout_bn: "",
      related_service_slug: "cataract-surgery",
      related_condition_slug: "cataract",
      is_published: true,
    });
    setEditModalOpen(true);
  };

  const handleEdit = (blog: BlogPostRecord) => {
    setEditingItem({ ...blog });
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
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchBlogs();
      } else {
        setErrorMsg(data.error || "Failed to save article");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug?: string) => {
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}&slug=${slug || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== slug));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const addSection = () => {
    if (!editingItem) return;
    const currentSections = editingItem.sections || [];
    setEditingItem({
      ...editingItem,
      sections: [
        ...currentSections,
        {
          heading: { en: "Section Heading", bn: "শিরোনাম" },
          content: { en: "Section content...", bn: "বিবরণ..." },
        },
      ],
    });
  };

  const removeSection = (idx: number) => {
    if (!editingItem) return;
    const currentSections = [...(editingItem.sections || [])];
    currentSections.splice(idx, 1);
    setEditingItem({ ...editingItem, sections: currentSections });
  };

  const filtered = blogs.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.title_en?.toLowerCase().includes(q) ||
      b.title_bn?.toLowerCase().includes(q) ||
      b.category_en?.toLowerCase().includes(q) ||
      b.slug?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Patient Guides & Educational Articles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish and edit medical blog posts, recovery tips, and clinical guides in English and Bengali
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Article</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4 bg-[#090f1d] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, category, or slug..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium px-2">
          {filtered.length} Articles
        </span>
      </div>

      {/* Articles Table */}
      <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Article Title (English / বাংলা)</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Read Time</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading clinical articles...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No articles found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id || item.slug} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-white text-sm line-clamp-1">
                        {item.title_en}
                      </div>
                      <div className="text-emerald-400/90 text-xs font-bengali line-clamp-1">
                        {item.title_bn}
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        /{item.slug}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category_en}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {item.read_time_en}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {item.publish_date}
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
                          href={`/en/blog/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on Website"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === (item.id || item.slug) ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(item.id || "", item.slug)}
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
                            onClick={() => setDeleteConfirmId(item.id || item.slug)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Delete"
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

      {/* Edit Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base font-display">
                  {editingItem.id ? "Edit Patient Article" : "Write New Educational Guide"}
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
                🇬🇧 English Content
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
                🇧🇩 বাংলা কন্টেন্ট
              </button>
            </div>

            {errorMsg && (
              <div className="m-6 mb-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    placeholder="cataract-surgery-recovery"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={editingItem.publish_date || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, publish_date: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Read Time (EN)
                  </label>
                  <input
                    type="text"
                    value={editingItem.read_time_en || "5 min read"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, read_time_en: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Read Time (BN)
                  </label>
                  <input
                    type="text"
                    value={editingItem.read_time_bn || "৫ মিনিট পাঠ"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, read_time_bn: e.target.value })
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
                        Article Title (English) *
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
                        Category (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.category_en || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category_en: e.target.value })
                        }
                        placeholder="Cataract Care"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Meta Description / Excerpt (English) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.meta_description_en || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          meta_description_en: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Emergency Alert Callout (English)
                    </label>
                    <input
                      type="text"
                      value={editingItem.emergency_callout_en || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          emergency_callout_en: e.target.value,
                        })
                      }
                      placeholder="Sudden pain or dark shadow requires urgent evaluation."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-bengali">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        নিবন্ধের শিরোনাম (বাংলা) *
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
                        ক্যাটাগরি (বাংলা) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.category_bn || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category_bn: e.target.value })
                        }
                        placeholder="ছানি চিকিৎসা"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সংক্ষিপ্ত বিবরণ / ভূমিকা (বাংলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.meta_description_bn || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          meta_description_bn: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      জরুরি কলআউট সতর্কবার্তা (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editingItem.emergency_callout_bn || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          emergency_callout_bn: e.target.value,
                        })
                      }
                      placeholder="হঠাৎ তীব্র ব্যথা বা দৃষ্টির অন্ধকার নামলে দ্রুত যোগাযোগ করুন।"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Sections Editor */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Article Sections ({editingItem.sections?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={addSection}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Section
                  </button>
                </div>

                <div className="space-y-3">
                  {(editingItem.sections || []).map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          Section #{sIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSection(sIdx)}
                          className="text-rose-400 hover:text-rose-300 text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={sec.heading?.en || ""}
                          onChange={(e) => {
                            const secs = [...(editingItem.sections || [])];
                            secs[sIdx] = {
                              ...secs[sIdx],
                              heading: {
                                ...secs[sIdx].heading,
                                en: e.target.value,
                                bn: secs[sIdx].heading?.bn || "",
                              },
                            };
                            setEditingItem({ ...editingItem, sections: secs });
                          }}
                          placeholder="Heading (English)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={sec.heading?.bn || ""}
                          onChange={(e) => {
                            const secs = [...(editingItem.sections || [])];
                            secs[sIdx] = {
                              ...secs[sIdx],
                              heading: {
                                ...secs[sIdx].heading,
                                bn: e.target.value,
                                en: secs[sIdx].heading?.en || "",
                              },
                            };
                            setEditingItem({ ...editingItem, sections: secs });
                          }}
                          placeholder="শিরোনাম (বাংলা)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bengali"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <textarea
                          rows={3}
                          value={sec.content?.en || ""}
                          onChange={(e) => {
                            const secs = [...(editingItem.sections || [])];
                            secs[sIdx] = {
                              ...secs[sIdx],
                              content: {
                                ...secs[sIdx].content,
                                en: e.target.value,
                                bn: secs[sIdx].content?.bn || "",
                              },
                            };
                            setEditingItem({ ...editingItem, sections: secs });
                          }}
                          placeholder="Content paragraph (English)..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                        />
                        <textarea
                          rows={3}
                          value={sec.content?.bn || ""}
                          onChange={(e) => {
                            const secs = [...(editingItem.sections || [])];
                            secs[sIdx] = {
                              ...secs[sIdx],
                              content: {
                                ...secs[sIdx].content,
                                bn: e.target.value,
                                en: secs[sIdx].content?.en || "",
                              },
                            };
                            setEditingItem({ ...editingItem, sections: secs });
                          }}
                          placeholder="প্যারাগ্রাফের বিবরণ (বাংলা)..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bengali"
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {saving ? "Publishing..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
