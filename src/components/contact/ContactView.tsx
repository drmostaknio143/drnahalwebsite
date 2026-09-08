"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Mail,
  Building2,
  Calendar,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
} from "lucide-react";
import { practice, whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Contact & Appointments",
    title: "Book Your Appointment",
    subhead:
      "Call, submit an appointment request, or message our care team directly. We will confirm your chamber slot, date, and appointment time promptly.",
    formTitle: "Request an Appointment",
    fullName: "Full Name",
    namePlaceholder: "Enter patient's full name",
    phone: "Phone Number",
    phonePlaceholder: "e.g. 01711-XXXXXX",
    chamber: "Preferred Chamber",
    selectChamber: "Select a chamber location...",
    preferredDate: "Preferred Date",
    reason: "Reason for Visit (Optional)",
    reasonPlaceholder: "Briefly describe your eye issue (e.g., cataract evaluation, blurry vision, retina check)",
    submitBtn: "Submit Appointment Request",
    submitting: "Submitting...",
    successTitle: "Appointment Request Received!",
    successSub:
      "Thank you — your request has been received. Our clinical scheduling team will call you shortly on your provided phone number to confirm your exact serial time.",
    resetBtn: "Submit another request",
    emergencyTitle: "Experiencing Sudden Vision Changes?",
    emergencyNotice:
      "Sudden vision loss, brilliant flashes of light, or a dark shadow/curtain across your visual field are warning signs of a retinal emergency — call immediately rather than booking online.",
    callEmergency: "Call Hotline: 01344-890335",
    directContactTitle: "Direct Contact Information",
    hoursNote: "Appointments are confirmed per doctor's clinical operating schedule.",
    finalWhatsAppTitle: "Prefer Instant WhatsApp Assistance?",
    finalWhatsAppSub:
      "If you'd like to consult our patient coordinator right away before booking, click below to open WhatsApp directly with our verified practice number.",
    finalWhatsAppBtn: "Message Dr. Nahal's Team on WhatsApp",
  },
  bn: {
    eyebrow: "যোগাযোগ ও অ্যাপয়েন্টমেন্ট",
    title: "অ্যাপয়েন্টমেন্ট নিন",
    subhead:
      "সরাসরি কল করুন, ফর্ম পূরণ করুন, অথবা আমাদের কেয়ার টিমের সাথে যোগাযোগ করুন — আমাদের টিম আপনার পছন্দের চেম্বার, তারিখ ও সময় নিশ্চিত করবে।",
    formTitle: "অ্যাপয়েন্টমেন্টের অনুরোধ করুন",
    fullName: "রোগীর পুরো নাম",
    namePlaceholder: "রোগীর পুরো নাম লিখুন",
    phone: "ফোন নম্বর",
    phonePlaceholder: "যেমন: ০১৭১১-XXXXXX",
    chamber: "পছন্দের চেম্বার",
    selectChamber: "চেম্বার নির্বাচন করুন...",
    preferredDate: "পছন্দের তারিখ",
    reason: "আসার কারণ (ঐচ্ছিক)",
    reasonPlaceholder: "আপনার চোখের সমস্যা সংক্ষেপে লিখুন (যেমন: ছানি পরীক্ষা, ঝাপসা দৃষ্টি, রেটিনা চেক)",
    submitBtn: "অ্যাপয়েন্টমেন্ট রিকোয়েস্ট পাঠান",
    submitting: "পাঠানো হচ্ছে...",
    successTitle: "অনুরোধটি সফলভাবে গৃহীত হয়েছে!",
    successSub:
      "ধন্যবাদ — আপনার রিকোয়েস্ট পেয়েছি। অ্যাপয়েন্টমেন্টের সঠিক সময় ও সিরিয়াল নিশ্চিত করতে আমাদের ক্লিনিক্যাল টিম শীঘ্রই আপনার নম্বরে কল করবে।",
    resetBtn: "আরেকটি রিকোয়েস্ট পাঠান",
    emergencyTitle: "হঠাৎ দৃষ্টি পরিবর্তন অনুভব করছেন?",
    emergencyNotice:
      "হঠাৎ দৃষ্টি কমে যাওয়া, আলোর তীব্র ঝলকানি দেখা, বা দৃষ্টির কোনো অংশে পর্দার মতো কালো ছায়া পড়া রেটিনার জরুরি অবস্থার লক্ষণ — অনলাইনে অপেক্ষা না করে অবিলম্বে কল করুন।",
    callEmergency: "জরুরি কল: ০১৩৪৪-৮৯০৩৩৫",
    directContactTitle: "সরাসরি যোগাযোগের ঠিকানা",
    hoursNote: "ডা. নাহালের সার্জিক্যাল ও ক্লিনিক্যাল সময়সূচি অনুযায়ী অ্যাপয়েন্টমেন্ট নির্ধারিত হয়।",
    finalWhatsAppTitle: "হোয়াটসঅ্যাপে তাৎক্ষণিক বার্তা পাঠাতে চান?",
    finalWhatsAppSub:
      "বুকিংয়ের পূর্বে কোনো প্রশ্ন থাকলে বা সরাসরি বার্তা পাঠাতে চাইলে নিচের বাটনে ক্লিক করে হোয়াটসঅ্যাপে আমাদের সাথে যুক্ত হতে পারেন।",
    finalWhatsAppBtn: "হোয়াটসঅ্যাপে সরাসরি মেসেজ দিন",
  },
};

