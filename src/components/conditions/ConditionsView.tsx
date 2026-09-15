"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  X,
  Calendar,
  CheckCircle2,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Stethoscope,
  Eye,
  AlertCircle,
  Activity,
  Layers,
  HelpCircle,
} from "lucide-react";
import { conditions, Condition } from "@/lib/data/conditions";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Conditions & Ophthalmic Specialties",
    title: "Understand Your Eye Condition",
    subhead:
      "Comprehensive, patient-first guide to the 16 primary eye conditions treated by Dr. Nahal Mostak Khan Arnob — from advanced vitreoretinal disorders to micro-incision phaco cataract surgeries.",
    emergencyTitle: "Retinal Emergency Alert",
    emergencyBody:
      "Sudden vision darkening, a curtain falling across your field of view, or showers of floaters require urgent intervention. Contact emergency immediately.",
    emergencyCall: "Emergency Hotline: 01344-890335",
    searchPlaceholder: "Search any eye condition, symptom, or treatment...",
    allCategories: "All Conditions",
    coreBadge: "Core Surgical Specialty",
    secondaryBadge: "Clinical Management",
    browseAllServices: "Browse All Surgical Services",
    conditionCount: "Condition",
    prev: "Previous",
    next: "Next",
    tabs: {
      what: "What It Is",
      why: "Causes & Risks",
      how: "How It's Treated",
    },
    keyFocus: "Key Symptoms & Clinical Indicators",
    bookBtn: "Book with Specialist",
    serviceBtn: "Explore Related Surgery",
    quickJump: "Quick Jump to Any Condition",
    gridTitle: "All 16 Eye Conditions at a Glance",
    gridSubtitle:
      "Click any condition below to load its full visual showcase, clinical risks, and surgical treatments above.",
    viewInShowcase: "View in Showcase",
    noResults: "No eye conditions found matching your search. Please try another query.",
    clearFilter: "Clear Filters",
    emergencyBadge: "Urgent Medical Attention",
  },
  bn: {
    eyebrow: "চক্ষু রোগ ও বিশেষ চিকিৎসা সেবা",
    title: "আপনার চোখের সমস্যাটি বুঝুন",
    subhead:
      "ডা. নাহাল মোস্তাক খান অর্ণব যেসব চোখের জটিল রোগের চিকিৎসা ও মাইক্রো-সার্জারি করেন, সেগুলোর ১৬টি প্রধান রোগের সহজ ও নির্ভরযোগ্য বিবরণ — লক্ষণ, কারণ এবং আধুনিক সমাধান।",
    emergencyTitle: "রেটিনা সংক্রান্ত জরুরি সতর্কতা",
    emergencyBody:
      "হঠাৎ দৃষ্টি অন্ধকার হয়ে যাওয়া, চোখের সামনে কালো পর্দা পড়া, বা আলোর ঝলকানি দেখা দিলে অবিলম্বে জরুরি নম্বরে যোগাযোগ করুন। এটি রেটিনা বিচ্ছিন্নতার লক্ষণ হতে পারে।",
    emergencyCall: "জরুরি হটলাইন: ০১৩৪৪-৮৯০৩৩৫",
    searchPlaceholder: "রোগের নাম, লক্ষণ বা চিকিৎসা লিখে খুঁজুন...",
    allCategories: "সকল রোগ",
    coreBadge: "প্রধান সার্জিক্যাল বিশেষত্ব",
    secondaryBadge: "ক্লিনিক্যাল ব্যবস্থাপনা",
    browseAllServices: "সকল সার্জিক্যাল সেবা দেখুন",
    conditionCount: "রোগ",
    prev: "আগেরটি",
    next: "পরেরটি",
    tabs: {
      what: "কী এই রোগ",
      why: "কারণ ও ঝুঁকি",
      how: "চিকিৎসা ও সমাধান",
    },
    keyFocus: "প্রধান লক্ষণ ও বিশেষ নির্দেশক",
    bookBtn: "পরামর্শের জন্য সিরিয়াল নিন",
    serviceBtn: "সম্পর্কিত সার্জারি দেখুন",
    quickJump: "যেকোনো রোগে সরাসরি যান",
    gridTitle: "একনজরে ১৬টি চোখের রোগ ও লক্ষণ",
    gridSubtitle:
      "নিচের যেকোনো কার্ডে ক্লিক করলে উপরে তার পূর্ণাঙ্গ চিত্র, কারণ এবং চিকিৎসা দেখতে পাবেন।",
    viewInShowcase: "শোকেসে দেখুন",
    noResults: "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো রোগ পাওয়া যায়নি। অনুগ্রহ করে অন্য শব্দ দিয়ে চেষ্টা করুন।",
    clearFilter: "ফিল্টার মুছুন",
    emergencyBadge: "জরুরি চিকিৎসা প্রয়োজন",
  },
};

