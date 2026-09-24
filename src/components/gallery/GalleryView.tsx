"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X, Building2 } from "lucide-react";
import { galleryItems, GalleryItem } from "@/lib/data/gallery";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Gallery",
    title: "Inside the Practice",
    subhead:
      "Photos from Dr. Nahal's chambers, diagnostic equipment, and clinical moments — a look at where and how advanced ophthalmic care is delivered.",
    all: "All Photos",
    chambers: "Chambers",
    equipment: "Equipment",
    events: "Events & Teaching",
    zoom: "View Full Photo",
    close: "Close Preview",
  },
  bn: {
    eyebrow: "গ্যালারি",
    title: "প্র্যাকটিসের ভেতরের ঝলক",
    subhead:
      "ডা. নাহালের চেম্বার, উন্নত রোগনির্ণয় যন্ত্রপাতি ও চিকিৎসার কিছু মুহূর্তের ছবি — কোথায় ও কীভাবে সেবা দেওয়া হয় তার একটি স্বচ্ছ রূপরেখা।",
    all: "সব ছবি",
    chambers: "চেম্বার",
    equipment: "যন্ত্রপাতি",
    events: "ইভেন্ট ও শিক্ষা",
    zoom: "পুরো ছবি দেখুন",
    close: "বন্ধ করুন",
  },
};

export default function GalleryView({
  lang,
  initialItems,
}: {
  lang: Lang;
  initialItems?: GalleryItem[];
}) {
  const items = initialItems && initialItems.length > 0 ? initialItems : galleryItems;
  const t = dict[lang];
  const [filter, setFilter] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);


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

        {/* Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { key: "All", label: t.all },
            { key: "Chambers", label: t.chambers },
            { key: "Equipment", label: t.equipment },
            { key: "Events/Teaching", label: t.events },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                filter === tab.key
                  ? "bg-accent text-white shadow-sm"
                  : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="glass group cursor-pointer overflow-hidden rounded-3xl p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.caption[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-white/80 p-3 text-ink shadow-lg backdrop-blur-sm">
                    <Maximize2 size={18} />
                  </span>
                </div>
                <span className="glass-badge absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-bold text-white">
                  {item.category}
                </span>
              </div>

              <div className="p-3">
                <p className="font-display text-[14px] font-semibold text-ink leading-snug">
                  {item.caption[lang]}
                </p>
                {item.chamber && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-ink-muted">
                    <Building2 size={13} className="text-accent" />
                    <span>{item.chamber[lang]}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Lightbox */}
        {activeItem && (
          <div
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-[850px] overflow-hidden rounded-3xl bg-white p-4 shadow-2xl"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label={t.close}
              >
                <X size={20} />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                <Image
                  src={activeItem.src}
                  alt={activeItem.caption[lang]}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="p-4">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[11.5px] font-bold text-accent-2">
                  {activeItem.category}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-bold text-ink">
                  {activeItem.caption[lang]}
                </h3>
                {activeItem.chamber && (
                  <p className="mt-1 text-[13px] text-ink-muted">
                    {activeItem.chamber[lang]}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
