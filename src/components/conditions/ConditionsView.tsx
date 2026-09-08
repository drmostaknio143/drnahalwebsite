"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShieldAlert, ArrowRight, X, ExternalLink, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { conditions, Condition } from "@/lib/data/conditions";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Conditions We Treat",
    title: "Understand Your Eye Condition",
    subhead:
      "Clear, plain-language explanations of the eye conditions Dr. Nahal treats most — what they are, why they happen, and what treatment looks like. This page is informational and does not replace an in-person clinical exam.",
    emergencyTitle: "Retinal Emergency Warning",
    emergencyBody:
      "Sudden vision loss, flashes of light, or a dark shadow/curtain moving across your vision are medical emergencies. Call immediately rather than waiting for an online booking.",
    emergencyCall: "Emergency Hotline: 01344-890335",
    searchPlaceholder: "Search condition (e.g. cataract, retina, squint, dry eye)...",
    allCategories: "All Conditions",
    readMore: "Learn More & Treatment",
    whatIsIt: "What It Is",
    whyItHappens: "Why It Happens",
    howTreated: "How It's Treated",
    relatedService: "Related Surgical Service",
    viewService: "View Service & Procedure Details",
    bookConsultation: "Schedule a Consultation",
    close: "Close",
    coreBadge: "Core Specialty",
    secondaryBadge: "Management",
    noResults: "No conditions match your search. Try another query or clear the filter.",
    clearFilter: "Clear filters",
  },
  bn: {
    eyebrow: "আমরা যেসব রোগের চিকিৎসা করি",
    title: "আপনার চোখের সমস্যাটি বুঝুন",
    subhead:
      "ডা. নাহাল যেসব রোগের চিকিৎসা সবচেয়ে বেশি করেন, সেগুলোর সহজ ভাষায় ব্যাখ্যা — কী এই রোগ, কেন হয়, আর চিকিৎসা কেমন হয়। এই পেজের তথ্য শুধু সাধারণ ধারণার জন্য, সরাসরি চিকিৎসকের পরীক্ষার বিকল্প নয়।",
    emergencyTitle: "রেটিনা সংক্রান্ত জরুরি সতর্কতা",
    emergencyBody:
      "হঠাৎ দৃষ্টি কমে যাওয়া, আলোর ঝলকানি, বা দৃষ্টির কোনো অংশে পর্দার মতো কালো ছায়া দেখা দিলে দেরি না করে সাথে সাথে জরুরি নম্বরে যোগাযোগ করুন।",
    emergencyCall: "জরুরি হটলাইন: ০১৩৪৪-৮৯০৩৩৫",
    searchPlaceholder: "রোগ অনুসন্ধান করুন (যেমন: ছানি, রেটিনা, স্কুইন্ট, ড্রাই আই)...",
    allCategories: "সব রোগ",
    readMore: "বিস্তারিত ও চিকিৎসা পদ্ধতি",
    whatIsIt: "কী এই রোগ",
    whyItHappens: "কেন হয়",
    howTreated: "চিকিৎসা কীভাবে হয়",
    relatedService: "সংশ্লিষ্ট সার্জিক্যাল সার্ভিস",
    viewService: "সার্ভিস ও প্রক্রিয়ার বিবরণ দেখুন",
    bookConsultation: "পরামর্শের জন্য সিরিয়াল নিন",
    close: "বন্ধ করুন",
    coreBadge: "প্রধান বিশেষত্ব",
    secondaryBadge: "ব্যবস্থাপনা",
    noResults: "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো রোগ পাওয়া যায়নি। অন্য শব্দ লিখে চেষ্টা করুন।",
    clearFilter: "ফিল্টার মুছুন",
  },
};