export default function ConditionsView({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"what" | "why" | "how">("what");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Extract unique categories in current language
  const categories = useMemo(() => {
    const set = new Set<string>();
    conditions.forEach((c) => set.add(c.category[lang]));
    return Array.from(set);
  }, [lang]);

  // Filtered conditions list based on category & search query
  const filtered = useMemo(() => {
    return conditions.filter((c) => {
      const matchesCat = activeCategory === "all" || c.category[lang] === activeCategory;
      const q = search.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchName =
        c.name.en.toLowerCase().includes(q) ||
        c.name.bn.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q);
      const matchTag =
        c.tags.en.some((tg) => tg.toLowerCase().includes(q)) ||
        c.tags.bn.some((tg) => tg.toLowerCase().includes(q));
      const matchWhat =
        c.whatIsIt.en.toLowerCase().includes(q) || c.whatIsIt.bn.toLowerCase().includes(q);
      return matchesCat && (matchName || matchTag || matchWhat);
    });
  }, [search, activeCategory, lang]);

  // Ensure selectedIndex is always within range of filtered items
  useEffect(() => {
    if (selectedIndex >= filtered.length) {
      setSelectedIndex(0);
    }
  }, [filtered.length, selectedIndex]);

  const activeCondition: Condition | undefined = filtered[selectedIndex] || filtered[0];

  // Handlers for next / previous
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered.length]);

  // Scroll active thumbnail item into view on rail
  useEffect(() => {
    if (!railRef.current) return;
    const activeEl = railRef.current.children[selectedIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [selectedIndex]);

  // Select condition and smoothly scroll to showcase
  const selectCondition = (index: number) => {
    setSelectedIndex(index);
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-14 overflow-x-hidden">
      {/* Top Header & Filters Container */}
      <div className="mx-auto max-w-[1400px] 2xl:max-w-[1600px] px-4 sm:px-8 lg:px-12">
        {/* Top Header Section */}
        <div className="mx-auto mb-8 max-w-[840px] text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-accent-2">
            <Sparkles size={14} className="text-accent" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-[30px] font-extrabold tracking-tight text-ink sm:text-[38px] md:text-[46px] leading-[1.18]">
            {t.title}
          </h1>
          <p className="mt-3.5 text-[15px] leading-relaxed text-ink-muted sm:text-[16.5px]">
            {t.subhead}
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-rose-200/90 bg-gradient-to-r from-rose-50 via-rose-50/70 to-amber-50/40 p-4 sm:p-5 text-rose-950 shadow-xs">
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 rounded-xl bg-rose-600 p-2 text-white shadow-xs">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-rose-900">{t.emergencyTitle}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-rose-800/95 max-w-[85ch]">
                  {t.emergencyBody}
                </p>
              </div>
            </div>
            <a
              href="tel:01344-890335"
              className="btn-pill inline-flex shrink-0 items-center justify-center bg-rose-700 text-[12.5px] font-bold text-white shadow-xs hover:bg-rose-800 transition"
            >
              {t.emergencyCall}
            </a>
          </div>
        </div>

        {/* Navigation & Search Filter Bar */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-[620px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/70"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="glass w-full rounded-2xl py-3 pl-11 pr-10 text-[14px] font-medium text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Link to Services */}
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent-2 hover:text-accent transition self-start sm:self-auto py-1"
            >
              <span>{t.browseAllServices}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedIndex(0);
              }}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition ${
                activeCategory === "all"
                  ? "bg-accent text-white shadow-xs"
                  : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {t.allCategories} ({conditions.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition ${
                  activeCategory === cat
                    ? "bg-accent text-white shadow-xs"
                    : "glass text-ink-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Master Showcase Section - TRUE FULL BLEED SCREEN (NO OUTER CARD) */}
      <section ref={showcaseRef} className="scroll-mt-20 w-full py-6 md:py-10">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center max-w-[1000px] mx-auto">
              <AlertCircle size={36} className="mx-auto text-ink-muted/60 mb-3" />
              <p className="text-[16px] text-ink-muted">{t.noResults}</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                  setSelectedIndex(0);
                }}
                className="btn-pill btn-primary mt-4 text-[13px]"
              >
                {t.clearFilter}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12 2xl:gap-16 items-center">
              {/* 1. LEFT COLUMN: Big Visual Showcase Image */}
              <div className="relative flex flex-col lg:col-span-6 2xl:col-span-6">
                <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px] 2xl:min-h-[640px] w-full overflow-hidden rounded-3xl border border-slate-300/80 bg-slate-950 shadow-2xl">
                  <Image
                    key={activeCondition?.slug}
                    src={activeCondition?.image || "/images/2. Conditions_Images/1. Cataract.png"}
                    alt={activeCondition ? activeCondition.name[lang] : "Condition"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority
                    className="object-cover object-center transition-all duration-500 ease-out hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute left-3.5 top-3.5 right-3.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-slate-900/80 px-3.5 py-1.5 text-[12px] font-bold text-white shadow-md backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span>{activeCondition?.category[lang]}</span>
                    </div>

                    <div className="rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-200 shadow-md backdrop-blur-md">
                      {activeCondition?.tier === "Core" ? t.coreBadge : t.secondaryBadge}
                    </div>
                  </div>

                  {/* Bottom Floating Alert or Meta Badge */}
                  <div className="absolute inset-x-3.5 bottom-3.5">
                    {activeCondition?.emergencyNote ? (
                      <div className="rounded-2xl border border-rose-300/40 bg-rose-950/90 p-4 text-rose-100 shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-2 font-bold text-[12.5px] text-rose-300">
                          <ShieldAlert size={15} />
                          <span>{t.emergencyBadge}</span>
                        </div>
                        <p className="mt-1 text-[12px] leading-relaxed text-rose-200/90">
                          {activeCondition.emergencyNote[lang]}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/20 bg-slate-900/80 p-3.5 text-white shadow-md backdrop-blur-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Stethoscope size={15} className="text-emerald-400 shrink-0" />
                          <span className="text-[12.5px] font-medium text-slate-200">
                            Dr. Nahal Mostak Khan Arnob
                          </span>
                        </div>
                        <span className="text-[11.5px] font-semibold text-emerald-300">
                          {activeCondition?.category[lang]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. CENTER COLUMN: Vertical Thumbnail Rail (Horizontal on Mobile) */}
              <div className="flex lg:flex-col lg:col-span-1 2xl:col-span-1 gap-2.5 order-last lg:order-none items-center justify-center">
                {/* Up button for desktop */}
                <button
                  onClick={handlePrev}
                  className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-accent hover:text-white hover:border-accent transition shadow-xs"
                  aria-label="Previous condition"
                >
                  <ChevronUp size={16} />
                </button>

                {/* Thumbnail Scroll Rail */}
                <div
                  ref={railRef}
                  className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto max-h-[480px] xl:max-h-[520px] w-full py-1 px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {filtered.map((cond, idx) => {
                    const isActive = idx === selectedIndex;
                    const formattedNum = String(idx + 1).padStart(2, "0");

                    return (
                      <button
                        key={cond.slug}
                        onClick={() => setSelectedIndex(idx)}
                        className={`relative group shrink-0 h-13 w-13 sm:h-14 sm:w-14 rounded-2xl overflow-hidden border transition-all duration-200 focus:outline-none ${
                          isActive
                            ? "ring-2 ring-accent ring-offset-2 scale-105 border-accent shadow-md"
                            : "border-slate-300/80 opacity-70 hover:opacity-100 hover:scale-102 bg-white"
                        }`}
                        title={`${formattedNum}. ${cond.name[lang]}`}
                      >
                        <Image
                          src={cond.image}
                          alt={cond.name[lang]}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 flex items-end justify-center pb-0.5 transition ${
                            isActive ? "bg-accent/40" : "bg-black/30 group-hover:bg-black/10"
                          }`}
                        >
                          <span className="text-[10px] font-extrabold text-white drop-shadow-md">
                            {formattedNum}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Down button for desktop */}
                <button
                  onClick={handleNext}
                  className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-accent hover:text-white hover:border-accent transition shadow-xs"
                  aria-label="Next condition"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* 3. RIGHT COLUMN: Rich Clinical Information Panel */}
              <div className="flex flex-col justify-center lg:col-span-5 2xl:col-span-5 py-2">
                <div>
                  {/* Top Navigator & Counter */}
                  <div className="flex items-center justify-between border-b border-slate-300/70 pb-3 mb-4">
                    {/* Left: Interactive Prev / Next with Category */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-accent hover:text-white hover:border-accent transition shadow-2xs"
                        aria-label={t.prev}
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-accent hover:text-white hover:border-accent transition shadow-2xs"
                        aria-label={t.next}
                      >
                        <ArrowRight size={14} />
                      </button>
                      <span className="ml-1 text-[12.5px] font-bold text-accent-2">
                        {activeCondition?.category[lang]}
                      </span>
                    </div>

                    {/* Right: Counter badge e.g. 01 / 16 */}
                    <div className="rounded-full bg-slate-200/80 px-3 py-1 font-mono text-[12.5px] font-bold text-accent">
                      {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Condition Main Title (Clean & strictly in selected language) */}
                  <div>
                    <h2 className="font-display text-[28px] sm:text-[34px] xl:text-[38px] font-extrabold text-ink leading-[1.18]">
                      {activeCondition?.name[lang]}
                    </h2>
                  </div>

                  {/* 3-Segment Interactive Medical Tabs */}
                  <div className="mt-5 flex items-center rounded-2xl bg-slate-200/80 p-1 border border-slate-300/70 max-w-[480px]">
                    <button
                      onClick={() => setActiveTab("what")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[12.5px] font-bold transition-all ${
                        activeTab === "what"
                          ? "bg-white text-accent shadow-xs"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      <Eye size={14} />
                      <span>{t.tabs.what}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("why")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[12.5px] font-bold transition-all ${
                        activeTab === "why"
                          ? "bg-white text-accent shadow-xs"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      <Activity size={14} />
                      <span>{t.tabs.why}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("how")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[12.5px] font-bold transition-all ${
                        activeTab === "how"
                          ? "bg-white text-accent shadow-xs"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      <Stethoscope size={14} />
                      <span>{t.tabs.how}</span>
                    </button>
                  </div>

                  {/* Tab Body Content */}
                  <div className="mt-4 rounded-2xl border border-slate-200/90 bg-white/90 p-5 sm:p-6 shadow-xs">
                    {activeTab === "what" && (
                      <div className="animate-in fade-in duration-200">
                        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-ink-muted">
                          {activeCondition?.whatIsIt[lang]}
                        </p>
                      </div>
                    )}

                    {activeTab === "why" && (
                      <div className="animate-in fade-in duration-200">
                        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-ink-muted">
                          {activeCondition?.whyItHappens[lang]}
                        </p>
                      </div>
                    )}

                    {activeTab === "how" && (
                      <div className="animate-in fade-in duration-200">
                        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-ink-muted">
                          {activeCondition?.howTreated[lang]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Key Specialized Focus & Symptoms Pills */}
                  <div className="mt-5">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      <Layers size={13} className="text-accent" />
                      <span>{t.keyFocus}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeCondition?.tags[lang].map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink shadow-2xs hover:border-accent/40 transition"
                        >
                          <CheckCircle2 size={14} className="text-accent shrink-0" />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Buttons Row */}
                <div className="mt-7 pt-4 border-t border-slate-300/70 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${lang}/contact`}
                    className="btn-pill btn-primary shadow-xs transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md text-[13px]"
                  >
                    <Calendar size={15} />
                    <span>{t.bookBtn}</span>
                  </Link>

                  <Link
                    href={`/${lang}/services#${activeCondition?.relatedServiceSlug || ""}`}
                    className="btn-pill btn-ghost border border-slate-300 bg-white/60 hover:bg-white text-[13px]"
                  >
                    <span>{t.serviceBtn}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Section: All 16 Conditions Gallery Grid */}
      <div className="mx-auto max-w-[1400px] 2xl:max-w-[1600px] px-4 sm:px-8 lg:px-12 pt-6 pb-12">
        <div className="border-t border-slate-200/80 pt-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-accent-2 mb-1">
                <HelpCircle size={14} />
                <span>{t.quickJump}</span>
              </div>
              <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-ink">
                {t.gridTitle}
              </h3>
            </div>
            <p className="text-[13px] text-ink-muted max-w-[50ch]">
              {t.gridSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((cond, idx) => {
              const isActive = idx === selectedIndex;
              const formattedNum = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={cond.slug}
                  onClick={() => selectCondition(idx)}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 group flex flex-col justify-between ${
                    isActive
                      ? "border-accent bg-accent-soft/30 shadow-md ring-2 ring-accent/30"
                      : "border-slate-200 bg-white hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative h-[130px] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                      <Image
                        src={cond.image}
                        alt={cond.name[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-white backdrop-blur-xs">
                        {formattedNum}
                      </div>
                      <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                        {cond.category[lang]}
                      </div>
                    </div>

                    {/* Condition Name */}
                    <h4 className="font-display text-[15.5px] font-bold text-ink group-hover:text-accent transition line-clamp-1">
                      {cond.name[lang]}
                    </h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-muted line-clamp-2">
                      {cond.whatIsIt[lang]}
                    </p>
                  </div>

                  {/* Footer Tag & CTA */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11.5px] font-semibold text-accent">
                    <span>{t.viewInShowcase}</span>
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
