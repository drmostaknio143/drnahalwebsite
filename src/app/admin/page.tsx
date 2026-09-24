"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Eye,
  Building2,
  CalendarCheck,
  BookOpen,
  Video,
  Star,
  HelpCircle,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Database,
  RefreshCw,
  PhoneCall,
  UserCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [updatingAppt, setUpdatingAppt] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.counts);
        setRecentAppointments(data.recentAppointments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingAppt(id);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRecentAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAppt(null);
    }
  };

  const CARDS = [
    {
      title: "Services & Surgeries",
      count: stats?.services ?? 11,
      desc: "Phaco, Vitreoretina, LASIK, ROP",
      href: "/admin/services",
      icon: Stethoscope,
      color: "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30",
    },
    {
      title: "Conditions & Diseases",
      count: stats?.conditions ?? 16,
      desc: "Cataract, Detachment, CSCR, Glaucoma",
      href: "/admin/conditions",
      icon: Eye,
      color: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
    },
    {
      title: "Pending Inquiries",
      count: stats?.pendingAppointments ?? 0,
      desc: "Patient appointment requests",
      href: "/admin/appointments",
      icon: CalendarCheck,
      color: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30",
      highlight: true,
    },
    {
      title: "Active Chambers",
      count: stats?.chambers ?? 3,
      desc: "Dhanmondi, Uttara & Savar",
      href: "/admin/chambers",
      icon: Building2,
      color: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30",
    },
    {
      title: "Educational Articles",
      count: stats?.blogs ?? 6,
      desc: "Patient guides & recovery articles",
      href: "/admin/blogs",
      icon: BookOpen,
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Surgical Videos",
      count: stats?.videos ?? 17,
      desc: "YouTube demonstrations & clips",
      href: "/admin/videos",
      icon: Video,
      color: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30",
    },
    {
      title: "Patient FAQs",
      count: stats?.faqs ?? 12,
      desc: "Common surgical & clinic questions",
      href: "/admin/faqs",
      icon: HelpCircle,
      color: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Patient Reviews",
      count: stats?.reviews ?? 3,
      desc: "Google & verified testimonials",
      href: "/admin/reviews",
      icon: Star,
      color: "from-yellow-500/20 to-yellow-500/5 text-yellow-400 border-yellow-500/30",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1627] to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Practice Dashboard Active
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
              Welcome, Dr. Nahal Mostak Khan Arnob
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Consultant Vitreoretinal, Cataract & Refractive Surgeon. Manage every clinical procedure, patient condition guide, chamber visiting hour, and appointment inquiry seamlessly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Stats</span>
            </button>
            <Link
              href="/admin/services"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Service</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-5 rounded-2xl bg-[#090f1d] border transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group ${
                card.highlight ? "border-amber-500/40 bg-amber-500/[0.03]" : "border-slate-800/80"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center border ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-500 group-hover:text-teal-400 flex items-center gap-1 transition-colors">
                  Manage <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white font-display">
                  {card.count}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {card.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {card.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Inquiries + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Appointments (2 cols) */}
        <div className="lg:col-span-2 bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-white text-base font-display">
                Recent Patient Bookings & Inquiries
              </h3>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              View All ({stats?.appointments || 0}) →
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <CalendarCheck className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No pending booking requests yet. Website appointment form inquiries will appear here automatically.
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-sm">
                        {appt.patient_name}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          appt.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : appt.status === "Cancelled"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            : appt.status === "Completed"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <a
                        href={`tel:${appt.phone}`}
                        className="inline-flex items-center gap-1 text-teal-400 hover:underline"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{appt.phone}</span>
                      </a>
                      <span>•</span>
                      <span className="text-slate-400 capitalize">
                        Chamber: {appt.chamber_slug?.replace("-", " ")}
                      </span>
                      {appt.preferred_date && (
                        <>
                          <span>•</span>
                          <span>Date: {appt.preferred_date}</span>
                        </>
                      )}
                    </div>
                    {appt.reason && (
                      <p className="text-xs text-slate-300 italic">
                        &ldquo;{appt.reason}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {appt.status !== "Confirmed" && (
                      <button
                        onClick={() => handleUpdateStatus(appt.id, "Confirmed")}
                        disabled={updatingAppt === appt.id}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm</span>
                      </button>
                    )}
                    {appt.status !== "Completed" && (
                      <button
                        onClick={() => handleUpdateStatus(appt.id, "Completed")}
                        disabled={updatingAppt === appt.id}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Shortcuts & Single SQL Notice */}
        <div className="space-y-6">
          {/* Quick Management Links */}
          <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6">
            <h3 className="font-bold text-white text-sm font-display mb-4">
              Quick Content Editors
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/services"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>Update Surgeries & Steps</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/conditions"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Edit Eye Condition Details</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/chambers"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>Visiting Hours & Schedules</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>Doctor Bio, Hotline & Hero Text</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

          {/* Master Single SQL Info Box */}
          <div className="bg-gradient-to-br from-slate-900 to-[#07131e] border border-teal-500/20 rounded-2xl p-5 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
              <Database className="w-4 h-4" />
              <span>Single Master SQL File</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-3">
              All database tables, policies, and seed data are maintained in a single master file: <code className="text-teal-300 font-mono">supabase-schema.sql</code>.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              supabase-schema.sql
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