export default function ConditionsView({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    conditions.forEach((c) => set.add(c.category[lang]));
    return Array.from(set);
  }, [lang]);

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

        {/* Emergency Alert Callout */}
        <div className="mb-10 rounded-2xl border border-rose-200 bg-rose-50/90 p-5 text-rose-950 shadow-sm md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 rounded-xl bg-rose-600 p-2 text-white shadow-sm">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-rose-900">{t.emergencyTitle}</h3>
                <p className="mt-0.5 text-[13.5px] text-rose-800 leading-relaxed max-w-[75ch]">
                  {t.emergencyBody}
                </p>
              </div>
            </div>
            <a
              href="tel:01344-890335"
              className="btn-pill inline-flex shrink-0 items-center justify-center bg-rose-700 text-[13px] font-bold text-white shadow-sm hover:bg-rose-800"
            >
              {t.emergencyCall}
            </a>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/70"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="glass w-full rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                activeCategory === "all"
                  ? "bg-accent text-white shadow-sm"
                  : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {t.allCategories} ({conditions.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                  activeCategory === cat
                    ? "bg-accent text-white shadow-sm"
                    : "glass text-ink-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Conditions Grid */}
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-[16px] text-ink-muted">{t.noResults}</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="btn-pill btn-primary mt-4 text-[13px]"
            >
              {t.clearFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div
                key={c.slug}
                className="glass group flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-[11.5px] font-bold text-accent-2">
                      {c.category[lang]}
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        c.tier === "Core" ? "text-accent" : "text-ink-muted"
                      }`}
                    >
                      {c.tier === "Core" ? t.coreBadge : t.secondaryBadge}
                    </span>
                  </div>

                  <h3 className="font-display text-[20px] font-bold leading-snug text-ink group-hover:text-accent transition">
                    {c.name[lang]}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-ink-muted">
                    {c.whatIsIt[lang]}
                  </p>

                  {/* Symptom Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags[lang].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-black/5 pt-4">
                  <button
                    onClick={() => setSelectedCondition(c)}
                    className="flex w-full items-center justify-between font-semibold text-accent text-[13.5px] transition group-hover:translate-x-1"
                  >
                    <span>{t.readMore}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Condition Detail Modal */}
        {selectedCondition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-strong relative max-h-[90vh] w-full max-w-[760px] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setSelectedCondition(null)}
                className="absolute right-5 top-5 rounded-full bg-black/5 p-2 text-ink transition hover:bg-black/10"
                aria-label={t.close}
              >
                <X size={20} />
              </button>

              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[12px] font-bold text-accent-2">
                {selectedCondition.category[lang]}
              </div>

              <h2 className="font-display text-[26px] font-bold text-ink sm:text-[32px]">
                {selectedCondition.name[lang]}
              </h2>

              {selectedCondition.emergencyNote && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-950">
                  <ShieldAlert size={20} className="mt-0.5 shrink-0 text-rose-600" />
                  <p className="text-[13.5px] font-medium leading-relaxed">
                    {selectedCondition.emergencyNote[lang]}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-6 text-[14.5px] leading-relaxed text-ink">
                {/* What is it */}
                <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-display text-[15px] font-bold text-accent">
                    <CheckCircle2 size={16} /> {t.whatIsIt}
                  </h4>
                  <p className="mt-2 text-ink-muted leading-relaxed">
                    {selectedCondition.whatIsIt[lang]}
                  </p>
                </div>

                {/* Why it happens */}
                <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-display text-[15px] font-bold text-accent">
                    <CheckCircle2 size={16} /> {t.whyItHappens}
                  </h4>
                  <p className="mt-2 text-ink-muted leading-relaxed">
                    {selectedCondition.whyItHappens[lang]}
                  </p>
                </div>

                {/* How it is treated */}
                <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-display text-[15px] font-bold text-accent">
                    <CheckCircle2 size={16} /> {t.howTreated}
                  </h4>
                  <p className="mt-2 text-ink-muted leading-relaxed">
                    {selectedCondition.howTreated[lang]}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={`/${lang}/services`}
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-accent hover:underline"
                >
                  <ExternalLink size={15} />
                  {t.viewService}
                </Link>

                <Link
                  href={`/${lang}/contact`}
                  onClick={() => setSelectedCondition(null)}
                  className="btn-pill btn-primary text-[13.5px] inline-flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  {t.bookConsultation}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
