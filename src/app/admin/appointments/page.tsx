"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Search,
  PhoneCall,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trash2,
  Plus,
  RefreshCw,
  FileText,
  UserCheck,
} from "lucide-react";
import type { AppointmentRecord } from "@/lib/supabase/types";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AppointmentRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      const json = await res.json();
      if (json.success) {
        setAppointments(json.data || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      patient_name: "",
      phone: "",
      chamber_slug: "an-nahar",
      preferred_date: new Date().toISOString().split("T")[0],
      reason: "",
      status: "Confirmed",
      admin_notes: "Phone booking registered by receptionist",
    });
    setEditModalOpen(true);
  };

  const handleEdit = (appt: AppointmentRecord) => {
    setEditingItem({ ...appt });
    setEditModalOpen(true);
  };

  const handleQuickStatus = async (id: string, status: "Pending" | "Confirmed" | "Completed" | "Cancelled") => {
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setErrorMsg("");

    const isEdit = !!editingItem.id;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/appointments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setEditModalOpen(false);
        setEditingItem(null);
        fetchAppointments();
      } else {
        setErrorMsg(data.error || "Failed to save appointment");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment request?")) return;
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.patient_name?.toLowerCase().includes(q) ||
      a.phone?.toLowerCase().includes(q) ||
      a.reason?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Patient Appointments & Inquiries
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time patient bookings, serial requests, clinical reasons & receptionist notes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAppointments}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Take Phone Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#090f1d] p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {["all", "Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {st === "all" ? "All Bookings" : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name or phone..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Patient Name & Phone</th>
                <th className="py-3.5 px-4">Chamber</th>
                <th className="py-3.5 px-4">Preferred Date</th>
                <th className="py-3.5 px-4">Symptoms / Reason</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading appointment records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No appointment records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">
                        {item.patient_name}
                      </div>
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 text-teal-400 hover:underline font-mono text-xs mt-0.5"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-slate-300 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        {item.chamber_slug?.replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {item.preferred_date || "Flexible"}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                      {item.reason || "General Consultation"}
                      {item.admin_notes && (
                        <div className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                          Note: {item.admin_notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "Confirmed"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : item.status === "Cancelled"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                            : item.status === "Completed"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status !== "Confirmed" && (
                          <button
                            onClick={() => handleQuickStatus(item.id!, "Confirmed")}
                            title="Confirm Appointment"
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {item.status !== "Completed" && (
                          <button
                            onClick={() => handleQuickStatus(item.id!, "Completed")}
                            title="Mark Completed"
                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit / Notes"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id!)}
                          title="Delete"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Notes Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-sm font-display">
                  {editingItem.id ? "Manage Booking Details" : "New Patient Booking"}
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
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
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.patient_name || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, patient_name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.phone || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, phone: e.target.value })
                    }
                    placeholder="01712-XXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status || "Pending"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, status: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Chamber
                  </label>
                  <select
                    value={editingItem.chamber_slug || "an-nahar"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, chamber_slug: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white capitalize"
                  >
                    <option value="an-nahar">An Nahar (Dhanmondi)</option>
                    <option value="aristo">Aristo (Uttara)</option>
                    <option value="enam">Enam (Savar)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={editingItem.preferred_date || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, preferred_date: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Symptoms / Patient Reason
                </label>
                <textarea
                  rows={2}
                  value={editingItem.reason || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, reason: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-400 mb-1">
                  Internal Receptionist / Admin Notes
                </label>
                <textarea
                  rows={2}
                  value={editingItem.admin_notes || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, admin_notes: e.target.value })
                  }
                  placeholder="Serial # assigned, special instructions..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