export default function ContactView({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const searchParams = useSearchParams();
  const preselectedChamber = searchParams.get("chamber");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    chamber: preselectedChamber || "",
    date: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.chamber) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[780px] text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-wider text-accent-2">
            <Sparkles size={14} />
            {t.eyebrow}
          </div>
          <h1 className="font-display text-[32px] font-extrabold tracking-tight text-ink sm:text-[40px] md:text-[46px]">
            {t.title}
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted sm:text-[17px]">
            {t.subhead}
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mb-12 rounded-2xl border border-rose-200 bg-rose-50/95 p-5 text-rose-950 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 rounded-xl bg-rose-600 p-2.5 text-white shadow-sm shrink-0">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-rose-900">{t.emergencyTitle}</h3>
                <p className="mt-1 text-[13.5px] text-rose-800 leading-relaxed max-w-[75ch]">
                  {t.emergencyNotice}
                </p>
              </div>
            </div>
            <a
              href="tel:01344-890335"
              className="btn-pill inline-flex shrink-0 items-center justify-center bg-rose-700 text-[13.5px] font-bold text-white shadow-sm hover:bg-rose-800"
            >
              <Phone size={15} className="mr-2" />
              {t.callEmergency}
            </a>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Column 1: Appointment Request Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-7 sm:p-9 shadow-sm">
              <div className="mb-6 flex items-center gap-2.5">
                <Calendar size={20} className="text-accent" />
                <h2 className="font-display text-[22px] font-bold text-ink">
                  {t.formTitle}
                </h2>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center text-emerald-950 animate-in fade-in duration-300">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-[20px] font-bold text-emerald-900">
                    {t.successTitle}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-emerald-800">
                    {t.successSub}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", chamber: "", date: "", reason: "" });
                    }}
                    className="btn-pill btn-primary mt-6 text-[13px]"
                  >
                    {t.resetBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">
                      {t.fullName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-muted/50 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">
                      {t.phone} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-muted/50 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold text-ink">
                        {t.chamber} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.chamber}
                        onChange={(e) => setFormData({ ...formData, chamber: e.target.value })}
                        className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[14px] text-ink focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">{t.selectChamber}</option>
                        {practice.chambers.map((ch) => (
                          <option key={ch.id} value={ch.id}>
                            {ch.name[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold text-ink">
                        {t.preferredDate}
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[14px] text-ink focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">
                      {t.reason}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder={t.reasonPlaceholder}
                      className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-muted/50 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-pill btn-primary mt-2 flex w-full items-center justify-center gap-2 py-3.5 text-[14.5px] font-bold shadow-md hover:shadow-lg disabled:opacity-70"
                  >
                    <Send size={16} />
                    <span>{loading ? t.submitting : t.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Direct Chambers & Contacts */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Chambers info card */}
            <div className="glass rounded-3xl p-6 sm:p-7 shadow-sm">
              <h3 className="font-display text-[18px] font-bold text-ink">
                {lang === "en" ? "Chambers & Schedule" : "চেম্বার ও সময়সূচি"}
              </h3>
              <p className="mt-1 text-[12.5px] text-ink-muted">{t.hoursNote}</p>

              <div className="mt-5 flex flex-col gap-4">
                {practice.chambers.map((ch) => (
                  <div
                    key={ch.id}
                    className="rounded-2xl bg-white/80 p-4 border border-black/5 shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-display text-[14.5px] font-bold text-ink">
                        {ch.name[lang]}
                      </h4>
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent-2 shrink-0">
                        {ch.badge[lang]}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-ink-muted">{ch.location[lang]}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[12px] text-accent font-semibold">
                      <Clock size={13} />
                      <span>{ch.hours[lang]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Hotlines Card */}
            <div className="glass rounded-3xl p-6 sm:p-7 shadow-sm">
              <h3 className="font-display text-[17px] font-bold text-ink">
                {t.directContactTitle}
              </h3>

              <div className="mt-4 flex flex-col gap-3.5 text-[13.5px]">
                <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5">
                  <div className="rounded-xl bg-accent/10 p-2 text-accent">
                    <Phone size={17} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                      {lang === "en" ? "Serial Hotline" : "সিরিয়াল হটলাইন"}
                    </span>
                    <a
                      href={`tel:${practice.serialPhone}`}
                      className="font-display text-[16px] font-extrabold text-accent hover:underline"
                    >
                      {practice.serialPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5">
                  <div className="rounded-xl bg-accent/10 p-2 text-accent">
                    <Mail size={17} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                      {lang === "en" ? "Official Email" : "অফিসিয়াল ইমেইল"}
                    </span>
                    <a
                      href={`mailto:${practice.email}`}
                      className="font-semibold text-ink hover:text-accent"
                    >
                      {practice.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5.2: Final Single Dedicated WhatsApp Booking Action */}
        <div className="mt-14 rounded-3xl band-teal p-8 text-center text-white shadow-xl md:p-10">
          <div className="mx-auto max-w-[680px]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-inner">
              <MessageCircle size={28} />
            </div>
            <h2 className="font-display text-[24px] font-bold md:text-[30px]">
              {t.finalWhatsAppTitle}
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/85 sm:text-[15.5px]">
              {t.finalWhatsAppSub}
            </p>
            <div className="mt-7">
              <a
                href={whatsappHref(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-light inline-flex items-center gap-2.5 px-8 py-3.5 text-[14.5px] font-bold shadow-lg transition hover:scale-[1.02]"
              >
                <MessageCircle size={18} className="text-emerald-700" />
                <span>{t.finalWhatsAppBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
