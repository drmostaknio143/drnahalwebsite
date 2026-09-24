"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Phone,
  Mail,
  Award,
  Building,
  User,
  Sparkles,
} from "lucide-react";
import type { PracticeSetting } from "@/lib/supabase/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, { en: string; bn: string; desc?: string }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const dict: Record<string, { en: string; bn: string; desc?: string }> = {};
        json.data.forEach((item: PracticeSetting) => {
          dict[item.setting_key] = {
            en: item.value_en,
            bn: item.value_bn,
            desc: item.description,
          };
        });
        setSettings(dict);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, lang: "en" | "bn", value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg("");

    const payload = Object.entries(settings).map(([key, val]) => ({
      setting_key: key,
      value_en: val.en,
      value_bn: val.bn,
      description: val.desc,
    }));

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        setErrorMsg(data.error || "Failed to update settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Practice Profile & Site Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global medical credentials, serial hotline numbers, hero titles, and doctor biography
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSettings}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>All practice settings saved and synced with Supabase successfully!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Language Switcher */}
      <div className="bg-[#090f1d] p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("en")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "en"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🇬🇧 English Translations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bn")}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-bengali transition-all ${
              activeTab === "bn"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🇧🇩 বাংলা অনুবাদ
          </button>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Switch tabs to edit Bengali or English texts
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Doctor Identity Section */}
        <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-teal-400">
            <User className="w-4 h-4" />
            <h3 className="font-bold text-white text-sm font-display">
              Doctor Identity & Academic Titles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Doctor Name ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.doctor_name?.[activeTab] || ""}
                onChange={(e) => handleChange("doctor_name", activeTab, e.target.value)}
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Display Name ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.doctor_short?.[activeTab] || ""}
                onChange={(e) => handleChange("doctor_short", activeTab, e.target.value)}
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Specialty Designation ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.designation?.[activeTab] || ""}
                onChange={(e) => handleChange("designation", activeTab, e.target.value)}
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Academic Affiliation / College ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.institution?.[activeTab] || ""}
                onChange={(e) => handleChange("institution", activeTab, e.target.value)}
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-teal-400">
            <Phone className="w-4 h-4" />
            <h3 className="font-bold text-white text-sm font-display">
              Patient Serial Hotline & Communication
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Serial Booking Hotline
              </label>
              <input
                type="text"
                value={settings.hotline_serial?.[activeTab] || ""}
                onChange={(e) => handleChange("hotline_serial", activeTab, e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Direct Number
              </label>
              <input
                type="text"
                value={settings.whatsapp_phone?.[activeTab] || ""}
                onChange={(e) => handleChange("whatsapp_phone", activeTab, e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.official_email?.[activeTab] || ""}
                onChange={(e) => handleChange("official_email", activeTab, e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Website Hero Section Content */}
        <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-teal-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-white text-sm font-display">
              Homepage Hero Section Texts
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Top Credential Eyebrow ({activeTab.toUpperCase()})
            </label>
            <input
              type="text"
              value={settings.hero_eyebrow?.[activeTab] || ""}
              onChange={(e) => handleChange("hero_eyebrow", activeTab, e.target.value)}
              className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                activeTab === "bn" ? "font-bengali" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Main Headline Title ({activeTab.toUpperCase()})
            </label>
            <input
              type="text"
              value={settings.hero_title?.[activeTab] || ""}
              onChange={(e) => handleChange("hero_title", activeTab, e.target.value)}
              className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                activeTab === "bn" ? "font-bengali" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Subtitle & Bio Summary ({activeTab.toUpperCase()})
            </label>
            <textarea
              rows={4}
              value={settings.hero_subtitle?.[activeTab] || ""}
              onChange={(e) => handleChange("hero_subtitle", activeTab, e.target.value)}
              className={`w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white ${
                activeTab === "bn" ? "font-bengali" : ""
              }`}
            />
          </div>
        </div>

        {/* Surgical Statistics */}
        <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-teal-400">
            <Award className="w-4 h-4" />
            <h3 className="font-bold text-white text-sm font-display">
              Clinical Statistics & Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Surgical Experience Badge ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.experience_years?.[activeTab] || ""}
                onChange={(e) => handleChange("experience_years", activeTab, e.target.value)}
                placeholder="8+ Years"
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Fellowship Institute ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={settings.fellowship_institute?.[activeTab] || ""}
                onChange={(e) =>
                  handleChange("fellowship_institute", activeTab, e.target.value)
                }
                placeholder="Ispahani Islamia Eye Institute"
                className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white ${
                  activeTab === "bn" ? "font-bengali" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-teal-500/20 disabled:opacity-50 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Practice Settings..." : "Save All Settings to Supabase"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
