"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Sparkles, HelpCircle, Phone, Calendar, X } from "lucide-react";
import { faqs, FAQItem } from "@/lib/data/faq";
import { practice } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Frequently Asked Questions",
    title: "Common Questions & Answers",
    subhead:
      "Find transparent answers to common patient questions regarding procedures, appointment booking, recovery timelines, surgery costs, and emergency care.",
    searchPlaceholder: "Search questions (e.g., cataract pain, cost, referral, recovery)...",
    allCategories: "All Topics",
    stillQuestionsTitle: "Have a Question Not Listed Here?",
    stillQuestionsSub:
      "Our patient coordinators are happy to assist you with specific queries, chamber schedules, or fees.",
    callUs: "Call Hotline: 01344-890335",
    bookNow: "Book Consultation",
    noResults: "No questions match your query. Try a different search term.",
    clearFilter: "Clear filters",
  },
  bn: {
    eyebrow: "প্রায়ই জিজ্ঞাসিত প্রশ্ন",
    title: "সাধারণ প্রশ্নোত্তর",
    subhead:
      "চিকিৎসা পদ্ধতি, অ্যাপয়েন্টমেন্ট বুকিং, সুস্থ হওয়ার সময়, অপারেশন খরচ এবং জরুরি সেবা সম্পর্কে সাধারণ প্রশ্নের পরিষ্কার উত্তর পান।",
    searchPlaceholder: "প্রশ্ন খুঁজুন (যেমন: ছানি ব্যথা, খরচ, রেফারেল, লেসিক)...",
    allCategories: "সকল বিষয়",
    stillQuestionsTitle: "আপনার প্রশ্নের উত্তর পাননি?",
    stillQuestionsSub:
      "সুনির্দিষ্ট যেকোনো জিজ্ঞাসা, চেম্বারের সময় বা ফি সম্পর্কে বিস্তারিত জানতে আমাদের কেয়ার টিমের সাথে সরাসরি যোগাযোগ করুন।",
    callUs: "হটলাইনে কল করুন: ০১৩৪৪-৮৯০৩৩৫",
    bookNow: "অ্যাপয়েন্টমেন্ট নিন",
    noResults: "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো প্রশ্ন পাওয়া যায়নি। অন্য শব্দ লিখে চেষ্টা করুন।",
    clearFilter: "ফিল্টার মুছুন",
  },
};

export default function FAQView({
  lang,
  faqsList,
}: {
  lang: Lang;
  faqsList?: FAQItem[];
}) {
  const items = faqsList && faqsList.length > 0 ? faqsList : faqs;
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "faq-1");

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((f) => set.add(f.category[lang]));
    return Array.from(set);
  }, [lang, items]);

  const filteredFaqs = useMemo(() => {
    return items.filter((f) => {
      const matchCat = activeCategory === "all" || f.category[lang] === activeCategory;
      const q = search.toLowerCase().trim();
      if (!q) return matchCat;
      const matchQ =
        f.question.en.toLowerCase().includes(q) || f.question.bn.toLowerCase().includes(q);
      const matchA =
        f.answer.en.toLowerCase().includes(q) || f.answer.bn.toLowerCase().includes(q);
      return matchCat && (matchQ || matchA);
    });
  }, [search, activeCategory, lang, items]);


  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[940px] px-6">
        {/* Header */}
        <div className="mx-auto mb-10 text-center">
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

        {/* Search Bar */}
        <div className="mb-8 flex flex-col gap-4">
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
              className={`rounded-full px-4 py-1.5 text-[12.5px] font-bold transition ${
                activeCategory === "all"
                  ? "bg-accent text-white shadow-sm"
                  : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {t.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[12.5px] font-bold transition ${
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

        {/* Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center">
            <p className="text-[15px] text-ink-muted">{t.noResults}</p>
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
          <div className="flex flex-col gap-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass overflow-hidden rounded-2xl transition duration-200 border border-black/5"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left font-display text-[15.5px] font-bold text-ink hover:text-accent transition sm:text-[16.5px]"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent-2 shrink-0">
                        {faq.category[lang]}
                      </span>
                      <span>{faq.question[lang]}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-accent transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-black/5 px-5 pb-5 pt-3 animate-in fade-in duration-150">
                      <p className="text-[14.5px] leading-relaxed text-ink-muted">
                        {faq.answer[lang]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Support Banner */}
        <div className="mt-14 rounded-3xl glass p-8 text-center sm:p-10 shadow-sm border border-black/5">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-display text-[20px] font-bold text-ink">
            {t.stillQuestionsTitle}
          </h3>
          <p className="mt-2 text-[14px] text-ink-muted max-w-[55ch] mx-auto">
            {t.stillQuestionsSub}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${practice.serialPhone}`}
              className="btn-pill btn-primary text-[13.5px] inline-flex items-center gap-2"
            >
              <Phone size={14} />
              <span>{t.callUs}</span>
            </a>
            <Link
              href={`/${lang}/contact`}
              className="btn-pill btn-ghost text-[13.5px] inline-flex items-center gap-2"
            >
              <Calendar size={14} />
              <span>{t.bookNow}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
