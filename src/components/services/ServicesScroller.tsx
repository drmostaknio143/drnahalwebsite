"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Eye,
  ScanEye,
  Glasses,
  Focus,
  Droplets,
  Gauge,
  Baby,
  Scissors,
  Sun,
  AlertTriangle,
  X,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { servicesDict } from "@/lib/i18n/services";
import { whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";
import Reveal from "@/components/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "cataract-surgery": Eye,
  "vitreoretinal-surgery": ScanEye,
  "refractive-surgery": Glasses,
  "squint-surgery": Focus,
  "diabetic-eye-care": Droplets,
  "glaucoma-management": Gauge,
  "dry-eye-corneal-disease": Droplets,
  "rop-care": Baby,
  oculoplasty: Scissors,
  "pterygium-surgery": Sun,
  "eye-trauma-emergency": AlertTriangle,
};

export default function ServicesScroller({
  lang,
  servicesList,
}: {
  lang: Lang;
  servicesList?: typeof services;
}) {
  const items = servicesList && servicesList.length > 0 ? servicesList : services;
  const t = servicesDict[lang];
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = items.find((s) => s.slug === activeSlug) ?? null;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // as the next card scrolls up and covers a card, defocus/scale it down —
  // the card that's currently "on top" stays perfectly sharp.
  useEffect(() => {
    const triggers = cardRefs.current
      .filter((el): el is HTMLDivElement => !!el)
      .slice(0, -1)
      .map((wrapper) => {
        const inner = wrapper.firstElementChild as HTMLElement;
        return ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(inner, {
              filter: `blur(${self.progress * 9}px)`,
              scale: 1 - self.progress * 0.06,
              opacity: 1 - self.progress * 0.25,
            });
          },
        });
      });
    return () => triggers.forEach((tr) => tr.kill());
  }, [lang]);

  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            {t.eyebrow}
          </div>
          <h1 className="font-display text-[28px] font-bold md:text-[38px]">{t.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted md:text-[16.5px]">{t.subhead}</p>
          <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-wide text-accent-2/70">{t.hint}</p>
        </Reveal>
      </div>

      {/* pinned-stack scroll cards: full viewport width (breaks out of the
          max-w-[1180px] reading column on purpose — the client wants each
          service photo to bleed edge-to-edge, no side gutters, on both
          desktop and mobile). Each card sticks near the top of the viewport
          and the next card scrolls up to cover it. */}
      {/* transform-based full-bleed (left-1/2 + -translate-x-1/2) breaks
          position:sticky on descendants in some browsers — this uses
          negative margins instead, which don't create a new containing
          block and leave sticky positioning intact. */}
      <div className="w-screen" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}>
        <div className="relative">
          {items.map((s, i) => {
            const Icon = icons[s.slug] ?? Eye;

            return (
              <div
                key={s.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="sticky top-0"
                style={{ zIndex: i + 1 }}
              >
                <div
                  className={`relative flex min-h-[520px] flex-col justify-between overflow-hidden md:min-h-[680px] ${
                    s.image ? "" : "glass-strong mx-auto max-w-[1180px] p-8 md:rounded-[32px] md:p-14"
                  }`}
                  style={s.image ? { willChange: "filter, opacity, transform", transform: "translateZ(0)" } : undefined}
                >
                  {s.image ? (
                    <>
                      <Image
                        src={s.image}
                        alt={s.name[lang]}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,18,0.88)] via-[rgba(8,16,18,0.15)] to-[rgba(8,16,18,0.4)]" />

                      {/* top layer: eyebrow, title, small "explore" pill — aligned
                          to the same reading column as the rest of the page,
                          even though the photo behind it bleeds full-width */}
                      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-12 md:pt-32">
                        <h2 className="break-words font-display text-[26px] font-bold leading-[1.15] text-white md:max-w-[18ch] md:text-[46px]">
                          {s.name[lang]}
                        </h2>
                        <button
                          onClick={() => setActiveSlug(s.slug)}
                          className="glass-badge mt-5 inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.03] md:text-[14.5px]"
                        >
                          {t.readMore} <ArrowUpRight size={16} />
                        </button>
                      </div>

                      {/* bottom layer: overview + quick facts, sitting directly on
                          the photo + gradient (no glass/blur box) so the image
                          stays fully visible — matches the reference site. */}
                      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-8 md:px-12 md:pb-14">
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 md:text-[12px]">
                          {lang === "en" ? "Overview" : "সংক্ষিপ্ত বিবরণ"}
                        </div>
                        <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] md:text-[16px]">
                          {s.short[lang]}
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-white/20 pt-5 sm:grid-cols-2">
                          {s.stat && (
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/60">
                                {s.stat.label[lang]}
                              </div>
                              <div className="mt-1 text-[14.5px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] md:text-[16px]">
                                {s.stat.value[lang]}
                              </div>
                            </div>
                          )}
                          {s.tags && (
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/60">
                                {lang === "en" ? "Recommended for" : "যাদের জন্য প্রযোজ্য"}
                              </div>
                              <ul className="mt-1.5 flex flex-col gap-1">
                                {s.tags[lang].map((tag, ti) => (
                                  <li
                                    key={ti}
                                    className="flex items-center gap-2 text-[13.5px] text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
                                  >
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-white/70" />
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[160px] font-extrabold leading-none text-accent-soft/50 md:text-[220px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative z-10">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white md:h-16 md:w-16">
                          <Icon size={28} />
                        </div>
                        <h2 className="max-w-[16ch] font-display text-[26px] font-bold leading-[1.15] text-ink md:text-[36px]">
                          {s.name[lang]}
                        </h2>
                        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[17px]">
                          {s.short[lang]}
                        </p>
                      </div>

                      <div className="relative z-10 mt-8">
                        <button
                          onClick={() => setActiveSlug(s.slug)}
                          className="btn-pill btn-primary inline-flex"
                        >
                          {t.readMore} <ArrowRight size={15} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="relative z-[100] mt-16 text-center">
          <p className="mx-auto max-w-[520px] text-[15px] font-medium text-ink-muted">{t.closingTitle}</p>
          <Link
            href={`/${lang}/contact`}
            className="btn-pill btn-primary mt-4 inline-flex"
          >
            {t.closingCta} <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>

      {/* detail modal */}
      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(8,16,18,0.55)] p-4 backdrop-blur-sm"
          onClick={() => setActiveSlug(null)}
        >
          <div
            className="glass-strong relative max-h-[86vh] w-full max-w-[680px] overflow-y-auto rounded-[28px] p-7 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSlug(null)}
              aria-label={t.close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent-2 transition-transform hover:scale-105"
            >
              <X size={18} />
            </button>

            <h3 className="pr-10 font-display text-[24px] font-bold leading-tight md:text-[28px]">
              {active.name[lang]}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-ink">{active.detail.intro[lang]}</p>

            <div className="mt-6">
              <div className="text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
                {active.detail.whoLabel[lang]}
              </div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{active.detail.who[lang]}</p>
            </div>

            {active.detail.steps ? (
              <div className="mt-6">
                <div className="text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
                  {active.detail.howLabel[lang]}
                </div>
                <ol className="mt-2 flex flex-col gap-2.5">
                  {active.detail.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent-2">
                        {i + 1}
                      </span>
                      <span>{step[lang]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="mt-6">
                <div className="text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
                  {active.detail.howLabel[lang]}
                </div>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{active.detail.how[lang]}</p>
              </div>
            )}

            {active.detail.note && active.detail.noteLabel && (
              <div className="mt-6 rounded-2xl bg-accent-soft/60 p-4">
                <div className="text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
                  {active.detail.noteLabel[lang]}
                </div>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink">{active.detail.note[lang]}</p>
              </div>
            )}

            <Link href={`/${lang}/contact`} className="btn-pill btn-primary mt-7 inline-flex">
              {active.detail.cta[lang]} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
