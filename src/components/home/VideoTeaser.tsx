"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Video, Library } from "lucide-react";
import Reveal from "@/components/Reveal";
import { videos } from "@/lib/data/videos";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

const PIN_TOP = 110;

export default function VideoTeaser({
  lang,
  videosList,
}: {
  lang: Lang;
  videosList?: typeof videos;
}) {
  const list = videosList && videosList.length > 0 ? videosList : videos;
  const t = homeDict[lang].videos;
  const [active, setActive] = useState(0);
  const current = list[active] || list[0];
  const colRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);


  // CSS `position: sticky` mysteriously never engages here (confirmed with an
  // identical plain test element in the same spot, which DID stick — so the
  // browser/engine supports sticky fine, something specific to this render
  // tree silently defeats it, cause not found despite ruling out transforms,
  // overflow, and iframe presence). Falling back to a manual scroll-driven
  // pin using `position: absolute` within a `position: relative` column,
  // which is fully under our own control and can't be silently overridden.
  useEffect(() => {
    const col = colRef.current;
    const player = playerRef.current;
    if (!col || !player) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const update = () => {
      if (!mq.matches) {
        player.style.position = "";
        player.style.top = "";
        return;
      }
      const colRect = col.getBoundingClientRect();
      const colAbsTop = colRect.top + window.scrollY;
      const colHeight = col.offsetHeight;
      const playerHeight = player.offsetHeight;
      const maxTop = Math.max(0, colHeight - playerHeight);
      const raw = window.scrollY + PIN_TOP - colAbsTop;
      const clamped = Math.min(Math.max(raw, 0), maxTop);
      player.style.position = "absolute";
      player.style.left = "0";
      player.style.right = "0";
      player.style.top = `${clamped}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            <Video size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">{t.title}</h2>
          <p className="mt-2 text-[14.5px] text-ink-muted">{t.sub}</p>
        </Reveal>

        {/* table-of-contents player: chapter-style list beside (desktop) or
            above (mobile) a large embedded video. The list has NO independent
            scroll box on purpose — a nested scrollable list inside an already-
            scrolling page forces a separate manual scroll gesture, which felt
            broken. Instead the list flows naturally with the page, and the
            player pins in place (sticky) on desktop so it stays visible while
            you scroll down through all 20 titles.

            Deliberately NOT wrapped in <Reveal> — Reveal's fade-in sets a CSS
            `transform` on this block even at rest (translateY(0), not `none`),
            and any transform on an ancestor creates a new containing block
            that silently breaks `position: sticky` on the player below.

            Rounding/clipping is applied to EACH column individually rather
            than a shared `overflow-hidden` wrapper — `overflow: hidden` on a
            shared ancestor establishes its own (non-scrolling) scroll
            container, and the sticky player then "sticks" relative to that
            static box instead of the real page scroll, which looks identical
            to not being sticky at all. */}
        <div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[320px_1fr]">
            {/* the list */}
            <div className="order-2 flex flex-col gap-1 overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_26px_60px_-24px_rgba(22,35,42,0.35)] md:order-1 md:p-5">
              <div className="mb-2 px-3 pt-1 text-[12px] font-bold uppercase tracking-wide text-ink-muted">
                {list.length} {t.countLabel}
              </div>
              {list.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActive(i)}

                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-200 ${
                    i === active ? "bg-accent text-white" : "hover:bg-accent-soft"
                  }`}
                >
                  <span
                    className={`font-display text-[13px] font-extrabold ${
                      i === active ? "text-white" : "text-accent-2"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[13.5px] font-semibold leading-snug ${i === active ? "text-white" : "text-ink"}`}>
                    {v.title[lang]}
                  </span>
                </button>
              ))}
            </div>

            {/* the player column — a plain grid item that stretches to match
                the list's height (default grid behavior). The player inside
                it is repositioned by the scroll-driven pin effect above on
                desktop (see the useEffect for why this isn't plain CSS
                `sticky`); `position: relative` here is what that absolute
                positioning is calculated against. */}
            <div ref={colRef} className="relative order-1 md:order-2">
              <div
                ref={playerRef}
                className="flex items-center justify-center rounded-[28px] bg-[#0a1214] p-4 shadow-[0_26px_60px_-24px_rgba(22,35,42,0.35)] md:p-8"
              >
                <div className="aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-2xl bg-black">
                  <iframe
                    key={current.id}
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                      current.url
                    )}&show_text=false&width=380&height=676&autoplay=false`}
                    width="100%"
                    height="100%"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={current.title[lang]}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[12.5px] font-semibold uppercase tracking-wide text-accent-2/70">
            {t.hint}
          </p>
        </div>

        <Reveal className="mt-8 text-center">
          <Link href={`/${lang}/videos`} className="btn-pill btn-primary inline-flex">
            <Library size={15} /> {t.cta}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
