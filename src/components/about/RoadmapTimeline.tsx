"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Calendar,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award,
} from "lucide-react";
import { Lang } from "@/lib/i18n/types";
import { aboutDict } from "@/lib/i18n/about";

export default function RoadmapTimeline({ lang }: { lang: Lang }) {
  const t = aboutDict[lang];
  const steps = t.steps;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [sidePad, setSidePad] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const moved = useRef(false);

  const DOT_ITEM_WIDTH = 120; // button fixed width

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const measure = () => setSidePad(Math.max(0, el.clientWidth / 2 - DOT_ITEM_WIDTH / 2));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const getClosestIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    const scrollerRect = scroller.getBoundingClientRect();
    const targetX = scrollerRect.left + scrollerRect.width / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    dotRefs.current.forEach((btn, i) => {
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dist = Math.abs(cx - targetX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  }, []);

  const updateActive = useCallback(() => {
    setActive(getClosestIndex());
  }, [getClosestIndex]);

  const goTo = useCallback((idx: number, smooth = true) => {
    const el = scrollerRef.current;
    const btn = dotRefs.current[idx];
    if (!el || !btn) return;
    const scrollerRect = el.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2 - scrollerRect.left + el.scrollLeft;
    el.scrollTo({ left: cx - el.clientWidth / 2, behavior: smooth ? "smooth" : "auto" });
    setActive(idx);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || sidePad === 0) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(() => goTo(0, false));
    updateActive();
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateActive, lang, sidePad, goTo]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goTo(Math.max(0, active - 1));
      } else if (e.key === "ArrowRight") {
        goTo(Math.min(steps.length - 1, active + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, goTo, steps.length]);

  // Pointer drag handling on the timeline track
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 3) moved.current = true;
      el.scrollLeft = scrollStartLeft.current - dx;
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (scrollerRef.current) scrollerRef.current.style.cursor = "grab";
      goTo(getClosestIndex());
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [goTo, getClosestIndex]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = true;
    moved.current = false;
    dragStartX.current = e.clientX;
    scrollStartLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const onDotClick = (idx: number) => {
    if (moved.current) return;
    goTo(idx);
  };

  const currentStep = steps[active];
  const progressPercent = ((active + 1) / steps.length) * 100;

  return (
    <section className="band-white w-full py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-[720px] text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-accent-2">
            <Sparkles size={14} className="text-accent" />
            <span>{t.roadmapEyebrow}</span>
          </div>
          <h2 className="font-display text-[26px] font-extrabold text-ink sm:text-[34px] md:text-[38px]">
            {t.roadmapTitle}
          </h2>
          <p className="mt-3 text-[14px] font-medium text-ink-muted sm:text-[15px]">
            {t.roadmapHint}
          </p>

          {/* Progress Bar & Milestone Counter */}
          <div className="mx-auto mt-6 max-w-[320px]">
            <div className="flex items-center justify-between text-[12px] font-bold text-ink-muted">
              <span>
                {t.milestoneLabel} {active + 1} {t.ofLabel} {steps.length}
              </span>
              <span className="text-accent font-display font-extrabold">
                {currentStep.year}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Milestone Card */}
        <div className="grid grid-cols-1 mx-auto mb-12 w-full max-w-[860px] min-h-[480px]">
          {steps.map((s, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 glass flex flex-col justify-between overflow-hidden rounded-[32px] border border-emerald-900/10 p-6 shadow-2xl transition-all duration-500 sm:p-8 md:p-10 ${
                i === active
                  ? "z-10 scale-100 opacity-100"
                  : "pointer-events-none z-0 scale-95 opacity-0"
              }`}
            >
              {/* Background Watermark Step Number */}
              <span
                className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[140px] font-extrabold leading-none text-slate-100/90 sm:text-[200px]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/60 bg-emerald-50/90 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-emerald-900">
                    <GraduationCap size={14} className="text-emerald-700" />
                    {s.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1 text-[12px] font-bold text-white shadow-xs">
                    <Calendar size={13} className="text-emerald-300" />
                    {s.year}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="mt-4 font-display text-[22px] font-extrabold leading-[1.2] text-ink sm:text-[28px] md:text-[34px]">
                  {s.title}
                </h3>

                {/* Institution & Location */}
                <div className="mt-2.5 flex items-center gap-2 text-[13px] font-semibold text-accent-2 sm:text-[14px]">
                  <Building2 size={15} className="shrink-0 text-accent" />
                  <span>{s.institution}</span>
                </div>

                {/* Milestone Narrative */}
                <p className="mt-4 max-w-[65ch] text-[14.5px] leading-relaxed text-ink-muted sm:text-[16px]">
                  {s.body}
                </p>

                {/* Milestone Highlights Pills */}
                {s.highlights && s.highlights.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 text-[12px] font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                      >
                        <CheckCircle2 size={13} className="shrink-0 text-accent" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Interactive Prev / Next Navigation Controls */}
              <div className="relative z-10 mt-8 flex shrink-0 items-center justify-between border-t border-slate-100/90 pt-5">
                <button
                  type="button"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => goTo(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all ${
                    active === 0
                      ? "cursor-not-allowed text-slate-300"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95"
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span>{t.prevBtn}</span>
                </button>

                {/* Compact Node Indicators */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {steps.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      tabIndex={i === active ? 0 : -1}
                      onClick={() => goTo(dotIdx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        dotIdx === active
                          ? "w-7 bg-accent"
                          : "w-2.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Go to milestone ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => goTo(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition-all ${
                    active === steps.length - 1
                      ? "cursor-not-allowed text-slate-300"
                      : "bg-accent text-white shadow-sm hover:bg-accent-2 hover:shadow active:scale-95"
                  }`}
                >
                  <span>{t.nextBtn}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Track with Clickable Nodes */}
        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-200"
            aria-hidden="true"
          />

          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            className="scrollbar-none select-none overflow-x-auto py-4"
            style={{ cursor: "grab" }}
          >
            <div className="relative flex items-center" style={{ height: 90, width: "max-content" }}>
              <div aria-hidden className="shrink-0" style={{ width: Math.max(0, sidePad - 60), marginRight: 60 }} />
              {steps.map((s, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  onClick={() => onDotClick(i)}
                  className="group relative flex shrink-0 flex-col items-center outline-none transition-transform duration-200 hover:scale-105"
                  style={{ width: 120, marginRight: i === steps.length - 1 ? 0 : 50 }}
                  aria-label={`${s.year} - ${s.title}`}
                >
                  {/* Outer Node Indicator */}
                  <span
                    className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      i === active
                        ? "h-10 w-10 border-4 border-white bg-accent text-white shadow-[0_0_0_6px_rgba(31,74,87,0.2)]"
                        : "h-6 w-6 border-2 border-slate-300 bg-white group-hover:border-accent"
                    }`}
                  >
                    {i === active && <Award size={16} className="text-emerald-300" />}
                  </span>

                  {/* Year Tag */}
                  <span
                    className={`mt-2 whitespace-nowrap text-[12px] font-extrabold uppercase tracking-wide transition-all duration-300 ${
                      i === active ? "scale-105 text-accent" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  >
                    {s.year}
                  </span>

                  {/* Short Badge Preview */}
                  <span
                    className={`mt-0.5 max-w-[110px] truncate text-center text-[10px] font-semibold transition-all duration-300 ${
                      i === active ? "text-emerald-700 font-bold" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {s.badge}
                  </span>
                </button>
              ))}
              <div aria-hidden className="shrink-0" style={{ width: Math.max(0, sidePad) }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
