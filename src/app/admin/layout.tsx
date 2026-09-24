"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Eye,
  Building2,
  CalendarCheck,
  HelpCircle,
  Video,
  Image as ImageIcon,
  BookOpen,
  Star,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services & Surgeries", icon: Stethoscope },
  { href: "/admin/conditions", label: "Conditions & Eye Care", icon: Eye },
  { href: "/admin/chambers", label: "Chambers & Schedule", icon: Building2 },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck, badge: "Live" },
  { href: "/admin/faqs", label: "FAQs Management", icon: HelpCircle },
  { href: "/admin/videos", label: "Video Library", icon: Video },
  { href: "/admin/gallery", label: "Gallery Photos", icon: ImageIcon },
  { href: "/admin/blogs", label: "Articles & Guides", icon: BookOpen },
  { href: "/admin/reviews", label: "Patient Reviews", icon: Star },
  { href: "/admin/settings", label: "Profile & Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<"checking" | "connected" | "fallback">("checking");

  // Check auth session
  useEffect(() => {
    if (pathname === "/admin/login") return;
    const session = localStorage.getItem("dr_admin_user");
    if (!session) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Ping Supabase status
  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((res) => {
        if (res.supabaseStatus === "connected") {
          setSupabaseStatus("connected");
        } else {
          setSupabaseStatus("fallback");
        }
      })
      .catch(() => setSupabaseStatus("fallback"));
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("dr_admin_user");
    document.cookie = "dr_admin_session=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-[#090f1d] border-r border-slate-800/80 shrink-0">
        {/* Practice Brand */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display leading-tight tracking-tight">
                Dr. Nahal Arnob
              </div>
              <div className="text-[11px] text-teal-400 font-medium">
                Admin Control Center
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Content Management
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Database Status & Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300 font-medium">Supabase DB</span>
            </div>
            {supabaseStatus === "connected" ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Synced
              </span>
            ) : supabaseStatus === "checking" ? (
              <span className="text-[11px] text-slate-400">Checking...</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Local Cache
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3.5 bg-[#090f1d] border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
            <Stethoscope className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold text-sm text-white font-display">Dr. Nahal Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#090f1d] flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <span className="font-bold text-white text-base">Navigation</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-1 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? "bg-teal-500/20 text-teal-300" : "text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <a href="/en" target="_blank" className="text-sm text-slate-400">
              Live Website →
            </a>
            <button onClick={handleLogout} className="text-sm text-rose-400">
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#090f1d]/60 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold text-white capitalize">
              {pathname === "/admin"
                ? "Executive Practice Overview"
                : pathname.replace("/admin/", "").replace("-", " ")}
            </h2>
            <p className="text-xs text-slate-400">
              Direct live synchronization with Supabase cloud database
            </p>
          </div>

          <div className="flex items-center gap-4">
            {supabaseStatus === "connected" ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Supabase Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Local Cache Fallback</span>
              </div>
            )}

            <a
              href="/en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-all border border-slate-700"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center font-bold text-xs">
                DN
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Dr. Nahal Arnob</div>
                <div className="text-[10px] text-slate-400">Super Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="flex-1 p-4 md:p-8 bg-[#060a12]">{children}</div>
      </main>
    </div>
  );
}
