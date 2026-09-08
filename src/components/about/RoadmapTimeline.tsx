"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Lang } from "@/lib/i18n/types";
import { aboutDict } from "@/lib/i18n/about";

export default function RoadmapTimeline({ lang }: { lang: Lang }) {
  const t = aboutDict[lang];
  const steps = t.steps;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // computed in JS, in px — NOT CSS percentages. Percentage padding on the
  // scrolled content itself (a flex box sized by its own children) is a
  // circular-dependency trap in some browsers: the padding never resolves to
  // the real half-width, so the scroll range falls short and the last few
  // items become permanently unreachable. Pixels sidestep that entirely.
  const [sidePad, setSidePad] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const moved = useRef(false);

  const DOT_ITEM_WIDTH = 100; // must match the button's fixed width below

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Padding must bring the ITEM'S CENTER to the viewport center at the
    // scroll extremes — not the item's edge. That's clientWidth/2 minus
    // half the item's own width, not clientWidth/2 alone.
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
    // center the first dot once padding is measured and the track has its real width
    requestAnimationFrame(() => goTo(0, false));
    updateActive();
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateActive, lang, sidePad]);

  // Drag handling lives on window (not the element) once a drag starts, so
  // moving the mouse fast past the element's edge — or releasing outside it —
  // never gets "stuck" or silently stops the drag.
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
      // magnetic snap: settle on whichever dot ended up closest to center
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
    if (moved.current) return; // ignore click-after-drag
    goTo(idx);
  };

  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto mb-4 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            {t.roadmapEyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[30px]">{t.roadmapTitle}</h2>
          <p className="mt-2 text-[13.5px] font-medium text-ink-muted">{t.roadmapHint}</p>
        </div>

        {/* active card, floats above the track — sized to dominate the section
            frame on both mobile and desktop, per the client's explicit request
            for a "full card" feel rather than a compact info box. */}
        <div className="relative mx-auto mb-14 h-[78vh] max-h-[760px] min-h-[520px] w-full max-w-[720px] md:h-[68vh] md:max-h-[680px] md:min-h-[560px]">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`glass absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[32px] px-8 py-12 text-center transition-all duration-500 md:px-16 ${
                i === active ? "z-10 scale-100 opacity-100" : "pointer-events-none z-0 scale-95 opacity-0"
              }`}
            >
              <span className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[180px] font-extrabold leading-none text-accent-soft/60 md:text-[240px]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-accent-2 md:text-[14px]">
                {s.year}
              </div>
              <h3 className="relative z-10 font-display text-[30px] font-bold leading-[1.15] md:text-[46px]">
                {s.title}
              </h3>
              <p className="relative z-10 mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted md:mt-7 md:text-[19px]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* draggable dot track — the decorative line lives OUTSIDE the scrolling
            element on purpose: an absolutely positioned left-0/right-0 child
            inside a flex scroll container makes Chrome/WebKit collapse that
            container's scrollWidth down to the line's own width (the visible
            viewport), silently hard-capping how far it can ever scroll. */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-accent-soft" />

          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            className="scrollbar-none select-none overflow-x-auto"
            style={{ cursor: "grab" }}
          >
            <div className="relative flex items-center" style={{ height: 76, width: "max-content" }}>
              {/* margin-right (not CSS `gap`) between flex children — kept from an
                  earlier fix attempt; harmless either way now that the real cause
                  (above) is gone. */}
              <div aria-hidden className="shrink-0" style={{ width: Math.max(0, sidePad - 64), marginRight: 64 }} />
              {steps.map((s, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  onClick={() => onDotClick(i)}
                  className="relative flex shrink-0 flex-col items-center outline-none"
                  style={{ width: 100, marginRight: i === steps.length - 1 ? 0 : 64 }}
                  aria-label={s.title}
                >
                  <span
                    className={`relative z-10 block rounded-full border-[5px] transition-all duration-300 ${
                      i === active
                        ? "h-9 w-9 border-accent bg-white shadow-[0_0_0_9px_rgba(31,74,87,0.14)]"
                        : "h-4 w-4 scale-90 border-accent-soft bg-white opacity-50 blur-[1px]"
                    }`}
                  />
                  <span
                    className={`mt-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${
                      i === active ? "scale-100 text-accent opacity-100" : "scale-90 text-ink-muted opacity-35"
                    }`}
                  >
                    {s.year}
                  </span>
                </button>
              ))}
              {/* right spacer carries no trailing margin (it's the last element),
                  so — unlike the left spacer — it needs the FULL sidePad, not
                  sidePad minus the gap-margin. */}
              <div aria-hidden className="shrink-0" style={{ width: Math.max(0, sidePad) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
