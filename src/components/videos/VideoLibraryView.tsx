"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Play, X, ExternalLink, Film, CheckCircle, Sparkles } from "lucide-react";
import { videos, videoCategories, Video } from "@/lib/data/videos";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Video Library",
    title: "Every Procedure, Explained and Shown",
    subhead:
      "A growing archive of surgical clips and patient education videos from Dr. Nahal's practice — searchable by procedure, tagged by category, organized by clinical specialty. Modeled on how leading surgical educators worldwide share their work.",
    searchPlaceholder: 'Search videos (e.g. "cataract", "vitrectomy", "lasik")...',
    allVideos: "All Videos",
    emptyTitle: "No videos found for that search",
    emptySub: "Try a different search term or browse by category above.",
    clearFilter: "Clear filters",
    watchVideo: "Watch Video",
    playing: "Now Playing",
    closeModal: "Close Player",
    procedureTag: "Specialty",
    patientNotice:
      "All surgical footage is recorded during actual clinical operations and shared for public patient education with full patient privacy protocols.",
    relatedServices: "Explore Surgeries",
    bookConsultation: "Book an Appointment",
  },
  bn: {
    eyebrow: "ভিডিও লাইব্রেরি",
    title: "প্রতিটি চিকিৎসা, দেখানো ও বোঝানো",
    subhead:
      "ডা. নাহালের প্র্যাকটিস থেকে ক্রমবর্ধমান সার্জারি ও রোগী-শিক্ষামূলক ভিডিওর সংগ্রহ — প্রক্রিয়া অনুযায়ী সার্চযোগ্য, ক্যাটাগরি অনুযায়ী ট্যাগ করা, ক্লিনিক্যাল বিশেষত্বে সাজানো।",
    searchPlaceholder: 'ভিডিও সার্চ করুন (যেমন "ছানি", "ভিট্রেক্টমি", "লেসিক")...',
    allVideos: "সব ভিডিও",
    emptyTitle: "এই সার্চে কোনো ভিডিও পাওয়া যায়নি",
    emptySub: "অন্য কোনো শব্দ দিয়ে চেষ্টা করুন অথবা ওপরের ক্যাটাগরি থেকে ব্রাউজ করুন।",
    clearFilter: "ফিল্টার মুছুন",
    watchVideo: "ভিডিও দেখুন",
    playing: "ভিডিও চলছে",
    closeModal: "প্লেয়ার বন্ধ করুন",
    procedureTag: "বিশেষত্ব",
    patientNotice:
      "সকল সার্জিক্যাল ফুটেজ প্রকৃত অপারেশনের সময় ধারণকৃত এবং রোগীর সর্বোচ্চ গোপনীয়তা মেনে রোগী-সচেতনতার উদ্দেশ্যে প্রদর্শিত।",
    relatedServices: "সার্ভিস সমূহ দেখুন",
    bookConsultation: "অ্যাপয়েন্টমেন্ট নিন",
  },
};

export default function VideoLibraryView({
  lang,
  videosList,
}: {
  lang: Lang;
  videosList?: Video[];
}) {
  const items = videosList && videosList.length > 0 ? videosList : videos;
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const filteredVideos = useMemo(() => {
    return items.filter((v) => {

      const matchCat =
        selectedCat === "all" ||
        v.category.toLowerCase() === selectedCat.toLowerCase() ||
        (selectedCat === "education" && v.category === "Patient Education") ||
        (selectedCat === "refractive" && v.category === "Refractive");

      const q = search.toLowerCase().trim();
      if (!q) return matchCat;

      const matchTitle =
        v.title.en.toLowerCase().includes(q) || v.title.bn.toLowerCase().includes(q);
      const matchTag =
        v.tag.en.toLowerCase().includes(q) || v.tag.bn.toLowerCase().includes(q);
      const matchDesc =
        v.description?.en.toLowerCase().includes(q) ||
        v.description?.bn.toLowerCase().includes(q);

      return matchCat && (matchTitle || matchTag || matchDesc);
    });
  }, [search, selectedCat]);

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[800px] text-center">
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

        {/* Notice Strip */}
        <div className="mb-10 flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-[13px] text-ink-muted shadow-sm border border-black/5">
          <Film size={18} className="shrink-0 text-accent" />
          <span>{t.patientNotice}</span>
        </div>

        {/* Search & Categories */}
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
            {videoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                  selectedCat === cat.id
                    ? "bg-accent text-white shadow-sm"
                    : "glass text-ink-muted hover:text-ink"
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <h3 className="font-display text-[18px] font-bold text-ink">{t.emptyTitle}</h3>
            <p className="mt-2 text-[14px] text-ink-muted">{t.emptySub}</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("all");
              }}
              className="btn-pill btn-primary mt-5 text-[13px]"
            >
              {t.clearFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((v, i) => (
              <div
                key={v.id}
                className="glass group flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Thumbnail / Video Preview Placeholder */}
                  <div
                    onClick={() => setActiveVideo(v)}
                    className="relative flex aspect-[16/9] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F4A57] to-[#16232A] text-white shadow-inner transition group-hover:scale-[1.01]"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                      <Play size={22} className="ml-1 text-white fill-white" />
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                      {v.tag[lang]}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-accent-2">
                      {v.category}
                    </span>
                    <h3 className="mt-1 font-display text-[16.5px] font-bold leading-snug text-ink group-hover:text-accent transition">
                      {v.title[lang]}
                    </h3>
                    {v.description && (
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-muted">
                        {v.description[lang]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 border-t border-black/5 pt-3.5 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideo(v)}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-accent hover:underline"
                  >
                    <Play size={14} className="fill-accent" />
                    <span>{t.watchVideo}</span>
                  </button>
                  <span className="text-[12px] text-ink-muted/80">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-strong relative w-full max-w-[800px] overflow-hidden rounded-3xl p-5 sm:p-7 shadow-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                aria-label={t.closeModal}
              >
                <X size={20} />
              </button>

              <div className="mb-3">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[11.5px] font-bold text-accent-2">
                  {activeVideo.tag[lang]}
                </span>
                <h3 className="mt-2 font-display text-[20px] font-bold text-ink sm:text-[24px]">
                  {activeVideo.title[lang]}
                </h3>
              </div>

              {/* Player */}
              <div className="relative aspect-[9/16] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black shadow-lg">
                {activeVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                    title={activeVideo.title[lang]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                      activeVideo.url
                    )}&show_text=false&autoplay=1`}
                    title={activeVideo.title[lang]}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <p className="text-[13px] text-ink-muted">
                  {activeVideo.description?.[lang]}
                </p>
                <Link
                  href={`/${lang}/contact`}
                  onClick={() => setActiveVideo(null)}
                  className="btn-pill btn-primary shrink-0 text-[13px]"
                >
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
