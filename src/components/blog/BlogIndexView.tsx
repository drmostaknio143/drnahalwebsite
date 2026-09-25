"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, Calendar, ArrowRight, Sparkles, X, BookOpen } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/data/blogs";
import { practice } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Patient Education & Insights",
    title: "Eye Health Knowledge Hub",
    subhead:
      "Evidence-based, clear articles written for patients and families — understanding symptoms, modern surgeries, recovery guidelines, and vision preservation.",
    searchPlaceholder: "Search articles (e.g. cataract recovery, lasik, diabetes, ROP)...",
    all: "All Articles",
    readArticle: "Read Full Guide",
    byDoctor: "By Dr. Nahal Mostak Khan",
    noResults: "No articles found matching your search. Try another keyword.",
    clearFilter: "Clear filters",
  },
  bn: {
    eyebrow: "রোগী সচেতনতা ও চিকিৎসা তথ্য",
    title: "চোখের স্বাস্থ্য বিষয়ক তথ্যভাণ্ডার",
    subhead:
      "রোগী ও তাদের পরিবারের জন্য সহজ ভাষায় চিকিৎসা প্রবন্ধ — চোখের বিভিন্ন লক্ষণ, আধুনিক সার্জারি, সুস্থতার নিয়মাবলী ও দৃষ্টি সুরক্ষার বিস্তারিত গাইড।",
    searchPlaceholder: "প্রবন্ধ অনুসন্ধান করুন (যেমন: ছানি অপারেশন, লেসিক, ডায়াবেটিস, ROP)...",
    all: "সকল প্রবন্ধ",
    readArticle: "সম্পূর্ণ প্রবন্ধ পড়ুন",
    byDoctor: "ডা. নাহাল মোস্তাক খান",
    noResults: "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো প্রবন্ধ পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।",
    clearFilter: "ফিল্টার মুছুন",
  },
};

export default function BlogIndexView({
  lang,
  initialBlogs,
}: {
  lang: Lang;
  initialBlogs?: BlogPost[];
}) {
  const blogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts;
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category?.[lang]) set.add(b.category[lang]);
    });
    return Array.from(set);
  }, [lang, blogs]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat =
        activeCategory === "All" ||
        (b.category && b.category[lang] === activeCategory);
      const q = search.toLowerCase().trim();
      if (!q) return matchCat;
      const matchTitle =
        (b.title?.en && b.title.en.toLowerCase().includes(q)) ||
        (b.title?.bn && b.title.bn.toLowerCase().includes(q));
      const matchDesc =
        (b.metaDescription?.en && b.metaDescription.en.toLowerCase().includes(q)) ||
        (b.metaDescription?.bn && b.metaDescription.bn.toLowerCase().includes(q));
      return matchCat && (matchTitle || matchDesc);
    });
  }, [search, activeCategory, lang, blogs]);


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

        {/* Search and Category filters */}
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
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-1.5 text-[12.5px] font-bold transition ${
                activeCategory === "All"
                  ? "bg-accent text-white shadow-sm"
                  : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {t.all} ({blogs.length})
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

        {/* Blog Posts Grid */}
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-[15.5px] text-ink-muted">{t.noResults}</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="btn-pill btn-primary mt-4 text-[13px]"
            >
              {t.clearFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.slug}
                className="glass group flex flex-col justify-between overflow-hidden rounded-3xl p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={post.image || "/images/services/cataract-surgery.jpg"}
                      alt={post.title?.[lang] || post.title?.en || "Article"}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="glass-badge absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-bold text-white">
                      {post.category?.[lang] || post.category?.en || "Eye Care"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-[12px] text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime?.[lang] || post.readTime?.en || "5 min read"}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-[18px] font-bold leading-snug text-ink transition group-hover:text-accent">
                    {post.title?.[lang] || post.title?.en}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-muted">
                    {post.metaDescription?.[lang] || post.metaDescription?.en}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/5 pt-4 flex items-center justify-between">
                  <span className="text-[11.5px] font-medium text-ink-muted">
                    {t.byDoctor}
                  </span>
                  <Link
                    href={`/${lang}/blog/${encodeURIComponent((post.slug || "").trim())}`}
                    className="flex items-center gap-1 text-[13px] font-bold text-accent group-hover:translate-x-1 transition"
                  >
                    <span>{t.readArticle}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
